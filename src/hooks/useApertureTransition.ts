"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { LOADER_CONFIG } from "@/config/loader";

type ApertureElements = {
	content: HTMLElement;
	circle: SVGCircleElement;
	ring: SVGCircleElement;
};

function computeMaxRadius(width: number, height: number, padding: number): number {
	return Math.ceil(Math.hypot(width, height) / 2) + padding;
}

function resetAperture(elements: ApertureElements): void {
	gsap.killTweensOf([elements.content, elements.circle, elements.ring]);
	gsap.set(elements.circle, { attr: { r: 0 } });
	gsap.set(elements.ring, { attr: { r: 0 }, opacity: 0.22 });
	gsap.set(elements.content, { opacity: 1, scale: 1 });
}

function runReducedMotionExit(container: HTMLElement | null, onComplete: () => void): void {
	if (!container) return onComplete();
	gsap.to(container, {
		opacity: 0,
		duration: LOADER_CONFIG.REDUCED_MOTION_DURATION_S,
		ease: LOADER_CONFIG.FADE_EASE,
		onComplete,
	});
}

function runApertureReveal(elements: ApertureElements, maxRadius: number, onComplete: () => void): void {
	const tl = gsap.timeline({ delay: 0.04, onComplete });
	tl.to(elements.content, {
		opacity: 0,
		scale: 0.9,
		duration: LOADER_CONFIG.EXIT_FADE_DURATION_S,
		ease: LOADER_CONFIG.FADE_EASE,
	})
		.to(
			elements.circle,
			{
				attr: { r: maxRadius },
				duration: LOADER_CONFIG.REVEAL_DURATION_S,
				ease: LOADER_CONFIG.REVEAL_EASE,
			},
			"-=0.08",
		)
		.to(
			elements.ring,
			{
				attr: { r: maxRadius },
				opacity: 0,
				duration: LOADER_CONFIG.REVEAL_DURATION_S,
				ease: LOADER_CONFIG.REVEAL_EASE,
			},
			"<",
		);
}

export function useApertureTransition(): {
	isActive: boolean;
	containerRef: RefObject<HTMLDivElement | null>;
	contentRef: RefObject<HTMLDivElement | null>;
	circleRef: RefObject<SVGCircleElement | null>;
	ringRef: RefObject<SVGCircleElement | null>;
} {
	const pathname = usePathname();
	const [prevPathname, setPrevPathname] = useState(pathname);
	const [isActive, setIsActive] = useState(true);
	const hasMounted = useRef(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<SVGCircleElement>(null);
	const ringRef = useRef<SVGCircleElement>(null);

	if (prevPathname !== pathname) {
		setPrevPathname(pathname);
		setIsActive(true);
	}

	useEffect(() => {
		if (!isActive) return;

		const isInitial = !hasMounted.current;
		hasMounted.current = true;
		const holdMs = isInitial ? LOADER_CONFIG.INITIAL_HOLD_MS : LOADER_CONFIG.ROUTE_HOLD_MS;

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		if (contentRef.current && circleRef.current && ringRef.current) {
			resetAperture({ content: contentRef.current, circle: circleRef.current, ring: ringRef.current });
		}

		const timer = setTimeout(() => {
			const unlockAndExit = () => {
				document.body.style.overflow = prevOverflow;
				setIsActive(false);
			};

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return runReducedMotionExit(containerRef.current, unlockAndExit);
			}

			if (!contentRef.current || !circleRef.current || !ringRef.current) {
				return unlockAndExit();
			}

			const radius = computeMaxRadius(window.innerWidth, window.innerHeight, LOADER_CONFIG.RADIUS_PADDING_PX);
			runApertureReveal(
				{ content: contentRef.current, circle: circleRef.current, ring: ringRef.current },
				radius,
				unlockAndExit,
			);
		}, holdMs);

		return () => {
			clearTimeout(timer);
			document.body.style.overflow = prevOverflow;
		};
	}, [pathname, isActive]);

	return { isActive, containerRef, contentRef, circleRef, ringRef };
}
