"use client";

import { useEffect, useState } from "react";

const interactiveSelector = "a, button, .work-item, input, textarea, select";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsHovering(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-brand-black transition-[width,height,background-color] duration-300 md:block"
      style={{
        width: isHovering ? 40 : 10,
        height: isHovering ? 40 : 10,
        backgroundColor: isHovering ? "transparent" : "var(--black)",
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    />
  );
}
