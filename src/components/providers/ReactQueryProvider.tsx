"use client";

import { QueryClient, QueryClientProvider, useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useState } from "react";
import { QUERY_DEFAULT_OPTIONS } from "@/config/query";

function QueryLoadingIndicator() {
	const fetchingCount = useIsFetching();
	const mutatingCount = useIsMutating();
	const isBusy = fetchingCount > 0 || mutatingCount > 0;

	return (
		<div
			role="status"
			aria-live="polite"
			aria-label={isBusy ? "Loading content" : undefined}
			className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-brand-black transition-[transform,opacity] duration-300 ${isBusy ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
		>
			<span className="sr-only">{isBusy ? "Loading content" : "Content ready"}</span>
		</div>
	);
}

export function ReactQueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [queryClient] = useState(() => new QueryClient({ defaultOptions: QUERY_DEFAULT_OPTIONS }));

	return (
		<QueryClientProvider client={queryClient}>
			<QueryLoadingIndicator />
			{children}
		</QueryClientProvider>
	);
}
