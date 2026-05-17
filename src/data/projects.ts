import type { ProjectContent } from "@/components/sections/work/content/types";

export type Project = {
	slug: string;
	number: string;
	title: string;
	summary: string;
	description: string;
	tags: string[];
	year: string;
	role: string;
	link?: string;
	image?: string;
	content?: ProjectContent;
};

export const PROJECTS: Project[] = [
	{
		slug: "e-commerce-platform",
		number: "01",
		title: "E-Commerce Platform",
		summary:
			"High-performance, multi-tenant e-commerce built on microservices architecture. Handles 50k+ concurrent users.",
		description:
			"A scalable commerce system designed for tenant isolation, fast catalogue operations, resilient checkout flows, and operational clarity under real traffic.",
		tags: ["React", "Node.js", "Microservices", "PostgreSQL", "Redis"],
		year: "2024",
		role: "Full-Stack Engineer",
		content: {
			overview:
				"A fast-scaling retailer needed a commerce platform that could survive flash-sale traffic spikes without degrading checkout reliability across multiple merchant tenants. The existing monolith was a single shared system — one slow query could bring down every storefront simultaneously.",
			roleDetail:
				"Led the full-stack architecture from initial audit through production rollout. Owned the frontend architecture in React, designed and built the microservice boundaries, implemented the Redis cart system, and enforced tenant isolation via PostgreSQL row-level security. Also drove the phased rollout strategy and post-migration performance monitoring.",
			features: [
				{
					title: "Multi-Tenant Isolation",
					description:
						"Row-level security in PostgreSQL ensures zero cross-tenant data leakage, even if application logic has a bug.",
				},
				{
					title: "Redis Cart Engine",
					description:
						"Distributed cart state with TTL-based sessions. Reduced cart operation latency from 140ms to 8ms average.",
				},
				{
					title: "Microservice Architecture",
					description:
						"Six independent services — catalogue, checkout, inventory, auth, notifications, payments — each owning its own schema and deployable independently.",
				},
				{
					title: "Strangler Fig Migration",
					description:
						"Zero-downtime live migration from monolith to microservices using feature flags. No big-bang rewrite.",
				},
				{
					title: "Real-Time Inventory",
					description:
						"Event-driven inventory updates via Redis pub/sub. Prevents overselling during concurrent flash-sale traffic.",
				},
				{
					title: "Admin Dashboard",
					description:
						"Multi-tenant admin panel with per-merchant analytics, order management, and inventory controls.",
				},
			],
			techStack: [
				{
					category: "Frontend",
					tools: ["React", "TypeScript", "Tailwind CSS", "React Query"],
				},
				{
					category: "Backend",
					tools: ["Node.js", "Express", "PostgreSQL", "Redis", "Prisma"],
				},
				{
					category: "Infrastructure",
					tools: ["Docker", "GitHub Actions", "AWS ECS", "Nginx"],
				},
			],
			challengeSolution: {
				challenge:
					"The monolith buckled under flash-sale load. Tenant data leaked between namespaces during high concurrency. Cart state was lost on server restarts. Re-architecture had to happen live — zero downtime, with real customers transacting throughout the migration.",
				solution:
					"Extracted services one at a time behind feature flags using the strangler fig pattern. Moved cart state to Redis with TTL-based sessions, eliminating both the latency and persistence problems simultaneously. Enforced tenant isolation at the PostgreSQL layer with row-level security — making data leaks a database-level guarantee, not an application assumption.",
			},
			results: [
				{ metric: "Concurrent Users", value: "50000" },
				{ metric: "Cart Latency (ms)", value: "8" },
				{ metric: "Uptime (%)", value: "99.9" },
				{ metric: "Services Deployed", value: "6" },
			],
			lessons: [
				"Strangler fig works — but requires disciplined feature-flag hygiene. Every flag is tech debt with an expiry date.",
				"Typed query builders that enforce tenant scope at compile time pay back their cost in security audit time within one quarter.",
				"Load test with realistic tenant distributions. Synthetic uniform traffic missed the flash-sale spike profile entirely.",
			],
			links: [
				{ label: "Live Demo", href: "#", type: "live" },
				{ label: "GitHub", href: "#", type: "github" },
			],
		},
	},
	{
		slug: "saas-analytics-dashboard",
		number: "02",
		title: "SaaS Analytics Dashboard",
		summary:
			"End-to-end analytics platform with real-time streaming, custom reporting, and multi-org support.",
		description:
			"A data-heavy SaaS product built for teams that need fast insight without fragile reporting workflows. Typed dashboards, real-time event streams, org-level permissions, and visual reporting patterns that stay usable at scale.",
		tags: ["Next.js", "TypeScript", "Kafka", "D3.js", "AWS"],
		year: "2024",
		role: "Lead Engineer",
		content: {
			overview:
				"Product teams were exporting CSVs and building reports in spreadsheets because the analytics tools available couldn't surface org-level insights fast enough. The goal: any query a PM or growth engineer could imagine returns in under two seconds — regardless of org size or event volume.",
			roleDetail:
				"Led a team of three engineers. Owned architectural decisions end-to-end: Kafka event pipeline design, pre-aggregation strategy, D3 chart abstraction layer, and org permission graph. Also drove the design system for the dashboard UI and set up the CI/CD and monitoring infrastructure.",
			features: [
				{
					title: "Real-Time Event Streaming",
					description:
						"Kafka-powered event ingestion with 60-second pre-aggregation. Dashboards always feel live without hammering the primary DB.",
				},
				{
					title: "Custom Report Builder",
					description:
						"Drag-and-drop report builder with 12 chart types. Non-technical users can build and save custom dashboards without engineering support.",
				},
				{
					title: "Multi-Org Permission Graph",
					description:
						"Recursive directed permission graph supporting nested team hierarchies. Enterprise orgs can model complex access control without workarounds.",
				},
				{
					title: "Typed D3 Chart Abstractions",
					description:
						"Chart type → data contract abstraction. Designers change visual output; D3 internals never need to be touched.",
				},
				{
					title: "Sub-2s Dashboard Loads",
					description:
						"Pre-aggregated summary tables replace raw event queries. Load time is independent of event volume — scales to billions of events.",
				},
				{
					title: "Scheduled Reports",
					description: "Email and Slack delivery of scheduled report snapshots with configurable frequency and recipient lists.",
				},
			],
			techStack: [
				{
					category: "Frontend",
					tools: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"],
				},
				{
					category: "Backend",
					tools: ["Node.js", "Kafka", "PostgreSQL", "Redis"],
				},
				{
					category: "Infrastructure",
					tools: ["AWS", "Docker", "GitHub Actions", "Datadog"],
				},
			],
			challengeSolution: {
				challenge:
					"Fan-out query explosion at scale: a single dashboard load triggered 40+ independent DB queries, one per widget per org. As orgs grew their event volume, dashboard load times grew linearly — hitting 14 seconds for larger accounts. The real-time feed was polling every 5 seconds, creating a thundering herd against the primary DB during peak hours.",
				solution:
					"Moved real-time event ingestion off the primary DB onto Kafka, with a consumer service pre-aggregating events into materialized summary tables every 60 seconds. Dashboard queries hit summaries — query time became independent of event volume. Batched 40+ widget queries into 4 typed query groups, and redesigned the permission system as a recursive CTE with a 30s cache.",
			},
			results: [
				{ metric: "Dashboard Load (s)", value: "1.2" },
				{ metric: "DB CPU Drop (%)", value: "60" },
				{ metric: "Query Cost Down (%)", value: "74" },
				{ metric: "Orgs Supported", value: "200" },
			],
			lessons: [
				"Pre-aggregation is a product decision, not just a technical one. The 60s staleness window needed explicit sign-off — skipping that conversation caused friction during QA.",
				"Typed chart abstractions compound. The effort to build the first abstraction paid back on every subsequent chart.",
				"Distributed tracing from day one would have saved two weeks of profiling work. Instrument first, optimize second.",
			],
			links: [
				{ label: "Live Product", href: "#", type: "live" },
				{ label: "GitHub", href: "#", type: "github" },
			],
		},
	},
	{
		slug: "mobile-banking-app",
		number: "03",
		title: "Mobile Banking App",
		summary:
			"Fintech mobile app for payments and account management. 99.9% uptime, built with React Native + Go.",
		description:
			"A mobile banking experience focused on trust, speed, and reliability. Work spanned interaction design, React Native implementation, GraphQL integration, Go services, release hardening, and production incident prevention.",
		tags: ["React Native", "Go", "GraphQL", "Firebase"],
		year: "2023",
		role: "Mobile Engineer & Designer",
		content: {
			overview:
				"A regional bank's Cordova-based mobile app had a 2.1-star App Store rating. Users complained about slow load times, frequent crashes mid-transaction, and a UI unchanged since 2018. The mandate: replace the app entirely, maintain 99.9% uptime during migration, and pass regulatory compliance requirements.",
			roleDetail:
				"Handled the full product lifecycle: interaction design and Figma prototyping, React Native implementation, the Go gateway service design, GraphQL schema, biometric auth hardening, and phased rollout strategy. Also ran usability testing sessions and owned the App Store submission process.",
			features: [
				{
					title: "Biometric Authentication",
					description:
						"FaceID on iOS, Fingerprint on Android — using platform secure enclave. Tested across 14 Android OEM profiles including Samsung One UI and OPPO.",
				},
				{
					title: "Instant Transfers",
					description:
						"P2P transfers complete in under 1.5 seconds end-to-end via the Go gateway. Real-time balance updates via GraphQL subscriptions.",
				},
				{
					title: "Bill Payment",
					description:
						"Scheduled and one-time bill payments with confirmation receipts and push notification delivery.",
				},
				{
					title: "Transaction History",
					description:
						"Paginated, searchable, filterable transaction history with export to PDF. Offline-capable with local cache.",
				},
				{
					title: "Go API Gateway",
					description:
						"Translates legacy SOAP backend into a typed GraphQL API. Owns rate limiting, auth token refresh, and mobile-optimized response shaping.",
				},
				{
					title: "Phased Rollout",
					description:
						"5% → 20% → 50% → 100% rollout via Firebase Remote Config with automated gates on crash-free rate and p95 transaction completion.",
				},
			],
			techStack: [
				{
					category: "Mobile",
					tools: ["React Native", "Expo", "Reanimated", "Zustand"],
				},
				{
					category: "Backend",
					tools: ["Go", "GraphQL", "gRPC", "SOAP (legacy)"],
				},
				{
					category: "Platform",
					tools: ["Firebase", "Fastlane", "GitHub Actions"],
				},
			],
			challengeSolution: {
				challenge:
					"Cordova's WebView had a memory leak crashing the app after 8–12 minutes of use — exactly the duration of a typical session. Biometric auth was inconsistent across Android OEM keyboards. The backend was a SOAP service with no versioning strategy, making mobile-friendly API design impossible without a gateway layer.",
				solution:
					"Rebuilt entirely in React Native. Built a Go gateway service that translated SOAP into a typed GraphQL API — decoupling mobile development from legacy backend constraints entirely. Implemented biometric auth via platform secure enclaves with a PIN fallback. Phased rollout with automated crash-rate gates caught one edge case at 20% before it reached 80% of users.",
			},
			results: [
				{ metric: "App Store Rating", value: "4.6" },
				{ metric: "Uptime (%)", value: "99.9" },
				{ metric: "Payload Down (%)", value: "52" },
				{ metric: "Session Up (%)", value: "34" },
			],
			lessons: [
				"Prototype before code in fintech. Every hour of Figma usability testing saved at least a day of post-launch bug fixing.",
				"Phased rollout gates must be automated. Manual gates get skipped under launch pressure.",
				"Test biometric auth on actual Android OEM devices. Samsung One UI keyboard overlays break flows that pass all simulator tests.",
			],
			links: [
				{ label: "App Store", href: "#", type: "live" },
				{ label: "Google Play", href: "#", type: "live" },
			],
		},
	},
	{
		slug: "design-system",
		number: "04",
		title: "Open Source Design System",
		summary:
			"Scalable component library used across 3 enterprise products. 80+ components with full Figma integration.",
		description:
			"A design engineering initiative that aligned product teams around accessible primitives, durable tokens, Storybook documentation, and Figma-ready component contracts.",
		tags: ["Design System", "Storybook", "Figma", "WCAG 2.1"],
		year: "2023",
		role: "Design Engineer",
		content: {
			overview:
				"Three product teams at the same company were building the same Button component in three different ways. A design audit found 47 distinct button implementations across the codebase. Engineers were spending 30% of sprint time resolving visual inconsistencies instead of shipping features.",
			roleDetail:
				"Sole design engineer on the project. Defined the three-tier token architecture, built all 80+ components, wrote the Storybook documentation, wired Figma Code Connect, implemented the CI accessibility enforcement pipeline, and ran the adoption program across three product teams.",
			features: [
				{
					title: "Three-Tier Token System",
					description:
						"Primitives → semantics → component overrides. Dark mode shipped in 3 days after tokens were in place. Zero component code changes.",
				},
				{
					title: "80+ Accessible Components",
					description:
						"Button, Input, Select, Modal, Drawer, Toast, Tabs, Accordion, and more. Every component WCAG 2.1 AA compliant out of the box.",
				},
				{
					title: "Figma Code Connect",
					description:
						"Every component in the Figma library linked to its Storybook story. Click a component in Figma → jump to live interactive docs.",
				},
				{
					title: "CI Accessibility Enforcement",
					description:
						"Contrast-checking script in CI fails builds when token changes violate AA ratios. axe-core integrated into Storybook for interactive checks.",
				},
				{
					title: "Storybook Documentation",
					description:
						"Interactive documentation, visual regression testing, and accessibility reports in one tool the team already knew.",
				},
				{
					title: "Champion-Led Adoption",
					description:
						"Per-team design system champions with early access and API influence. 3 teams adopted fully within 4 months, zero forks.",
				},
			],
			techStack: [
				{
					category: "Components",
					tools: ["React", "TypeScript", "Radix UI", "Tailwind CSS"],
				},
				{
					category: "Documentation",
					tools: ["Storybook", "Figma", "Figma Code Connect"],
				},
				{
					category: "Quality",
					tools: ["axe-core", "Chromatic", "GitHub Actions"],
				},
			],
			challengeSolution: {
				challenge:
					"Design systems fail at adoption, not at construction. The previous attempt at a shared library was abandoned after 6 months because it was too rigid — teams couldn't customize without forking. The new system had to be opinionated enough to enforce consistency, flexible enough that forking was never necessary.",
				solution:
					"Built a three-tier token system where theming required changing only the semantic → primitive mapping. Components had a documented extension pattern for customization without forking. Adoption was driven through champions rather than mandates — each team had a designated engineer with early access and influence over the API design.",
			},
			results: [
				{ metric: "Components Built", value: "80" },
				{ metric: "Products Covered", value: "3" },
				{ metric: "WCAG AA (%)", value: "100" },
				{ metric: "Adoption (months)", value: "4" },
			],
			lessons: [
				"Token naming is product design. Bad token names get ignored; good names make the right choice obvious.",
				"Adoption needs champions, not mandates. Find the engineers who care about quality and give them ownership.",
				"Accessibility enforced in CI is worth more than any audit. Audits are snapshots; CI enforcement is continuous.",
			],
			links: [
				{ label: "Storybook Docs", href: "#", type: "live" },
				{ label: "GitHub", href: "#", type: "github" },
				{ label: "Figma Library", href: "#", type: "other" },
			],
		},
	},
];
