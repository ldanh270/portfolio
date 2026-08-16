import {
	ADMIN_LOGIN_MAX_ATTEMPTS,
	ADMIN_LOGIN_WINDOW_MS,
} from "@/config/admin";

type Attempt = {
	count: number;
	resetAt: number;
};

const attempts = new Map<string, Attempt>();

export function canAttemptLogin(identifier: string): boolean {
	const now = Date.now();
	const current = attempts.get(identifier);
	if (!current || current.resetAt <= now) {
		attempts.set(identifier, { count: 1, resetAt: now + ADMIN_LOGIN_WINDOW_MS });
		return true;
	}
	if (current.count >= ADMIN_LOGIN_MAX_ATTEMPTS) return false;
	current.count += 1;
	return true;
}
