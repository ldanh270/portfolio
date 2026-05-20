import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
	children: ReactNode;
	variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-neutral-950 text-white shadow-[0_10px_0_#d9ff4a] hover:-translate-y-1 hover:shadow-[0_14px_0_#d9ff4a]",
	secondary:
		"border border-neutral-950 bg-white text-neutral-950 shadow-[0_10px_0_#111] hover:-translate-y-1 hover:shadow-[0_14px_0_#111]",
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
	return (
		<Link
			className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400 ${variantClasses[variant]} ${className}`}
			{...props}
		>
			{children}
		</Link>
	);
}
