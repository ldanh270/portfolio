"use client";

import { useEffect, useRef, useState } from "react";

type TrailItem = {
  id: number;
  x: number;
  y: number;
};

const TRAIL_THROTTLE_MS = 80;
const TRAIL_DURATION_MS = 1000;

export function MouseTrailSection() {
  const [items, setItems] = useState<TrailItem[]>([]);
  const lastAddedAt = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = Date.now();

      if (now - lastAddedAt.current < TRAIL_THROTTLE_MS) {
        return;
      }

      lastAddedAt.current = now;
      const id = nextId.current;
      nextId.current += 1;

      setItems((current) => [...current.slice(-8), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== id));
      }, TRAIL_DURATION_MS);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {items.map((item) => (
        <span
          key={item.id}
          className="mouse-trail-dot absolute size-4 rounded-full bg-lime-300 mix-blend-difference"
          style={{ left: item.x, top: item.y }}
        />
      ))}
    </div>
  );
}
