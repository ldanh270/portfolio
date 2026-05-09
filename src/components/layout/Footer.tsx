import Link from "next/link";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="grid gap-6 border-t border-brand-border px-6 py-8 sm:px-12 lg:grid-cols-3 lg:items-center">
      <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
        {site.shortName}
      </Link>
      <div className="flex flex-wrap gap-4 lg:justify-center">
        {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
          <Link key={link.href} href={link.href} className="font-mono text-xs uppercase tracking-widest text-brand-gray transition hover:text-brand-black">
            {link.label}
          </Link>
        ))}
      </div>
      <p className="font-mono text-xs text-brand-gray lg:text-right">© 2025 Le Duc Anh — All Rights Reserved.</p>
    </footer>
  );
}
