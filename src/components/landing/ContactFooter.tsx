import { Mail } from "lucide-react";
import { RevealSection } from "@/components/landing/RevealSection";
import { Button } from "@/components/ui/Button";

export function ContactFooter() {
  return (
    <RevealSection id="contact" className="bg-neutral-950 px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-lime-300">Contact</p>
          <h2 className="max-w-4xl font-display text-6xl leading-none tracking-[-0.07em] sm:text-8xl lg:text-9xl">
            Make next launch impossible to ignore.
          </h2>
        </div>
        <div className="grid gap-8">
          <p className="text-xl leading-8 text-neutral-300">
            Send rough brief, moodboard, or voice note. Studio replies with fit, timeline, and sharp next move.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="mailto:studio@viktoroddy.com" className="bg-lime-300 text-neutral-950 shadow-[0_10px_0_#fff] hover:shadow-[0_14px_0_#fff]">
              <Mail className="mr-2 size-4" aria-hidden="true" /> Email studio
            </Button>
            <Button href="https://www.linkedin.com" variant="secondary" target="_blank" rel="noopener noreferrer" className="border-white bg-neutral-950 text-white shadow-[0_10px_0_#d9ff4a] hover:shadow-[0_14px_0_#d9ff4a]">
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
      <footer className="mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-neutral-400 sm:flex-row">
        <p>© 2026 Viktor Oddy Studio</p>
        <p>Brand systems · Websites · Campaign worlds</p>
      </footer>
    </RevealSection>
  );
}
