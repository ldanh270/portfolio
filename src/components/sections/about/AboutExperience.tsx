import { MarqueeText } from "@/components/ui/MarqueeText";

type Experience = {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    period: "2024 — Now",
    role: "Software Engineer Intern (Part-time)",
    company: "[Company Name]",
    type: "Internship",
    description:
      "Building and maintaining production features across the full stack. Working with React, Node.js, and PostgreSQL in a real-world engineering team.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    period: "2023 — Now",
    role: "Freelance Fullstack Developer",
    company: "Independent",
    type: "Freelance",
    description:
      "Delivering web apps, mobile apps, and AI-powered chatbot solutions for clients across various industries.",
    tags: ["Next.js", "React Native", "LangChain"],
  },
];

export function AboutExperience() {
  return (
    <>
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Experience." size="lg" direction="right" />
      </div>
      <section className="border-b border-brand-border">
        {experiences.map((exp) => (
          <div
            key={`${exp.period}-${exp.role}`}
            className="grid items-start gap-6 border-b border-brand-border px-6 py-8 transition-colors hover:bg-[rgba(10,10,10,0.02)] sm:px-12 lg:grid-cols-[200px_1fr_auto]"
          >
            <span className="pt-1 font-mono text-xs uppercase tracking-widest text-brand-gray">{exp.period}</span>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold tracking-tight">{exp.role}</p>
              <p className="text-sm text-[#444]">{exp.company}</p>
              <p className="mt-1 text-sm leading-7 text-[#444]">{exp.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="self-start rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
              {exp.type}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}
