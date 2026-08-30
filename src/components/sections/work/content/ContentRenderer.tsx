"use client";

import type { ProjectContent } from "./types";
import { SECTION_ORDER } from "../../../../data/work-details";
import { hasData } from "@/lib/utils";

type ContentRendererProps = {
	content: ProjectContent;
};

export function ContentRenderer({ content }: ContentRendererProps) {
	const activeSections = SECTION_ORDER.filter((config) => hasData(content[config.type]));

	return (
		<>
			{activeSections.map((config) => {
				return (
					<section
						key={config.type}
						id={config.id}
					>
						<h2 className="sr-only">{config.label}</h2>
						{config.render(content)}
					</section>
				);
			})}
		</>
	);
}
