import dynamic from "next/dynamic";
import type { ComponentPropsWithoutRef } from "react";

const PhotoParticles = dynamic(() => import("./PhotoParticles"), {
  ssr: false,
});

type HeroCanvasProps = ComponentPropsWithoutRef<"div"> & {
  src?: string;
};

export function HeroCanvas({
  className,
  src = "/avatar.png",
  ...props
}: HeroCanvasProps) {
  return (
    <div className={className} {...props}>
      <PhotoParticles className="absolute inset-0" src={src} />
    </div>
  );
}
