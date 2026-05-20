export function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ");
}

// Utility function to check if a value has meaningful data
export function hasData(value: unknown): boolean {
	if (value == null) return false;
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return true;
}
