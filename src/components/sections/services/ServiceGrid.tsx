"use client";

import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

type ServiceGridProps = {
  limit?: number;
};

export function ServiceGrid({ limit }: ServiceGridProps) {
  const visible = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="border-t border-brand-border">
      {visible.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
