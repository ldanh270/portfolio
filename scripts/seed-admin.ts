import { getAuthConfig } from "../src/config/env";
import { upsertAdmin } from "../src/lib/auth/admin-repository";
import { hashPassword } from "../src/lib/auth/password";
import { ensureDatabaseIndexes } from "../src/lib/db/indexes";
import { closeDatabase } from "../src/lib/db/mongodb";

async function main() {
	const { bootstrapEmail, bootstrapPassword } = getAuthConfig();
	if (!bootstrapEmail || !bootstrapPassword) {
		throw new Error(
			"Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD before running admin:seed",
		);
	}

	await ensureDatabaseIndexes();
	await upsertAdmin({
		email: bootstrapEmail,
		passwordHash: await hashPassword(bootstrapPassword),
		role: "owner",
	});

	console.log(`Bootstrapped admin user: ${bootstrapEmail}`);
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
