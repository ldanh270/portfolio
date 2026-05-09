"use client";

import { useEffect, useState } from "react";

const interactiveSelector = "a, button, .work-item, input, textarea, select";

export function CustomCursor() {
	const [position, setPosition] = useState({ x: -100, y: -100 });
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
			setIsHovering(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
		};

		window.addEventListener("mousemove", onMouseMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, []);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed left-0 top-0 z-9999 hidden size-24 place-items-center rounded-full bg-black text-brand-white mix-blend-difference transition-transform duration-200 ease-out md:grid"
			style={{
				transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 0.72 : 1})`,
			}}
		>
			<svg
				viewBox="0 0 128 128"
				className="absolute inset-0 size-full animate-spin [animation-duration:16s]"
			>
				<defs>
					<path
						id="cursor-text-path"
						d="M 64 64 m -50 0 a 50 50 0 1 1 100 0 a 50 50 0 1 1 -100 0"
					/>
				</defs>
				<text
					className="font-mono text-[10px] uppercase tracking-[0.36em]"
					fill="currentColor"
				>
					<textPath
						href="#cursor-text-path"
						startOffset="0%"
					>
						MODERN . SCALABLE . INNOVATIVE .
					</textPath>
				</text>
			</svg>

			<div className="grid size-12 animate-spin place-items-center rounded-full [animation-duration:8s] bg-white text-brand-black">
				<svg
					viewBox="0 0 48 48"
					className="size-10"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<circle
						cx="24"
						cy="24"
						r="17"
					/>
					<path d="M7 24h34" />
					<path d="M24 7c5 5 7.5 10.7 7.5 17S29 36 24 41" />
					<path d="M24 7c-5 5-7.5 10.7-7.5 17S19 36 24 41" />
					<path d="M11.5 14.5c3.2 2 7.5 3.2 12.5 3.2s9.3-1.2 12.5-3.2" />
					<path d="M11.5 33.5c3.2-2 7.5-3.2 12.5-3.2s9.3 1.2 12.5 3.2" />
				</svg>
			</div>
		</div>
	);
}
