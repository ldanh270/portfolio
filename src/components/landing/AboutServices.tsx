import { Sparkles } from "lucide-react";
import { RevealSection } from "@/components/landing/RevealSection";
import { services } from "@/lib/landing-data";

export function AboutServices() {
  return (
    <RevealSection id="studio" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">Studio</p>
          <h2 className="font-display text-5xl leading-none tracking-[-0.06em] text-neutral-950 sm:text-7xl">
            Strategy with a visual pulse.
          </h2>
        </div>
        <div className="grid gap-6">
          <p className="max-w-3xl text-2xl leading-10 text-neutral-700">
            The studio connects art direction, digital craft, and launch thinking. Every detail has job: make people stop, understand, and move.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_14px_0_#f2f2f2]">
                <Sparkles className="mb-8 size-7 text-lime-500" aria-hidden="true" />
                <h3 className="mb-3 text-xl font-semibold text-neutral-950">{service.title}</h3>
                <p className="leading-7 text-neutral-600">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
