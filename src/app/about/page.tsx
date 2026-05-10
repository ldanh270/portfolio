import type { Metadata } from "next";
import Link from "next/link";
import { AboutAwards } from "@/components/sections/about/AboutAwards";
import { AboutCertificates } from "@/components/sections/about/AboutCertificates";
import { AboutExperience } from "@/components/sections/about/AboutExperience";
import { AboutGrid } from "@/components/sections/about/AboutGrid";
import { MarqueeText } from "@/components/ui/MarqueeText";

export const metadata: Metadata = {
  title: "About — Le Duc Anh",
  description: "About Le Duc Anh, software engineer and designer in Da Nang, Vietnam.",
};

type Skills = Record<string, string[]>;

type Education = {
  degree: string;
  university: string;
  period: string;
  gpa: string;
  highlights: string[];
};

const skills: Skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
  Backend: ["Node.js", "Go", "PostgreSQL", "Redis", "AWS", "Docker", "Kafka"],
  Mobile: ["React Native", "Expo", "Flutter"],
  "AI / LLM": ["LangChain", "RAG Pipeline", "OpenAI API", "Vector DB", "Prompt Engineering"],
  DevOps: ["Docker", "CI/CD", "Nginx", "Linux", "Git"],
  Tools: ["Figma", "Postman", "VS Code", "Notion"],
};

const education: Education = {
  degree: "Bachelor of Software Engineering",
  university: "[University Name]",
  period: "2021 — 2025",
  gpa: "3.X / 4.0",
  highlights: [
    "Algorithms & Data Structures",
    "Database Systems",
    "Software Architecture",
    "Artificial Intelligence",
    "Operating Systems",
  ],
};

const closingCta = {
  label: "Available for",
  title: "Freelance Projects.",
  titleSecondLine: "Full-time Roles.",
  description:
    "Whether you need a web app, a mobile product, or an AI-powered solution — I'm ready to build it. Let's talk about your project.",
  primaryHref: "/contact",
  primaryLabel: "Get in touch →",
  secondaryHref: "/cv.pdf",
  secondaryLabel: "Download CV ↓",
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

      <AboutExperience />

      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Education." size="lg" direction="left" />
      </div>
      <section className="grid border-b border-brand-border lg:grid-cols-2">
        <div className="border-b border-brand-border px-6 py-12 sm:px-12 lg:border-b-0 lg:border-r">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-gray">{education.period}</p>
          <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-tight tracking-tighter">
            {education.university}
          </h2>
          <p className="text-lg font-bold tracking-tight">{education.degree}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-brand-gray">GPA · {education.gpa}</p>
        </div>
        <div>
          {education.highlights.map((highlight, index) => (
            <div key={highlight} className="flex justify-between border-b border-brand-border px-6 py-4 text-sm font-medium sm:px-12">
              <span>{highlight}</span>
              <span className="font-mono text-xs text-brand-gray">{String(index + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </section>

      <AboutAwards />
      <AboutCertificates />

      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Available." size="lg" direction="right" />
      </div>
      <section className="grid border-b border-brand-border lg:grid-cols-2">
        <div className="border-b border-brand-border px-6 py-16 sm:px-12 lg:border-b-0 lg:border-r">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-gray">{closingCta.label}</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-tight tracking-tighter">
            {closingCta.title}
            <br />
            {closingCta.titleSecondLine}
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-4 px-6 py-16 sm:px-12">
          <p className="text-sm leading-8 text-[#444]">{closingCta.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={closingCta.primaryHref}
              className="inline-flex rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold tracking-wide text-[#fafaf8] transition hover:opacity-80"
            >
              {closingCta.primaryLabel}
            </Link>
            <a
              href={closingCta.secondaryHref}
              download
              className="inline-flex rounded-full border border-brand-border px-6 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(10,10,10,0.02)]"
            >
              {closingCta.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
