import { MarqueeText } from "@/components/ui/MarqueeText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function GetInTouch() {
	return (
		<section>
			<div className="border-y border-brand-border py-8">
				<MarqueeText
					text="Get in touch."
					size="xl"
					speed={15}
					outlined
					direction="right"
				/>
			</div>
			<div className="grid gap-8 px-6 py-16 sm:px-12 lg:grid-cols-2">
				<p className="max-w-xl text-2xl font-bold leading-tight tracking-tight">
					Software engineer & designer passionate about creating exceptional digital products.
					Let&apos;s build something great.
				</p>
				<div className="flex flex-row gap-4 lg:justify-end">
					<AnimatedButton
						variant="arc-bottom"
						href="/contact"
						className="h-fit rounded-full border border-brand-black bg-brand-black text-brand-white"
					>
						Send an email ↗
					</AnimatedButton>
					<AnimatedButton
						variant="arc-bottom"
						href="/work"
						className="h-fit rounded-full border border-brand-border"
					>
						View work →
					</AnimatedButton>
				</div>
			</div>
		</section>
	);
}
