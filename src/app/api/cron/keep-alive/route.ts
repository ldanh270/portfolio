import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const authHeader = request.headers.get("authorization");
	const cronSecret = process.env.CRON_SECRET;

	// Protect cron endpoint if CRON_SECRET is set
	if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const timestamp = new Date().toISOString();
		await redis.set("system:keep-alive", timestamp, { ex: 60 * 60 * 24 * 7 });

		return NextResponse.json({
			ok: true,
			status: "alive",
			timestamp,
		});
	} catch (error) {
		console.error("[KeepAlive] Redis ping failed:", error);
		return NextResponse.json(
			{
				ok: false,
				error: error instanceof Error ? error.message : "Ping failed",
			},
			{ status: 500 },
		);
	}
}
