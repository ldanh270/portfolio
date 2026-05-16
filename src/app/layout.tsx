import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";
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
					position="top-center"
					richColors
				/>
				<SmoothScroll>
					<CustomCursor />
					<Header />
					<PageTransition>{children}</PageTransition>
					<Footer />
				</SmoothScroll>
			</body>
		</html>
	);
}
