"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
	children: ReactNode;
	className?: string;
	from?: "bottom" | "left" | "right" | "top";
	delay?: number;
	duration?: number;
	y?: number;
	trigger?: "scroll" | "mount";
	start?: string;
};

const CLIP_INITIAL: Record<string, string> = {
	bottom: "inset(100% 0 0 0)",
	top: "inset(0 0 100% 0)",
	left: "inset(0 100% 0 0)",
	right: "inset(0 0 0 100%)",
};

/**
 * ScrollReveal — Punchy, high-impact tech reveal.
 * Crisp timing, tight translation, hardware-accelerated.
 * Guaranteed to stay visible once revealed.
 */
export function ScrollReveal({
	children,
	className,
	from = "bottom",
	delay = 0,
	duration = 0.42,
	y = 18,
	trigger = "scroll",
	start = "top 92%",
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(el, { autoAlpha: 1, y: 0, x: 0, clipPath: "none" });
				return;
			}

			const fromY = from === "bottom" ? y : from === "top" ? -y : 0;
			const fromX = from === "left" ? -y * 0.6 : from === "right" ? y * 0.6 : 0;

			const tl = gsap.timeline({
				paused: true,
				delay: trigger === "mount" ? delay : 0,
				onComplete: () => {
					gsap.set(el, { clearProps: "clipPath,transform,opacity,visibility,willChange" });
				},
			});

			tl.fromTo(
				el,
				{
					autoAlpha: 0,
					y: fromY,
					x: fromX,
					clipPath: CLIP_INITIAL[from],
					force3D: true,
				},
				{
					autoAlpha: 1,
					y: 0,
					x: 0,
					clipPath: "inset(0% 0% 0% 0%)",
					duration,
					ease: "expo.out",
					force3D: true,
				},
			);

			if (trigger === "mount") {
				tl.play();
			} else {
				ScrollTrigger.create({
					trigger: el,
					start,
					end: "bottom top",
					toggleActions: "play none none reverse",
					animation: tl,
				});
			}

			return () => {
				tl.kill();
			};
		},
		{ scope: ref, dependencies: [from, trigger, start, y, duration, delay] },
	);

	return (
		<div ref={ref} className={className} style={{ visibility: "hidden" }}>
			{children}
		</div>
	);
}
