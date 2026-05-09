"use client";

import { useEffect, useRef } from "react";

type ParallaxPanelProps = {
  gradient: string;
  label: string;
};

export function ParallaxPanel({ gradient, label }: ParallaxPanelProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let isVisible = false;

    const update = () => {
      frame = 0;

      if (!isVisible || !ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      ref.current.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        onScroll();
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex aspect-[4/5] items-end rounded-[2rem] bg-gradient-to-br ${gradient} p-6 transition-transform duration-200 will-change-transform`}
      aria-label={label}
      role="img"
    >
      <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-neutral-950 backdrop-blur">
        {label}
      </span>
    </div>
  );
}
