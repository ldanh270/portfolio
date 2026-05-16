"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import type { FAQ } from "@/data/services";

type FAQItemProps = {
	faq: FAQ;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
};

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
	return (
		<FadeIn
			delay={index * 0.08}
			y={16}
		>
			<div className="border-b border-brand-border">
				<button
					type="button"
					onClick={onToggle}
					className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-48"
					aria-expanded={isOpen}
				>
					<h3 className="font-bold uppercase tracking-tight">{faq.question}</h3>
					<motion.span
						animate={{ rotate: isOpen ? 45 : 0 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="shrink-0 text-2xl font-light leading-none"
						aria-hidden="true"
					>
						+
					</motion.span>
				</button>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							key="answer"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							style={{ overflow: "hidden" }}
						>
							<p className="px-6 pb-8 text-sm leading-8 text-[#555] sm:px-48">{faq.answer}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</FadeIn>
	);
}

type FAQSectionProps = {
	faqs: FAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
	const [openId, setOpenId] = useState<string | null>(null);

	function toggle(id: string) {
		setOpenId((prev) => (prev === id ? null : id));
	}

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
