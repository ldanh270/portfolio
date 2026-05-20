"use client";

import { useScroll, useSpring } from "framer-motion";

export function useScrollProgress() {
	const { scrollYProgress } = useScroll();
	return useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
}
