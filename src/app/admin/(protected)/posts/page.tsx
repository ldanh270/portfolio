import { AdminPostsClient } from "@/components/admin/AdminPostsClient";
import { ComingSoonOverlay } from "@/components/admin/ComingSoonOverlay";

export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
	return <ComingSoonOverlay><AdminPostsClient /></ComingSoonOverlay>;
}
