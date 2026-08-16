import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { AWARDS, CAREER_ENTRIES, CERTIFICATES, SKILLS, STATS, TIMELINE_YEARS, YEAR_WIDTH } from "../src/data/about";
import { PROJECTS } from "../src/data/projects";
import { APPROACH_STEPS, FAQS, SERVICES, TECH_STACKS, TESTIMONIALS } from "../src/data/services";
import { NAV_LINKS, SITE, SOCIAL_LINKS, TAGS } from "../src/data/site";
import { SECTION_ORDER } from "../src/data/work-details";

const copy = {
	global: {
		metadata: {
			title: "Home — Le Duc Anh",
			description:
				"Full-stack software engineer specializing in building scalable, modern applications with a strong eye for interface detail, product clarity and long-term maintainability.",
			icon: "/logo.svg",
		},
		header: {
			primaryNavigationAriaLabel: "Primary navigation",
			getInTouch: "Get in touch",
			menu: "Menu",
			contact: "Contact",
		},
		footer: {
			brandDescription: "Building scalable products with precise editorial interfaces.",
			navigation: "Navigation",
			connect: "Connect",
			location: "Location",
			locationLines: ["Da Nang", "Vietnam"],
			availability: "Available",
			copyrightSuffix: "All Rights Reserved",
			craftedWith: "Crafted with Precision",
		},
	},
	home: {
		metadata: {
			title: "Home — Le Duc Anh",
			description:
				"Software engineer and designer in Da Nang building scalable products with precise editorial interfaces.",
		},
		hero: {
			nameLines: ["Le Duc", "Anh"],
			akaLabel: "Aka:",
			handle: "ldanh270",
			role: "Software Engineer / Context Engineer",
			description:
				"I build scalable, modern applications with a strong eye for interface detail, product clarity and long-term maintainability.",
			location: "Da Nang, Vietnam",
			scrollLabel: "Scroll",
		},
		projects: {
			marquee: "Our work.",
			label: "Selected projects",
			description:
				"Crafted ideas, real impact. A curated selection where design, engineering, and strategy meet.",
			viewAllLabel: "View all projects →",
		},
		services: {
			marquee: "Services.",
			viewAllLabel: "See all SERVICES →",
		},
	},
	about: {
		metadata: {
			title: "About — Le Duc Anh",
			description: "About Le Duc Anh, software engineer and designer in Da Nang, Vietnam.",
		},
		marquee: "About me.",
		hero: {
			headline:
				"Software engineer building scalable, high-impact products based on strong algorithms foundation.",
			cta: "Let's work together →",
			paragraphs: [
				"I'm Le Duc Anh, a software engineer based in Da Nang, Vietnam. I bridge the gap between robust backend engineering and thoughtful interface design.",
				"I got into programming through competitive coding — spending weekends grinding algorithms, graph problems, and optimisation challenges. That foundation gave me something most developers don't have: the ability to think before I write a single line.",
				"Today I build full-stack products — web, mobile, and AI-powered systems — for clients who need things done right the first time.",
				"I don't do cookie-cutter. Every project starts with understanding the problem, then I build the simplest solution that works at scale.",
				"With experience across the full stack, I specialise in architecting performant applications that hold up under real-world conditions. Every project starts with understanding people — their goals, constraints, and workflows.",
			],
		},
		skills: {
			heading: "Skills",
			description:
				"Fullstack engineering toolkit for product interfaces, server systems, mobile builds, AI workflows, and deployment.",
		},
		timeline: {
			eyebrow: "Career Timeline",
			heading: "Journey",
			description:
				"Bridging the gap between university classrooms and production environments. Discover the milestones that shape my career evolution.",
		},
		certificates: {
			eyebrow: "Verified Credentials",
			heading: "Certificates",
			description:
				"Transforming academic knowledge into verified expertise. Explore the credentials that mark my evolution as a developer.",
		},
		awards: {
			eyebrow: "Recognition",
			heading: "Awards",
			description:
				"Milestones of recognition across competitions, academics, and open-source contributions that fuel my drive to build better software.",
		},
	},
	services: {
		metadata: {
			title: "Services — Le Duc Anh",
			description:
				"Strategy, design, full-stack development, mobile, consulting and ongoing support. Clean process. Reliable delivery.",
		},
		marquee: "Our work.",
		sections: {
			services: {
				label: "What I offer",
				description: "From idea to execution — smart digital solutions tailored to your goals.",
			},
			techStack: {
				label: "Tools of the trade",
				description:
					"Technologies I rely on to ship fast, maintainable, production-ready software.",
			},
			approach: {
				label: "How I work",
				description:
					"A structured process that turns ambiguous ideas into reliable, scalable products.",
			},
			faq: {
				label: "Common questions",
				description: "Answers to what most clients ask before we get started.",
			},
		},
	},
	work: {
		metadata: {
			title: "Work — Le Duc Anh",
			description: "Selected engineering and design projects by Le Duc Anh.",
		},
		marquee: "Our work.",
		section: {
			label: "All projects",
			description:
				"A curated selection of work where engineering, design, and strategy deliver real-world impact.",
		},
	},
	contact: {
		metadata: {
			title: "Contact — Le Duc Anh",
			description:
				"Contact Le Duc Anh for engineering, design, consulting, and product development work.",
		},
		marquee: "Get in touch.",
		eyebrow: "Contact",
		headline: "Let's build something great together.",
		form: {
			fields: {
				name: "Name",
				email: "Email",
				phone: "Phone",
				title: "Project Title / Subject",
				message: "Tell me about your project",
			},
			submit: "Send message",
			processing: "Processing...",
			successTitle: "Message sent",
			successDescription: "I'll get back to you soon.",
			errorTitle: "Failed to send message.",
			fallbackError: "Please try again.",
			unexpectedTitle: "An unexpected error occurred",
		},
		validation: {
			nameMin: "Name must be at least 2 characters",
			nameMax: "Name must be less than 50 characters",
			email: "Please enter a valid email address",
			phoneMin: "Phone number must be at least 10 digits",
			phoneMax: "Phone number too long",
			titleMin: "Title must be at least 3 characters",
			titleMax: "Title too long",
			messageMin: "Message must be at least 10 characters",
			messageMax: "Message must be less than 1000 characters",
		},
	},
	workDetail: {
		fallbackMetadataTitle: "Work — Le Duc Anh",
		header: {
			projectLabel: "Project",
			yearLabel: "Year",
			roleLabel: "Role",
			technologiesLabel: "Technologies",
			aboutLabel: "About this project",
		},
		sections: {
			overview: "Overview",
			role: "My Role",
			features: "Key Features",
			featureLabel: "Feature",
			techStack: "Tech Stack",
			challengeSolution: "Challenge & Solution",
			challenge: "The Challenge",
			solution: "The Solution",
			results: "Results",
			impact: "Impact",
			lessons: "Lessons Learned",
			screenshots: "Screenshots",
			screenshotInstruction: "Swipe or use the arrows.",
			links: "Links",
		},
		interaction: {
			view: "View",
			readCaseStudy: "Read case study",
			relatedWork: "Related Work",
			moreCaseStudies: "More case studies",
			contents: "Contents",
			previousScreenshot: "Previous screenshot",
			nextScreenshot: "Next screenshot",
			defaultScreenshotTitle: "Screenshot",
			defaultScreenshotDescription: "Project interface screenshot.",
			defaultLoading: "Loading...",
		},
	},
	cta: {
		eyebrow: "Ready to build?",
		headlineLines: ["Let's work", "together."],
		button: "Get in touch ↗",
	},
} as const;

const snapshot = {
	schemaVersion: 1,
	source: "static-portfolio",
	copy,
	site: {
		profile: SITE,
		tags: TAGS,
		socialLinks: SOCIAL_LINKS,
		navigation: NAV_LINKS,
	},
	about: {
		stats: STATS,
		skills: SKILLS,
		careerEntries: CAREER_ENTRIES,
		timelineYears: TIMELINE_YEARS,
		yearWidth: YEAR_WIDTH,
		certificates: CERTIFICATES,
		awards: AWARDS,
	},
	services: {
		services: SERVICES,
		approachSteps: APPROACH_STEPS,
		techStacks: TECH_STACKS,
		testimonials: TESTIMONIALS,
		faqs: FAQS,
	},
	projects: PROJECTS,
	workDetailSectionOrder: SECTION_ORDER.map(({ type, label, id }) => ({ type, label, id })),
	posts: [],
	assets: {
		logo: "/logo.svg",
		avatar: "/avatar.png",
		workPlaceholder: "/work-placeholder.svg",
	},
};

const outputPath = resolve(process.cwd(), "src/data/seed/current-content.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Exported current portfolio content to ${outputPath}`);
