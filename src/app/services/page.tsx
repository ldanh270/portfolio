import type { Metadata } from "next";
import { PageFade } from "@/components/ui/PageFade";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceGrid } from "@/components/sections/services/ServiceGrid";
import { ApproachList } from "@/components/sections/services/ApproachList";
import { TechStackSection } from "@/components/sections/services/TechStackSection";
import { FAQSection } from "@/components/sections/services/FAQSection";
import { FAQS, TECH_STACKS } from "@/data/services";
import PageMarqueeText from "@/components/common/PageMarqueeText";

export const metadata: Metadata = {
	title: "Services — Le Duc Anh",
	description:
		"Strategy, design, full-stack development, mobile, consulting and ongoing support. Clean process. Reliable delivery.",
};

export default function ServicesPage() {
	return (
		<PageFade className="pt-16">
			{/* Marquee header */}
			<PageMarqueeText text="Our work." />

			{/* Services Grid */}
			<SectionLabel
				label="What I offer"
				description="From idea to execution — smart digital solutions tailored to your goals."
			/>
			<ServiceGrid />

			{/* Tech Stack */}
			<SectionLabel
				label="Tools of the trade"
				description="Technologies I rely on to ship fast, maintainable, production-ready software."
			/>
			<TechStackSection categories={TECH_STACKS} />

			{/* Approach List */}
			<SectionLabel
				label="How I work"
				description="A structured process that turns ambiguous ideas into reliable, scalable products."
			/>
			<ApproachList />

			{/* FAQ */}
			<SectionLabel
				label="Common questions"
				description="Answers to what most clients ask before we get started."
			/>
			<FAQSection faqs={FAQS} />
		</PageFade>
	);
}
