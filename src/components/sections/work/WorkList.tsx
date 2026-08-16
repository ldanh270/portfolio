import { PROJECTS } from "@/data/projects";
import { WorkItem } from "@/components/sections/work/WorkItem";
import { FadeIn } from "@/components/ui/FadeIn";

export function WorkList({ limit }: { limit?: number }) {
	const visibleProjects = typeof limit === "number" ? PROJECTS.slice(0, limit) : PROJECTS;

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
