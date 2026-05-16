"use client";

import { approachSteps } from "@/data/services";
import { ApproachStepCard } from "./ApproachStepCard";

export function ApproachList() {
  return (
    <div className="relative border-y border-brand-border px-6 py-10 sm:px-12 lg:px-16">
      <div className="pointer-events-none absolute bottom-10 left-12 top-10 hidden w-px bg-brand-border lg:block" />
      {approachSteps.map((step, index) => (
        <ApproachStepCard
          key={step.id}
          step={step}
          index={index}
          isLast={index === approachSteps.length - 1}
        />
      ))}
    </div>
  );
}
