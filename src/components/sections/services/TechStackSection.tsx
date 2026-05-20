"use client";

import TechCategoryCard from "@/components/sections/services/tech-stack/TechCatecoryCard";
import type { TechCategory } from "@/data/services";

type TechStackSectionProps = {
	categories: TechCategory[];
};

export function TechStackSection({ categories }: TechStackSectionProps) {
	return (
		<div className="grid md:grid-cols-2">
			{categories.map((cat, index) => (
				<TechCategoryCard
					key={cat.id}
					category={cat}
					index={index}
				/>
			))}
		</div>
	);
}
