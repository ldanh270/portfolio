import type { Metadata } from "next";
import Link from "next/link";
import { ServiceGrid } from "@/components/sections/services/ServiceGrid";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Services — Le Duc Anh",
  description: "Strategy, UI/UX design, full-stack development, mobile development, consulting, and support services.",
};

export default function ServicesPage() {
  return (
    <main className="pt-16">
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Services." size="lg" />
      </div>
      <SectionLabel label="What I do" description="From idea to execution — smart digital solutions tailored to your goals." />
      <ServiceGrid />
      <section className="flex flex-col justify-between gap-6 border-t border-brand-border px-6 py-12 sm:px-12 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold tracking-tight">Built for clarity. Designed for results.</h2>
        <Link href="/contact" className="rounded-full bg-brand-black px-6 py-4 text-sm font-semibold tracking-wide text-brand-white transition hover:opacity-75">
          Get in touch ↗
        </Link>
      </section>
    </main>
  );
}
