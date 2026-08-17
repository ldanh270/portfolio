import Link from "next/link";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Check, FileText, Home, Layers3, MessageSquareText, Settings2, UserRound, Wrench } from "lucide-react";
import { listContentDocuments } from "@/lib/db/content-repository";
import { listPosts } from "@/lib/db/post-repository";
import { listProjects } from "@/lib/db/project-repository";

export const dynamic = "force-dynamic";

const sectionLinks = [
	{ label: "Home", description: "Hero, selected work and service teaser", href: "/admin/home", icon: Home },
	{ label: "Projects", description: "Cards, media and case studies", href: "/admin/projects", icon: BriefcaseBusiness },
	{ label: "Services", description: "Offerings, process and FAQs", href: "/admin/services", icon: Settings2 },
	{ label: "Tools", description: "Technology groups and stack", href: "/admin/tools", icon: Wrench },
	{ label: "About", description: "Profile, skills and timeline", href: "/admin/about", icon: UserRound },
	{ label: "Contact", description: "Contact copy and form labels", href: "/admin/contact", icon: MessageSquareText },
	{ label: "Work detail", description: "Case study labels and section order", href: "/admin/work", icon: FileText },
] as const;

async function getDashboardData() {
	const [documents, projects, posts] = await Promise.all([
		listContentDocuments().catch(() => []),
		listProjects().catch(() => []),
		listPosts().catch(() => []),
	]);
	return { documents, projects, posts };
}

export default async function AdminDashboardPage() {
	const { documents, projects, posts } = await getDashboardData();
	const stats = [
		{ label: "Content sections", value: String(documents.length || 5), detail: "CMS documents", icon: Layers3 },
		{ label: "Projects", value: String(projects.length), detail: "Published work items", icon: BriefcaseBusiness },
		{ label: "Blog posts", value: String(posts.length), detail: "Coming soon", icon: BookOpen },
	];

	return (
		<div className="space-y-8">
			<header className="flex flex-col justify-between gap-5 border-b admin-border pb-7 lg:flex-row lg:items-end">
				<div>
					<div className="flex items-center gap-3"><p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Workspace overview</p><span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" /> Live</span></div>
					<h1 className="mt-3 text-4xl font-semibold tracking-tight">Good to see you.</h1>
					<p className="admin-text-muted mt-3 max-w-2xl text-sm leading-6">Manage the portfolio as a collection of frontend sections. Pick a section below to update its content directly.</p>
				</div>
				<Link href="/admin/home" className="admin-action inline-flex w-fit items-center gap-2 px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5">Edit homepage <ArrowUpRight size={15} aria-hidden="true" /></Link>
			</header>

			<div className="grid gap-4 md:grid-cols-3">
				{stats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="admin-border admin-surface rounded-sm border p-5"><div className="flex items-start justify-between gap-4"><span className="admin-text-subtle text-xs">{stat.label}</span><Icon size={17} className="admin-text-subtle" strokeWidth={1.7} aria-hidden="true" /></div><p className="mt-5 text-4xl font-semibold tracking-tight">{stat.value}</p><p className="admin-text-subtle mt-2 text-xs">{stat.detail}</p></div>; })}
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
				<section className="admin-border admin-surface rounded-sm border">
					<div className="flex items-end justify-between gap-4 border-b admin-border px-5 py-5 sm:px-6"><div><p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.2em]">Content map</p><h2 className="mt-2 text-lg font-semibold">Frontend sections</h2></div><span className="admin-text-subtle font-mono text-[10px] uppercase tracking-widest">{sectionLinks.length} areas</span></div>
					<div className="divide-y admin-border">
						{sectionLinks.map((section) => { const Icon = section.icon; return <Link key={section.href} href={section.href} className="admin-surface-hover group flex items-center gap-4 px-5 py-4 transition sm:px-6"><span className="admin-border-strong grid size-9 shrink-0 place-items-center rounded-sm border"><Icon size={16} className="admin-text-muted" strokeWidth={1.7} aria-hidden="true" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{section.label}</span><span className="admin-text-subtle mt-1 block truncate text-xs">{section.description}</span></span><span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300 sm:flex"><Check size={13} aria-hidden="true" /> Synced</span><ArrowUpRight size={15} className="admin-text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" /></Link>; })}
					</div>
				</section>

				<aside className="space-y-6">
					<section className="admin-border admin-surface rounded-sm border p-5"><div className="flex items-center gap-3"><div className="admin-border-strong grid size-9 place-items-center rounded-sm border"><Layers3 size={16} className="admin-text-muted" aria-hidden="true" /></div><div><p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.2em]">Quick actions</p><h2 className="mt-1 text-base font-semibold">Keep moving</h2></div></div><div className="mt-5 space-y-2"><Link href="/admin/projects" className="admin-border admin-surface-hover flex items-center justify-between border px-3 py-3 text-sm transition"><span>Manage projects</span><ArrowUpRight size={14} aria-hidden="true" /></Link><Link href="/admin/services" className="admin-border admin-surface-hover flex items-center justify-between border px-3 py-3 text-sm transition"><span>Update services</span><ArrowUpRight size={14} aria-hidden="true" /></Link><Link href="/admin/contact" className="admin-border admin-surface-hover flex items-center justify-between border px-3 py-3 text-sm transition"><span>Edit contact copy</span><ArrowUpRight size={14} aria-hidden="true" /></Link></div></section>
					<section className="admin-border rounded-sm border border-dashed p-5"><div className="flex items-center gap-3"><BookOpen size={16} className="admin-text-muted" aria-hidden="true" /><p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.2em]">Editorial</p></div><h2 className="mt-4 text-base font-semibold">Blog CMS coming soon</h2><p className="admin-text-muted mt-2 text-sm leading-6">The existing blog workspace is preserved behind a preview overlay while the publishing flow is finalized.</p><Link href="/admin/posts" className="admin-text-strong mt-4 inline-flex items-center gap-2 text-xs underline-offset-4 hover:text-white hover:underline">Preview workspace <ArrowUpRight size={13} aria-hidden="true" /></Link></section>
				</aside>
			</div>
		</div>
	);
}
