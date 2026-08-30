import { NextResponse } from "next/server";
import { ADMIN_LOGIN_WINDOW_MS } from "@/config/admin";
import { canAttemptLogin } from "@/lib/auth/rate-limit";
import { createAdminSession, setSessionCookie } from "@/lib/auth/session";
import { findAdminByEmail } from "@/lib/auth/admin-repository";
import { verifyPassword } from "@/lib/auth/password";
import { getClientIdentifier } from "@/lib/security/client-identifier";
import { AdminLoginSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
	try {
		const identifier = getClientIdentifier(request.headers);
		if (!(await canAttemptLogin(identifier))) {
			return NextResponse.json(
				{ error: "Too many login attempts" },
				{ status: 429, headers: { "Retry-After": String(ADMIN_LOGIN_WINDOW_MS / 1000) } },
			);
		}
		const body = await request.json();
		const parsed = AdminLoginSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json({ error: "Invalid login data" }, { status: 422 });
		}

		const admin = await findAdminByEmail(parsed.data.email);
		const isValid = admin?.isActive && (await verifyPassword(parsed.data.password, admin.passwordHash));
		if (!admin || !isValid) {
			return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
		}

		const token = await createAdminSession(admin.id);
		const response = NextResponse.json({ ok: true });
		setSessionCookie(response, token);
		return response;
	} catch (error) {
		console.error("Admin login failed", error);
		return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
	}
}
