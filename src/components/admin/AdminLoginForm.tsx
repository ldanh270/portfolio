"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!response.ok) {
				const body = (await response.json()) as { error?: string };
				throw new Error(body.error ?? "Unable to sign in");
			}
			router.replace("/admin");
			router.refresh();
		} catch (submitError) {
			setError(submitError instanceof Error ? submitError.message : "Unable to sign in");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<label className="block text-sm">
				<span className="admin-text-muted mb-2 block">Email</span>
				<input
					type="email"
					autoComplete="email"
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					className="admin-input"
				/>
			</label>
			<label className="block text-sm">
				<span className="admin-text-muted mb-2 block">Password</span>
				<input
					type="password"
					autoComplete="current-password"
					required
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					className="admin-input"
				/>
			</label>
			{error && <p className="admin-danger text-sm">{error}</p>}
			<button
				type="submit"
				disabled={isSubmitting}
				className="admin-action w-full px-4 py-3 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-50"
			>
				{isSubmitting ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
}
