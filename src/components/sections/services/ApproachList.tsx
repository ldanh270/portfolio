"use client";

import { approachSteps } from "@/data/services";
import { ApproachStepCard } from "./ApproachStepCard";

export function ApproachList() {
  return (
    <div>
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
