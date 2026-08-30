import snapshot from "@/data/seed/current-content.json";
import { ADMIN_CONTENT_KEYS, type AdminContentKey } from "@/config/admin";
import { PROJECTS } from "@/data/projects";
import { getContentDocument } from "@/lib/db/content-repository";
import { listProjects, serializeProject } from "@/lib/db/project-repository";
import { mergeDefaults } from "@/lib/content/merge-defaults";
import { parseContentDocument } from "@/lib/validations/content";
import type { CmsContent } from "@/types/content";

const fallbackContent: Omit<CmsContent, "projects"> = {
	site: snapshot.site as CmsContent["site"],
	about: snapshot.about as CmsContent["about"],
	services: snapshot.services as CmsContent["services"],
	copy: snapshot.copy as CmsContent["copy"],
	workDetail: { sectionOrder: snapshot.workDetailSectionOrder },
};

async function getDocumentData<T>(key: AdminContentKey, fallback: T): Promise<T> {
	try {
		return parseContentDocument(
			key,
			mergeDefaults(fallback, (await getContentDocument(key))?.data),
		) as T;
	} catch {
		return fallback;
	}
}

export async function getAdminInitialContent(): Promise<CmsContent> {
	const values = new Map<AdminContentKey, unknown>();
	const safeValues = await Promise.all(ADMIN_CONTENT_KEYS.map((key) => getDocumentData(key, fallbackContent[key])));
	ADMIN_CONTENT_KEYS.forEach((key, index) => values.set(key, safeValues[index] ?? fallbackContent[key]));

	let projects = PROJECTS;
	try {
		const storedProjects = await listProjects();
		if (storedProjects.length > 0) projects = storedProjects.map(serializeProject) as typeof PROJECTS;
	} catch {
		projects = PROJECTS;
	}

	return {
		site: values.get("site") as CmsContent["site"],
		about: values.get("about") as CmsContent["about"],
		services: values.get("services") as CmsContent["services"],
		copy: values.get("copy") as CmsContent["copy"],
		workDetail: values.get("workDetail") as CmsContent["workDetail"],
		projects,
	};
}
