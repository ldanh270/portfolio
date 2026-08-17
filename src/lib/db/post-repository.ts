import "server-only";

import { ObjectId, type WithId } from "mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";
import type { BlogPost, BlogPostInput } from "@/types/admin";

type StoredPost = BlogPostInput & {
	_id?: ObjectId;
	createdAt: Date;
	updatedAt: Date;
};

function serializePost(post: WithId<StoredPost>): BlogPost {
	const { _id, createdAt, updatedAt, ...input } = post;
	return {
		...input,
		id: _id.toHexString(),
		createdAt: createdAt.toISOString(),
		updatedAt: updatedAt.toISOString(),
	};
}

export async function listPosts(): Promise<BlogPost[]> {
	const database = await getDatabase();
	const posts = await database
		.collection<StoredPost>(COLLECTIONS.posts)
		.find({})
		.sort({ updatedAt: -1 })
		.toArray();
	return posts.map(serializePost);
}

export async function getPost(id: string): Promise<BlogPost | null> {
	if (!ObjectId.isValid(id)) return null;
	const database = await getDatabase();
	const post = await database
		.collection<StoredPost>(COLLECTIONS.posts)
		.findOne({ _id: new ObjectId(id) });
	return post ? serializePost(post) : null;
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
	const database = await getDatabase();
	const now = new Date();
	const result = await database.collection<StoredPost>(COLLECTIONS.posts).insertOne({
		...input,
		createdAt: now,
		updatedAt: now,
	});
	return serializePost({ _id: result.insertedId, ...input, createdAt: now, updatedAt: now });
}

export async function updatePost(id: string, input: BlogPostInput): Promise<BlogPost | null> {
	if (!ObjectId.isValid(id)) return null;
	const database = await getDatabase();
	const post = await database
		.collection<StoredPost>(COLLECTIONS.posts)
		.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $set: { ...input, updatedAt: new Date() } },
			{ returnDocument: "after" },
		);
	return post ? serializePost(post) : null;
}

export async function deletePost(id: string): Promise<boolean> {
	if (!ObjectId.isValid(id)) return false;
	const database = await getDatabase();
	const result = await database.collection<StoredPost>(COLLECTIONS.posts).deleteOne({
		_id: new ObjectId(id),
	});
	return result.deletedCount === 1;
}
