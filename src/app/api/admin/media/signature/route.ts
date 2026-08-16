import { NextResponse } from "next/server";
import { CLOUDINARY_DEFAULT_FOLDER } from "@/config/admin";
import { requireApiAdmin } from "@/lib/auth/guards";
import { createCloudinaryUploadSignature } from "@/lib/media/cloudinary";
import { MediaSignatureSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
	const access = await requireApiAdmin();
	if (access instanceof NextResponse) return access;

	try {
		const body = MediaSignatureSchema.parse(await request.json());
		return NextResponse.json(
			createCloudinaryUploadSignature(body.folder ?? CLOUDINARY_DEFAULT_FOLDER),
		);
	} catch (error) {
		console.error("Cloudinary signature failed", error);
		return NextResponse.json({ error: "Unable to create upload signature" }, { status: 422 });
	}
}
