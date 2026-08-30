import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/auth/guards";
import { getContentDocument, upsertContentDocument } from "@/lib/db/content-repository";
import { ContentKeySchema } from "@/lib/validations/admin";
import { ContentUpdateEnvelopeSchema, parseContentDocument } from "@/lib/validations/content";

type RouteContext = {
	params: Promise<{ key: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const { key } = await context.params;
	const parsedKey = ContentKeySchema.safeParse(key);
	if (!parsedKey.success) return NextResponse.json({ error: "Unknown content key" }, { status: 404 });

	const document = await getContentDocument(parsedKey.data);
	if (!document) return NextResponse.json({ error: "Content not found" }, { status: 404 });
	return NextResponse.json({ key: document._id, data: document.data, updatedAt: document.updatedAt });
}

export async function PUT(request: Request, context: RouteContext) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;
	const { key } = await context.params;
	const parsedKey = ContentKeySchema.safeParse(key);
	if (!parsedKey.success) return NextResponse.json({ error: "Unknown content key" }, { status: 404 });

	try {
		const body = ContentUpdateEnvelopeSchema.parse(await request.json());
		const data = parseContentDocument(parsedKey.data, body.data);
		await upsertContentDocument(parsedKey.data, data);
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Content update failed", error);
		return NextResponse.json({ error: "Invalid content payload" }, { status: 422 });
	}
}
