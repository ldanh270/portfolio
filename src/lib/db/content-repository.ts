import type { AdminContentKey } from "@/config/admin";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";

export type ContentDocument = {
	_id: AdminContentKey;
	data: unknown;
	createdAt: Date;
	updatedAt: Date;
};

export async function getContentDocument(key: AdminContentKey): Promise<ContentDocument | null> {
	const database = await getDatabase();
	return database.collection<ContentDocument>(COLLECTIONS.content).findOne({ _id: key });
}

export async function upsertContentDocument(key: AdminContentKey, data: unknown): Promise<void> {
	const database = await getDatabase();
	const now = new Date();
	await database.collection<ContentDocument>(COLLECTIONS.content).updateOne(
		{ _id: key },
		{
			$set: { data, updatedAt: now },
			$setOnInsert: { createdAt: now },
		},
		{ upsert: true },
	);
}

export async function listContentDocuments(): Promise<ContentDocument[]> {
	const database = await getDatabase();
	return database
		.collection<ContentDocument>(COLLECTIONS.content)
		.find({})
		.sort({ _id: 1 })
		.toArray();
}
