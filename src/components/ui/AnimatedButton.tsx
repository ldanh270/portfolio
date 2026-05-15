"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant =
	| "slide-left"
	| "slide-right"
	| "slide-top"
	| "slide-bottom"
	| "circle-center"
	| "circle-corner"
	| "circle-left"
	| "circle-right"
	| "circle-top"
	| "circle-bottom"
	| "arc-bottom"
	| "border-sweep"
	| "glow-pulse"
	| "split-horizontal"
	| "split-vertical";

type AnimatedButtonProps = {
	children: ReactNode;
	variant?: ButtonVariant;
	className?: string;
	href?: string;
} & (
	| ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)
	| ({ href?: never } & HTMLMotionProps<"button">)
);

export function AnimatedButton({
	children,
	variant = "slide-right",
	className = "",
	href,
	...props
}: AnimatedButtonProps) {
	const baseClasses =
		"relative overflow-hidden px-4 py-2 font-display text-xs tracking-[0.2em] transition-colors rounded-[inherit]";

	const effectLayer = (
		<>
			{/* Slide Left */}
			{variant === "slide-left" && (
				<motion.span
					className="absolute inset-0 bg-brand-black"
					initial={{ x: "100%" }}
					variants={{
						hover: { x: 0 },
					}}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Slide Right */}
			{variant === "slide-right" && (
				<motion.span
					className="absolute inset-0 bg-brand-black"
					initial={{ x: "-100%" }}
					variants={{
						hover: { x: 0 },
					}}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Slide Top */}
			{variant === "slide-top" && (
				<motion.span
					className="absolute inset-0 bg-brand-black"
					initial={{ y: "100%" }}
					variants={{
						hover: { y: 0 },
					}}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Slide Bottom */}
			{variant === "slide-bottom" && (
				<motion.span
					className="absolute inset-0 bg-brand-black"
					initial={{ y: "-100%" }}
					variants={{
						hover: { y: 0 },
					}}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Center */}
			{variant === "circle-center" && (
				<motion.span
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "300%", height: "300%" },
					}}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Corner */}
			{variant === "circle-corner" && (
				<motion.span
					className="absolute -left-1/4 -top-1/4 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "200%", height: "200%" },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Left */}
			{variant === "circle-left" && (
				<motion.span
					className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "250%", height: "250%" },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Right */}
			{variant === "circle-right" && (
				<motion.span
					className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "250%", height: "250%" },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Top */}
			{variant === "circle-top" && (
				<motion.span
					className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "250%", height: "250%" },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Circle Bottom */}
			{variant === "circle-bottom" && (
				<motion.span
					className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "250%", height: "250%" },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				/>
			)}

			{/* Arc Bottom - Circle expands from bottom edge upward */}
			{variant === "arc-bottom" && (
				<motion.span
					className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-brand-black"
					initial={{ width: 0, height: 0 }}
					variants={{
						hover: { width: "280%", height: "280%" },
					}}
					transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
				/>
			)}

			{/* Border Sweep */}
			{variant === "border-sweep" && (
				<>
					<motion.span
						className="absolute left-0 top-0 h-full w-0.5 bg-brand-black"
						initial={{ height: 0 }}
						variants={{
							hover: { height: "100%" },
						}}
						transition={{ duration: 0.2, ease: "easeOut" }}
					/>
					<motion.span
						className="absolute left-0 top-0 h-0.5 w-full bg-brand-black"
						initial={{ width: 0 }}
						variants={{
							hover: { width: "100%" },
						}}
						transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
					/>
					<motion.span
						className="absolute bottom-0 right-0 h-full w-0.5 bg-brand-black"
						initial={{ height: 0 }}
						variants={{
							hover: { height: "100%" },
						}}
						transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }}
					/>
					<motion.span
						className="absolute bottom-0 right-0 h-0.5 w-full bg-brand-black"
						initial={{ width: 0 }}
						variants={{
							hover: { width: "100%" },
						}}
						transition={{ duration: 0.2, delay: 0.6, ease: "easeOut" }}
					/>
				</>
			)}

			{/* Glow Pulse */}
			{variant === "glow-pulse" && (
				<>
					<motion.span
						className="absolute inset-0 bg-brand-black/10"
						variants={{
							hover: { opacity: [0.1, 0.3, 0.1] },
						}}
						transition={{ duration: 1.5, repeat: Infinity }}
					/>
					<motion.span
						className="absolute inset-0 blur-xl bg-brand-black/20"
						variants={{
							hover: { scale: [1, 1.2, 1] },
						}}
						transition={{ duration: 1.5, repeat: Infinity }}
					/>
				</>
			)}

			{/* Split Horizontal */}
			{variant === "split-horizontal" && (
				<>
					<motion.span
						className="absolute left-0 top-0 h-full w-1/2 bg-brand-black"
						initial={{ x: "-100%" }}
						variants={{
							hover: { x: 0 },
						}}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					/>
					<motion.span
						className="absolute right-0 top-0 h-full w-1/2 bg-brand-black"
						initial={{ x: "100%" }}
						variants={{
							hover: { x: 0 },
						}}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					/>
				</>
			)}

			{/* Split Vertical */}
			{variant === "split-vertical" && (
				<>
					<motion.span
						className="absolute left-0 top-0 h-1/2 w-full bg-brand-black"
						initial={{ y: "-100%" }}
						variants={{
							hover: { y: 0 },
						}}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					/>
					<motion.span
						className="absolute bottom-0 left-0 h-1/2 w-full bg-brand-black"
						initial={{ y: "100%" }}
						variants={{
							hover: { y: 0 },
						}}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					/>
				</>
			)}

			{/* Content */}
			<span className="relative z-10 transition-colors duration-300 group-hover:text-brand-white">
				{children}
			</span>
		</>
	);

	if (href) {
		return (
			<Link
				className="group"
				{...(props as React.ComponentPropsWithoutRef<typeof Link>)}
				href={href}
			>
				<motion.span
					className={`${baseClasses} ${className} inline-block`}
					whileHover="hover"
					whileTap={{ scale: 0.98 }}
				>
					{effectLayer}
				</motion.span>
			</Link>
		);
	}

	return (
		<motion.button
			className={`group ${baseClasses} ${className}`}
			whileHover="hover"
			whileTap={{ scale: 0.98 }}
			{...(props as HTMLMotionProps<"button">)}
		>
			{effectLayer}
		</motion.button>
	);
}
