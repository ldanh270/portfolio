"use client";

import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

type ServiceGridProps = {
  limit?: number;
};

export function ServiceGrid({ limit }: ServiceGridProps) {
  const visible = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="grid md:grid-cols-2">
      {visible.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
