"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type MagneticProps = {
	children: ReactNode;
	className?: string;
	/** Strength: multiplier for offset distance (0–1) */
	strength?: number;
	/** Max pull distance in px */
	maxDistance?: number;
};

/**
 * Magnetic hover effect — element gently follows cursor within its bounds.
 * Resets with spring easing on mouse leave.
 * EXCLUSIVELY uses GSAP (no framer-motion state / useMotionValue).
 */
export function Magnetic({
	children,
	className,
	strength = 0.35,
	maxDistance = 60,
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			let rect: DOMRect | null = null;

			function onEnter() {
				rect = el!.getBoundingClientRect();
			}

			function onMove(e: MouseEvent) {
				if (!rect) rect = el!.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;
				const dx = Math.min(Math.max(e.clientX - cx, -maxDistance), maxDistance);
				const dy = Math.min(Math.max(e.clientY - cy, -maxDistance), maxDistance);

				gsap.to(el, {
					x: dx * strength,
					y: dy * strength,
					duration: 0.35,
					ease: "power2.out",
					overwrite: "auto",
				});
			}

			function onLeave() {
				rect = null;
				gsap.to(el, {
					x: 0,
					y: 0,
					duration: 0.6,
					ease: "elastic.out(1, 0.45)",
					overwrite: "auto",
				});
			}

			el.addEventListener("mouseenter", onEnter);
			el.addEventListener("mousemove", onMove);
			el.addEventListener("mouseleave", onLeave);

			return () => {
				el.removeEventListener("mouseenter", onEnter);
				el.removeEventListener("mousemove", onMove);
				el.removeEventListener("mouseleave", onLeave);
			};
		},
		{ scope: ref },
	);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
