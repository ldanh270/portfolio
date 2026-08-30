import {
	ADMIN_LOGIN_MAX_ATTEMPTS,
	ADMIN_LOGIN_WINDOW_MS,
} from "@/config/admin";
import { checkRateLimit } from "@/lib/security/rate-limit";

export function canAttemptLogin(identifier: string): Promise<boolean> {
	return checkRateLimit({
		namespace: "admin-login",
		identifier,
		limit: ADMIN_LOGIN_MAX_ATTEMPTS,
		windowMs: ADMIN_LOGIN_WINDOW_MS,
	});
}
