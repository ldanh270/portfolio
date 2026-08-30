import { createElement, type ReactNode } from "react";
import type { ProjectContent } from "../components/sections/work/content/types";
import { OverviewSection } from "../components/sections/work/content/OverviewSection";
import { RoleDetailSection } from "../components/sections/work/content/RoleDetailSection";
import { FeaturesSection } from "../components/sections/work/content/FeaturesSection";
import { TechStackSection } from "../components/sections/work/content/TechStackSection";
import { ChallengeSolutionSection } from "../components/sections/work/content/ChallengeSolutionSection";
import { ResultsSection } from "../components/sections/work/content/ResultsSection";
import { LessonsSection } from "../components/sections/work/content/LessonsSection";
import { ScreenshotsSection } from "../components/sections/work/content/ScreenshotsSection";
import { LinksSection } from "../components/sections/work/content/LinksSection";

export type SectionType = keyof ProjectContent;

export type SectionConfig = {
	type: SectionType;
	label: string;
	id: string;
	render: (content: ProjectContent) => ReactNode;
};

// Order controls render order + TOC order
export const SECTION_ORDER: SectionConfig[] = [
	{
		type: "overview",
		label: "Overview",
		id: "overview",
		render: (content) => createElement(OverviewSection, { data: content.overview! }),
	},
	{
		type: "roleDetail",
		label: "My Role",
		id: "role",
		render: (content) => createElement(RoleDetailSection, { data: content.roleDetail! }),
	},
	{
		type: "features",
		label: "Key Features",
		id: "features",
		render: (content) => createElement(FeaturesSection, { data: content.features! }),
	},
	{
		type: "techStack",
		label: "Tech Stack",
		id: "tech-stack",
		render: (content) => createElement(TechStackSection, { data: content.techStack! }),
	},
	{
		type: "challengeSolution",
		label: "Challenge & Solution",
		id: "challenge-solution",
		render: (content) => createElement(ChallengeSolutionSection, { data: content.challengeSolution! }),
	},
	{
		type: "results",
		label: "Results",
		id: "results",
		render: (content) => createElement(ResultsSection, { data: content.results! }),
	},
	{
		type: "lessons",
		label: "Lessons",
		id: "lessons",
		render: (content) => createElement(LessonsSection, { data: content.lessons! }),
	},
	{
		type: "screenshots",
		label: "Screenshots",
		id: "screenshots",
		render: (content) => createElement(ScreenshotsSection, { data: content.screenshots! }),
	},
	{
		type: "links",
		label: "Links",
		id: "links",
		render: (content) => createElement(LinksSection, { data: content.links! }),
	},
];
