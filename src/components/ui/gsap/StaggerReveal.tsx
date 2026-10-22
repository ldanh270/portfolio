"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StaggerRevealProps = {
	children: ReactNode[];
	className?: string;
	itemClassName?: string;
	stagger?: number;
	delay?: number;
	duration?: number;
	y?: number;
	variant?: "fade" | "clip" | "rise" | "skew";
	start?: string;
};

/**
 * StaggerReveal — Machine-gun fast, punchy stagger for tech cards & lists.
 * Zero floatiness, rapid token-stream feel, guaranteed persistence.
 */
export function StaggerReveal({
	children,
	className,
	itemClassName,
	stagger = 0.04,
	delay = 0,
	duration = 0.38,
	y = 18,
	variant = "rise",
	start = "top 90%",
}: StaggerRevealProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = containerRef.current;
			if (!el) return;

			const items = el.querySelectorAll<HTMLDivElement>("[data-stagger-item]");

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(items, { autoAlpha: 1, y: 0 });
				return;
			}

			type InitMap = Record<string, gsap.TweenVars>;
			const from: InitMap = {
				fade: { autoAlpha: 0, scale: 0.98, force3D: true },
				clip: { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, force3D: true },
				rise: { autoAlpha: 0, y, force3D: true },
				// Remove floppy skew, use punchy tight rise instead
				skew: { autoAlpha: 0, y: y * 0.9, force3D: true },
			};

			const to: InitMap = {
				fade: { autoAlpha: 1, scale: 1, force3D: true },
				clip: { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, force3D: true },
				rise: { autoAlpha: 1, y: 0, force3D: true },
				skew: { autoAlpha: 1, y: 0, force3D: true },
			};

			const tl = gsap.timeline({
				paused: true,
				delay,
				onComplete: () => {
					gsap.set(items, { clearProps: "transform,opacity,visibility,clipPath" });
				},
			});

			tl.fromTo(items, from[variant], {
				...to[variant],
				duration,
				stagger: { each: stagger, ease: "power2.inOut" },
				ease: "expo.out",
			});

			ScrollTrigger.create({
				trigger: el,
				start,
				end: "bottom top",
				toggleActions: "play none none reverse",
				animation: tl,
			});

			return () => {
				tl.kill();
			};
		},
		{ scope: containerRef, dependencies: [variant, stagger, y, duration, delay, start] },
	);

	return (
		<div ref={containerRef} className={className}>
			{(Array.isArray(children) ? children : [children]).map((child, i) => (
				<div key={i} data-stagger-item className={itemClassName} style={{ visibility: "hidden" }}>
					{child}
				</div>
			))}
		</div>
	);
}
