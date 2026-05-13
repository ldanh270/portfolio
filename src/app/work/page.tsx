import type { Metadata } from "next";
import { WorkList } from "@/components/sections/work/WorkList";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Work — Le Duc Anh",
  description: "Selected engineering and design projects by Le Duc Anh.",
};

export default function WorkPage() {
  return (
    <main className="pt-16">
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Our work." size="lg" />
      </div>
      <SectionLabel label="All projects" description="A curated selection of work where engineering, design, and strategy deliver real-world impact." />
      <WorkList />
    </main>
  );
}
