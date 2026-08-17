import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";

export async function ensureDatabaseIndexes(): Promise<void> {
	const database = await getDatabase();
	await Promise.all([
		database.collection(COLLECTIONS.admins).createIndex({ email: 1 }, { unique: true }),
		database.collection(COLLECTIONS.sessions).createIndex({ tokenHash: 1 }, { unique: true }),
		database.collection(COLLECTIONS.sessions).createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
		database.collection(COLLECTIONS.projects).createIndex({ slug: 1 }, { unique: true }),
		database.collection(COLLECTIONS.projects).createIndex({ published: 1, sortOrder: 1 }),
		database.collection(COLLECTIONS.posts).createIndex({ slug: 1 }, { unique: true }),
		database.collection(COLLECTIONS.posts).createIndex({ status: 1, publishedAt: -1 }),
		database.collection(COLLECTIONS.media).createIndex({ publicId: 1 }, { unique: true, sparse: true }),
	]);
}
