"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "[data-cursor]";

export function CustomCursor() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const smoothX = useSpring(cursorX, { stiffness: 520, damping: 42, mass: 0.6 });
	const smoothY = useSpring(cursorY, { stiffness: 520, damping: 42, mass: 0.6 });
	const [cursorLabel, setCursorLabel] = useState("");
	const [isHovering, setIsHovering] = useState(false);

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
			className="pointer-events-none fixed left-0 top-0 z-9999 hidden items-center justify-center bg-black mix-blend-difference md:flex"
			animate={{
				width: isHovering ? 130 : 20,
				height: isHovering ? 40 : 20,
				borderRadius: isHovering ? "20px" : "50%",
			}}
			transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.6 }}
			style={{
				x: smoothX,
				y: smoothY,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			<AnimatePresence mode="wait">
				{isHovering ? (
					<motion.span
						key="label"
						initial={{ opacity: 0, filter: "blur(4px)" }}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, filter: "blur(4px)" }}
						transition={{ duration: 0.12 }}
						className="font-mono text-[9px] uppercase tracking-[0.22em] text-white"
					>
						{cursorLabel}
					</motion.span>
				) : (
					<motion.div
						key="inner"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
						className="size-[6px] rounded-full bg-white"
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
