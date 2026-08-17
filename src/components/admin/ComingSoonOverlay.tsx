import type { ReactNode } from "react";
import { Clock3 } from "lucide-react";

export function ComingSoonOverlay({ children }: { children: ReactNode }) {
	return (
		<div className="relative min-h-[28rem] overflow-hidden">
			<div aria-hidden="true" className="pointer-events-none select-none opacity-45 blur-[1px]">
				{children}
			</div>
			<div className="absolute inset-0 z-10 grid place-items-center bg-black/60 p-6 backdrop-blur-[2px]">
				<div className="admin-border-strong admin-surface w-full max-w-sm rounded-sm border px-6 py-7 text-center shadow-2xl">
					<div className="mx-auto mb-4 grid size-11 place-items-center rounded-full border admin-border-strong text-white">
						<Clock3 size={19} strokeWidth={1.7} aria-hidden="true" />
					</div>
					<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">Coming soon</p>
					<p className="admin-text-muted mt-3 text-sm leading-6">Blog CMS is being prepared. The current editor stays here so it can be enabled without rebuilding the page later.</p>
				</div>
			</div>
		</div>
	);
}
