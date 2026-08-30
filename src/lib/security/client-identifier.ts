import { createHash } from "node:crypto";
import { isIP } from "node:net";

const CLIENT_IP_HEADERS = [
	"x-vercel-forwarded-for",
	"cf-connecting-ip",
	"x-real-ip",
	"x-forwarded-for",
] as const;

function getValidIp(value: string | null): string | null {
	if (!value) return null;
	const candidates = value.split(",").map((candidate) => candidate.trim()).reverse();
	return candidates.find((candidate) => isIP(candidate) > 0) ?? null;
}

export function getClientIdentifier(headers: Headers): string {
	for (const header of CLIENT_IP_HEADERS) {
		const ip = getValidIp(headers.get(header));
		if (ip) return hashIdentifier(ip);
	}
	return "unknown";
}

export function hashIdentifier(value: string): string {
	return createHash("sha256").update(value).digest("hex");
}

