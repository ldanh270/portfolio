import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact/ContactContent";
import PageMarqueeText from "@/components/common/PageMarqueeText";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { getPortfolioContent } from "@/lib/content/portfolio-content";
import type { ContactCopy } from "@/types/content";

export const metadata: Metadata = {
	title: "Contact — Le Duc Anh",
	description:
		"Contact Le Duc Anh for engineering, design, consulting, and product development work.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
	const content = await getPortfolioContent();
	const copy = content.copy.contact as ContactCopy;
	return (
		<main className="pt-16">
			{/* Marquee header */}
			<PageMarqueeText text={copy.marquee} />

			{/* Contact content and form */}
			<div className="grid min-h-[60vh] border-b border-brand-border lg:grid-cols-2">
				<ContactContent socialLinks={content.site.socialLinks} eyebrow={copy.eyebrow} headline={copy.headline} />
				<ContactForm />
			</div>
		</main>
	);
}
