import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact/ContactContent";

export const metadata: Metadata = {
	title: "Contact — Le Duc Anh",
	description:
		"Contact Le Duc Anh for engineering, design, consulting, and product development work.",
};

export default function ContactPage() {
	return <ContactContent />;
}
