import { MongoClient, type Db } from "mongodb";
import { getMongoConfig } from "@/config/env";

type MongoGlobal = typeof globalThis & {
	portfolioMongoClientPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as MongoGlobal;

function createClient(): Promise<MongoClient> {
	const { uri } = getMongoConfig();
	return new MongoClient(uri).connect();
}

export async function getDatabase(): Promise<Db> {
	const clientPromise = globalMongo.portfolioMongoClientPromise ?? createClient();
	globalMongo.portfolioMongoClientPromise = clientPromise;
	const { databaseName } = getMongoConfig();
	return (await clientPromise).db(databaseName);
}

export async function closeDatabase(): Promise<void> {
	const clientPromise = globalMongo.portfolioMongoClientPromise;
	globalMongo.portfolioMongoClientPromise = undefined;
	if (!clientPromise) return;
	const client = await clientPromise.catch(() => null);
	if (client) await client.close();
}
