"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ReadingProgress() {
	const progress = useScrollProgress();

	return (
		<motion.div
			style={{ scaleX: progress, transformOrigin: "0%" }}
			className="fixed top-0 right-0 left-0 z-50 h-[2px] bg-brand-black"
		/>
	);
}
