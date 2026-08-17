function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeDefaults<T>(defaults: T, value: unknown): T {
	if (Array.isArray(defaults)) return (Array.isArray(value) ? value : defaults) as T;
	if (!isRecord(defaults)) return (value ?? defaults) as T;
	if (!isRecord(value)) return defaults;

	const merged: Record<string, unknown> = { ...defaults };
	for (const [key, defaultValue] of Object.entries(defaults)) {
		merged[key] = mergeDefaults(defaultValue, value[key]);
	}
	for (const [key, currentValue] of Object.entries(value)) {
		if (!(key in merged)) merged[key] = currentValue;
	}
	return merged as T;
}
