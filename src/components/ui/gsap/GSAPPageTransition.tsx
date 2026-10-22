"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type GSAPPageTransitionProps = {
	children: ReactNode;
};

/**
 * Page-level enter transition using GSAP autoAlpha (opacity + visibility).
 * autoAlpha: 0 = opacity 0 AND visibility hidden (no flash, no layout shift).
 * autoAlpha: 1 = opacity 1 AND visibility visible.
 */
export function GSAPPageTransition({ children }: GSAPPageTransitionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;

			// Respect prefers-reduced-motion
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(el, { autoAlpha: 1 });
				return;
			}

			gsap.killTweensOf(el);

			gsap.fromTo(
				el,
				{
					autoAlpha: 0,
					y: 12,
					clipPath: "inset(2% 0 0 0 round 4px)",
				},
				{
					autoAlpha: 1,
					y: 0,
					clipPath: "inset(0% 0 0 0 round 0px)",
					duration: 0.42,
					ease: "expo.out",
					clearProps: "clipPath,y,willChange",
					onStart() {
						el.style.willChange = "opacity, transform, clip-path";
					},
				},
			);
		},
		{ scope: ref, dependencies: [pathname] },
	);

	return (
		// autoAlpha starts with visibility:hidden so no flash before GSAP runs
		<div ref={ref} style={{ visibility: "hidden" }}>
			{children}
		</div>
	);
}
