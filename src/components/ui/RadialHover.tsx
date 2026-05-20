"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RadialHoverProps = {
	children: ReactNode;
	className?: string;
	contentClassName?: string;
	ariaLabel?: string;
	shape?: "circle" | "horizontal" | "parallelHorizontal" | "parallelVertical";
	as?: "button" | "div";
	disableTapState?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

const fillClass = {
	circle: "absolute left-1/2 top-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-black",
	horizontal:
		"absolute left-1/2 top-1/2 h-[260%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] bg-brand-black",
};

const fillScale = {
	circle: 1.8,
	horizontal: 1.12,
};

function RadialFill({
	shape,
	shouldReduceMotion,
}: {
	shape: NonNullable<RadialHoverProps["shape"]>;
	shouldReduceMotion: boolean | null;
}) {
	if (shape === "parallelHorizontal" || shape === "parallelVertical") {
		const isVertical = shape === "parallelVertical";
		const variants = {
			rest: { [isVertical ? "scaleY" : "scaleX"]: 0, opacity: 0 },
			hover: { [isVertical ? "scaleY" : "scaleX"]: 1, opacity: 1 },
		};
		const firstClass =
			isVertical ?
				"absolute left-0 top-0 h-full w-1/2 origin-center bg-brand-black"
			:	"absolute left-0 top-0 h-1/2 w-full origin-center bg-brand-black";
		const secondClass =
			isVertical ?
				"absolute right-0 top-0 h-full w-1/2 origin-center bg-brand-black"
			:	"absolute bottom-0 left-0 h-1/2 w-full origin-center bg-brand-black";

		return (
			<>
				<motion.span
					aria-hidden="true"
					variants={variants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease }}
					className={firstClass}
				/>
				<motion.span
					aria-hidden="true"
					variants={variants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease }}
					className={secondClass}
				/>
			</>
		);
	}

	return (
		<motion.span
			aria-hidden="true"
			variants={{
				rest: { scale: 0, opacity: 0 },
				hover: { scale: shouldReduceMotion ? 1 : fillScale[shape], opacity: 1 },
			}}
			transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease }}
			className={fillClass[shape]}
		/>
	);
}

export function RadialHover({
	children,
	className,
	contentClassName,
	ariaLabel,
	shape = "circle",
	as = "button",
	disableTapState = false,
}: RadialHoverProps) {
	const shouldReduceMotion = useReducedMotion();
	const sharedProps = {
		initial: "rest",
		whileHover: "hover",
		whileFocus: "hover",
		...(disableTapState ? {} : { whileTap: "hover" as const }),
		className: `group relative overflow-hidden text-left ${className ?? ""}`,
	};
	const content = (
		<>
			<RadialFill
				shape={shape}
				shouldReduceMotion={shouldReduceMotion}
			/>
			<span
				className={`relative z-10 block transition-colors duration-300 group-hover:text-brand-white group-active:text-brand-white group-focus-visible:text-brand-white ${contentClassName ?? ""}`}
			>
				{children}
			</span>
		</>
	);

	if (as === "div") {
		return <motion.div {...sharedProps}>{content}</motion.div>;
	}

	return (
		<motion.button
			type="button"
			aria-label={ariaLabel}
			{...sharedProps}
		>
			{content}
		</motion.button>
	);
}
