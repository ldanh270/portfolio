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
		slug: "kiro",
		number: "05",
		title: "Kiro",
		summary:
			"Contribution to Kiro, an agentic IDE and CLI for spec-driven development, hooks, powers, MCP integrations, and codebase-aware AI workflows.",
		description:
			"Kiro is an agentic development environment from kirodotdev that helps developers move from prototype to production through structured specs, natural-language coding assistance, automation hooks, steering files, MCP servers, and powers.",
		tags: ["TypeScript", "AI", "Developer Tools", "MCP", "CLI"],
		year: "2026",
		role: "Open Source Contributor",
		link: "https://github.com/kirodotdev/Kiro",
		image: "/images/works/kiro/banner.png",
		content: {
			overview:
				"Kiro is a developer tool built around spec-driven AI workflows. It offers a desktop IDE and CLI, with features that turn prompts into structured implementation plans, automate repeated tasks, and bring project-specific context into agent behavior.",
			roleDetail:
				"Contributed to the public repository as part of open-source development. The portfolio value is the exposure to agentic developer-tool workflows, issue-driven collaboration, and the product patterns behind specs, hooks, steering context, MCP servers, and powers.",
			features: [
				{
					title: "Spec-Driven Development",
					description:
						"Structured specs break feature work into requirements, design direction, and implementation tasks.",
				},
				{
					title: "Agentic Chat",
					description:
						"Natural-language coding assistant works with codebase context instead of isolated prompts.",
				},
				{
					title: "Automation Hooks",
					description:
						"Hooks respond to file changes and development events to automate repetitive engineering work.",
				},
				{
					title: "Steering Files",
					description:
						"Project-specific markdown instructions guide agent behavior and keep team conventions close to the code.",
				},
				{
					title: "MCP Integrations",
					description:
						"Model Context Protocol support connects external tools and data sources to the development workflow.",
				},
				{
					title: "Powers",
					description:
						"On-demand specialized context and tools extend agent capabilities for domain-specific work.",
				},
			],
			techStack: [
				{
					category: "Product",
					tools: ["Kiro IDE", "Kiro CLI", "Specs", "Hooks", "Steering"],
				},
				{
					category: "Agent Platform",
					tools: ["Agentic Chat", "MCP Servers", "Powers", "Codebase Context"],
				},
				{
					category: "Contribution",
					tools: ["GitHub Issues", "Open Source Workflow", "TypeScript"],
				},
			],
			challengeSolution: {
				challenge:
					"AI coding tools need more than chat. Developers need repeatable plans, project-specific rules, automation triggers, privacy-conscious workflows, and integration points for external context.",
				solution:
					"Kiro approaches the problem as a full developer environment: specs structure the work, steering files guide behavior, hooks automate repeated tasks, MCP connects external systems, and powers provide targeted capabilities when needed.",
			},
			lessons: [
				"Agentic developer tools become more reliable when planning artifacts are explicit and versionable.",
				"Project-level instructions are a product feature, not just prompt text.",
				"Good AI tooling reduces context switching by meeting developers inside their normal IDE and CLI workflows.",
			],
			links: [
				{
					label: "GitHub Repository",
					href: "https://github.com/kirodotdev/Kiro",
					type: "github",
				},
				{
					label: "My Contribution Issue",
					href: "https://github.com/kirodotdev/Kiro/issues/2946",
					type: "case-study",
				},
			],
		},
	},
	{
		slug: "smart-pc-store",
		number: "01",
		title: "Smart PC Store",
		summary:
			"Full-stack PC hardware commerce platform with admin operations, JWT auth, QR checkout, analytics, AI chat, and price forecasting.",
		description:
			"Smart PC Store is a complete e-commerce system for PC components and gaming gear. The platform combines a Next.js storefront, a Java Jakarta EE backend, and a Python AI microservice for product advice and price prediction.",
		tags: ["Next.js", "Java", "PostgreSQL", "FastAPI", "AI"],
		year: "2026",
		role: "Lead Developer, Project Manager, Code Reviewer",
		link: "https://github.com/ldanh270/smart-pc-store",
		image: "/work-placeholder.svg",
		content: {
			overview:
				"Smart PC Store was built as a production-style commerce platform for PC components, gaming gear, suppliers, stock movement, and order management. The system is split into focused services: a modern customer/admin frontend, an enterprise Java REST API, and an AI server that enriches the buying experience with market-aware recommendations and price forecasts.",
			roleDetail:
				"Led the project direction, backend architecture, frontend integration, code review, and delivery planning. The work included defining API boundaries, shaping the admin workflows, implementing authentication flows, coordinating AI integration, and keeping the multi-repo system deployable and documented.",
			features: [
				{
					title: "Customer Storefront",
					description:
						"Product catalog, product detail pages, cart flow, checkout, QR payment path, and account pages built with Next.js App Router and React 19.",
				},
				{
					title: "Admin Operations",
					description:
						"Admin panel for products, categories, orders, users, suppliers, stock imports, and operational analytics.",
				},
				{
					title: "JWT Authentication",
					description:
						"Access-token and refresh-token flow with Axios interceptors, silent refresh, and race-condition-safe token rotation.",
				},
				{
					title: "Enterprise Backend API",
					description:
						"Jakarta EE backend with layered controllers, services, DAOs, DTOs, JPA/Hibernate entities, RBAC, and PostgreSQL persistence.",
				},
				{
					title: "AI Shopping Assistant",
					description:
						"FastAPI microservice that answers product questions, reads product data, and returns suggested products for the storefront chat widget.",
				},
				{
					title: "Price Forecasting",
					description:
						"Forecast endpoint that uses supplier quotation history and Markov-style prediction to power 7-day price trend charts.",
				},
			],
			techStack: [
				{
					category: "Frontend",
					tools: [
						"Next.js 16",
						"React 19",
						"TypeScript",
						"Tailwind CSS v4",
						"shadcn/ui",
						"TanStack Query",
						"Zustand",
						"Recharts",
					],
				},
				{
					category: "Backend",
					tools: [
						"Java 17",
						"Jakarta EE",
						"Hibernate",
						"PostgreSQL",
						"Maven",
						"Tomcat",
						"JWT",
						"Docker",
					],
				},
				{
					category: "AI Service",
					tools: [
						"Python",
						"FastAPI",
						"Supabase",
						"OpenAI-compatible API",
						"FPT Cloud AI",
						"NumPy",
						"Vercel",
					],
				},
			],
			challengeSolution: {
				challenge:
					"The project needed to support both customer shopping flows and internal inventory operations while also connecting a separate AI service to live product and supplier-pricing data. Keeping authentication, admin CRUD, checkout, analytics, and AI responses consistent across three repositories was the main complexity.",
				solution:
					"Separated the system by responsibility: Next.js owns UX and client state, Jakarta EE owns commerce rules and persistence, and FastAPI owns AI chat plus forecasting. The frontend talks to stable domain services, the backend exposes role-aware REST endpoints, and the AI server periodically syncs product and price-history data for grounded recommendations.",
			},
			results: [
				{ metric: "Repos", value: "3" },
				{ metric: "Admin Domains", value: "6" },
				{ metric: "Backend Layers", value: "5" },
				{ metric: "Forecast Window", value: "7" },
			],
			lessons: [
				"Multi-repo products need clear ownership boundaries early; otherwise frontend, backend, and AI changes become tightly coupled.",
				"Admin workflows are easier to maintain when every domain owns a narrow service, store, and type contract.",
				"AI features work better as product infrastructure when they return structured data, not only natural-language answers.",
			],
			screenshots: [
				{
					title: "Customer Storefront",
					description:
						"Commerce experience for browsing PC hardware, reviewing product detail, adding to cart, and checking out.",
					variant: "commerce",
				},
				{
					title: "Admin Command Center",
					description:
						"Operational workspace for products, orders, users, suppliers, stock imports, and revenue charts.",
					variant: "dashboard",
				},
			],
			links: [
				{
					label: "Backend Repository",
					href: "https://github.com/ldanh270/smart-pc-store",
					type: "github",
				},
				{
					label: "Frontend Repository",
					href: "https://github.com/ldanh270/smart-pc-store-frontend",
					type: "github",
				},
				{
					label: "AI Repository",
					href: "https://github.com/ldanh270/smart-pc-store-ai",
					type: "github",
				},
			],
		},
	},
	{
		slug: "youth-for-change",
		number: "02",
		title: "Youth for Change",
		summary:
			"SDG-focused landing page, learning hub, and Notion-powered blog platform for the Youth for Change initiative at UD-UFLS.",
		description:
			"Youth for Change is a Next.js platform for communicating the 17 United Nations Sustainable Development Goals through a landing page, SDG learning pages, team storytelling, a flipbook, and a Notion-backed blog system.",
		tags: ["Next.js", "TypeScript", "Notion", "Tailwind CSS", "SEO"],
		year: "2026",
		role: "Frontend Developer",
		link: "https://github.com/ldanh270/youth-for-change",
		image: "/work-placeholder.svg",
		content: {
			overview:
				"Youth for Change turns SDG education into a structured digital experience. The homepage introduces the initiative, the SDG section explains all 17 goals with official color mapping, and the blog system lets the team publish updates from Notion without changing code.",
			roleDetail:
				"Built the Next.js application structure, reusable UI sections, SDG data model, Notion content pipeline, blog routes, theme behavior, and responsive layouts. The work balanced editorial clarity with maintainable frontend architecture.",
			features: [
				{
					title: "SDG Landing Experience",
					description:
						"Homepage with hero slider, SDG carousel, impact statistics, latest posts, sticky navigation, and mission-oriented sections.",
				},
				{
					title: "Notion Blog CMS",
					description:
						"Notion API integration maps database pages into typed blog cards and detail pages with markdown conversion.",
				},
				{
					title: "Static Blog Detail Pages",
					description:
						"Blog posts generate static params and metadata for fast loading, shareable pages, and better search visibility.",
				},
				{
					title: "SDG Filtering",
					description:
						"Blog list supports SDG badge filters through URL query state so readers can explore content by goal.",
				},
				{
					title: "Design System",
					description:
						"Typography, brand colors, light/dark mode, and official UN SDG colors are centralized in documented style files and CSS tokens.",
				},
				{
					title: "Team and Flipbook Pages",
					description:
						"About page presents project members and mission, while the flipbook route embeds external campaign material.",
				},
			],
			techStack: [
				{
					category: "Application",
					tools: ["Next.js 16", "React 19", "TypeScript", "App Router"],
				},
				{
					category: "Content",
					tools: ["Notion API", "notion-to-md", "next-mdx-remote", "date-fns"],
				},
				{
					category: "Interface",
					tools: [
						"Tailwind CSS v4",
						"Radix UI",
						"lucide-react",
						"framer-motion",
						"next-themes",
					],
				},
			],
			challengeSolution: {
				challenge:
					"The site had to feel like a campaign platform, a learning hub, and a blog at the same time. Content needed to be easy for non-developers to update while still supporting SEO, SDG filtering, official color usage, and consistent responsive layouts.",
				solution:
					"Used Notion as the editorial source, converted pages into typed blog models, and kept SDG metadata centralized. The frontend uses reusable sections and token-driven styling so campaign pages, SDG cards, and blog content stay visually aligned.",
			},
			results: [
				{ metric: "SDGs Covered", value: "17" },
				{ metric: "Core Routes", value: "5" },
				{ metric: "CMS Source", value: "1" },
				{ metric: "Theme Modes", value: "2" },
			],
			lessons: [
				"Editorial platforms stay maintainable when content, metadata, and visual tokens are separate concerns.",
				"URL-based filters make content discovery shareable and easier to reason about than hidden component state.",
				"Documenting typography and color decisions reduces design drift as new pages are added.",
			],
			screenshots: [
				{
					title: "SDG Homepage",
					description:
						"Campaign landing page with rotating stories, SDG carousel, impact metrics, and recent Notion posts.",
					variant: "system",
				},
				{
					title: "Blog Detail",
					description:
						"SEO-ready article page with cover image, breadcrumbs, SDG badge, metadata, and markdown content.",
					variant: "dashboard",
				},
			],
			links: [
				{
					label: "GitHub Repository",
					href: "https://github.com/ldanh270/youth-for-change",
					type: "github",
				},
			],
		},
	},
	{
		slug: "smart-glass",
		number: "03",
		title: "Smart Glass",
		summary:
			"Realtime smart-glass system with an ESP32 OLED display pipeline and a TypeScript WebSocket server for live translation streams.",
		description:
			"Smart Glass combines embedded display firmware and a Node.js backend to support low-latency text streaming for wearable translation scenarios. The IoT side handles queueing, buffer management, and OLED scrolling; the server owns HTTP state and WebSocket delivery.",
		tags: ["ESP32", "C++", "TypeScript", "WebSocket", "IoT"],
		year: "2026",
		role: "IoT & Backend Developer",
		link: "https://github.com/ldanh270/smart-glass-iot",
		image: "/work-placeholder.svg",
		content: {
			overview:
				"Smart Glass focuses on realtime text visualization for wearable or near-eye display use cases. The embedded app receives incoming text chunks, queues them safely, renders readable text on an OLED display, and scrolls long messages smoothly. The backend provides REST endpoints and a WebSocket channel for live translation and navigation data.",
			roleDetail:
				"Built the embedded display service, queue-driven rendering loop, OLED scrolling behavior, and backend WebSocket lifecycle. The work required balancing readable UX on constrained hardware with reliable low-latency server communication.",
			features: [
				{
					title: "Realtime Text Ingestion",
					description:
						"Incoming text is accepted through a push API, buffered through a queue, and consumed on a controlled display loop.",
				},
				{
					title: "OLED Scroll Renderer",
					description:
						"Long messages are measured in pixels and rendered as a seamless horizontal scrolling loop with configurable gap spacing.",
				},
				{
					title: "Bounded Display Buffer",
					description:
						"Sliding-window trimming keeps the display buffer within memory limits while preserving recent readable content.",
				},
				{
					title: "ESP32 PlatformIO Build",
					description:
						"Firmware targets a Freenove ESP32-S3 WROOM board with Arduino, Adafruit GFX, SSD1306, ArduinoJson, and ArduinoWebsockets.",
				},
				{
					title: "WebSocket Translation Channel",
					description:
						"Express server attaches a WebSocket server at /ws and initializes translation handling for each connection.",
				},
				{
					title: "Graceful Server Shutdown",
					description:
						"Shutdown handler closes active WebSocket clients, the WebSocket server, and the HTTP server to avoid orphaned connections.",
				},
			],
			techStack: [
				{
					category: "Firmware",
					tools: [
						"C++",
						"PlatformIO",
						"Arduino",
						"ESP32-S3",
						"Adafruit GFX",
						"Adafruit SSD1306",
					],
				},
				{
					category: "Backend",
					tools: ["Node.js", "TypeScript", "Bun", "Express", "ws", "Socket.IO", "dotenv"],
				},
				{
					category: "Realtime",
					tools: [
						"WebSocket",
						"Picovoice Cheetah",
						"Google Cloud Speech",
						"Axios",
						"Multer",
					],
				},
			],
			challengeSolution: {
				challenge:
					"Wearable displays have tight memory, timing, and readability constraints. Incoming translation text can arrive faster than the display should update, and long sentences must remain readable on a small OLED without flicker or heap pressure.",
				solution:
					"Decoupled producers from rendering with a queue, used fixed pop and render intervals, kept the text buffer bounded, and measured pixel width before enabling scrolling. On the server, WebSocket connection handling is isolated from REST state and includes explicit cleanup paths.",
			},
			results: [
				{ metric: "Repos", value: "2" },
				{ metric: "Display Mode", value: "OLED" },
				{ metric: "Realtime Channel", value: "WS" },
				{ metric: "Board Target", value: "ESP32" },
			],
			lessons: [
				"Embedded UI needs timing discipline; rendering on every incoming message creates flicker and unnecessary CPU load.",
				"Bounded buffers and explicit queue drops are better than hidden memory growth on constrained hardware.",
				"Realtime servers should close sockets intentionally during shutdown, especially when devices reconnect automatically.",
			],
			screenshots: [
				{
					title: "OLED Translation Display",
					description:
						"Near-eye display flow for listening state, short text rendering, and long-text scrolling.",
					variant: "system",
				},
				{
					title: "Realtime Server",
					description:
						"HTTP and WebSocket service for navigation state and translation stream delivery.",
					variant: "dashboard",
				},
			],
			links: [
				{
					label: "IoT Repository",
					href: "https://github.com/ldanh270/smart-glass-iot",
					type: "github",
				},
				{
					label: "Server Repository",
					href: "https://github.com/ldanh270/smart-glass-server",
					type: "github",
				},
			],
		},
	},
	{
		slug: "movie-on",
		number: "04",
		title: "MovieOn",
		summary:
			"Movie browsing interface built with Next.js 15, Supabase, Tailwind CSS v4, semantic theme tokens, and accessible UI primitives.",
		description:
			"MovieOn is a modern movie web interface focused on theming, accessibility, and clean frontend architecture. It uses Next.js App Router, TypeScript, Tailwind CSS v4, optimized fonts, and a Supabase-ready dependency stack.",
		tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "Design System"],
		year: "2025",
		role: "Fullstack Developer",
		link: "https://github.com/ldanh270/movie-on",
		image: "/images/works/movie-on/banner.png",
		content: {
			overview:
				"MovieOn explores a cinematic browsing experience with a strong foundation for theme switching, reusable tokens, optimized typography, and future content integration. The README emphasizes design-system quality as much as page implementation.",
			roleDetail:
				"Built the frontend architecture, theme provider, Tailwind token system, font setup, and reusable UI direction. The project was structured to make visual iteration fast without scattering colors or typography across components.",
			features: [
				{
					title: "Semantic Color Tokens",
					description:
						"Background, foreground, primary, muted, card, border, and focus-ring variants are centralized in Tailwind CSS v4 theme definitions.",
				},
				{
					title: "Optimized Typography",
					description:
						"Next.js font optimization wires Oswald, Source Sans 3, and Montserrat Alternates into CSS variables.",
				},
				{
					title: "Modern App Router",
					description:
						"Next.js App Router structure keeps root layout, page composition, theme providers, and global styles predictable.",
				},
				{
					title: "Accessible Primitives",
					description:
						"Radix UI primitives support dialogs, dropdowns, avatars, labels, popovers, and slots for accessible interaction patterns.",
				},
				{
					title: "Supabase-Ready Stack",
					description:
						"Supabase client dependency is included for database-backed movie content, auth, or serverless data features.",
				},
			],
			techStack: [
				{
					category: "Framework",
					tools: ["Next.js 15", "React 19", "TypeScript", "App Router"],
				},
				{
					category: "Styling",
					tools: ["Tailwind CSS v4", "CSS Variables", "next-themes", "tw-animate-css"],
				},
				{
					category: "UI and Data",
					tools: ["Radix UI", "lucide-react", "Sonner", "Supabase", "Embla Carousel"],
				},
			],
			challengeSolution: {
				challenge:
					"Movie interfaces can quickly become visually inconsistent when theme colors, display fonts, and interactive states are handled component by component. The project needed a clean base for cinematic UI without sacrificing accessibility or developer experience.",
				solution:
					"Built the UI around semantic theme tokens, class-based dark mode, optimized font variables, and reusable primitives. This keeps the visual language centralized while allowing pages and components to remain simple.",
			},
			lessons: [
				"Theme systems should start with semantic intent, not raw color names.",
				"Font roles are easier to maintain when headings, body, and accents map to explicit CSS variables.",
				"Small UI projects still benefit from production-grade structure when they are meant to grow.",
			],
			screenshots: [
				{
					title: "Home Page",
					description:
						"Cinematic browsing experience with centralized theme tokens, optimized fonts, and accessible UI patterns.",
					image: "/images/works/movie-on/full_home.png",
					variant: "system",
				},
				{
					title: "Discover Page",
					description:
						"Movie discovery interface with filterable categories, reusable card components, and consistent theming.",
					image: "/images/works/movie-on/discover.png",
					variant: "system",
				},
				{
					title: "Movie Details Page",
					description:
						"Individual movie view with detailed information, cast, and crew sections.",
					image: "/images/works/movie-on/movie-watch.png",
					variant: "system",
				},
				{
					title: "Category Details Page",
					description:
						"View movies within a specific category with detailed information and filtering options.",
					image: "/images/works/movie-on/category-details.png",
					variant: "system",
				},
				{
					title: "Bookmark Page",
					description:
						"View and manage saved movies with detailed information and filtering options.",
					image: "/images/works/movie-on/bookmark.png",
					variant: "system",
				},
				{
					title: "Feedback Page",
					description:
						"Provide feedback about the application with detailed information and filtering options.",
					image: "/images/works/movie-on/feedback.png",
					variant: "system",
				},
			],
			links: [
				{
					label: "GitHub Repository",
					href: "https://github.com/ldanh270/movie-on",
					type: "github",
				},
			],
		},
	},
];
