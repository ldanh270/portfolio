import Link from "next/link";
import { getContentDocument } from "@/lib/db/content-repository";
import { listPosts } from "@/lib/db/post-repository";
import { listProjects } from "@/lib/db/project-repository";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
	const [site, projects, posts] = await Promise.all([
		getContentDocument("site"),
		listProjects(),
		listPosts(),
	]);

	return (
		<div className="space-y-8">
			<div><p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Overview</p><h1 className="mt-2 text-3xl font-semibold">Dashboard</h1><p className="admin-text-muted mt-3 max-w-2xl text-sm leading-6">The admin data layer is live. Public pages still use their static source until parity checks are complete.</p></div>
			<div className="grid gap-4 sm:grid-cols-3">
				{[
					{ label: "Content documents", value: site ? "5" : "0" },
					{ label: "Projects", value: String(projects.length) },
					{ label: "Blog posts", value: String(posts.length) },
				].map((item) => <div key={item.label} className="admin-border admin-surface rounded-sm border p-5"><p className="admin-text-subtle text-xs">{item.label}</p><p className="mt-3 text-4xl font-semibold">{item.value}</p></div>)}
			</div>
			<div className="grid gap-4 sm:grid-cols-3">
				<Link href="/admin/content" className="admin-border admin-border-hover rounded-sm border p-5 transition"><p className="font-semibold">Edit site content</p><p className="admin-text-subtle mt-2 text-sm">Profile, skills, services and copy.</p></Link>
				<Link href="/admin/projects" className="admin-border admin-border-hover rounded-sm border p-5 transition"><p className="font-semibold">Edit projects</p><p className="admin-text-subtle mt-2 text-sm">Case studies and project media references.</p></Link>
				<Link href="/admin/posts/new" className="admin-border admin-border-hover rounded-sm border p-5 transition"><p className="font-semibold">Write a post</p><p className="admin-text-subtle mt-2 text-sm">Markdown editor with draft/published status.</p></Link>
			</div>
		</div>
	);
}
