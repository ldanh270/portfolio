"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useActiveSectionSpy } from "@/hooks/useActiveSectionSpy";

type TocSection = {
	id: string;
	label: string;
};

type TableOfContentsProps = {
	sections: TocSection[];
};

function scrollToSection(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: "smooth" });
}

function TocList({
	sections,
	activeId,
	onSelect,
}: {
	sections: TocSection[];
	activeId: string;
	onSelect?: () => void;
}) {
	return (
		<nav>
			<p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-gray">
				Contents
			</p>
			<ul className="space-y-1">
				{sections.map((s) => {
					const isActive = activeId === s.id;
					return (
						<li key={s.id}>
							<button
								onClick={() => {
									scrollToSection(s.id);
									onSelect?.();
								}}
								className={`flex w-full items-center gap-2 py-1 text-left text-sm transition-colors duration-200 ${
									isActive
										? "font-semibold text-brand-black"
										: "text-brand-gray hover:text-brand-black"
								}`}
							>
								{isActive && (
									<span className="inline-block h-1 w-3 shrink-0 rounded-full bg-brand-black" />
								)}
								{!isActive && <span className="inline-block w-5 shrink-0" />}
								{s.label}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export function TableOfContents({ sections }: TableOfContentsProps) {
	const sectionIds = sections.map((s) => s.id);
	const activeId = useActiveSectionSpy(sectionIds);
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<>
			{/* Desktop: sticky sidebar */}
			<div className="hidden lg:block">
				<div className="sticky top-24 px-6 pb-8 pt-16">
					<TocList sections={sections} activeId={activeId} />
				</div>
			</div>

			{/* Mobile: floating button + drawer */}
			<div className="lg:hidden">
				<button
					onClick={() => setDrawerOpen(true)}
					aria-label="Open table of contents"
					className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center border border-brand-border bg-brand-white shadow-md transition hover:bg-[rgba(10,10,10,0.04)]"
				>
					<span className="font-mono text-xs font-medium tracking-wider">
						≡
					</span>
				</button>

				<AnimatePresence>
					{drawerOpen && (
						<>
							{/* Backdrop */}
							<motion.div
								key="backdrop"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="fixed inset-0 z-40 bg-brand-black/30"
								onClick={() => setDrawerOpen(false)}
							/>

							{/* Drawer */}
							<motion.div
								key="drawer"
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								exit={{ y: "100%" }}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
								className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-brand-white px-6 pb-10 pt-6"
							>
								<div className="mb-4 flex items-center justify-between">
									<p className="font-mono text-xs uppercase tracking-widest text-brand-gray">
										Contents
									</p>
									<button
										onClick={() => setDrawerOpen(false)}
										aria-label="Close table of contents"
										className="font-mono text-xs text-brand-gray hover:text-brand-black"
									>
										✕
									</button>
								</div>
								<TocList
									sections={sections}
									activeId={activeId}
									onSelect={() => setDrawerOpen(false)}
								/>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
