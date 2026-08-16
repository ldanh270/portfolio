import { AdminJsonEditor } from "@/components/admin/AdminJsonEditor";
import { ADMIN_CONTENT_KEYS, type AdminContentKey } from "@/config/admin";
import { getContentDocument } from "@/lib/db/content-repository";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
	const documents = await Promise.all(ADMIN_CONTENT_KEYS.map((key) => getContentDocument(key)));
	const values = new Map<AdminContentKey, unknown>();
	ADMIN_CONTENT_KEYS.forEach((key, index) => values.set(key, documents[index]?.data ?? {}));

	return (
		<div className="space-y-6">
			<div><p className="admin-text-subtle font-mono text-xs uppercase tracking-[0.2em]">CMS data</p><h1 className="mt-2 text-3xl font-semibold">Site content</h1><p className="admin-text-muted mt-3 max-w-3xl text-sm leading-6">Edit the seeded documents directly. The shape is intentionally identical to the current static content snapshot so the public adapter can be switched without rewriting data.</p></div>
			<div className="grid gap-5 xl:grid-cols-2">{ADMIN_CONTENT_KEYS.map((key) => <AdminJsonEditor key={key} contentKey={key} initialValue={values.get(key)} />)}</div>
		</div>
	);
}
