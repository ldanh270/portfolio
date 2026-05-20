"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type RelatedProject = {
	slug: string;
	title: string;
	number: string;
	role: string;
	summary?: string;
	tags?: string[];
	image?: string;
};

type NextProjectSectionProps =
	| {
			projects: RelatedProject[];
			slug?: never;
			title?: never;
			number?: never;
			role?: never;
			image?: never;
	  }
	| (RelatedProject & {
			projects?: never;
	  });

const ease = [0.22, 1, 0.36, 1] as const;
const RELATED_PROJECT_COUNT = 3;

const cardVariants = {
	rest: {
		backgroundColor: "rgba(250,250,248,1)",
		borderColor: "rgba(10,10,10,0.12)",
	},
	hover: {
		backgroundColor: "rgba(10,10,10,0.018)",
		borderColor: "rgba(10,10,10,0.42)",
	},
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const imageVariants = {
	rest: { scale: 1, filter: "grayscale(1)" },
	hover: { scale: 1.045, filter: "grayscale(1) contrast(1.08)" },
};

const imageCtaVariants = {
	rest: { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
	hover: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" },
};

const getPrimaryTag = (project: RelatedProject): string => {
	return project.tags?.[0] ?? project.role;
};

const getRelatedProjects = (props: NextProjectSectionProps): RelatedProject[] => {
	if ("projects" in props && props.projects) {
		return props.projects.slice(0, RELATED_PROJECT_COUNT);
	}

	return [
		{
			slug: props.slug,
			title: props.title,
			number: props.number,
			role: props.role,
			image: props.image,
		},
	];
};

const getProjectCountLabel = (count: number): string => {
	const itemLabel = count === 1 ? "Case" : "Cases";
	return `${String(count).padStart(2, "0")} ${itemLabel}`;
};

const RelatedWorkCard = ({
	project,
	index,
	motionEnabled,
}: {
	project: RelatedProject;
	index: number;
	motionEnabled: boolean;
}) => {
	return (
		<Link
			href={`/work/${project.slug}`}
			data-cursor="view"
			className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black"
		>
			<motion.article
				initial={
					motionEnabled ? { opacity: 0, y: 24, filter: "blur(6px)" } : { opacity: 1 }
				}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				whileHover={motionEnabled ? "hover" : undefined}
				viewport={{ once: true, margin: "-10% 0px" }}
				transition={{
					duration: motionEnabled ? 0.7 : 0,
					delay: motionEnabled ? index * 0.08 : 0,
					ease,
				}}
				variants={cardVariants}
				className="relative isolate flex h-full min-h-128 flex-col overflow-hidden border border-brand-border bg-brand-white"
			>
				<motion.span
					aria-hidden="true"
					variants={surfaceVariants}
					transition={{ duration: motionEnabled ? 0.32 : 0, ease }}
					className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={lineVariants}
					transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
					className="absolute left-5 right-5 top-0 z-10 h-px origin-left bg-brand-black sm:left-8 sm:right-8"
				/>

				<div className="relative z-10 aspect-[1.55/1] overflow-hidden border-b border-brand-border bg-[rgba(10,10,10,0.035)]">
					{project.image && (
						<motion.div
							className="absolute inset-0"
							variants={imageVariants}
							transition={{ duration: motionEnabled ? 0.7 : 0, ease }}
						>
							<Image
								src={project.image}
								alt=""
								fill
								className="object-cover"
								loading="lazy"
								sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
							/>
						</motion.div>
					)}
					<div className="absolute inset-0 bg-brand-white/25 mix-blend-screen" />
					<span className="absolute left-4 top-4 border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray">
						Project {project.number}
					</span>
					<motion.span
						aria-hidden="true"
						variants={imageCtaVariants}
						transition={{ duration: motionEnabled ? 0.34 : 0, ease }}
						className="absolute bottom-4 right-4 border border-brand-black bg-brand-black px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-white"
					>
						View
					</motion.span>
				</div>

				<div className="relative z-10 flex flex-1 flex-col justify-between px-5 py-6 sm:px-6">
					<div>
						<div className="flex flex-wrap items-center gap-2">
							<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
								{project.role}
							</span>
							<span className="text-brand-gray">/</span>
							<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
								{getPrimaryTag(project)}
							</span>
						</div>
						<h2 className="mt-4 text-[clamp(1.35rem,2.3vw,1.85rem)] font-extrabold leading-[0.98] tracking-tighter text-brand-black transition-transform duration-300 group-hover:-translate-y-1">
							{project.title}
						</h2>
						{project.summary && (
							<p className="mt-4 line-clamp-3 text-sm leading-6 text-[#555] transition-colors duration-300 group-hover:text-brand-black/75">
								{project.summary}
							</p>
						)}
					</div>

					<div className="mt-7">
						{project.tags && project.tags.length > 0 && (
							<div className="mb-5 flex flex-wrap gap-1.5">
								{project.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="border border-brand-border bg-brand-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-gray transition-colors duration-300 group-hover:border-brand-black/25 group-hover:text-brand-black"
									>
										{tag}
									</span>
								))}
							</div>
						)}
						<div className="mb-5 h-px overflow-hidden bg-brand-border">
							<motion.div
								aria-hidden="true"
								variants={lineVariants}
								transition={{ duration: motionEnabled ? 0.38 : 0, ease }}
								className="h-full origin-left bg-brand-black"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="font-mono text-xs uppercase tracking-widest text-brand-gray">
								Read case study
							</span>
							<span className="grid size-10 shrink-0 place-items-center border border-brand-border bg-brand-white text-brand-black transition-colors duration-300 group-hover:border-brand-black group-hover:bg-brand-black group-hover:text-brand-white">
								<ArrowUpRight
									aria-hidden="true"
									className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
									strokeWidth={1.8}
								/>
							</span>
						</div>
					</div>
				</div>
			</motion.article>
		</Link>
	);
};

export function NextProjectSection(props: NextProjectSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const motionEnabled = !shouldReduceMotion;
	const relatedProjects = getRelatedProjects(props);

	return (
		<section className="border-t border-brand-border py-16 sm:py-20">
			<div className="px-6 sm:px-8 lg:px-12">
				<motion.div
					initial={
						motionEnabled ? { opacity: 0, y: 18, filter: "blur(6px)" } : { opacity: 1 }
					}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true, margin: "-10% 0px" }}
					transition={{ duration: motionEnabled ? 0.65 : 0, ease }}
					className="mb-10 flex flex-col justify-between gap-6 border-b border-brand-border pb-8 sm:flex-row sm:items-end"
				>
					<div>
						<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
							Related Work
						</p>
						<h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4.75rem)] font-extrabold leading-[0.9] tracking-tighter text-brand-black">
							More case studies
						</h2>
					</div>
					<div className="flex items-center gap-4">
						<span className="hidden h-px w-16 bg-brand-black/35 sm:block" />
						<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray">
							{getProjectCountLabel(relatedProjects.length)}
						</p>
					</div>
				</motion.div>

				<div className="grid gap-4 md:grid-cols-3">
					{relatedProjects.map((project, index) => (
						<RelatedWorkCard
							key={project.slug}
							project={project}
							index={index}
							motionEnabled={motionEnabled}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
