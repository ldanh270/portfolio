import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/landing-data";

export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-b-[2rem] border-b border-neutral-200 bg-[#f6f3ea] px-5 py-6 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6" aria-label="Primary navigation">
        <a className="font-display text-2xl tracking-tight text-neutral-950" href="#top">
          Viktor Oddy
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium uppercase tracking-[0.2em] text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} className="transition hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <div id="top" className="mx-auto grid max-w-7xl gap-12 pb-12 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-20 lg:pt-28">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-600">
            Independent creative studio
          </p>
          <h1 className="max-w-5xl text-balance font-display text-[clamp(4rem,13vw,12rem)] leading-[0.8] tracking-[-0.08em] text-neutral-950">
            Build worlds people remember.
          </h1>
        </div>

        <div className="grid gap-8">
          <p className="max-w-xl text-xl leading-8 text-neutral-700">
            Viktor Oddy shapes identities, websites, campaigns, and launch systems for culture-first brands that need taste with teeth.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="#contact">Start project</Button>
            <Button href="#work" variant="secondary">
              View work <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
