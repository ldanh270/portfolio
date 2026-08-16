"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewAnimation<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;

		if (!node) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [isVisible]);

	return { ref, isVisible };
}
