import "server-only";

import { redis } from "@/lib/redis";

type RateLimitOptions = {
	namespace: string;
	identifier: string;
	limit: number;
	windowMs: number;
};

type MemoryRecord = {
	count: number;
	resetAt: number;
};

const memoryStore = new Map<string, MemoryRecord>();

function checkMemoryRateLimit(options: RateLimitOptions): boolean {
	const now = Date.now();
	const key = `${options.namespace}:${options.identifier}`;
	const record = memoryStore.get(key);

	// Prune old entries if map grows
	if (memoryStore.size > 1000) {
		for (const [k, v] of memoryStore.entries()) {
			if (v.resetAt < now) {
				memoryStore.delete(k);
			}
		}
	}

	if (!record || record.resetAt <= now) {
		memoryStore.set(key, { count: 1, resetAt: now + options.windowMs });
		return options.limit >= 1;
	}

	record.count += 1;
	return record.count <= options.limit;
}

const REDIS_TIMEOUT_MS = 1500;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
	let timer: NodeJS.Timeout | undefined;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new Error("Redis operation timed out")), timeoutMs);
	});
	return Promise.race([promise, timeout]).finally(() => {
		if (timer) clearTimeout(timer);
	});
}

export async function checkRateLimit(options: RateLimitOptions): Promise<boolean> {
	try {
		const bucket = Math.floor(Date.now() / options.windowMs);
		const key = `rate-limit:${options.namespace}:${options.identifier}:${bucket}`;
		const attemptCount = await withTimeout(redis.incr(key), REDIS_TIMEOUT_MS);
		if (attemptCount === 1) {
			await withTimeout(
				redis.expire(key, Math.ceil(options.windowMs / 1000) + 1),
				REDIS_TIMEOUT_MS,
			);
		}
		return attemptCount <= options.limit;
	} catch (error) {
		console.warn(
			`[RateLimit] Redis unavailable (${error instanceof Error ? error.message : "unknown"}), falling back to in-memory store.`,
		);
		return checkMemoryRateLimit(options);
	}
}

