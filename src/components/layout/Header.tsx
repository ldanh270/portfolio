"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ArrowUpRight } from "lucide-react";

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-brand-border bg-brand-white/90 backdrop-blur-md">
			<nav
				className="flex h-full items-center justify-between px-6 sm:px-12"
				aria-label="Primary navigation"
			>
				<Link href="/">
					<Image
						src="/logo.svg"
						loading="eager"
						alt={SITE.name}
						width={60}
						height={60}
					/>
				</Link>

				<div className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="group relative font-display text-xs font-medium uppercase tracking-widest"
						>
							{link.label}
							<span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-black transition-all duration-300 group-hover:w-full" />
						</Link>
					))}
				</div>

				<AnimatedButton
					variant="slide-top"
					href="/contact"
					wrapperClassName="hidden rounded-full md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black/15 focus-visible:ring-offset-2"
					className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-border bg-transparent px-4 py-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-black transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-black group-active:translate-y-0"
				>
					<span className="inline-flex items-center gap-1.5">
						Get in touch
						<ArrowUpRight
							aria-hidden="true"
							className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							strokeWidth={1.8}
						/>
					</span>
				</AnimatedButton>

				<button
					className="font-mono text-xs uppercase tracking-widest md:hidden"
					type="button"
					onClick={() => setIsOpen((value) => !value)}
					aria-expanded={isOpen}
					aria-controls="mobile-menu"
				>
					Menu
				</button>
			</nav>

			<div
				id="mobile-menu"
				className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 border-l border-brand-border bg-brand-white p-8 transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex flex-col gap-6">
					{[...NAV_LINKS, { label: "Contact", href: "/contact" }].map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="font-display text-2xl font-bold tracking-tight"
							onClick={() => setIsOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
}
