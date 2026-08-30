import "server-only";

import { AWARDS, CAREER_ENTRIES, CERTIFICATES, SKILLS, STATS, TIMELINE_YEARS, YEAR_WIDTH } from "@/data/about";
import { PROJECTS } from "@/data/projects";
import { APPROACH_STEPS, FAQS, SERVICES, TECH_STACKS, TESTIMONIALS } from "@/data/services";
import { NAV_LINKS, SITE, SOCIAL_LINKS, TAGS } from "@/data/site";
import snapshot from "@/data/seed/current-content.json";
import { SECTION_ORDER } from "@/data/work-details";
import { getContentDocument } from "@/lib/db/content-repository";
import { listProjects, serializeProject } from "@/lib/db/project-repository";
import { mergeDefaults } from "@/lib/content/merge-defaults";
import { parseContentDocument } from "@/lib/validations/content";
import type { CmsContent } from "@/types/content";

const fallbackContent: CmsContent = {
	site: { profile: SITE, tags: [...TAGS], socialLinks: [...SOCIAL_LINKS], navigation: [...NAV_LINKS] },
	about: { stats: [...STATS], skills: SKILLS, careerEntries: CAREER_ENTRIES, timelineYears: TIMELINE_YEARS, yearWidth: YEAR_WIDTH, certificates: CERTIFICATES, awards: AWARDS },
	services: { services: SERVICES, approachSteps: APPROACH_STEPS, techStacks: TECH_STACKS, testimonials: TESTIMONIALS, faqs: FAQS },
	copy: snapshot.copy as CmsContent["copy"],
	workDetail: { sectionOrder: SECTION_ORDER.map(({ type, label, id }) => ({ type, label, id })) },
	projects: PROJECTS,
};

async function readDocument<T>(key: keyof Omit<CmsContent, "projects">, fallback: T): Promise<T> {
	try {
		const document = await getContentDocument(key);
		return parseContentDocument(key, mergeDefaults(fallback, document?.data)) as T;
	} catch {
		return fallback;
	}
}

async function readProjects(): Promise<CmsContent["projects"]> {
	try {
		const projects = await listProjects();
		return projects.length > 0 ? projects.map(serializeProject) : PROJECTS;
	} catch {
		return PROJECTS;
	}
}

export async function getPortfolioContent(): Promise<CmsContent> {
	const [site, about, services, copy, workDetail, projects] = await Promise.all([
		readDocument("site", fallbackContent.site),
		readDocument("about", fallbackContent.about),
		readDocument("services", fallbackContent.services),
		readDocument("copy", fallbackContent.copy),
		readDocument("workDetail", fallbackContent.workDetail),
		readProjects(),
	]);
	return { site, about, services, copy, workDetail, projects };
}
