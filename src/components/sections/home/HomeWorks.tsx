import Link from "next/link";
import { WorkList } from "@/components/sections/work/WorkList";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function HomeWorks() {
	return (
		<section>
			<div className="border-y border-brand-border py-8">
				<MarqueeText
					text="Our work."
					size="lg"
          direction="right"
				/>
			</div>
			<SectionLabel
				label="Selected projects"
				description="Crafted ideas, real impact. A curated selection where design, engineering, and strategy meet."
			/>
			<WorkList limit={3} />
			<div className="flex justify-end px-6 py-10 sm:px-12">
				<Link
					href="/work"
					className="border-b border-brand-black pb-1 font-display text-sm font-bold uppercase tracking-wide"
				>
					View all projects →
				</Link>
			</div>
		</section>
	);
}
