import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createTimelineScale, getTimelineOffset } from "./timelineScale";

describe("timeline month scale", () => {
	it("positions month values proportionally within a year", () => {
		const scale = createTimelineScale(["2024", "Now"], 360, new Date("2026-09-01T00:00:00Z"));
		const januaryOffset = getTimelineOffset("2026-01", scale);
		const septemberOffset = getTimelineOffset("2026-09", scale);

		assert.equal(septemberOffset - januaryOffset, 240);
	});
});
