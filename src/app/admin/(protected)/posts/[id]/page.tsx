import { notFound } from "next/navigation";
import { AdminPostEditor } from "@/components/admin/AdminPostEditor";
import { getPost } from "@/lib/db/post-repository";

export const dynamic = "force-dynamic";

export default async function EditAdminPostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const post = await getPost(id);
	if (!post) notFound();
	return <AdminPostEditor post={post} />;
}
