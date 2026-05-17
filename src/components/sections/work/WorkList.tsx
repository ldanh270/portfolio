import { PROJECTS } from "@/data/projects";
import { WorkItem } from "@/components/sections/work/WorkItem";

export function WorkList({ limit }: { limit?: number }) {
	const visibleProjects = typeof limit === "number" ? PROJECTS.slice(0, limit) : PROJECTS;

	return (
		<div>
			{visibleProjects.map((project) => (
				<WorkItem
					key={project.slug}
					project={project}
				/>
			))}
		</div>
	);
}
