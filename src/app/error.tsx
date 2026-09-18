"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	return (
		<main className="flex min-h-[75vh] flex-col items-center justify-center border-b border-brand-border px-6 py-24 text-center">
			<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
				500 // System Error
			</p>
			<h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-tighter text-brand-black">
				Something Went Wrong
			</h1>
			<p className="mt-4 max-w-md text-sm leading-relaxed text-brand-gray">
				An unexpected error occurred. Please try again or return to the homepage.
			</p>
			<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
				<AnimatedButton
					variant="slide-right"
					className="px-6 py-3 font-semibold uppercase tracking-wider"
					onClick={() => reset()}
				>
					Try Again
				</AnimatedButton>
			</div>
		</main>
	);
}
