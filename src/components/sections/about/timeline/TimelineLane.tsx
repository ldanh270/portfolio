import { RadialHover } from "@/components/ui/RadialHover.tsx";
import { TimelineRevealItem } from "@/components/ui/TimelineReveal.tsx";
import { CareerEntry, TIMELINE_YEARS, YEAR_WIDTH } from "@/data/about.ts";
import dynamic from "next/dynamic.js";
import { CSSProperties, useRef, useState } from "react";

const TimelinePopup = dynamic(() => import("./TimelinePopup"), {
	ssr: false,
	loading: () => <div style={{ display: "block" }}>Loading...</div>, // Optional placeholder
});

export default function TimelineLane({ entry }: { entry: CareerEntry }) {
	const triggerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const getStartOffset = (year: string): number => {
		const index = TIMELINE_YEARS.indexOf(year);
		return index >= 0 ? index * YEAR_WIDTH : 0;
	};

	const getEndOffset = (year: string): number => {
		const index = TIMELINE_YEARS.indexOf(year);
		return index >= 0 ? index * YEAR_WIDTH : TIMELINE_YEARS.length * YEAR_WIDTH;
	};

	const getLaneWidth = (entry: CareerEntry) => {
		return `${getEndOffset(entry.end) - getStartOffset(entry.start)}px`;
	};

	return (
		<>
			<TimelineRevealItem
				ref={triggerRef}
				className="group absolute z-10 h-11 hover:z-50 focus-within:z-50"
				style={
					{
						left: `${getStartOffset(entry.start)}px`,
						top: `${entry.lane * 4.25}rem`,
						width: getLaneWidth(entry),
					} as CSSProperties
				}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<RadialHover
					className="z-10 h-full w-full cursor-grab border border-brand-border bg-brand-white active:cursor-grabbing"
					contentClassName="flex h-full w-full items-center justify-between px-3"
					ariaLabel={`${entry.title}, ${entry.start} to ${entry.end}`}
					disableTapState
				>
					<span className="h-2.5 w-2.5 rounded-full border border-current bg-brand-white group-hover:bg-brand-black" />
					<span className="truncate px-3 font-mono text-[10px] uppercase tracking-widest">
						{entry.title}
					</span>
					<span className="h-2.5 w-2.5 rounded-full border border-current bg-brand-white group-hover:bg-brand-black" />
					<span className="absolute -bottom-5 left-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-gray">
						{entry.start}
					</span>
					<span className="absolute -bottom-5 right-0 font-mono text-[10px] uppercase tracking-widest text-brand-gray group-hover:text-brand-gray">
						{entry.end}
					</span>
				</RadialHover>
			</TimelineRevealItem>
			<TimelinePopup
				entry={entry}
				triggerRef={triggerRef}
				isHovered={isHovered}
			/>
		</>
	);
}
