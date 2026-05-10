import { MarqueeText } from "@/components/ui/MarqueeText";

type Award = {
  rank: string;
  name: string;
  organizer: string;
  year: string;
  note: string;
};

const competitiveAwards: Award[] = [
  {
    rank: "1st Place",
    name: "[Competition Name]",
    organizer: "[Organizer / University]",
    year: "2024",
    note: "Algorithm & Data Structures category",
  },
  {
    rank: "Top 10",
    name: "[Competition Name]",
    organizer: "[Organizer]",
    year: "2023",
    note: "",
  },
];

const otherAwards: Award[] = [
  {
    rank: "Winner",
    name: "[Hackathon Name]",
    organizer: "[Organizer]",
    year: "2024",
    note: "Built an AI-powered solution in 24h",
  },
  {
    rank: "Scholarship",
    name: "Academic Excellence Scholarship",
    organizer: "[University]",
    year: "2022–2024",
    note: "",
  },
];

function AwardRow({ award }: { award: Award }) {
  return (
    <div className="grid items-center gap-4 border-b border-brand-border px-6 py-6 transition-colors hover:bg-[rgba(10,10,10,0.02)] sm:px-12 lg:grid-cols-[80px_160px_1fr_auto]">
      <span className="font-mono text-xs uppercase tracking-widest text-brand-gray">{award.year}</span>
      <p className="text-xl font-extrabold tracking-tighter">{award.rank}</p>
      <div>
        <p className="text-sm font-semibold">{award.name}</p>
        {award.note && <p className="mt-1 font-mono text-xs text-brand-gray">{award.note}</p>}
      </div>
      <span className="text-right font-mono text-[10px] uppercase tracking-widest text-brand-gray">{award.organizer}</span>
    </div>
  );
}

export function AboutAwards() {
  return (
    <>
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Awards." size="lg" direction="right" />
      </div>
      <section className="border-b border-brand-border">
        <div className="border-b border-brand-border px-6 py-3 sm:px-12">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">Competitive Programming</span>
        </div>
        {competitiveAwards.map((award) => (
          <AwardRow key={`${award.year}-${award.rank}-${award.name}`} award={award} />
        ))}
        <div className="border-b border-brand-border px-6 py-3 sm:px-12">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">Academic & Hackathon</span>
        </div>
        {otherAwards.map((award) => (
          <AwardRow key={`${award.year}-${award.rank}-${award.name}`} award={award} />
        ))}
      </section>
    </>
  );
}
