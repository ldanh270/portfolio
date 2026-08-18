import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
	return (
		<main className="admin-background admin-text grid min-h-screen place-items-center px-4 py-10 sm:px-6">
			<div className="w-full max-w-md">
				<p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.25em]">
					Le Duc Anh
				</p>
				<h1 className="mt-3 text-[clamp(2.25rem,8vw,3rem)] font-semibold tracking-tight">Admin sign in</h1>
				<p className="admin-text-muted mt-3 text-sm leading-6">
					Manage site content, projects and blog posts.
				</p>
				<div className="admin-border admin-surface mt-8 rounded-sm border p-4 sm:p-6">
					<AdminLoginForm />
				</div>
			</div>
		</main>
	);
}
