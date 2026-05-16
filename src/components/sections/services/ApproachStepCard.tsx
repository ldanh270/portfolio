"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ApproachStep } from "@/data/services";

type ApproachStepCardProps = {
  step: ApproachStep;
  index: number;
  isLast: boolean;
};

export function ApproachStepCard({ step, index, isLast }: ApproachStepCardProps) {
  return (
    <motion.article
      className={`relative grid gap-8 px-6 py-12 sm:px-12 md:grid-cols-[80px_1fr] md:gap-16 ${!isLast ? "border-b border-brand-border" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {/* Connecting line between steps */}
      {!isLast && (
        <motion.div
          className="absolute bottom-0 left-6 top-0 hidden w-px bg-brand-border sm:left-12 md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1, delay: index * 0.12 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ originY: 0 }}
        />
      )}

      {/* Giant watermark number */}
      <FadeIn delay={index * 0.12 + 0.1} y={0} duration={0.6}>
        <p className="text-[5rem] font-extrabold leading-none tracking-tighter text-[rgba(10,10,10,0.06)]">
          {step.number}
        </p>
      </FadeIn>

      {/* Content */}
      <FadeIn delay={index * 0.12 + 0.15} y={16}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">{step.title}</h3>
          <span className="border border-brand-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-gray">
            {step.duration}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[#555]">{step.description}</p>
        {step.deliverables.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {step.deliverables.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gray"
              >
                <span className="h-1 w-1 rounded-full bg-brand-gray" />
                {item}
              </span>
            ))}
          </div>
        )}
      </FadeIn>
    </motion.article>
  );
}
