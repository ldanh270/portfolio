import type { Metadata } from "next";
import { WorkList } from "@/components/sections/work/WorkList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import PageMarqueeText from "@/components/common/PageMarqueeText";

export const metadata: Metadata = {
	title: "Work — Le Duc Anh",
	description: "Selected engineering and design projects by Le Duc Anh.",
};

export default function WorkPage() {
	return (
		<main className="pt-16">
			<PageMarqueeText text="Our work." />
			<SectionLabel
				label="All projects"
				description="A curated selection of work where engineering, design, and strategy deliver real-world impact."
			/>
			<WorkList />
		</main>
	);
}
