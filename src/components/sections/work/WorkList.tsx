import { projects } from "@/data/projects";
import { WorkItem } from "@/components/sections/work/WorkItem";

export function WorkList({ limit }: { limit?: number }) {
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div>
      {visibleProjects.map((project) => (
        <WorkItem key={project.slug} project={project} />
      ))}
    </div>
  );
}
