"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, .work-item, input, textarea, select, [data-cursor]";

export function CustomCursor() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const smoothX = useSpring(cursorX, { stiffness: 520, damping: 42, mass: 0.6 });
	const smoothY = useSpring(cursorY, { stiffness: 520, damping: 42, mass: 0.6 });
	const [cursorLabel, setCursorLabel] = useState("");
	const [isHovering, setIsHovering] = useState(false);

	const scale = useTransform(smoothX, () => (isHovering ? 0.74 : 1));

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			const target = (event.target as Element | null)?.closest(interactiveSelector);
			cursorX.set(event.clientX);
			cursorY.set(event.clientY);
			setIsHovering(Boolean(target));
			setCursorLabel(target?.getAttribute("data-cursor") ?? "");
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, [cursorX, cursorY]);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed left-0 top-0 z-9999 hidden size-24 place-items-center rounded-full bg-black text-brand-white mix-blend-difference md:grid"
			style={{
				x: smoothX,
				y: smoothY,
				scale,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			<motion.span
				initial={false}
				animate={{ opacity: cursorLabel ? 1 : 0, y: cursorLabel ? 0 : 4 }}
				transition={{ duration: 0.18 }}
				className="font-mono text-[9px] uppercase tracking-[0.22em]"
			>
				{cursorLabel}
			</motion.span>
			<motion.div
				className="absolute size-2 rounded-full bg-white"
				animate={{ scale: isHovering ? 0 : 1 }}
				transition={{ duration: 0.18 }}
			/>
		</motion.div>
	);
}
