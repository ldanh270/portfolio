import type { Metadata } from "next";
import { PageFade } from "@/components/ui/PageFade";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceGrid } from "@/components/sections/services/ServiceGrid";
import { ApproachList } from "@/components/sections/services/ApproachList";
import { TechStackSection } from "@/components/sections/services/TechStackSection";
import { FAQSection } from "@/components/sections/services/FAQSection";
import PageMarqueeText from "@/components/common/PageMarqueeText";
import { getPortfolioContent } from "@/lib/content/portfolio-content";
import type { ServicesCopy } from "@/types/content";

export const metadata: Metadata = {
	title: "Services — Le Duc Anh",
	description:
		"Strategy, design, full-stack development, mobile, consulting and ongoing support. Clean process. Reliable delivery.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
	const content = await getPortfolioContent();
	const copy = content.copy.services as ServicesCopy;
	return (
		<PageFade className="pt-16">
			{/* Marquee header */}
			<PageMarqueeText text={copy.marquee} />

			{/* Services Grid */}
			<SectionLabel label={copy.sections.services.label} description={copy.sections.services.description} />
			<ServiceGrid services={content.services.services} />

			{/* Tech Stack */}
			<SectionLabel label={copy.sections.techStack.label} description={copy.sections.techStack.description} />
			<TechStackSection categories={content.services.techStacks} />

			{/* Approach List */}
			<SectionLabel label={copy.sections.approach.label} description={copy.sections.approach.description} />
			<ApproachList steps={content.services.approachSteps} />

			{/* FAQ */}
			<SectionLabel label={copy.sections.faq.label} description={copy.sections.faq.description} />
			<FAQSection faqs={content.services.faqs} />
		</PageFade>
	);
}
