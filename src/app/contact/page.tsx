import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact/ContactContent";
import PageMarqueeText from "@/components/common/PageMarqueeText";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
	title: "Contact — Le Duc Anh",
	description:
		"Contact Le Duc Anh for engineering, design, consulting, and product development work.",
};

export default function ContactPage() {
	return (
		<main className="pt-16">
			{/* Marquee header */}
			<PageMarqueeText text="Get in touch." />

			{/* Contact content and form */}
			<div className="grid min-h-[60vh] border-b border-brand-border lg:grid-cols-2">
				<ContactContent />
				<ContactForm />
			</div>
		</main>
	);
}
