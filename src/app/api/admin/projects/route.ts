import { NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { requireApiAdmin } from "@/lib/auth/guards";
import { listProjects, replaceProjects, serializeProject } from "@/lib/db/project-repository";
import { ProjectsUpdateSchema } from "@/lib/validations/admin";

export async function GET() {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const projects = await listProjects();
	return NextResponse.json({ projects: projects.map(serializeProject) });
}

export async function PUT(request: Request) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;

	try {
		const body = ProjectsUpdateSchema.parse(await request.json());
		await replaceProjects(body.projects as Project[]);
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Project update failed", error);
		return NextResponse.json({ error: "Invalid project payload" }, { status: 422 });
	}
}
