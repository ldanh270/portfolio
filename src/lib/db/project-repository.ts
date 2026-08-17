import type { Project } from "@/data/projects";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";

export type StoredProject = Project & {
	_id: string;
	published: boolean;
	sortOrder: number;
	createdAt: Date;
	updatedAt: Date;
};

export function serializeProject(project: StoredProject) {
	const { _id, createdAt, updatedAt, ...content } = project;
	void _id;
	void createdAt;
	void updatedAt;
	return content;
}

export async function listProjects(): Promise<StoredProject[]> {
	const database = await getDatabase();
	return database
		.collection<StoredProject>(COLLECTIONS.projects)
		.find({})
		.sort({ sortOrder: 1, number: 1 })
		.toArray();
}

export async function replaceProjects(projects: readonly Project[]): Promise<void> {
	const database = await getDatabase();
	const collection = database.collection<StoredProject>(COLLECTIONS.projects);
	const now = new Date();
	const operations = projects.map((project, sortOrder) => ({
		updateOne: {
			filter: { _id: project.slug },
			update: {
				$set: { ...project, published: true, sortOrder, updatedAt: now },
				$setOnInsert: { createdAt: now },
			},
			upsert: true,
		},
	}));

	if (operations.length > 0) {
		await collection.bulkWrite(operations);
	}
}
