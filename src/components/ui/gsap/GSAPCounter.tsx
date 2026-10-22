"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
	end: number;
	suffix?: string;
	prefix?: string;
	duration?: number;
	decimals?: number;
	className?: string;
	start?: string;
};

export function GSAPCounter({
	end,
	suffix = "",
	prefix = "",
	duration = 1.8,
	decimals = 0,
	className,
	start = "top 88%",
}: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el) return;

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
				return;
			}

			const obj = { val: 0 };

			const anim = gsap.to(obj, {
				val: end,
				duration,
				ease: "power2.out",
				paused: true,
				onUpdate() {
					el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
				},
				onComplete() {
					el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
				},
			});

			ScrollTrigger.create({
				trigger: el,
				start,
				onEnter: () => anim.play(),
				onEnterBack: () => anim.restart(),
			});

			return () => anim.kill();
		},
		{ scope: ref, dependencies: [end, suffix, prefix] },
	);

	return (
		<span ref={ref} className={className}>
			{prefix}0{suffix}
		</span>
	);
}
