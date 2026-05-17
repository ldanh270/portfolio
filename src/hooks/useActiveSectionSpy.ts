"use client";

import { useEffect, useState } from "react";

export function useActiveSectionSpy(sectionIds: string[]) {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		if (sectionIds.length === 0) return;

		const observers: IntersectionObserver[] = [];

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActiveId(id);
				},
				{ rootMargin: "-20% 0px -70% 0px", threshold: 0 },
			);

			observer.observe(el);
			observers.push(observer);
		});

		return () => observers.forEach((o) => o.disconnect());
	}, [sectionIds]);

	return activeId;
}
