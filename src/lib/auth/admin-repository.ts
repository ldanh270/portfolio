import { ObjectId } from "mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { getDatabase } from "@/lib/db/mongodb";
import type { AdminRole, AdminUser } from "@/types/admin";

type StoredAdmin = {
	_id: ObjectId;
	email: string;
	passwordHash: string;
	role: AdminRole;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

function toAdminUser(admin: StoredAdmin): AdminUser {
	return {
		id: admin._id.toHexString(),
		email: admin.email,
		role: admin.role,
		isActive: admin.isActive,
	};
}

export async function findAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
	const database = await getDatabase();
	const admin = await database.collection<StoredAdmin>(COLLECTIONS.admins).findOne({
		email: email.toLowerCase(),
	});
	return admin ? { ...toAdminUser(admin), passwordHash: admin.passwordHash } : null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
	if (!ObjectId.isValid(id)) return null;
	const database = await getDatabase();
	const admin = await database.collection<StoredAdmin>(COLLECTIONS.admins).findOne({
		_id: new ObjectId(id),
	});
	return admin ? toAdminUser(admin) : null;
}

export async function upsertAdmin(input: {
	email: string;
	passwordHash: string;
	role: AdminRole;
}): Promise<void> {
	const database = await getDatabase();
	const now = new Date();
	await database.collection<StoredAdmin>(COLLECTIONS.admins).updateOne(
		{ email: input.email.toLowerCase() },
		{
			$set: {
				email: input.email.toLowerCase(),
				passwordHash: input.passwordHash,
				role: input.role,
				isActive: true,
				updatedAt: now,
			},
			$setOnInsert: { createdAt: now },
		},
		{ upsert: true },
	);
}
