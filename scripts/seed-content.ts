import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { seedContentFromSnapshot } from "../src/lib/db/seed-content";
import { closeDatabase } from "../src/lib/db/mongodb";

const snapshotPath = resolve(process.cwd(), "src/data/seed/current-content.json");

async function main() {
	const snapshot = JSON.parse(await readFile(snapshotPath, "utf8")) as unknown;
	const result = await seedContentFromSnapshot(snapshot);
	console.log(
		JSON.stringify(
			{
				seededContentKeys: result.contentKeys,
				seededProjects: result.projects,
				seededPosts: result.posts,
			},
			null,
			2,
		),
	);
}

async function run() {
	try {
		await main();
	} catch (error: unknown) {
		console.error(error);
		process.exitCode = 1;
	} finally {
		await closeDatabase();
	}
}

void run();
