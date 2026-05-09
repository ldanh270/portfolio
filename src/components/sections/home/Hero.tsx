import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";

export function Hero() {
	return (
		<section className="grid min-h-screen grid-rows-[auto_1fr_auto] px-6 pb-16 pt-28 sm:px-12">
			<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
				Software Engineer · Designer · Developer · Da Nang, Vietnam
			</p>

			<div className="grid items-end py-12 lg:grid-cols-[1fr_auto]">
				<h1 className="font-display text-[clamp(5rem,14vw,14rem)] font-extrabold leading-[0.9] tracking-tight">
					<RevealText className="block">Le</RevealText>
					<RevealText
						className="block"
						delay={0.15}
					>
						Duc
					</RevealText>
					<RevealText
						className="block"
						delay={0.3}
					>
						Anh
					</RevealText>
				</h1>

				<div className="flex max-w-125 flex-col justify-end gap-8 pb-4">
					<div className="relative h-175 w-125 overflow-hidden rounded-sm">
						<Image
							src="/avatar.png"
							fill
							alt="Le Duc Anh"
							className="object-cover"
							priority
						/>
					</div>
					<p className="text-sm leading-relaxed text-[#555]">
						Building scalable, modern applications with precision and creativity. Engineering that
						moves products forward.
					</p>
				</div>
			</div>

			<div className="flex flex-col justify-between gap-4 border-t border-brand-border pt-10 sm:flex-row sm:items-center">
				<div className="flex items-center gap-4">
					<span className="h-px w-16 bg-brand-black" />
					<span className="font-mono text-xs uppercase tracking-widest text-brand-gray">
						Scroll
					</span>
				</div>
				<div className="flex items-center gap-3 font-mono text-xs text-brand-gray">
					<span className="size-2 animate-pulse rounded-full bg-brand-black" />
					Available for new projects
				</div>
			</div>
		</section>
	);
}
