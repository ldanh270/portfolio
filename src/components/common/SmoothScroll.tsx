"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			return;
		}

		const lenis = new Lenis({
			lerp: 0.08,
			wheelMultiplier: 0.85,
			touchMultiplier: 1.1,
			smoothWheel: true,
		});
		let frame = 0;

		const raf = (time: number) => {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		};

		const onClick = (event: MouseEvent) => {
			const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
				"a[href^='#']",
			);

			if (!link) {
				return;
			}

			const target = document.querySelector<HTMLElement>(link.hash);

			if (!target) {
				return;
			}

			event.preventDefault();
			lenis.scrollTo(target, { offset: -64 });
		};

		lenisRef.current = lenis;
		frame = requestAnimationFrame(raf);
		document.addEventListener("click", onClick);

		return () => {
			document.removeEventListener("click", onClick);
			cancelAnimationFrame(frame);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		lenisRef.current?.scrollTo(0, { immediate: true });
	}, [pathname]);

	return <>{children}</>;
}
