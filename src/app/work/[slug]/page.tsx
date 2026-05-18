import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RevealText } from "@/components/ui/RevealText";
import { ContentRenderer } from "@/components/sections/work/content/ContentRenderer";
import { ReadingProgress } from "@/components/sections/work/content/ReadingProgress";
import { TableOfContents } from "@/components/sections/work/content/TableOfContents";
import { NextProjectSection } from "@/components/sections/work/NextProjectSection";
import { SECTION_ORDER } from "@/data/work-details";
import { PROJECTS } from "@/data/projects";
import { hasData } from "@/lib/utils";

type WorkDetailPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = PROJECTS.find((item) => item.slug === slug);

	if (!project) {
		return { title: "Work — Le Duc Anh" };
	}

	return {
		title: `${project.title} — Le Duc Anh`,
		description: project.summary,
	};
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
	const { slug } = await params;
	const projectIndex = PROJECTS.findIndex((item) => item.slug === slug);
	const project = PROJECTS[projectIndex];

	if (!project) {
		notFound();
	}

	const relatedProjects = Array.from({ length: 3 }, (_, index) => {
		return PROJECTS[(projectIndex + index + 1) % PROJECTS.length];
	});

	const activeSections =
		project.content ?
			SECTION_ORDER.filter((config) => hasData(project.content![config.type])).map(
				(config) => ({ id: config.id, label: config.label }),
			)
		:	[];

	const hasContent = project.content != null && activeSections.length > 0;

	return (
		<main className="pt-16">
			<ReadingProgress />

			{/* Project Header */}
			<section className="border-b border-brand-border px-6 py-16 sm:px-12">
				<p className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-gray">
					Project {project.number} / {project.year}
				</p>
				<h1 className="text-[clamp(3rem,8vw,8rem)] font-extrabold leading-none tracking-tighter">
					<RevealText>{project.title}</RevealText>
				</h1>
				<div className="mt-8 flex flex-wrap gap-3">
					<span className="font-mono text-xs uppercase tracking-widest text-brand-gray">
						{project.role}
					</span>
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="font-mono text-xs uppercase tracking-widest text-brand-gray"
						>
							/ {tag}
						</span>
					))}
				</div>
			</section>

			{/* Project Details */}
			<section className="grid border-y border-brand-border md:grid-cols-3">
				<div className="border-r border-brand-border px-6 py-8 sm:px-12">
					<p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Year
					</p>
					<p className="text-sm font-medium">{project.year}</p>
				</div>
				<div className="border-r border-brand-border px-6 py-8 sm:px-12">
					<p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Role
					</p>
					<p className="text-sm font-medium">{project.role}</p>
				</div>
				<div className="px-6 py-8 sm:px-12">
					<p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">
						Technologies
					</p>
					<p className="text-sm font-medium">{project.tags.join(", ")}</p>
				</div>
			</section>

			{/* Project Image */}
			<section className="border-b border-brand-border px-6 py-12 sm:px-12">
				<div className="relative aspect-video w-full overflow-hidden rounded-sm bg-[#e0ddd8]">
					<Image
						src={project.image ?? "/work-placeholder.svg"}
						fill
						alt={project.title}
						className="object-cover"
						loading="lazy"
					/>
				</div>
			</section>

			{/* Project Description */}
			<section className="grid gap-8 border-b border-brand-border px-6 py-16 sm:px-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
				<p className="font-mono text-xs uppercase tracking-widest text-brand-gray lg:sticky lg:top-24 lg:self-start">
					About this project
				</p>
				<p className="text-base leading-8 text-[#444]">{project.description}</p>
			</section>

			{/* Rich Case Study Content */}
			{hasContent && (
				<div className="lg:grid lg:grid-cols-[200px_1fr]">
					<TableOfContents sections={activeSections} />
					<div className="min-w-0">
						<ContentRenderer content={project.content!} />
					</div>
				</div>
			)}

			{/* Related Work */}
			<NextProjectSection projects={relatedProjects} />
		</main>
	);
}
