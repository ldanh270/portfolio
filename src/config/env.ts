type RequiredEnvironmentKey =
	| "MONGODB_URI"
	| "MONGODB_DB_NAME"
	| "ADMIN_SESSION_SECRET"
	| "CLOUDINARY_CLOUD_NAME"
	| "CLOUDINARY_API_KEY"
	| "CLOUDINARY_API_SECRET";

function readRequired(name: RequiredEnvironmentKey): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

function readOptional(name: string): string | undefined {
	const value = process.env[name];
	return value || undefined;
}

export function getMongoConfig() {
	return {
		uri: readRequired("MONGODB_URI"),
		databaseName: process.env.MONGODB_DB_NAME || "portfolio",
	};
}

export function getAuthConfig() {
	return {
		sessionSecret: readRequired("ADMIN_SESSION_SECRET"),
		bootstrapEmail: readOptional("ADMIN_BOOTSTRAP_EMAIL"),
		bootstrapPassword: readOptional("ADMIN_BOOTSTRAP_PASSWORD"),
	};
}

export function getCloudinaryConfig() {
	return {
		cloudName: readRequired("CLOUDINARY_CLOUD_NAME"),
		apiKey: readRequired("CLOUDINARY_API_KEY"),
		apiSecret: readRequired("CLOUDINARY_API_SECRET"),
	};
}
