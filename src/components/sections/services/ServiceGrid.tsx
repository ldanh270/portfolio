"use client";

import { SERVICES } from "@/data/services";
import ServiceCard from "./service/ServiceCard";

type ServiceGridProps = {
	limit?: number;
};

export function ServiceGrid({ limit }: ServiceGridProps) {
	const visible = typeof limit === "number" ? SERVICES.slice(0, limit) : SERVICES;

	return (
		<div className="border-t border-brand-border">
			{visible.map((service, index) => (
				<ServiceCard
					key={service.id}
					service={service}
					index={index}
				/>
			))}
		</div>
	);
}
