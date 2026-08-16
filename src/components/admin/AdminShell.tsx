"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { AdminUser } from "@/types/admin";

type AdminShellProps = {
	admin: AdminUser;
	children: ReactNode;
};

const navigation = [
	{ href: "/admin", label: "Dashboard" },
	{ href: "/admin/content", label: "Site content" },
	{ href: "/admin/projects", label: "Projects" },
	{ href: "/admin/posts", label: "Blog posts" },
] as const;

export function AdminShell({ admin, children }: AdminShellProps) {
	const pathname = usePathname();
	const router = useRouter();

	async function handleLogout() {
		await fetch("/api/admin/logout", { method: "POST" });
		router.replace("/admin/login");
		router.refresh();
	}

	return (
		<div className="admin-background admin-text min-h-screen">
			<div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
				<aside className="admin-border border-b p-6 lg:w-64 lg:border-r lg:border-b-0">
					<div className="mb-10">
						<p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.25em]">
							Portfolio admin
						</p>
						<p className="mt-2 text-lg font-semibold">Content control</p>
					</div>
					<nav className="flex gap-2 overflow-x-auto lg:flex-col">
						{navigation.map((item) => {
							const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
							return (
								<Link
									key={item.href}
							href={item.href}
									className={`whitespace-nowrap rounded-sm px-3 py-2 text-sm transition ${isActive ? "admin-action" : "admin-text-muted admin-surface-hover admin-text-hover"}`}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
					<div className="admin-border mt-10 border-t pt-5">
						<p className="admin-text-subtle truncate text-xs">{admin.email}</p>
						<button
							type="button"
							onClick={handleLogout}
							className="admin-text-muted admin-text-hover mt-3 text-xs underline-offset-4 hover:underline"
						>
							Sign out
						</button>
					</div>
				</aside>
				<main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
			</div>
		</div>
	);
}
