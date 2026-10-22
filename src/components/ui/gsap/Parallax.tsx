"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
	children: ReactNode;
	className?: string;
	/** Parallax depth: pixels to shift over the scroll range */
	depth?: number;
	/** "up" shifts element up (standard parallax), "down" shifts down */
	direction?: "up" | "down";
	/** ScrollTrigger scrub speed (true = 1) */
	scrub?: number | boolean;
};

/**
 * Parallax scroll wrapper — element moves at a different speed than page scroll.
 * Uses GSAP ScrollTrigger scrub for smooth physics.
 */
export function Parallax({
	children,
	className,
	depth = 80,
	direction = "up",
	scrub = 1.2,
}: ParallaxProps) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			const yFrom = direction === "up" ? 0 : -depth;
			const yTo = direction === "up" ? -depth : 0;

			const ctx = gsap.to(el, {
				y: yTo - yFrom,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top bottom",
					end: "bottom top",
					scrub,
					invalidateOnRefresh: true,
				},
			});

			gsap.set(el, { y: yFrom });

			return () => {
				if (ctx.scrollTrigger) ctx.scrollTrigger.kill();
				ctx.kill();
			};
		},
		{ scope: ref, dependencies: [depth, direction] },
	);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
