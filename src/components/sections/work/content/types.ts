export type TechCategory = {
	category: string;
	tools: string[];
};

export type Feature = {
	title: string;
	description: string;
};

export type ChallengeSolution = {
	challenge: string;
	solution: string;
};

export type ResultMetric = {
	metric: string;
	value: string;
};

export type ProjectScreenshot = {
	title: string;
	description?: string;
	image?: string;
	variant?: "dashboard" | "commerce" | "mobile" | "system";
};

export type ScreenshotEntry = ProjectScreenshot | string;

export type ProjectLink = {
	label: string;
	href: string;
	type: "live" | "github" | "case-study" | "other";
};

export type ProjectContent = {
	overview?: string;
	roleDetail?: string;
	features?: Feature[];
	techStack?: TechCategory[];
	challengeSolution?: ChallengeSolution;
	results?: ResultMetric[];
	lessons?: string[];
	screenshots?: ScreenshotEntry[];
	links?: ProjectLink[];
};
