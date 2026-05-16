"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import type { Service } from "@/data/services";

type ServiceTagsProps = {
  tags: string[];
};

export function ServiceTags({ tags }: ServiceTagsProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="border border-brand-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-gray transition-colors duration-200 hover:border-brand-black hover:text-brand-black"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <FadeIn
      delay={index * 0.1}
      y={20}
      className="group relative border-b border-brand-border transition-all duration-300 hover:-translate-x-px hover:-translate-y-px hover:shadow-[8px_8px_0_#0a0a0a] md:odd:border-r"
    >
      <article className="h-full cursor-default overflow-hidden px-6 py-12 sm:px-12">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
          {service.number}
        </p>
        <h3 className="mb-3 text-2xl font-extrabold uppercase leading-tight tracking-tighter transition-colors duration-300 group-hover:text-brand-black">
          {service.title}
        </h3>
        <p className="text-sm leading-7 text-[#555]">{service.description}</p>
        <ServiceTags tags={service.tags} />
      </article>
    </FadeIn>
  );
}
