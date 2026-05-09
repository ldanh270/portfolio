import type { Metadata } from "next";
import Link from "next/link";
import { AboutGrid } from "@/components/sections/about/AboutGrid";
import { MarqueeText } from "@/components/ui/MarqueeText";

export const metadata: Metadata = {
  title: "About — Le Duc Anh",
  description: "About Le Duc Anh, software engineer and designer in Da Nang, Vietnam.",
};

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
  Backend: ["Node.js", "Go", "PostgreSQL", "Redis", "AWS", "Docker", "Kafka"],
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="About me." size="lg" direction="right" />
      </div>

      <section className="grid border-b border-brand-border lg:grid-cols-2">
        <div className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
          <h1 className="mb-10 text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight tracking-tight">
            Software engineer focused on building products that scale — technically and visually.
          </h1>
          <Link href="/contact" className="inline-flex rounded-full border border-brand-border px-6 py-4 text-sm font-semibold tracking-wide transition hover:bg-[rgba(10,10,10,0.02)]">
            Let&apos;s work together →
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-8 px-6 py-16 text-sm leading-8 text-[#444] sm:px-12">
          <p>I&apos;m Le Duc Anh, a software engineer and designer based in Da Nang, Vietnam. I bridge the gap between robust backend engineering and thoughtful interface design.</p>
          <p>With experience across the full stack, I specialise in architecting performant applications that hold up under real-world conditions. Every project starts with understanding people — their goals, constraints, and workflows.</p>
        </div>
      </section>

      <AboutGrid />

      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Skills." size="lg" />
      </div>
      <section className="grid border-b border-brand-border lg:grid-cols-2">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="border-r border-brand-border">
            <h2 className="px-6 py-8 text-2xl font-bold tracking-tight sm:px-12">{group}</h2>
            {items.map((skill, index) => (
              <div key={skill} className="flex justify-between border-b border-brand-border px-6 py-4 text-sm font-medium sm:px-12">
                <span>{skill}</span>
                <span className="font-mono text-xs text-brand-gray">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
