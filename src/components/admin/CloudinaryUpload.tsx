"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

type UploadResult = {
	secure_url: string;
	public_id: string;
};

type SignatureResponse = {
	apiKey: string;
	cloudName: string;
	folder: string;
	signature: string;
	timestamp: number;
};

type CloudinaryUploadProps = {
	onUploaded: (result: { url: string; publicId: string }) => void;
};

export function CloudinaryUpload({ onUploaded }: CloudinaryUploadProps) {
	const [error, setError] = useState<string | null>(null);
	const uploadMutation = useMutation({
		mutationFn: async (file: File) => {
			const signatureResponse = await fetch("/api/admin/media/signature", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ folder: "portfolio/blog" }),
			});
			if (!signatureResponse.ok) throw new Error("Unable to authorize upload");
			const signature = (await signatureResponse.json()) as SignatureResponse;
			const body = new FormData();
			body.append("file", file);
			body.append("api_key", signature.apiKey);
			body.append("timestamp", String(signature.timestamp));
			body.append("signature", signature.signature);
			body.append("folder", signature.folder);

			const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body });
			if (!uploadResponse.ok) throw new Error("Cloudinary upload failed");
			const upload = (await uploadResponse.json()) as UploadResult;
			const mediaResponse = await fetch("/api/admin/media", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ publicId: upload.public_id, url: upload.secure_url, alt: file.name, folder: signature.folder, resourceType: "image" }),
			});
			if (!mediaResponse.ok) throw new Error("Media metadata save failed");
			return { url: upload.secure_url, publicId: upload.public_id };
		},
		onSuccess: onUploaded,
		onError: (uploadError) => setError(uploadError.message),
	});

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) return;
		event.target.value = "";
		setError(null);
		uploadMutation.mutate(file);
	}

	return (
		<div>
			<label className="admin-border-strong admin-border-hover admin-text-strong inline-flex min-h-11 cursor-pointer items-center border px-3 py-2 text-xs transition">
				<input type="file" accept="image/*" onChange={handleChange} disabled={uploadMutation.isPending} className="sr-only" />
				{uploadMutation.isPending ? "Uploading..." : "Upload to Cloudinary"}
			</label>
			{error && <p className="admin-danger mt-2 text-xs">{error}</p>}
		</div>
	);
}
