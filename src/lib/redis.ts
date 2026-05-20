import { Redis } from "@upstash/redis";

/**
 * Upstash Redis Client
 * Used as a high-performance, serverless database for recording inquiries.
 * Better for TTI and cold starts than traditional SQL DBs in a portfolio.
 */
export const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
