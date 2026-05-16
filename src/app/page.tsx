import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { HomeWorks } from "@/components/sections/home/HomeWorks";
import { MarqueeText } from "@/components/ui/MarqueeText";
import { tags } from "@/data/site";

export const metadata: Metadata = {
	title: "Home — Le Duc Anh",
	description:
		"Software engineer and designer in Da Nang building scalable products with precise editorial interfaces.",
};

export default function HomePage() {
	return (
		<main>
			<Hero />
			<section className="overflow-hidden border-y border-brand-black bg-brand-black py-5 text-brand-white">
				<MarqueeText
					text={tags.join(" · ")}
					size="sm"
					speed={25}
					direction="left"
				/>
			</section>
			<HomeWorks />
			<HomeServices />
		</main>
	);
}
