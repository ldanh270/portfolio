"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { HERO_PARTICLE } from "@/config/hero";

type PhotoParticlesProps = {
  className?: string;
  src: string;
};

type ParticleData = {
  darkness: Float32Array;
  fade: Float32Array;
  scatter: Float32Array;
  seeds: Float32Array;
  positions: Float32Array;
};

type Region = {
  fit: number;
  offsetX: number;
  offsetY: number;
};

const VERTEX_SHADER = /* glsl */ `
  attribute float aDark;
  attribute float aFade;
  attribute vec3 aScatter;
  attribute float aSeed;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uPush;
  uniform float uSize;
  uniform float uProgress;
  uniform float uScale;
  uniform float uFit;
  uniform float uOffsetX;
  uniform float uOffsetY;
  uniform vec3 uSpread;
  uniform float uStagger;

  varying float vDark;
  varying float vFade;
  varying float vSettled;

  void main() {
    float delay = aSeed * uStagger;
    float localProgress = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
    float easedProgress = smoothstep(0.0, 1.0, localProgress);

    vec3 assembled = vec3(position.xy * uFit + vec2(uOffsetX, uOffsetY), 0.0);
    vec3 dispersed = aScatter * uSpread;
    vec3 pointPosition = mix(dispersed, assembled, easedProgress);

    vec2 mouseDelta = pointPosition.xy - uMouse;
    float distanceToMouse = max(length(mouseDelta), 0.001);
    float influence = (1.0 - smoothstep(0.0, uRadius, distanceToMouse)) * easedProgress;
    pointPosition.xy += normalize(mouseDelta) * influence * uPush;
    pointPosition.z += influence * uPush * 1.35;

    pointPosition.z += sin(uTime * 0.6 + pointPosition.x * 1.4) *
      cos(uTime * 0.45 + pointPosition.y * 1.2) * 0.07;

    vec4 modelPosition = modelViewMatrix * vec4(pointPosition, 1.0);
    gl_Position = projectionMatrix * modelPosition;
    float tone = smoothstep(0.10, 0.78, aDark);
    float fade = smoothstep(0.0, 1.0, aFade);
    gl_PointSize = uSize * uFit * (0.22 + tone * 1.05) *
      mix(0.18, 1.0, fade) * uScale / -modelPosition.z;
    gl_PointSize *= mix(0.5, 1.0, easedProgress);

    vDark = tone;
    vFade = fade;
    vSettled = easedProgress;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vDark;
  varying float vFade;
  varying float vSettled;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    float circle = smoothstep(0.5, 0.4, distanceToCenter);
    float alpha = circle * mix(0.35, 1.0, smoothstep(0.0, 0.25, vDark));
    alpha *= mix(0.2, 1.0, vFade);
    alpha *= mix(0.28, 1.0, vSettled);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(0.04, 0.04, 0.04, alpha);
  }
`;

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load hero image: ${src}`));
    image.src = src;
  });
}

async function sampleImage(src: string): Promise<ParticleData> {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  const sampleSize = HERO_PARTICLE.sampleSize;
  canvas.width = sampleSize;
  canvas.height = sampleSize;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Could not create the hero particle sampler");
  }

  context.drawImage(image, 0, 0, sampleSize, sampleSize);
  const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data;
  const positions: number[] = [];
  const darkness: number[] = [];
  const fade: number[] = [];
  const scatter: number[] = [];
  const seeds: number[] = [];

  for (let y = 0; y < sampleSize; y += 1) {
    for (let x = 0; x < sampleSize; x += 1) {
      const pixelIndex = (y * sampleSize + x) * 4;
      const alpha = pixels[pixelIndex + 3] / 255;
      const red = pixels[pixelIndex] / 255;
      const green = pixels[pixelIndex + 1] / 255;
      const blue = pixels[pixelIndex + 2] / 255;
      const luma = red * 0.2126 + green * 0.7152 + blue * 0.0722;
      const seed = seededRandom(pixelIndex + 1);
      const rowProgress = y / (sampleSize - 1);
      const dissolveProgress = Math.max(
        0,
        (rowProgress - HERO_PARTICLE.dissolveFrom) /
          (1 - HERO_PARTICLE.dissolveFrom),
      );
      const rowFade = 1 - dissolveProgress;
      const jitter = (seededRandom(seed + 4) - 0.5) * 0.18;
      const particleFade = Math.max(0, Math.min(1, rowFade + jitter));

      if (
        alpha <= HERO_PARTICLE.alphaCutoff ||
        luma > HERO_PARTICLE.lumaCutoff ||
        particleFade <= 0.02
      ) {
        continue;
      }

      positions.push(
        (x / (sampleSize - 1) - 0.5) * HERO_PARTICLE.planeSize,
        -(y / (sampleSize - 1) - 0.5) * HERO_PARTICLE.planeSize,
        0,
      );
      darkness.push(1 - luma);
      fade.push(particleFade);
      scatter.push(
        seededRandom(seed + 1) - 0.5,
        seededRandom(seed + 2) - 0.5,
        seededRandom(seed + 3) - 0.5,
      );
      seeds.push(seed);
    }
  }

  return {
    darkness: new Float32Array(darkness),
    fade: new Float32Array(fade),
    positions: new Float32Array(positions),
    scatter: new Float32Array(scatter),
    seeds: new Float32Array(seeds),
  };
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function usePhotoPoints(src: string) {
  const [data, setData] = useState<ParticleData | null>(null);

  useEffect(() => {
    let cancelled = false;

    sampleImage(src)
      .then((nextData) => {
        if (!cancelled) setData(nextData);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return data;
}

function getRegion(viewport: { width: number; height: number }, isWide: boolean): Region {
  const fit = Math.min(
    1,
    (Math.min(viewport.width, viewport.height) *
      (isWide
        ? HERO_PARTICLE.widePortraitScale
        : HERO_PARTICLE.narrowPortraitScale)) /
      HERO_PARTICLE.planeSize,
  );
  const portraitHeight = HERO_PARTICLE.planeSize * fit;

  return {
    fit,
    offsetX: 0,
    offsetY: -Math.max(0, (viewport.height - portraitHeight) / 2),
  };
}

function Portrait({
  data,
  isWide,
  reducedMotion,
}: {
  data: ParticleData;
  isWide: boolean;
  reducedMotion: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(999, 999));
  const mouse = useRef(new THREE.Vector2(999, 999));
  const { gl, viewport } = useThree();
  const region = getRegion(viewport, isWide);
  const geometry = useMemo(() => createGeometry(data), [data]);
  const uniforms = useMemo(() => createUniforms(), []);

  useEffect(() => disposeGeometry(geometry), [geometry]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const updatePointer = (event: PointerEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInside) {
        pointer.current.set(999, 999);
        return;
      }

      pointer.current.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      );
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [gl, reducedMotion]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const camera = state.camera as THREE.PerspectiveCamera;
    const progress = reducedMotion
      ? 1
      : Math.min(1, material.uniforms.uProgress.value + delta / HERO_PARTICLE.assembleSeconds);
    const targetMouse = reducedMotion
      ? new THREE.Vector2(999, 999)
      : pointer.current.x > 2
        ? new THREE.Vector2(999, 999)
      : new THREE.Vector2(
          (pointer.current.x * viewport.width) / 2,
          (pointer.current.y * viewport.height) / 2,
        );

    mouse.current.copy(targetMouse);
    material.uniforms.uScale.value =
      (state.size.height * state.gl.getPixelRatio()) /
      (2 * Math.tan((camera.fov * Math.PI) / 360));
    material.uniforms.uSpread.value.set(
      state.viewport.width * 1.15,
      state.viewport.height * 1.15,
      6,
    );
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uProgress.value = progress;
    material.uniforms.uFit.value = region.fit;
    material.uniforms.uOffsetX.value = region.offsetX;
    material.uniforms.uOffsetY.value = region.offsetY;
    material.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        blending={THREE.NormalBlending}
        depthWrite={false}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
      />
    </points>
  );
}

function createGeometry(data: ParticleData) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(data.positions, 3));
  geometry.setAttribute("aDark", new THREE.Float32BufferAttribute(data.darkness, 1));
  geometry.setAttribute("aFade", new THREE.Float32BufferAttribute(data.fade, 1));
  geometry.setAttribute("aScatter", new THREE.Float32BufferAttribute(data.scatter, 3));
  geometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(data.seeds, 1));
  return geometry;
}

function disposeGeometry(geometry: THREE.BufferGeometry) {
  return () => geometry.dispose();
}

function createUniforms() {
  return {
    uFit: { value: 1 },
    uMouse: { value: new THREE.Vector2(100, 100) },
    uOffsetX: { value: 0 },
    uOffsetY: { value: 0 },
    uProgress: { value: 0 },
    uPush: { value: 0.55 },
    uRadius: { value: 1.5 },
    uScale: { value: 500 },
    uSize: {
      value: (HERO_PARTICLE.planeSize / HERO_PARTICLE.sampleSize) *
        HERO_PARTICLE.pointDensity,
    },
    uSpread: { value: new THREE.Vector3(12, 12, 6) },
    uStagger: { value: HERO_PARTICLE.maxStagger },
    uTime: { value: 0 },
  };
}

export default function PhotoParticles({
  className,
  src,
}: PhotoParticlesProps) {
  const data = usePhotoPoints(src);
  const reducedMotion = useReducedMotion() ?? false;
  const isWide = useMediaQuery("(min-width: 1024px)");
  if (!data) return <div className={className} aria-hidden="true" />;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ fov: 45, position: [0, 0, 7] }}
        dpr={[1, 2]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true }}
      >
        <Portrait
          data={data}
          isWide={isWide}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
