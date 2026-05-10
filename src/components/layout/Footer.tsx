import Link from "next/link";
import { navLinks, site } from "@/data/site";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="grid gap-6 border-t border-brand-border px-6 py-8 sm:px-12 lg:grid-cols-[auto_1fr_auto] lg:items-center">
			{/* Logo */}
			<Link href="/">
				<Image
					src="/logo.svg"
					alt={site.name}
					width={60}
					height={60}
				/>
			</Link>

			{/* Navigation Links */}
			<div className="flex flex-wrap gap-4 lg:justify-center">
				{[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className="font-mono text-xs uppercase tracking-widest text-brand-gray transition hover:text-brand-black"
					>
						{link.label}
					</Link>
				))}
			</div>

			{/* Copyright */}
			<p className="font-mono text-xs text-brand-gray lg:text-right">
				© 2026 Le Duc Anh — All Rights Reserved.
			</p>
		</footer>
	);
}
