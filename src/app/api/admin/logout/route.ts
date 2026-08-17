import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/config/admin";
import { deleteAdminSession, clearSessionCookie } from "@/lib/auth/session";

export async function POST() {
	const cookieStore = await cookies();
	await deleteAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
	const response = NextResponse.json({ ok: true });
	clearSessionCookie(response);
	return response;
}
