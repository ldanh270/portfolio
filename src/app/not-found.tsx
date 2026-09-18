import Link from "next/link";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function NotFound() {
	return (
		<main className="flex min-h-[75vh] flex-col items-center justify-center border-b border-brand-border px-6 py-24 text-center">
			<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
				404 // Error
			</p>
			<h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-tighter text-brand-black">
				Page Not Found
			</h1>
			<p className="mt-4 max-w-md text-sm leading-relaxed text-brand-gray">
				The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
			</p>
			<div className="mt-8">
				<Link href="/">
					<AnimatedButton variant="slide-right" className="px-6 py-3 font-semibold uppercase tracking-wider">
						Return Home
					</AnimatedButton>
				</Link>
			</div>
		</main>
	);
}
