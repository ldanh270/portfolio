"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			return;
		}

		const lenis = new Lenis({
			lerp: 0.09,
			wheelMultiplier: 0.95,
			touchMultiplier: 1.15,
			smoothWheel: true,
		});

		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		const ticker = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(ticker);
		gsap.ticker.lagSmoothing(500, 33);

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

		document.addEventListener("click", onClick);

		return () => {
			document.removeEventListener("click", onClick);
			gsap.ticker.remove(ticker);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		lenisRef.current?.scrollTo(0, { immediate: true });
		setTimeout(() => {
			ScrollTrigger.refresh();
		}, 100);
	}, [pathname]);

	return <>{children}</>;
}
