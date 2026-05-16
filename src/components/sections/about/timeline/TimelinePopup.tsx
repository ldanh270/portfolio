import { CareerEntry } from "@/data/about";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function TimelinePopup({
	entry,
	triggerRef,
	isHovered,
}: {
	entry: CareerEntry;
	triggerRef: React.RefObject<HTMLDivElement | null>;
	isHovered: boolean;
}) {
	const [position, setPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		if (!triggerRef.current || !isHovered) return;

		const rect = triggerRef.current.getBoundingClientRect();
		const opensDown = entry.lane < 2;

		setPosition({
			top: opensDown ? rect.bottom + 28 : rect.top - 28,
			left: rect.left,
		});
	}, [isHovered, entry.lane, triggerRef]);

	const opensDown = entry.lane < 2;

	if (typeof window === "undefined") return null;

	return createPortal(
		<article
			className={`pointer-events-none fixed z-9999 w-fit border border-brand-border bg-brand-white p-5 shadow-[8px_8px_0_#0a0a0a] transition-opacity duration-300 ${
				isHovered ? "pointer-events-auto opacity-100" : "opacity-0"
			} ${opensDown ? "" : "-translate-y-full"}`}
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
			}}
		>
			<header className="mb-4 flex items-start justify-between gap-4">
				<p className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.type}
				</p>
				<time className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{entry.start} — {entry.end}
				</time>
			</header>
			<h3 className="w-fit text-xl font-extrabold uppercase leading-tight tracking-tighter">
				{entry.title}
			</h3>
			<p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-widest text-brand-gray">
				{entry.place}
			</p>
			<p className="mt-4 text-sm leading-7 text-[#444]">{entry.description}</p>
		</article>,
		document.body,
	);
}
