"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/data/site";
import Image from "next/image";

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
						alt={site.name}
						width={60}
						height={60}
					/>
				</Link>

				<div className="hidden items-center gap-8 md:flex">
					{navLinks.map((link) => (
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

				<Link
					href="/contact"
					className="hidden rounded-full bg-brand-black px-5 py-2 text-xs font-semibold tracking-wide text-brand-white transition hover:opacity-70 md:inline-flex"
				>
					Get in touch ↗
				</Link>

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
					{[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
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
