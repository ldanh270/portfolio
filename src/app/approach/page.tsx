import type { Metadata } from "next";
import { ApproachList } from "@/components/sections/approach/ApproachList";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Approach — Le Duc Anh",
  description: "A structured product process from discovery and design through build, launch, monitoring, and scale.",
};

export default function ApproachPage() {
  return (
    <main className="pt-16">
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Approach." size="lg" direction="right" />
      </div>
      <SectionLabel label="How I work" description="A structured process that turns ambiguous ideas into reliable, scalable products." />
      <ApproachList />
    </main>
  );
}
