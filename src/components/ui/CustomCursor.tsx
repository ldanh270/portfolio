"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type CursorVariant = "default" | "link" | "button" | "image" | "drag";

interface Particle {
	id: number;
	x: number;
	y: number;
}

const interactiveSelector = "a, button, [data-cursor], [role='button'], img";
const PARTICLE_LIFETIME_MS = 650;

export function CustomCursor() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const shadowX = useSpring(cursorX, { stiffness: 120, damping: 25, mass: 1 });
	const shadowY = useSpring(cursorY, { stiffness: 120, damping: 25, mass: 1 });

	const [cursorLabel, setCursorLabel] = useState("");
	const [variant, setVariant] = useState<CursorVariant>("default");
	const [isVisible, setIsVisible] = useState(true);
	const [particles, setParticles] = useState<Particle[]>([]);
	const [isPressed, setIsPressed] = useState(false);
	const particleIdRef = useRef(0);
	const particleTimeoutsRef = useRef(new Set<ReturnType<typeof setTimeout>>());
	const magneticX = useMotionValue(0);
	const magneticY = useMotionValue(0);

	useEffect(() => {
		const particleTimeouts = particleTimeoutsRef.current;
		const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
		const updateCursorAvailability = () => {
			document.documentElement.classList.toggle("custom-cursor-active", finePointerQuery.matches);
		};
		updateCursorAvailability();
		finePointerQuery.addEventListener("change", updateCursorAvailability);

		const onMouseMove = (event: MouseEvent) => {
			const target = event.target as Element | null;
			const interactive = target?.closest(interactiveSelector);

			cursorX.set(event.clientX);
			cursorY.set(event.clientY);

			// Magnetic pull effect
			if (interactive) {
				const rect = interactive.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const distanceX = event.clientX - centerX;
				const distanceY = event.clientY - centerY;
				const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

				if (distance < 100) {
					const pullStrength = 0.3;
					magneticX.set(-distanceX * pullStrength);
					magneticY.set(-distanceY * pullStrength);
				} else {
					magneticX.set(0);
					magneticY.set(0);
				}

				const cursorAttr = interactive.getAttribute("data-cursor");

				if (cursorAttr) {
					setCursorLabel(cursorAttr.toLowerCase() === "view" ? "" : cursorAttr);
					setVariant("link");
				} else if (
					interactive.tagName === "BUTTON" ||
					interactive.getAttribute("role") === "button"
				) {
					setCursorLabel("Click");
					setVariant("button");
				} else if (interactive.tagName === "A") {
					setCursorLabel("");
					setVariant("link");
				} else if (interactive.tagName === "IMG") {
					setCursorLabel("Zoom");
					setVariant("image");
				} else {
					setCursorLabel("");
					setVariant("default");
				}
			} else {
				setCursorLabel("");
				setVariant("default");
				magneticX.set(0);
				magneticY.set(0);
			}

			// Particle trail
			if (Math.random() > 0.7) {
				const newParticle: Particle = {
					id: particleIdRef.current++,
					x: event.clientX,
					y: event.clientY,
				};
				setParticles((prev) => [...prev.slice(-8), newParticle]);
				const timeout = setTimeout(() => {
					setParticles((current) => current.filter((particle) => particle.id !== newParticle.id));
					particleTimeouts.delete(timeout);
				}, PARTICLE_LIFETIME_MS);
				particleTimeouts.add(timeout);
			}
		};

		const onMouseDown = () => setIsPressed(true);
		const onMouseUp = () => setIsPressed(false);
		const onMouseEnter = () => setIsVisible(true);
		const onMouseLeave = () => setIsVisible(false);

		window.addEventListener("mousemove", onMouseMove, { passive: true });
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mouseenter", onMouseEnter);
		document.addEventListener("mouseleave", onMouseLeave);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mouseenter", onMouseEnter);
			document.removeEventListener("mouseleave", onMouseLeave);
			finePointerQuery.removeEventListener("change", updateCursorAvailability);
			document.documentElement.classList.remove("custom-cursor-active");
			particleTimeouts.forEach(clearTimeout);
			particleTimeouts.clear();
		};
	}, [cursorX, cursorY, magneticX, magneticY]);

	const cursorConfig = {
		default: {
			width: 12,
			height: 12,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.78)",
			border: "none",
			scale: 1,
		},
		link: {
			width: 56,
			height: 56,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.025)",
			border: "1px solid rgba(10, 10, 10, 0.35)",
			scale: 1,
		},
		button: {
			width: 64,
			height: 64,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.025)",
			border: "1px solid rgba(10, 10, 10, 0.35)",
			scale: 1,
		},
		image: {
			width: 76,
			height: 76,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.04)",
			border: "1px dashed rgba(10, 10, 10, 0.4)",
			scale: 1,
		},
		drag: {
			width: 44,
			height: 44,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.78)",
			border: "none",
			scale: 0.8,
		},
	};

	const config = cursorConfig[variant];

	return (
		<>
			{/* Particle Trail */}
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="pointer-events-none fixed left-0 top-0 z-9997 hidden md:block"
					initial={{ scale: 1, opacity: 1 }}
					animate={{ scale: 0, opacity: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					style={{
						x: particle.x,
						y: particle.y,
						translateX: "-50%",
						translateY: "-50%",
					}}
				>
					<div className="h-1.5 w-1.5 rounded-full bg-brand-black/20" />
				</motion.div>
			))}

			{/* Ripple Effect on Click */}
			<AnimatePresence>
				{isPressed && (
					<motion.div
						key="ripple"
						className="pointer-events-none fixed left-0 top-0 z-9996 hidden rounded-full border border-brand-black/15 md:block"
						initial={{ width: 0, height: 0, opacity: 1 }}
						animate={{ width: 140, height: 140, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						style={{
							x: cursorX,
							y: cursorY,
							translateX: "-50%",
							translateY: "-50%",
						}}
					/>
				)}
			</AnimatePresence>

			{/* Main Cursor with Magnetic Effect */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9999 hidden items-center justify-center md:flex"
				animate={{
					width: config.width,
					height: config.height,
					borderRadius: config.borderRadius,
					backgroundColor: config.backgroundColor,
					border: config.border,
					opacity: isVisible ? 1 : 0,
					scale: isPressed ? 0.85 : config.scale,
				}}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 30,
					mass: 0.5,
					opacity: { duration: 0.2 },
					scale: { duration: 0.1 },
				}}
				style={{
					x: cursorX,
					y: cursorY,
					marginLeft: magneticX,
					marginTop: magneticY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<AnimatePresence mode="wait">
					{cursorLabel && variant !== "default" && (
						<motion.span
							key={cursorLabel}
							initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
							animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
							transition={{ duration: 0.15 }}
							className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black"
						>
							{cursorLabel}
						</motion.span>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Inner Dot */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
				animate={{
					scale: isPressed ? 1.5 : 1,
					opacity: isVisible ? 1 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 35,
					opacity: { duration: 0.2 },
				}}
				style={{
					x: cursorX,
					y: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="h-1 w-1 rounded-full bg-brand-black" />
			</motion.div>

			{/* Trailing Glow Effect */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9998 hidden md:block"
				animate={{
					scale: variant === "default" ? 0.8 : 1.25,
					opacity:
						isVisible ?
							variant === "default" ?
								0.06
							:	0.1
						:	0,
				}}
				transition={{
					type: "spring",
					stiffness: 120,
					damping: 25,
					mass: 1,
					opacity: { duration: 0.3 },
				}}
				style={{
					x: shadowX,
					y: shadowY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="h-12 w-12 rounded-full bg-brand-black/10 blur-lg" />
			</motion.div>

			{/* Outer Ring on Hover */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9998 hidden rounded-full border border-brand-black/15 md:block"
				animate={{
					width: variant !== "default" ? config.width + 12 : 0,
					height: variant !== "default" ? config.height + 12 : 0,
					opacity: variant !== "default" && isVisible ? 0.24 : 0,
					rotate: variant !== "default" ? 360 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
					rotate: { duration: 3, repeat: Infinity, ease: "linear" },
					opacity: { duration: 0.2 },
				}}
				style={{
					x: cursorX,
					y: cursorY,
					marginLeft: magneticX,
					marginTop: magneticY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			/>
		</>
	);
}
