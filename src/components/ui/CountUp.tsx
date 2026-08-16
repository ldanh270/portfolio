"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
	end: number;
	duration?: number;
	suffix?: string;
	className?: string;
};

export function CountUp({ end, duration = 1800, suffix = "", className }: CountUpProps) {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: "-60px" });

	useEffect(() => {
		if (!isInView) return;

		const startedAt = performance.now();
		let animationFrame = 0;

		const animateCount = (timestamp: number) => {
			const progress = Math.min((timestamp - startedAt) / duration, 1);
			setCount(progress === 1 ? end : Math.floor(progress * end));

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animateCount);
			}
		};

		animationFrame = requestAnimationFrame(animateCount);

		return () => cancelAnimationFrame(animationFrame);
	}, [isInView, end, duration]);

	return (
		<span
			ref={ref}
			className={className}
		>
			{isInView ? count : 0}
			{suffix}
		</span>
	);
}
