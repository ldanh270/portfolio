import type { Award, CareerEntry, Certification } from "@/data/about";
import type { Project } from "@/data/projects";
import type { ApproachStep, FAQ, Service, TechCategory, Testimonial } from "@/data/services";

export type SiteContent = {
	profile: {
		name: string;
		shortName: string;
		email: string;
		location: string;
	};
	tags: string[];
	socialLinks: Array<{ label: string; value: string; href: string }>;
	navigation: Array<{ label: string; href: string }>;
};

export type AboutContent = {
	stats: Array<{ number: number; suffix: string; label: string }>;
	skills: Record<string, string[]>;
	careerEntries: CareerEntry[];
	timelineYears: string[];
	yearWidth: number;
	certificates: Certification[];
	awards: Award[];
};

export type ServicesContent = {
	services: Service[];
	approachSteps: ApproachStep[];
	techStacks: TechCategory[];
	testimonials: Testimonial[];
	faqs: FAQ[];
};

export type WorkDetailContent = {
	sectionOrder: Array<{ type: string; label: string; id: string }>;
};

export type HomeCopy = {
	hero: {
		nameLines: string[];
		handle: string;
		role: string;
		description: string;
		location: string;
	};
	projects: { marquee: string; label: string; description: string; viewAllLabel: string };
	services: { marquee: string; viewAllLabel: string };
};

export type ServicesCopy = {
	marquee: string;
	sections: {
		services: { label: string; description: string };
		techStack: { label: string; description: string };
		approach: { label: string; description: string };
		faq: { label: string; description: string };
	};
};

export type AboutCopy = {
	marquee: string;
	hero: { headline: string; cta: string; paragraphs: string[] };
	skills: { heading: string; description: string };
};

export type WorkCopy = {
	marquee: string;
	section: { label: string; description: string };
};

export type ContactCopy = {
	marquee: string;
	eyebrow: string;
	headline: string;
};

export type CopyContent = Record<string, unknown> & {
	home: HomeCopy;
	services: ServicesCopy;
	about: AboutCopy;
	work: WorkCopy;
	contact: ContactCopy;
};

export type CmsContent = {
	site: SiteContent;
	about: AboutContent;
	services: ServicesContent;
	copy: CopyContent;
	workDetail: WorkDetailContent;
	projects: Project[];
};
