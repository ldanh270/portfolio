export const ADMIN_BASE_PATH = "/admin";
export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
export const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
export const ADMIN_LOGIN_MAX_ATTEMPTS = 5;
export const CLOUDINARY_DEFAULT_FOLDER = "portfolio";

export const ADMIN_CONTENT_KEYS = ["site", "about", "services", "copy", "workDetail"] as const;

export type AdminContentKey = (typeof ADMIN_CONTENT_KEYS)[number];
