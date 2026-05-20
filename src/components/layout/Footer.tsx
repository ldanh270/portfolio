"use client";

import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/data/site";
import Image from "next/image";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CTAContact } from "./footer/CTAContact.tsx";

const ease = [0.22, 1, 0.36, 1] as const;

export function Footer() {
	const footerRef = useRef<HTMLElement>(null);
	const isInView = useInView(footerRef, { once: true, margin: "-100px" });

	return (
		<footer
			ref={footerRef}
			className="relative overflow-hidden border-t border-brand-border bg-brand-white px-6 py-12 sm:px-12"
		>
			{/* Animated Background Grid */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.03]">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
						linear-gradient(var(--black) 1px, transparent 1px),
						linear-gradient(90deg, var(--black) 1px, transparent 1px)
					`,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl">
				{/* Top Section - Large CTA */}
				<CTAContact />

				{/* Middle Section - Grid Layout */}
				<div className="mb-16 grid gap-12 lg:grid-cols-12">
					{/* Logo & Brand */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease, delay: 0.4 }}
						className="lg:col-span-4"
					>
						<Link
							href="/"
							className="group inline-block"
						>
							<motion.div
								whileHover={{ scale: 1.05, rotate: 5 }}
								transition={{ duration: 0.3, ease }}
								className="mb-4"
							>
								<Image
									src="/logo.svg"
									loading="eager"
									alt={SITE.name}
									width={56}
									height={56}
								/>
							</motion.div>
						</Link>
						<div className="font-mono text-sm uppercase tracking-[0.2em] text-brand-black">
							<HighlightedText
								delay={0.5}
								duration={1}
							>
								Le Duc Anh
							</HighlightedText>
						</div>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-gray">
							Building scalable products with precise editorial interfaces.
						</p>
					</motion.div>

					{/* Navigation Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease, delay: 0.5 }}
						className="lg:col-span-3"
					>
						<h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gray">
							Navigation
						</h3>
						<div className="flex flex-col gap-3">
							{[...NAV_LINKS, { label: "Contact", href: "/contact" }].map(
								(link, i) => (
									<Link
										key={link.href}
										href={link.href}
										className="group relative inline-block w-fit font-mono text-xs uppercase tracking-[0.2em] text-brand-black transition"
									>
										<motion.span
											initial={{ opacity: 0, x: -10 }}
											animate={isInView ? { opacity: 1, x: 0 } : {}}
											transition={{
												duration: 0.4,
												ease,
												delay: 0.5 + i * 0.05,
											}}
											className="relative z-10"
										>
											{link.label}
										</motion.span>
										<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-black transition-all duration-300 group-hover:w-full" />
									</Link>
								),
							)}
						</div>
					</motion.div>

					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease, delay: 0.6 }}
						className="lg:col-span-3"
					>
						<h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gray">
							Connect
						</h3>
						<div className="flex flex-col gap-3">
							{SOCIAL_LINKS.map((link, i) => (
								<Link
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group relative inline-block w-fit font-mono text-xs uppercase tracking-[0.2em] text-brand-black transition"
								>
									<motion.span
										initial={{ opacity: 0, x: -10 }}
										animate={isInView ? { opacity: 1, x: 0 } : {}}
										transition={{ duration: 0.4, ease, delay: 0.6 + i * 0.05 }}
										className="relative z-10 flex items-center gap-2"
									>
										{link.label}
										<span className="text-[8px] opacity-0 transition-opacity group-hover:opacity-100">
											↗
										</span>
									</motion.span>
									<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-black transition-all duration-300 group-hover:w-full" />
								</Link>
							))}
						</div>
					</motion.div>

					{/* Location & Availability */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease, delay: 0.7 }}
						className="lg:col-span-2"
					>
						<h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gray">
							Location
						</h3>
						<div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-black">
							<p>Da Nang</p>
							<p>Vietnam</p>
							<div className="mt-4 flex items-center gap-2">
								<motion.span
									className="h-2 w-2 rounded-full bg-green-500"
									animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								/>
								<span className="text-[10px] text-brand-gray">Available</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Section - Copyright & Year */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.8, ease, delay: 0.8 }}
					className="flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 sm:flex-row"
				>
					<div className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						<p>© {new Date().getFullYear()} Le Duc Anh — All Rights Reserved</p>
					</div>
					<div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
						<motion.span
							animate={{ rotate: 360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
							className="inline-block"
						>
							✱
						</motion.span>
						<span>Crafted with Precision</span>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
