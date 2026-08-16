import "server-only";

import { createHash } from "node:crypto";
import { CLOUDINARY_DEFAULT_FOLDER } from "@/config/admin";
import { getCloudinaryConfig } from "@/config/env";

export function createCloudinaryUploadSignature(folder = CLOUDINARY_DEFAULT_FOLDER) {
	const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
	const timestamp = Math.floor(Date.now() / 1000);
	const params = `folder=${folder}&timestamp=${timestamp}`;
	const signature = createHash("sha1").update(`${params}${apiSecret}`).digest("hex");

	return { apiKey, cloudName, folder, signature, timestamp };
}
