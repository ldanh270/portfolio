import "server-only";

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/session";
import type { AdminUser } from "@/types/admin";

export async function requireApiAdmin(): Promise<AdminUser | NextResponse> {
	const admin = await getCurrentAdmin();
	return admin?.isActive ? admin : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function requireAdmin(): Promise<AdminUser> {
	const admin = await getCurrentAdmin();
	if (!admin?.isActive) redirect("/admin/login");
	return admin;
}
