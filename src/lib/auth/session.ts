import "server-only";

import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import {
	ADMIN_SESSION_COOKIE,
	ADMIN_SESSION_TTL_SECONDS,
} from "@/config/admin";
import { getAuthConfig } from "@/config/env";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";
import { getAdminById } from "@/lib/auth/admin-repository";
import type { AdminUser } from "@/types/admin";

type StoredSession = {
	_id: ObjectId;
	tokenHash: string;
	adminId: ObjectId;
	expiresAt: Date;
	createdAt: Date;
};

function hashToken(token: string): string {
	return createHmac("sha256", getAuthConfig().sessionSecret).update(token).digest("hex");
}

export async function createAdminSession(adminId: string): Promise<string> {
	if (!ObjectId.isValid(adminId)) throw new Error("Invalid admin id");
	const database = await getDatabase();
	const token = randomBytes(32).toString("hex");
	const now = new Date();
	const expiresAt = new Date(now.getTime() + ADMIN_SESSION_TTL_SECONDS * 1000);
	await database.collection<StoredSession>(COLLECTIONS.sessions).insertOne({
		_id: new ObjectId(),
		tokenHash: hashToken(token),
		adminId: new ObjectId(adminId),
		expiresAt,
		createdAt: now,
	});
	return token;
}

export async function deleteAdminSession(token: string | undefined): Promise<void> {
	if (!token) return;
	const database = await getDatabase();
	await database.collection<StoredSession>(COLLECTIONS.sessions).deleteOne({
		tokenHash: hashToken(token),
	});
}

export function setSessionCookie(response: Response, token: string): void {
	if (!("cookies" in response)) return;
	const cookieResponse = response as Response & {
		cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void };
	};
	cookieResponse.cookies.set(ADMIN_SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: ADMIN_SESSION_TTL_SECONDS,
	});
}

export function clearSessionCookie(response: Response): void {
	if (!("cookies" in response)) return;
	const cookieResponse = response as Response & {
		cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void };
	};
	cookieResponse.cookies.set(ADMIN_SESSION_COOKIE, "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
	if (!token) return null;

	const database = await getDatabase();
	const session = await database.collection<StoredSession>(COLLECTIONS.sessions).findOne({
		tokenHash: hashToken(token),
		expiresAt: { $gt: new Date() },
	});
	if (!session) return null;

	return getAdminById(session.adminId.toHexString());
}
