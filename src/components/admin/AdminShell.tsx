"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BookOpen, BriefcaseBusiness, Contact, ExternalLink, FileText, Home, LayoutDashboard, LogOut, Settings2, UserRound, Wrench } from "lucide-react";
import type { AdminUser } from "@/types/admin";

type AdminShellProps = {
	admin: AdminUser;
	children: ReactNode;
};

const navigation = [
	{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/admin/home", label: "Home", icon: Home },
	{ href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
	{ href: "/admin/services", label: "Services", icon: Settings2 },
	{ href: "/admin/tools", label: "Tools", icon: Wrench },
	{ href: "/admin/about", label: "About", icon: UserRound },
	{ href: "/admin/contact", label: "Contact", icon: Contact },
	{ href: "/admin/work", label: "Work detail", icon: FileText },
	{ href: "/admin/posts", label: "Blog", icon: BookOpen },
] as const;

export function AdminShell({ admin, children }: AdminShellProps) {
	const pathname = usePathname();
	const router = useRouter();
	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch("/api/admin/logout", { method: "POST" });
			if (!response.ok) throw new Error("Unable to sign out");
		},
		onSuccess: () => {
			router.replace("/admin/login");
			router.refresh();
		},
	});

	return (
		<div className="admin-background admin-text min-h-screen overflow-x-hidden">
			<div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
				<aside className="admin-border flex flex-col border-b lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-r lg:border-b-0">
					<div className="p-4 sm:p-6">
						<p className="admin-text-subtle font-mono text-[10px] uppercase tracking-[0.25em]">
							Portfolio admin
						</p>
						<p className="mt-2 text-lg font-semibold">Content control</p>
					<nav className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 lg:mt-10 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Admin sections">
						{navigation.map((item) => {
							const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
							const Icon = item.icon;
							return (
								<Link
									key={item.href}
									href={item.href}
									aria-current={isActive ? "page" : undefined}
									className={`inline-flex min-h-11 items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm transition ${isActive ? "admin-action" : "admin-text-muted admin-surface-hover admin-text-hover"}`}
								>
									<Icon size={15} strokeWidth={1.8} aria-hidden="true" />
									{item.label}
								</Link>
							);
						})}
					</nav>
					</div>
					<div className="admin-border mt-auto border-t p-4 sm:p-6">
						<p className="admin-text-subtle truncate text-xs">{admin.email}</p>
						<div className="mt-4 grid gap-2">
							<Link
								href="/"
								target="_blank"
								rel="noopener noreferrer"
								className="admin-border admin-surface-hover admin-text-strong inline-flex min-h-11 items-center justify-between border px-3 py-2.5 text-xs transition"
							>
								<span>View frontend</span>
								<ExternalLink size={13} aria-hidden="true" />
							</Link>
							<button
								type="button"
								onClick={() => logoutMutation.mutate()}
								disabled={logoutMutation.isPending}
								className="admin-text-muted admin-text-hover inline-flex min-h-11 w-full items-center justify-between px-3 py-2.5 text-left text-xs transition hover:bg-white/5 disabled:cursor-wait disabled:opacity-50"
							>
								<span>{logoutMutation.isPending ? "Signing out..." : "Sign out"}</span>
								<LogOut size={13} aria-hidden="true" />
							</button>
						</div>
					</div>
				</aside>
				<main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
			</div>
		</div>
	);
}
