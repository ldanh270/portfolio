"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { BlogPost } from "@/types/admin";

async function fetchPosts(): Promise<BlogPost[]> {
	const response = await fetch("/api/admin/posts", { cache: "no-store" });
	if (!response.ok) throw new Error("Unable to load posts");
	const body = (await response.json()) as { posts: BlogPost[] };
	return body.posts;
}

async function deletePost(id: string): Promise<void> {
	const response = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
	if (!response.ok) throw new Error("Delete failed");
}

export function AdminPostsClient() {
	const queryClient = useQueryClient();
	const postsQuery = useQuery({ queryKey: ["admin", "posts"], queryFn: fetchPosts });
	const deleteMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
			toast.success("Post deleted");
		},
	});
	const posts = postsQuery.data ?? [];
	const error = postsQuery.error?.message ?? deleteMutation.error?.message ?? null;

	function handleDelete(id: string) {
		if (!window.confirm("Delete this post?")) return;
		deleteMutation.mutate(id);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-end justify-between gap-4">
				<div><p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Editorial</p><h1 className="mt-2 text-3xl font-semibold">Blog posts</h1></div>
				<Link href="/admin/posts/new" className="admin-action px-4 py-3 text-sm font-semibold">New post</Link>
			</div>
			{error && <p className="admin-danger text-sm">{error}</p>}
			<div className="admin-border overflow-x-auto rounded-sm border" aria-busy={postsQuery.isPending || deleteMutation.isPending}>
				<table className="w-full min-w-[44rem] text-left text-sm">
					<thead className="admin-border admin-text-subtle border-b text-xs uppercase tracking-widest"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3" /></tr></thead>
					<tbody>
						{postsQuery.isPending ? Array.from({ length: 3 }, (_, index) => <tr key={index} aria-hidden="true" className="admin-border border-b last:border-0"><td className="px-4 py-5"><div className="loading-shimmer h-3 w-2/3 rounded" /><div className="loading-shimmer mt-2 h-2 w-1/3 rounded" /></td><td className="px-4 py-5"><div className="loading-shimmer h-3 w-16 rounded" /></td><td className="px-4 py-5"><div className="loading-shimmer h-3 w-20 rounded" /></td><td className="px-4 py-5" /></tr>) : posts.map((post) => <tr key={post.id} className="admin-border border-b last:border-0"><td className="px-4 py-4"><p>{post.title}</p><p className="admin-text-subtle mt-1 text-xs">/{post.slug}</p></td><td className="admin-text-muted px-4 py-4">{post.status}</td><td className="admin-text-subtle px-4 py-4">{new Date(post.updatedAt).toLocaleDateString()}</td><td className="px-4 py-4 text-right"><Link href={`/admin/posts/${post.id}`} className="admin-text-strong mr-4 underline-offset-4 hover:underline">Edit</Link><button type="button" onClick={() => handleDelete(post.id)} disabled={deleteMutation.isPending} className="admin-danger underline-offset-4 hover:underline disabled:cursor-wait disabled:opacity-50">{deleteMutation.isPending && deleteMutation.variables === post.id ? "Deleting..." : "Delete"}</button></td></tr>)}
					</tbody>
				</table>
				{postsQuery.isSuccess && posts.length === 0 && !error && <p className="admin-text-subtle p-8 text-sm">No posts yet.</p>}
			</div>
		</div>
	);
}
