import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-syne",
});

const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["300", "400"],
	style: ["normal", "italic"],
	variable: "--font-dm-mono",
});

export const metadata: Metadata = {
	title: "Home — Le Duc Anh",
	description:
		"Full-stack software engineer specializing in building scalable, modern applications with a strong eye for interface detail, product clarity and long-term maintainability.",
	icons: {
		icon: "/logo.svg",
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`${syne.variable} ${dmMono.variable}`}
		>
			<body className="bg-brand-white font-display text-brand-black antialiased">
				<Toaster
					position="bottom-right"
					offset={24}
					gap={10}
					visibleToasts={3}
					toastOptions={{
						duration: 4200,
						classNames: {
							toast: "portfolio-toast",
							title: "portfolio-toast-title",
							description: "portfolio-toast-description",
							icon: "portfolio-toast-icon",
							closeButton: "portfolio-toast-close",
						},
					}}
				/>
				<SiteChrome>{children}</SiteChrome>
			</body>
		</html>
	);
}
