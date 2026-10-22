import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/ui/BrandMark";

type LoadingStateProps = {
	label?: string;
	className?: string;
};

export function LoadingState({ label = "Loading", className }: LoadingStateProps) {
	return (
		<div
			role="status"
			aria-live="polite"
			className={cn("flex items-center gap-3", className)}
		>
			<span
				aria-hidden="true"
				className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current/20 border-t-current"
			/>
			<span className="font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
		</div>
	);
}

export function CenterLoader({ className }: { className?: string }) {
	return (
		<div
			role="status"
			aria-label="Loading"
			className={cn("relative grid size-16 place-items-center select-none", className)}
		>
			<span
				aria-hidden="true"
				className="absolute inset-0 rounded-full border border-brand-black/15"
			/>
			<span
				aria-hidden="true"
				className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-black animate-spin"
			/>
			<BrandMark size={28} />
		</div>
	);
}

export function PageLoading() {
	return (
		<div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-brand-white text-brand-black">
			<CenterLoader />
		</div>
	);
}
