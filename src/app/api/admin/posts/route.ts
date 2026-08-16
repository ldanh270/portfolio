import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/auth/guards";
import { createPost, listPosts } from "@/lib/db/post-repository";
import { BlogPostSchema } from "@/lib/validations/admin";

export async function GET() {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	return NextResponse.json({ posts: await listPosts() });
}

export async function POST(request: Request) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;

	try {
		const input = BlogPostSchema.parse(await request.json());
		const post = await createPost(input);
		return NextResponse.json({ post }, { status: 201 });
	} catch (error) {
		console.error("Post creation failed", error);
		return NextResponse.json({ error: "Invalid or duplicate post payload" }, { status: 422 });
	}
}
