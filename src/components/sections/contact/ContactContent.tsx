"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/site.ts";
import type { SiteContent } from "@/types/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactContent({ socialLinks = [...SOCIAL_LINKS], eyebrow = "Contact", headline = "Let's build something great together." }: { socialLinks?: SiteContent["socialLinks"]; eyebrow?: string; headline?: string }) {
	return (
		<section className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease, delay: 0.2 }}
				className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-gray"
			>
				{eyebrow}
			</motion.p>
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease, delay: 0.3 }}
				className="mb-10 text-4xl font-bold leading-tight tracking-tight"
			>
				{headline}
			</motion.h1>
			<div>
				{socialLinks.map((link, i) => (
					<motion.div
						key={link.label}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.1 }}
					>
						<Link
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
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
		</section>
	);
}
