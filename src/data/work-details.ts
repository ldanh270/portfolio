import type { ComponentType } from "react";
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ComponentType<{ data: any }>;
};

// Order controls render order + TOC order
export const SECTION_ORDER: SectionConfig[] = [
	{
		type: "overview",
		label: "Overview",
		id: "overview",
		component: OverviewSection,
	},
	{
		type: "roleDetail",
		label: "My Role",
		id: "role",
		component: RoleDetailSection,
	},
	{
		type: "features",
		label: "Key Features",
		id: "features",
		component: FeaturesSection,
	},
	{
		type: "techStack",
		label: "Tech Stack",
		id: "tech-stack",
		component: TechStackSection,
	},
	{
		type: "challengeSolution",
		label: "Challenge & Solution",
		id: "challenge-solution",
		component: ChallengeSolutionSection,
	},
	{
		type: "results",
		label: "Results",
		id: "results",
		component: ResultsSection,
	},
	{
		type: "lessons",
		label: "Lessons",
		id: "lessons",
		component: LessonsSection,
	},
	{
		type: "screenshots",
		label: "Screenshots",
		id: "screenshots",
		component: ScreenshotsSection,
	},
	{
		type: "links",
		label: "Links",
		id: "links",
		component: LinksSection,
	},
];
