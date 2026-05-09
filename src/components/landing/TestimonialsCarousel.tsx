"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { testimonials } from "@/lib/landing-data";

const AUTOPLAY_INTERVAL = 3000;

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <div
      className="rounded-[2.5rem] border border-neutral-200 bg-neutral-950 p-5 text-white sm:p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-lime-300">Client proof</p>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
          onClick={() => setIsPaused((value) => !value)}
          aria-label={isPaused ? "Play testimonials" : "Pause testimonials"}
        >
          {isPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
      </div>

      <div className="overflow-hidden" aria-live="polite">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="min-w-full pr-4">
              <blockquote className="mb-10 max-w-4xl font-display text-4xl leading-none tracking-[-0.05em] sm:text-6xl">
                “{testimonial.quote}”
              </blockquote>
              <figcaption>
                <span className="block text-lg font-semibold">{testimonial.author}</span>
                <span className="text-neutral-400">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3" aria-label="Choose testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.author}
            type="button"
            className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 ${index === activeIndex ? "w-10 bg-lime-300" : "w-2 bg-white/30"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show testimonial from ${testimonial.author}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
