import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

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

function AwardRow({ award, index }: { award: Award; index: number }) {
	return (
		<article className="group grid gap-5 border-b border-brand-border px-5 py-6 transition-colors duration-300 hover:bg-brand-black hover:text-brand-white lg:grid-cols-[64px_180px_1fr_170px]">
			<span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
				{String(index + 1).padStart(2, "0")}.
			</span>
			<p className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase leading-none tracking-tighter">
				{award.rank}
			</p>
			<div>
				<h3 className="text-sm font-bold uppercase tracking-tight">{award.name}</h3>
				{award.note && <p className="mt-2 text-sm leading-7 text-[#444] group-hover:text-brand-white/75">{award.note}</p>}
			</div>
			<p className="font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray group-hover:text-brand-white/60 lg:text-right">
				{award.year}
				<br />
				{award.organizer}
			</p>
		</article>
	);
}

export function AboutAwards() {
	const awards = [...competitiveAwards, ...otherAwards];

	return (
		<section className="grid border-b border-brand-border px-6 py-14 sm:px-12 lg:grid-cols-[0.36fr_1fr] lg:gap-16">
			<FadeIn className="mb-10 lg:mb-0" y={32}>
				<p className="mb-6 font-mono text-[10px] uppercase leading-5 tracking-[0.28em] text-brand-gray">
					Awards
				</p>
				<h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em]">
					Proof
				</h2>
				<p className="mt-6 max-w-xs text-sm leading-8 text-[#444]">
					Competitive programming, academic recognition, and fast-build product competitions.
				</p>
			</FadeIn>

			<StaggerList className="border-t border-brand-border">
				{awards.map((award, index) => (
					<StaggerItem key={`${award.year}-${award.rank}-${award.name}`}>
						<AwardRow award={award} index={index} />
					</StaggerItem>
				))}
			</StaggerList>
		</section>
	);
}
