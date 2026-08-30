import assert from "node:assert/strict";
import test from "node:test";
import snapshot from "@/data/seed/current-content.json";
import { parseContentDocument } from "./content";

test("current CMS snapshot satisfies every content schema", () => {
	assert.doesNotThrow(() => parseContentDocument("site", snapshot.site));
	assert.doesNotThrow(() => parseContentDocument("about", snapshot.about));
	assert.doesNotThrow(() => parseContentDocument("services", snapshot.services));
	assert.doesNotThrow(() => parseContentDocument("copy", snapshot.copy));
	assert.doesNotThrow(() =>
		parseContentDocument("workDetail", { sectionOrder: snapshot.workDetailSectionOrder }),
	);
});

test("malformed CMS payload is rejected", () => {
	assert.throws(() => parseContentDocument("site", { profile: {} }));
	assert.throws(() => parseContentDocument("about", { careerEntries: "invalid" }));
});

