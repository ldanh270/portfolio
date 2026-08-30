export type TimelineTick = {
	label: string;
	offset: number;
};

export type TimelineScale = {
	currentOffset: number;
	startYear: number;
	ticks: TimelineTick[];
	totalWidth: number;
	yearWidth: number;
};

type TimelineDate = {
	monthIndex: number;
	year: number;
};

function parseTimelineDate(value: string): TimelineDate | null {
	const match = /^(\d{4})(?:-(0[1-9]|1[0-2]))?$/.exec(value.trim());
	if (!match) return null;

	return {
		monthIndex: match[2] ? Number(match[2]) - 1 : 0,
		year: Number(match[1]),
	};
}

function parseYear(value: string): number | null {
	return parseTimelineDate(value)?.year ?? null;
}

function getYearProgress(now: Date): number {
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();
	const monthStart = Date.UTC(year, month, 1);
	const nextMonthStart = Date.UTC(year, month + 1, 1);
	const monthProgress = (now.getTime() - monthStart) / (nextMonthStart - monthStart);
	return (month + monthProgress) / 12;
}

function createYearTicks(startYear: number, currentYear: number, yearWidth: number) {
	return Array.from({ length: currentYear - startYear + 1 }, (_, index) => ({
		label: String(startYear + index),
		offset: index * yearWidth,
	}));
}

export function createTimelineScale(years: string[], yearWidth: number, now: Date): TimelineScale {
	const configuredYears = years.map(parseYear).filter((year): year is number => year !== null);
	const currentYear = now.getUTCFullYear();
	const startYear = Math.min(...configuredYears, currentYear);
	const currentOffset = (currentYear - startYear + getYearProgress(now)) * yearWidth;
	const ticks = [
		...createYearTicks(startYear, currentYear, yearWidth),
		{ label: "Now", offset: currentOffset },
	];

	return { currentOffset, startYear, ticks, totalWidth: currentOffset + yearWidth, yearWidth };
}

export function getTimelineOffset(value: string, scale: TimelineScale): number {
	if (value.trim().toLowerCase() === "now") return scale.currentOffset;

	const date = parseTimelineDate(value);
	if (date === null) return 0;

	const offset = (date.year - scale.startYear + date.monthIndex / 12) * scale.yearWidth;
	return Math.min(Math.max(offset, 0), scale.currentOffset);
}
