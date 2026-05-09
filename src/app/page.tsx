import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/home/Hero";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { HomeWorks } from "@/components/sections/home/HomeWorks";
import { MarqueeText } from "@/components/ui/MarqueeText";

export const metadata: Metadata = {
  title: "Home — Le Duc Anh",
  description: "Software engineer and designer in Da Nang building scalable products with precise editorial interfaces.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="overflow-hidden border-y border-brand-black bg-brand-black py-5 text-brand-white">
        <MarqueeText text="Software Engineering · Scalable Systems · UI/UX Design · Full-Stack Development · Mobile Applications" size="sm" speed={25} />
      </section>
      <HomeWorks />
      <HomeServices />
      <section>
        <div className="border-y border-brand-border py-8">
          <MarqueeText text="Get in touch." size="xl" speed={15} outlined />
        </div>
        <div className="grid gap-8 px-6 py-16 sm:px-12 lg:grid-cols-2">
          <p className="max-w-xl text-2xl font-bold leading-tight tracking-tight">
            Software engineer & designer passionate about creating exceptional digital products. Let&apos;s build something great.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link href="/contact" className="rounded-full bg-brand-black px-6 py-4 text-sm font-semibold tracking-wide text-brand-white transition hover:opacity-75">
              Send an email ↗
            </Link>
            <Link href="/work" className="rounded-full border border-brand-border px-6 py-4 text-sm font-semibold tracking-wide transition hover:bg-[rgba(10,10,10,0.02)]">
              View work →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
