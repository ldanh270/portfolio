import { AdminJsonEditor } from "@/components/admin/AdminJsonEditor";
import { listProjects, serializeProject } from "@/lib/db/project-repository";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
	const projects = await listProjects();
	const editableProjects = projects.map(serializeProject);
	return (
		<div className="space-y-6">
			<div><p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">Portfolio</p><h1 className="mt-2 text-3xl font-semibold">Projects</h1><p className="admin-text-muted mt-3 max-w-3xl text-sm leading-6">Update project metadata and structured case studies. Save the full array together to preserve ordering.</p></div>
			<AdminJsonEditor contentKey="projects" initialValue={editableProjects} />
		</div>
	);
}
