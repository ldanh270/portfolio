"use client";

import { cn } from "@/lib/utils";

type MarqueeTextProps = {
	text: string;
	speed?: number;
	direction?: "left" | "right";
	size?: "sm" | "md" | "lg" | "xl";
	outlined?: boolean;
	className?: string;
};

const sizeClasses = {
	sm: "font-mono text-sm uppercase tracking-widest",
	md: "font-display text-2xl font-bold",
	lg: "font-display text-[clamp(3rem,7vw,6rem)] font-extrabold tracking-tighter3 leading-none",
	xl: "font-display text-[clamp(5rem,12vw,10rem)] font-extrabold tracking-tighter2 leading-none",
};

export function MarqueeText({
	text,
	speed = 30,
	direction = "left",
	size = "md",
	outlined = false,
	className,
}: MarqueeTextProps) {
	const items = Array.from({ length: 8 }, (_, index) => index);

	return (
		<div className={cn("overflow-hidden whitespace-nowrap", className)}>
			<div
				className={cn(
					"flex w-max",
					direction === "right" ? "animate-marquee-reverse" : "animate-marquee",
				)}
				style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
			>
				{items.map((item) => (
					<span
						key={item}
						className={cn(
							"mr-8 shrink-0",
							sizeClasses[size],
							(outlined || item % 2 === 1) && "text-outline",
						)}
					>
						{text}
					</span>
				))}
			</div>
		</div>
	);
}
