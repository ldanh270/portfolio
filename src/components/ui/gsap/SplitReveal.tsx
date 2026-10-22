"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitRevealProps = {
	text: string;
	as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
	splitBy?: "chars" | "words";
	stagger?: number;
	delay?: number;
	duration?: number;
	y?: number;
	className?: string;
	trigger?: "scroll" | "mount";
	start?: string;
};

/**
 * SplitReveal — Snappy, punchy tech-editorial text reveal.
 * Crisp timing (expo.out), clean vertical translation, no floatiness or rotation.
 * Stays visible once revealed and never vanishes while in view.
 */
export function SplitReveal({
	text,
	as: Tag = "h2",
	splitBy = "chars",
	stagger = 0.015,
	delay = 0,
	duration = 0.38,
	y = 16,
	className,
	trigger = "scroll",
	start = "top 92%",
}: SplitRevealProps) {
	const containerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const el = containerRef.current;
			if (!el) return;

			const units = el.querySelectorAll<HTMLSpanElement>("[data-unit]");

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(units, { autoAlpha: 1, y: 0 });
				return;
			}

			// Clean, fast punchy timeline
			const tl = gsap.timeline({
				paused: true,
				delay: trigger === "mount" ? delay : 0,
				onComplete: () => {
					// Clear inline transform/opacity once finished to prevent any hiding bugs
					gsap.set(units, { clearProps: "transform,opacity,visibility" });
				},
			});

			tl.fromTo(
				units,
				{
					autoAlpha: 0,
					y,
					force3D: true,
				},
				{
					autoAlpha: 1,
					y: 0,
					duration,
					stagger: { each: stagger, ease: "power2.inOut" },
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
					// "onEnter onLeave onEnterBack onLeaveBack"
					// play forward on enter, stay visible, reset only when scrolled fully above
					toggleActions: "play none none reverse",
					animation: tl,
				});
			}

			return () => {
				tl.kill();
			};
		},
		{ scope: containerRef, dependencies: [text, splitBy, trigger, start, y, duration, stagger, delay] },
	);

	const units =
		splitBy === "chars"
			? text.split("").map((char, i) => (
					<span
						key={i}
						data-unit
						className="inline-block"
						style={{ whiteSpace: char === " " ? "pre" : undefined }}
					>
						{char === " " ? "\u00a0" : char}
					</span>
				))
			: text.split(" ").map((word, i, arr) => (
					<span key={i} className="inline-block overflow-hidden">
						<span data-unit className="inline-block">
							{word}
							{i < arr.length - 1 ? "\u00a0" : ""}
						</span>
					</span>
				));

	return (
		// @ts-expect-error polymorphic tag
		<Tag ref={containerRef} className={className} aria-label={text}>
			{units}
		</Tag>
	);
}
