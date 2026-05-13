import { MarqueeText } from "@/components/ui/MarqueeText";
import Link from "next/link";

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
					<Link
						href="/contact"
						className="rounded-full h-fit bg-brand-black px-6 py-4 text-sm font-semibold tracking-wide text-brand-white transition hover:opacity-75"
					>
						Send an email ↗
					</Link>
					<Link
						href="/work"
						className="rounded-full h-fit border border-brand-border px-6 py-4 text-sm font-semibold tracking-wide transition hover:bg-[rgba(10,10,10,0.02)]"
					>
						View work →
					</Link>
				</div>
			</div>
		</section>
	);
}
