import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/auth/guards";
import { upsertMedia } from "@/lib/db/media-repository";
import { MediaInputSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;

	try {
		const input = MediaInputSchema.parse(await request.json());
		await upsertMedia({ ...input, uploadedBy: access.id });
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Media metadata save failed", error);
		return NextResponse.json({ error: "Invalid media payload" }, { status: 422 });
	}
}
