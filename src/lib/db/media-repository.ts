import "server-only";

import { ObjectId } from "mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";

export type MediaInput = {
	publicId: string;
	url: string;
	alt: string;
	folder: string;
	resourceType: string;
	uploadedBy: string;
};

export async function upsertMedia(input: MediaInput): Promise<void> {
	const database = await getDatabase();
	const now = new Date();
	await database.collection(COLLECTIONS.media).updateOne(
		{ publicId: input.publicId },
		{
			$set: { ...input, updatedAt: now },
			$setOnInsert: { _id: new ObjectId(), createdAt: now },
		},
		{ upsert: true },
	);
}
