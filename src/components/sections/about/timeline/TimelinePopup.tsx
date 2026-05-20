import { type CareerEntry } from "@/data/about";
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
	const visibilityClass =
		isHovered ?
			`pointer-events-auto opacity-100 ${opensDown ? "translate-y-0" : "-translate-y-full"}`
		:	`opacity-0 ${opensDown ? "-translate-y-2" : "-translate-y-[calc(100%-0.5rem)]"}`;

	if (typeof window === "undefined") return null;

	return createPortal(
		<article
			className={`pointer-events-none fixed z-9999 w-[min(28rem,calc(100vw-2rem))] border border-brand-border bg-brand-white p-5 shadow-[0_18px_50px_rgba(10,10,10,0.12)] transition duration-300 ${visibilityClass}`}
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
			}}
		>
			<span
				aria-hidden="true"
				className="absolute left-5 right-5 top-0 h-px bg-brand-black"
			/>
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
