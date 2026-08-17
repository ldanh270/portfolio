import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";
import { WorkItem } from "@/components/sections/work/WorkItem";
import { FadeIn } from "@/components/ui/FadeIn";

export function WorkList({ projects = PROJECTS, limit }: { projects?: Project[]; limit?: number }) {
	const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

	return (
		<div>
			{visibleProjects.map((project, index) => (
				<FadeIn
					key={project.slug}
					delay={index * 0.08}
					y={24}
				>
					<WorkItem project={project} />
				</FadeIn>
			))}
		</div>
	);
}
