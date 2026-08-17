import { AdminCms, type CmsTabKey } from "@/components/admin/AdminCms";
import { getAdminInitialContent } from "@/lib/content/admin-initial-content";

export async function AdminSectionPage({ tab }: { tab: CmsTabKey }) {
	const initialContent = await getAdminInitialContent();
	return <AdminCms initialContent={initialContent} initialTab={tab} showTabs={false} />;
}
