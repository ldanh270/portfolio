import Image from "next/image";
import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";

const socialLinks = ["LinkedIn", "GitHub", "Email"] as const;

export function Hero() {
	return (
		<section className="relative min-h-screen overflow-hidden bg-[#d1d1cf] px-6 pb-8 pt-24 text-brand-black sm:px-12 lg:px-16">
			<div className="relative z-10 ml-auto max-w-7xl text-right">
				<h1 className="font-display text-[clamp(4.8rem,11vw,12rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em]">
					<RevealText className="block">Le Duc</RevealText>
					<RevealText
						className="block"
						delay={0.12}
					>
						Anh
					</RevealText>
				</h1>
				<div className="mt-4 flex items-center justify-end gap-5 font-mono text-[0.65rem] font-bold uppercase leading-none tracking-tight">
					<span>
						Aka:
						<br />
						ldanh270
					</span>
					<span className="text-5xl leading-none">✱</span>
				</div>
			</div>

			<div className="pointer-events-none select-none absolute inset-x-0 bottom-0 z-0 mx-auto h-[72vh] max-h-200 min-h-128 w-[min(62rem,86vw)]">
				<Image
					src="/avatar.png"
					fill
					alt="Le Duc Anh"
					className="object-contain object-bottom"
					priority
				/>
			</div>

			<div className="absolute left-6 top-[58%] z-10 max-w-xs sm:left-12 lg:left-16">
				<h2 className="mb-4 text-xl font-medium tracking-[-0.04em]">
					Software Engineer / Designer
				</h2>
				<p className="text-sm leading-7 text-[#555]">
					I build scalable, modern applications with a strong eye for interface detail, product
					clarity, and long-term maintainability.
				</p>
			</div>

			<div className="absolute bottom-8 right-6 z-10 text-right font-mono text-[0.65rem] uppercase leading-6 tracking-tight text-[#555] sm:right-12 lg:right-16">
				{socialLinks.map((link) => (
					<Link
						key={link}
						href={
							link === "Email" ? "mailto:leducanh@gmail.com"
							: link === "GitHub" ?
								"https://github.com/leducanh"
							:	"https://www.linkedin.com/in/leducanh"
						}
						className="block transition hover:text-brand-black"
					>
						{link}
					</Link>
				))}
				<p className="mt-3">Da Nang, Vietnam</p>
			</div>

			<div className="absolute bottom-8 left-6 z-10 flex items-center gap-4 sm:left-12 lg:left-16">
				<span className="h-px w-16 bg-brand-black" />
				<span className="font-mono text-xs uppercase tracking-widest text-[#555]">Scroll</span>
			</div>
		</section>
	);
}
