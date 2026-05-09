"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function WorkItem({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="work-item group block border-b border-brand-border">
      <motion.article
        className="relative grid gap-6 px-6 py-10 transition hover:bg-[rgba(10,10,10,0.02)] sm:px-12 md:grid-cols-[80px_1fr_auto] md:gap-8 md:py-12"
        whileHover={{ backgroundColor: "rgba(10,10,10,0.02)" }}
      >
        <span className="font-mono text-xs tracking-wide text-brand-gray md:pt-1">{project.number}</span>
        <div>
          <h2 className="mb-3 text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.02em] transition-all duration-300 group-hover:tracking-[-0.01em]">
            {project.title}
          </h2>
          <p className="mb-5 max-w-xl text-sm leading-relaxed text-[#555]">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-brand-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-brand-gray">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-2xl text-brand-gray transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-black">↗</span>
        <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-black transition-all duration-500 group-hover:w-full" />
      </motion.article>
    </Link>
  );
}
