import { FadeIn } from "@/components/ui/FadeIn";

type Certificate = {
	name: string;
	issuer: string;
	platform: string;
	date: string;
	category: string;
	credentialUrl: string;
};

const certificates: Certificate[] = [
	{
		name: "[Certificate Name]",
		issuer: "Google",
		platform: "Coursera",
		date: "2024",
		category: "AI / ML",
		credentialUrl: "#",
	},
	{
		name: "[Certificate Name]",
		issuer: "Meta",
		platform: "Coursera",
		date: "2023",
		category: "Frontend",
		credentialUrl: "#",
	},
	{
		name: "[Certificate Name]",
		issuer: "Udemy",
		platform: "Udemy",
		date: "2023",
		category: "Backend",
		credentialUrl: "#",
	},
];

export function AboutCertificates() {
	return (
		<section className="grid border-b border-brand-border px-6 py-14 sm:px-12 lg:grid-cols-[0.36fr_1fr] lg:gap-16">
			<FadeIn className="mb-10 lg:mb-0" y={32}>
				<p className="mb-6 font-mono text-[10px] uppercase leading-5 tracking-[0.28em] text-brand-gray">
					Certificates
				</p>
				<h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em]">
					Learn
				</h2>
				<p className="mt-6 max-w-xs text-sm leading-8 text-[#444]">
					Verified learning across AI, frontend, backend, and production development tools.
				</p>
			</FadeIn>

			<div className="grid border-t border-brand-border sm:grid-cols-2 lg:grid-cols-3">
				{certificates.map((cert, index) => (
					<FadeIn key={`${cert.issuer}-${cert.name}`} delay={index * 0.08} y={20}>
						<a
							href={cert.credentialUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex min-h-[260px] cursor-pointer flex-col justify-between border-b border-r border-brand-border px-5 py-6 transition-colors duration-300 hover:bg-brand-black hover:text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-black"
						>
							<div>
								<div className="mb-8 flex items-center justify-between gap-4">
									<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
										{cert.date}
									</span>
								</div>
								<h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tighter">
									{cert.name}
								</h3>
								<p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-white/60">
									{cert.category}
								</p>
							</div>
							<div>
								<p className="text-sm font-semibold uppercase tracking-tight">
									{cert.issuer} via {cert.platform}
								</p>
								<span className="mt-5 inline-flex border-b border-current pb-1 font-mono text-[10px] uppercase tracking-widest">
									Verify
								</span>
							</div>
						</a>
					</FadeIn>
				))}
			</div>
		</section>
	);
}
