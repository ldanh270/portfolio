import Link from "next/link";
import { WorkList } from "@/components/sections/work/WorkList";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Project } from "@/data/projects";

type HomeWorksProps = {
	projects?: Project[];
	label?: string;
	description?: string;
	viewAllLabel?: string;
};

export function HomeWorks({ projects, label = "Selected projects", description = "Crafted ideas, real impact. A curated selection where design, engineering, and strategy meet.", viewAllLabel = "View all projects →" }: HomeWorksProps) {
	return (
		<section>
			<FadeIn y={18}>
				<div className="border-y border-brand-border py-8">
					<MarqueeText
						text="Our work."
						size="lg"
						direction="right"
					/>
				</div>
			</FadeIn>
			<FadeIn
				delay={0.1}
				y={18}
			>
						<SectionLabel label={label} description={description} />
			</FadeIn>
			<WorkList projects={projects} limit={3} />
			<FadeIn
				delay={0.25}
				y={16}
			>
				<div className="flex justify-end px-6 py-10 sm:px-12">
					<Link
						href="/work"
						className="border-b border-brand-black pb-1 font-display text-sm font-bold uppercase tracking-wide"
					>
						{viewAllLabel}
					</Link>
				</div>
			</FadeIn>
		</section>
	);
}
