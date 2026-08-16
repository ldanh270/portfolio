import { z } from "zod";
import { COLLECTIONS } from "@/lib/db/collections";
import { ensureDatabaseIndexes } from "@/lib/db/indexes";
import { getDatabase } from "@/lib/db/mongodb";
import { upsertContentDocument } from "@/lib/db/content-repository";
import { replaceProjects } from "@/lib/db/project-repository";

const SeedProjectSchema = z
	.object({
		slug: z.string().min(1),
		number: z.string().min(1),
		title: z.string().min(1),
		summary: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		year: z.string(),
		role: z.string(),
		link: z.string().url().optional(),
		image: z.string().optional(),
		content: z.record(z.string(), z.unknown()).optional(),
	})
	.passthrough();

const SeedSnapshotSchema = z.object({
	site: z.record(z.string(), z.unknown()),
	about: z.record(z.string(), z.unknown()),
	services: z.record(z.string(), z.unknown()),
	copy: z.record(z.string(), z.unknown()),
	projects: z.array(SeedProjectSchema),
	workDetailSectionOrder: z.array(z.record(z.string(), z.unknown())),
	posts: z.array(z.unknown()),
});

export async function seedContentFromSnapshot(snapshot: unknown) {
	const parsed = SeedSnapshotSchema.parse(snapshot);
	await ensureDatabaseIndexes();
	await Promise.all([
		upsertContentDocument("site", parsed.site),
		upsertContentDocument("about", parsed.about),
		upsertContentDocument("services", parsed.services),
		upsertContentDocument("copy", parsed.copy),
		upsertContentDocument("workDetail", { sectionOrder: parsed.workDetailSectionOrder }),
	]);
	await replaceProjects(parsed.projects);

	const database = await getDatabase();
	for (const post of parsed.posts) {
		if (!post || typeof post !== "object") continue;
		const record = post as Record<string, unknown>;
		const slug = typeof record.slug === "string" ? record.slug : undefined;
		if (!slug) continue;
		const now = new Date();
		await database.collection(COLLECTIONS.posts).updateOne(
			{ slug },
			{ $set: { ...record, updatedAt: now }, $setOnInsert: { createdAt: now } },
			{ upsert: true },
		);
	}

	return {
		contentKeys: ["site", "about", "services", "copy", "workDetail"],
		projects: parsed.projects.length,
		posts: parsed.posts.length,
	};
}
