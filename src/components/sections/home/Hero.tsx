"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { HeroCanvas } from "@/components/three/HeroCanvas";
import { RevealText } from "@/components/ui/RevealText";
import { SOCIAL_LINKS } from "@/data/site";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const objectY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const objectOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-svh overflow-hidden bg-brand-white px-6 pb-8 pt-24 text-brand-black sm:px-12 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-auto absolute inset-x-0 bottom-0 top-16 z-0 select-none"
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: objectOpacity, y: objectY }
        }
      >
        <HeroCanvas src="/avatar.png" className="absolute inset-0" />
      </motion.div>

      <div className="relative z-10 ml-auto max-w-7xl text-right">
        <h1 className="font-display text-[clamp(4.8rem,11vw,12rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em]">
          <RevealText className="block">Le Duc</RevealText>
          <RevealText className="block" delay={0.3}>
            Anh
          </RevealText>
        </h1>
        <div className="mt-4 flex items-center justify-end gap-5 font-mono text-[0.65rem] font-bold uppercase leading-none tracking-tight">
          <span>
            Aka:
            <br />
            ldanh270
          </span>
          <span className="text-5xl leading-none">✱</span>
        </div>
      </div>

      <div className="relative left-0 z-10 mt-12 max-w-xs sm:absolute sm:left-12 sm:top-[28%] sm:mt-0 lg:left-16">
        <h2 className="mb-4 text-xl font-medium tracking-[-0.04em]">
          Software Engineer / Context Engineer
        </h2>
        <p className="text-sm leading-7 text-brand-black/65">
          I build scalable, modern applications with a strong eye for interface detail, product clarity and long-term maintainability.
        </p>
      </div>

      <div className="absolute bottom-8 right-6 z-10 text-right font-mono text-[0.65rem] uppercase leading-6 tracking-tight text-brand-black/65 sm:right-12 lg:right-16">
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-colors duration-200 hover:text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
        <p className="mt-3">Da Nang, Vietnam</p>
      </div>

      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-4 sm:left-12 lg:left-16">
        <span className="h-px w-16 bg-brand-black" />
        <span className="font-mono text-xs uppercase tracking-widest text-brand-black/65">
          Scroll
        </span>
      </div>
    </section>
  );
}
