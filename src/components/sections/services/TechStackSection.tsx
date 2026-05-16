"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import type { TechCategory } from "@/data/services";

type TechCategoryCardProps = {
  category: TechCategory;
  index: number;
};

function TechCategoryCard({ category, index }: TechCategoryCardProps) {
  return (
    <FadeIn
      delay={index * 0.1}
      y={20}
      className="border-b border-brand-border px-6 py-10 sm:px-12 md:odd:border-r"
    >
      <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
        {category.category}
      </p>
      <div className="flex flex-wrap gap-2">
        {category.tools.map((tool) => (
          <span
            key={tool}
            className="border border-brand-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:-translate-y-px hover:border-brand-black hover:shadow-[4px_4px_0_#0a0a0a]"
          >
            {tool}
          </span>
        ))}
      </div>
    </FadeIn>
  );
}

type TechStackSectionProps = {
  categories: TechCategory[];
};

export function TechStackSection({ categories }: TechStackSectionProps) {
  return (
    <div className="grid md:grid-cols-2">
      {categories.map((cat, index) => (
        <TechCategoryCard key={cat.id} category={cat} index={index} />
      ))}
    </div>
  );
}
