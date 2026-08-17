"use client";

import { SERVICES, type Service } from "@/data/services";
import ServiceCard from "./service/ServiceCard";

type ServiceGridProps = {
	limit?: number;
	services?: Service[];
};

export function ServiceGrid({ limit, services = SERVICES }: ServiceGridProps) {
	const visible = typeof limit === "number" ? services.slice(0, limit) : services;

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
