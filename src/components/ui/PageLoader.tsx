"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CenterLoader } from "@/components/ui/LoadingState";

export function PageLoader() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isExited, setIsExited] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<SVGCircleElement>(null);
	const ringRef = useRef<SVGCircleElement>(null);

	// Micro hold before opening
	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 550);

		return () => {
			clearTimeout(timer);
			document.body.style.overflow = prevOverflow;
		};
	}, []);

	// Inside-out aperture reveal effect when loaded
	useEffect(() => {
		if (!isLoaded) return;

		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReduced) {
			gsap.to(containerRef.current, {
				opacity: 0,
				duration: 0.25,
				ease: "power2.out",
				onComplete: () => {
					document.body.style.overflow = "";
					setIsExited(true);
				},
			});
			return;
		}

		// Calculate radius to clear all 4 corners from center (50%, 50%)
		const maxRadius = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) / 2) + 40;

		const tl = gsap.timeline({
			delay: 0.05,
			onComplete: () => {
				document.body.style.overflow = "";
				setIsExited(true);
			},
		});

		// 1. Center element scales slightly down and fades out
		tl.to(contentRef.current, {
			opacity: 0,
			scale: 0.9,
			duration: 0.22,
			ease: "power2.out",
		})
		// 2. Aperture opens from inside out (expanding circle cutout in SVG mask)
		.to(
			circleRef.current,
			{
				attr: { r: maxRadius },
				duration: 0.82,
				ease: "power3.inOut",
			},
			"-=0.08",
		)
		// 3. Hairline accent ring traces the expanding aperture edge
		.to(
			ringRef.current,
			{
				attr: { r: maxRadius },
				opacity: 0,
				duration: 0.82,
				ease: "power3.inOut",
			},
			"<",
		);
	}, [isLoaded]);

	if (isExited) return null;

	return (
		<aside
			ref={containerRef}
			aria-label="Site loader"
			aria-live="polite"
			className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
		>
			{/* SVG Mask Overlay for the inside-out opening effect */}
			<svg
				className="absolute inset-0 h-full w-full pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<mask id="loader-reveal-mask">
						<rect width="100%" height="100%" fill="#ffffff" />
						<circle
							ref={circleRef}
							cx="50%"
							cy="50%"
							r="0"
							fill="#000000"
						/>
					</mask>
				</defs>

				{/* Solid surface layer masked by the expanding circle */}
				<rect
					width="100%"
					height="100%"
					fill="var(--white)"
					mask="url(#loader-reveal-mask)"
				/>

				{/* Hairline expanding accent ring */}
				<circle
					ref={ringRef}
					cx="50%"
					cy="50%"
					r="0"
					fill="none"
					stroke="var(--black)"
					strokeWidth="1.2"
					opacity="0.22"
				/>
			</svg>

			{/* Centered Loading Element */}
			<div
				ref={contentRef}
				className="relative z-10 flex items-center justify-center select-none"
			>
				<CenterLoader />
			</div>
		</aside>
	);
}
