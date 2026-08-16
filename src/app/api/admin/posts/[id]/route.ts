import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/auth/guards";
import { deletePost, getPost, updatePost } from "@/lib/db/post-repository";
import { BlogPostSchema } from "@/lib/validations/admin";

type RouteContext = {
	params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const { id } = await context.params;
	const post = await getPost(id);
	return post ? NextResponse.json({ post }) : NextResponse.json({ error: "Post not found" }, { status: 404 });
}

export async function PUT(request: Request, context: RouteContext) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const { id } = await context.params;

	try {
		const input = BlogPostSchema.parse(await request.json());
		const post = await updatePost(id, input);
		return post ? NextResponse.json({ post }) : NextResponse.json({ error: "Post not found" }, { status: 404 });
	} catch (error) {
		console.error("Post update failed", error);
		return NextResponse.json({ error: "Invalid post payload" }, { status: 422 });
	}
}

export async function DELETE(_request: Request, context: RouteContext) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const { id } = await context.params;
	const deleted = await deletePost(id);
	return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Post not found" }, { status: 404 });
}
