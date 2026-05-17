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
	const isInView = useInView(ref, { once: true, margin: "-60px" });

	useEffect(() => {
		if (!isInView) return;

		let start = 0;
		const step = end / (duration / 16);
		const timer = setInterval(() => {
			start += step;
			if (start >= end) {
				setCount(end);
				clearInterval(timer);
			} else {
				setCount(Math.floor(start));
			}
		}, 16);

		return () => clearInterval(timer);
	}, [isInView, end, duration]);

	return (
		<span
			ref={ref}
			className={className}
		>
			{count}
			{suffix}
		</span>
	);
}
