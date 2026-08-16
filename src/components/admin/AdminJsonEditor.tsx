"use client";

import { useState } from "react";
import type { AdminContentKey } from "@/config/admin";

type EditorKey = AdminContentKey | "projects";

type AdminJsonEditorProps = {
	contentKey: EditorKey;
	initialValue: unknown;
};

export function AdminJsonEditor({ contentKey, initialValue }: AdminJsonEditorProps) {
	const [value, setValue] = useState(() => JSON.stringify(initialValue, null, 2));
	const [message, setMessage] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	async function handleSave() {
		setMessage(null);
		let data: unknown;
		try {
			data = JSON.parse(value) as unknown;
		} catch {
			setMessage("Invalid JSON");
			return;
		}

		setIsSaving(true);
		try {
			const endpoint = contentKey === "projects" ? "/api/admin/projects" : `/api/admin/content/${contentKey}`;
			const payload = contentKey === "projects" ? { projects: data } : { data };
			const response = await fetch(endpoint, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!response.ok) throw new Error("Save failed");
			setMessage("Saved");
		} catch {
			setMessage("Save failed");
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<section className="admin-border admin-surface rounded-sm border p-5">
			<div className="mb-4 flex items-center justify-between gap-4">
				<h2 className="admin-text-muted font-mono text-xs uppercase tracking-[0.2em]">{contentKey}</h2>
				<div className="flex items-center gap-3">
					{message && <span className="admin-text-muted text-xs">{message}</span>}
					<button
						type="button"
						onClick={handleSave}
						disabled={isSaving}
						className="admin-action px-3 py-2 text-xs font-semibold disabled:opacity-50"
					>
						{isSaving ? "Saving..." : "Save JSON"}
					</button>
				</div>
			</div>
			<textarea
				value={value}
				onChange={(event) => setValue(event.target.value)}
				spellCheck={false}
				className="admin-editor min-h-[28rem] w-full resize-y border p-4 font-mono text-xs leading-6 outline-none"
			/>
		</section>
	);
}
