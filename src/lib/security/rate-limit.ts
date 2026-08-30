import "server-only";

import { redis } from "@/lib/redis";

type RateLimitOptions = {
	namespace: string;
	identifier: string;
	limit: number;
	windowMs: number;
};

export async function checkRateLimit(options: RateLimitOptions): Promise<boolean> {
	const bucket = Math.floor(Date.now() / options.windowMs);
	const key = `rate-limit:${options.namespace}:${options.identifier}:${bucket}`;
	const attemptCount = await redis.incr(key);
	if (attemptCount === 1) {
		await redis.expire(key, Math.ceil(options.windowMs / 1000) + 1);
	}
	return attemptCount <= options.limit;
}

