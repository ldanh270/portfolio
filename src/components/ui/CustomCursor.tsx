"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type CursorVariant = "default" | "link" | "button" | "image" | "drag";

interface Particle {
	id: number;
	x: number;
	y: number;
	opacity: number;
}

const interactiveSelector = "a, button, [data-cursor], [role='button'], img";

export function CustomCursor() {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const smoothX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
	const smoothY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });

	const [cursorLabel, setCursorLabel] = useState("");
	const [variant, setVariant] = useState<CursorVariant>("default");
	const [isVisible, setIsVisible] = useState(true);
	const [particles, setParticles] = useState<Particle[]>([]);
	const [isPressed, setIsPressed] = useState(false);
	const particleIdRef = useRef(0);

	// Magnetic effect
	const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		let animationFrame: number;

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
					setMagneticOffset({
						x: -distanceX * pullStrength,
						y: -distanceY * pullStrength,
					});
				} else {
					setMagneticOffset({ x: 0, y: 0 });
				}

				const cursorAttr = interactive.getAttribute("data-cursor");

				if (cursorAttr) {
					setCursorLabel(cursorAttr);
					setVariant("link");
				} else if (interactive.tagName === "BUTTON" || interactive.getAttribute("role") === "button") {
					setCursorLabel("Click");
					setVariant("button");
				} else if (interactive.tagName === "A") {
					setCursorLabel("View");
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
				setMagneticOffset({ x: 0, y: 0 });
			}

			// Particle trail
			if (Math.random() > 0.7) {
				const newParticle: Particle = {
					id: particleIdRef.current++,
					x: event.clientX,
					y: event.clientY,
					opacity: 1,
				};
				setParticles((prev) => [...prev.slice(-8), newParticle]);
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

		// Fade out particles
		const fadeParticles = () => {
			setParticles((prev) =>
				prev
					.map((p) => ({ ...p, opacity: p.opacity - 0.05 }))
					.filter((p) => p.opacity > 0)
			);
			animationFrame = requestAnimationFrame(fadeParticles);
		};
		animationFrame = requestAnimationFrame(fadeParticles);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mouseenter", onMouseEnter);
			document.removeEventListener("mouseleave", onMouseLeave);
			cancelAnimationFrame(animationFrame);
		};
	}, [cursorX, cursorY]);

	const cursorConfig = {
		default: {
			width: 20,
			height: 20,
			borderRadius: "50%",
			backgroundColor: "#0a0a0a",
			border: "none",
			scale: 1,
		},
		link: {
			width: 80,
			height: 80,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.05)",
			border: "2px solid #0a0a0a",
			scale: 1,
		},
		button: {
			width: 100,
			height: 100,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.05)",
			border: "2px solid #0a0a0a",
			scale: 1,
		},
		image: {
			width: 120,
			height: 120,
			borderRadius: "50%",
			backgroundColor: "rgba(10, 10, 10, 0.08)",
			border: "2px dashed #0a0a0a",
			scale: 1,
		},
		drag: {
			width: 60,
			height: 60,
			borderRadius: "50%",
			backgroundColor: "#0a0a0a",
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
					initial={{ scale: 1, opacity: particle.opacity }}
					animate={{ scale: 0, opacity: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					style={{
						x: particle.x,
						y: particle.y,
						translateX: "-50%",
						translateY: "-50%",
					}}
				>
					<div className="h-2 w-2 rounded-full bg-brand-black/30" />
				</motion.div>
			))}

			{/* Ripple Effect on Click */}
			<AnimatePresence>
				{isPressed && (
					<motion.div
						key="ripple"
						className="pointer-events-none fixed left-0 top-0 z-9996 hidden rounded-full border-2 border-brand-black/20 md:block"
						initial={{ width: 0, height: 0, opacity: 1 }}
						animate={{ width: 200, height: 200, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						style={{
							x: smoothX,
							y: smoothY,
							translateX: "-50%",
							translateY: "-50%",
						}}
					/>
				)}
			</AnimatePresence>

			{/* Main Cursor with Magnetic Effect */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9999 hidden items-center justify-center mix-blend-difference md:flex"
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
					x: smoothX,
					y: smoothY,
					translateX: `calc(-50% + ${magneticOffset.x}px)`,
					translateY: `calc(-50% + ${magneticOffset.y}px)`,
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
					scale: variant === "default" ? (isPressed ? 1.5 : 1) : 0,
					opacity: isVisible ? 1 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 35,
					opacity: { duration: 0.2 },
				}}
				style={{
					x: smoothX,
					y: smoothY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="h-1.5 w-1.5 rounded-full bg-brand-black" />
			</motion.div>

			{/* Trailing Glow Effect */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9998 hidden md:block"
				animate={{
					scale: variant === "default" ? 1 : 1.8,
					opacity: isVisible ? (variant === "default" ? 0.1 : 0.15) : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 120,
					damping: 25,
					mass: 1,
					opacity: { duration: 0.3 },
				}}
				style={{
					x: smoothX,
					y: smoothY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			>
				<div className="h-16 w-16 rounded-full bg-brand-black/10 blur-xl" />
			</motion.div>

			{/* Outer Ring on Hover */}
			<motion.div
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-9998 hidden rounded-full border border-brand-black/20 md:block"
				animate={{
					width: variant !== "default" ? config.width + 20 : 0,
					height: variant !== "default" ? config.height + 20 : 0,
					opacity: variant !== "default" && isVisible ? 0.4 : 0,
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
					x: smoothX,
					y: smoothY,
					translateX: `calc(-50% + ${magneticOffset.x}px)`,
					translateY: `calc(-50% + ${magneticOffset.y}px)`,
				}}
			/>
		</>
	);
}
