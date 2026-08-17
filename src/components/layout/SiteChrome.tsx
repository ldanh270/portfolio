"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_BASE_PATH } from "@/config/admin";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";

type SiteChromeProps = {
	children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
	const pathname = usePathname();
	if (pathname.startsWith(ADMIN_BASE_PATH)) return <div className="admin-page">{children}</div>;

	return (
		<SmoothScroll>
			<CustomCursor />
			<Header />
			<PageTransition>{children}</PageTransition>
			<Footer />
		</SmoothScroll>
	);
}
