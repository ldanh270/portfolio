"use client";

import { useApertureTransition } from "@/hooks/useApertureTransition";
import { ApertureOverlay } from "@/components/ui/ApertureOverlay";
import { CenterLoader } from "@/components/ui/LoadingState";

export function PageLoader() {
	const { isActive, containerRef, contentRef, circleRef, ringRef } = useApertureTransition();

	if (!isActive) return null;

	return (
		<aside
			ref={containerRef}
			aria-label="Site transition"
			aria-live="polite"
			className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
		>
			<ApertureOverlay circleRef={circleRef} ringRef={ringRef} />
			<div
				ref={contentRef}
				className="relative z-10 flex items-center justify-center select-none"
			>
				<CenterLoader />
			</div>
		</aside>
	);
}

export { PageLoader as ApertureTransition };
