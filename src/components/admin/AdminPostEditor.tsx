"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost, BlogPostInput, BlogPostStatus } from "@/types/admin";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";

type AdminPostEditorProps = {
	post?: BlogPost;
};

function toDateTimeLocal(value: string | null | undefined): string {
	return value ? value.slice(0, 16) : "";
}

export function AdminPostEditor({ post }: AdminPostEditorProps) {
	const router = useRouter();
	const [form, setForm] = useState<BlogPostInput>({
		slug: post?.slug ?? "",
		title: post?.title ?? "",
		excerpt: post?.excerpt ?? "",
		body: post?.body ?? "",
		tags: post?.tags ?? [],
		status: post?.status ?? "draft",
		publishedAt: post?.publishedAt ?? null,
		coverImage: post?.coverImage,
		seo: post?.seo,
	});
	const [tagsInput, setTagsInput] = useState(form.tags.join(", "));
	const [coverUrl, setCoverUrl] = useState(form.coverImage?.url ?? "");
	const [coverPublicId, setCoverPublicId] = useState(form.coverImage?.publicId ?? "");
	const [coverAlt, setCoverAlt] = useState(form.coverImage?.alt ?? "");
	const [message, setMessage] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	function updateField<Key extends keyof BlogPostInput>(key: Key, value: BlogPostInput[Key]) {
		setForm((current) => ({ ...current, [key]: value }));
	}

	async function handleSave() {
		setIsSaving(true);
		setMessage(null);
		const payload: BlogPostInput = {
			...form,
			tags: tagsInput.split(",").map((tag) => tag.trim()).filter(Boolean),
			coverImage: coverUrl ? { url: coverUrl, publicId: coverPublicId || undefined, alt: coverAlt || form.title } : undefined,
			publishedAt:
				form.status === "published" ? form.publishedAt ?? new Date().toISOString() : null,
		};
		const endpoint = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
		try {
			const response = await fetch(endpoint, {
				method: post ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				const body = (await response.json()) as { error?: string };
				throw new Error(body.error ?? "Save failed");
			}
			setMessage("Saved");
			if (!post) router.replace("/admin/posts");
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Save failed");
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<div className="max-w-4xl space-y-6">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Blog editor</p>
					<h1 className="mt-2 text-3xl font-semibold">{post ? "Edit post" : "New post"}</h1>
				</div>
				{message && <p className="admin-text-muted text-sm">{message}</p>}
			</div>
			<div className="admin-border admin-surface grid gap-5 rounded-sm border p-5">
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Title</span><input value={form.title} onChange={(event) => updateField("title", event.target.value)} className="admin-input" /></label>
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Slug</span><input value={form.slug} onChange={(event) => updateField("slug", event.target.value)} className="admin-input" /></label>
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Excerpt</span><textarea value={form.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} className="admin-input min-h-24" /></label>
				<div className="grid gap-5 sm:grid-cols-2">
					<label className="text-sm"><span className="admin-text-muted mb-2 block">Tags</span><input value={tagsInput} onChange={(event) => setTagsInput(event.target.value)} placeholder="react, mongodb" className="admin-input" /></label>
					<label className="text-sm"><span className="admin-text-muted mb-2 block">Status</span><select value={form.status} onChange={(event) => updateField("status", event.target.value as BlogPostStatus)} className="admin-input"><option value="draft">Draft</option><option value="published">Published</option></select></label>
				</div>
				<div className="text-sm"><span className="admin-text-muted mb-2 block">Cover image URL</span><input value={coverUrl} onChange={(event) => setCoverUrl(event.target.value)} className="admin-input" /><div className="mt-3"><CloudinaryUpload onUploaded={({ url, publicId }) => { setCoverUrl(url); setCoverPublicId(publicId); }} /></div></div>
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Cover alt text</span><input value={coverAlt} onChange={(event) => setCoverAlt(event.target.value)} className="admin-input" /></label>
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Body (Markdown)</span><textarea value={form.body} onChange={(event) => updateField("body", event.target.value)} className="admin-input min-h-[30rem] font-mono text-xs leading-6" /></label>
				<label className="text-sm"><span className="admin-text-muted mb-2 block">Published at</span><input type="datetime-local" value={toDateTimeLocal(form.publishedAt)} onChange={(event) => updateField("publishedAt", event.target.value ? new Date(event.target.value).toISOString() : null)} className="admin-input" /></label>
				<button type="button" onClick={handleSave} disabled={isSaving} className="admin-action w-fit px-5 py-3 text-sm font-semibold disabled:opacity-50">{isSaving ? "Saving..." : "Save post"}</button>
			</div>
		</div>
	);
}
