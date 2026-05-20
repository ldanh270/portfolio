"use client";

import { useState } from "react";
import type { FAQ } from "@/data/services";
import FAQItem from "@/components/sections/services/faq/FAQItem";

type FAQSectionProps = {
	faqs: FAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
	const [openId, setOpenId] = useState<string | null>(null);

	const toggle = (id: string) => {
		setOpenId((prev) => (prev === id ? null : id));
	};

	return (
		<div className="border-t border-brand-border">
			{faqs.map((faq, index) => (
				<FAQItem
					key={faq.id}
					faq={faq}
					index={index}
					isOpen={openId === faq.id}
					onToggle={() => toggle(faq.id)}
				/>
			))}
		</div>
	);
}
