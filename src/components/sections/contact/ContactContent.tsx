"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { site } from "@/data/site";

const contactLinks = [
	{ label: "Email", value: site.email, href: `mailto:${site.email}` },
	{ label: "LinkedIn", value: "/in/leducanh", href: "https://www.linkedin.com/in/leducanh" },
	{ label: "GitHub", value: "github.com/leducanh", href: "https://github.com/leducanh" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactContent() {
	return (
		<main className="pt-16">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, ease }}
				className="border-y border-brand-border py-8"
			>
				<MarqueeText
					text="Get in touch."
					size="xl"
					outlined
				/>
			</motion.div>
			<section className="grid min-h-[60vh] border-b border-brand-border lg:grid-cols-2">
				<div className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease, delay: 0.2 }}
						className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-gray"
					>
						Contact
					</motion.p>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease, delay: 0.3 }}
						className="mb-10 text-4xl font-bold leading-tight tracking-tight"
					>
						Let&apos;s build something great together.
					</motion.h1>
					<div>
						{contactLinks.map((link, i) => (
							<motion.div
								key={link.label}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.1 }}
							>
								<Link
									href={link.href}
									className="group flex items-center justify-between border-t border-brand-border py-5 text-sm font-medium"
								>
									<span>
										{link.label}: {link.value}
									</span>
									<span className="transition group-hover:translate-x-1">→</span>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
				<div className="px-6 py-16 sm:px-12">
					<ContactForm />
				</div>
			</section>
		</main>
	);
}
