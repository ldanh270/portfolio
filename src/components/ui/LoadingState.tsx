import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";

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

export function PageLoading() {
	return (
		<div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-brand-white px-6 py-10 text-brand-black">
			<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-brand-border" />
			<div className="absolute inset-x-6 top-8 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray sm:inset-x-10">
				<span>{SITE.shortName} / Portfolio</span>
				<span>01 / 01</span>
			</div>

			<div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
				<div className="relative grid size-36 place-items-center sm:size-48">
					<div className="absolute inset-0 rounded-full border border-brand-border" />
					<div className="absolute inset-3 rounded-full border border-dashed border-brand-black/25 animate-[spin_8s_linear_infinite]" />
					<div className="absolute inset-8 rounded-full border-2 border-brand-black/10 border-t-brand-black animate-spin sm:inset-12" />
					<span className="font-mono text-xs font-bold tracking-[0.24em]">{SITE.shortName}</span>
				</div>

				<h1 className="mt-10 text-[clamp(4rem,14vw,10rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.09em] text-outline">
					Loading
				</h1>
				<LoadingState label="Preparing interface" className="mt-10" />
				<div className="mt-6 h-px w-full max-w-xs overflow-hidden bg-brand-border">
					<div className="loading-progress h-full w-1/3 bg-brand-black animate-[loading-progress_1.8s_ease-in-out_infinite]" />
				</div>
			</div>

			<div className="absolute inset-x-6 bottom-8 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray sm:inset-x-10">
				<span>Interface booting</span>
				<span className="hidden sm:inline">{SITE.name}</span>
			</div>
		</div>
	);
}
