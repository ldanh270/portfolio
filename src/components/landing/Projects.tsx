import { ArrowUpRight } from "lucide-react";
import { ParallaxPanel } from "@/components/landing/ParallaxPanel";
import { RevealSection } from "@/components/landing/RevealSection";
import { projects } from "@/lib/landing-data";

export function Projects() {
  return (
    <RevealSection id="work" className="bg-[#f6f3ea] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">Selected work</p>
            <h2 className="max-w-3xl font-display text-5xl leading-none tracking-[-0.06em] text-neutral-950 sm:text-7xl">
              Proof that feeling can be systemized.
            </h2>
          </div>
          <a className="inline-flex items-center text-sm font-bold uppercase tracking-[0.24em] text-neutral-950 underline decoration-lime-400 decoration-4 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400" href="#contact">
            Book studio <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="grid gap-5 rounded-[2.5rem] bg-white p-4 shadow-[0_18px_0_#111]">
              <ParallaxPanel gradient={project.gradient} label={project.category} />
              <div className="px-2 pb-4">
                <div className="mb-4 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mb-3 font-display text-4xl tracking-[-0.06em] text-neutral-950">{project.title}</h3>
                <p className="leading-7 text-neutral-600">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
