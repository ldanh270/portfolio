import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Le Duc Anh",
  description: "Contact Le Duc Anh for engineering, design, consulting, and product development work.",
};

const contactLinks = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "/in/leducanh", href: "https://www.linkedin.com/in/leducanh" },
  { label: "GitHub", value: "github.com/leducanh", href: "https://github.com/leducanh" },
];

export default function ContactPage() {
  return (
    <main className="pt-16">
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Get in touch." size="xl" outlined />
      </div>
      <section className="grid min-h-[60vh] border-b border-brand-border lg:grid-cols-2">
        <div className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-gray">Contact</p>
          <h1 className="mb-10 text-4xl font-bold leading-tight tracking-tight">Let&apos;s build something great together.</h1>
          <div>
            {contactLinks.map((link) => (
              <Link key={link.label} href={link.href} className="group flex items-center justify-between border-t border-brand-border py-5 text-sm font-medium">
                <span>{link.label}: {link.value}</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
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
