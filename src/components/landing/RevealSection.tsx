"use client";

import type { ReactNode } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

type RevealSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function RevealSection({ children, className = "", id }: RevealSectionProps) {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`fade-up ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
