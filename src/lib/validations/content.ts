import "server-only";

import { z } from "zod";
import type { AdminContentKey } from "@/config/admin";
import type { CmsContent } from "@/types/content";

const NonEmptyString = z.string().min(1);
const StringList = z.array(z.string());
const LabelDescriptionSchema = z.object({
	label: NonEmptyString,
	description: z.string(),
});

const SiteContentSchema = z.object({
	profile: z.object({
		name: NonEmptyString,
		shortName: NonEmptyString,
		email: z.string().email(),
		location: NonEmptyString,
	}),
	tags: StringList,
	socialLinks: z.array(z.object({ label: NonEmptyString, value: NonEmptyString, href: NonEmptyString })),
	navigation: z.array(z.object({ label: NonEmptyString, href: NonEmptyString })),
});

const AboutContentSchema = z.object({
	stats: z.array(z.object({ number: z.number().nonnegative(), suffix: z.string(), label: NonEmptyString })),
	skills: z.record(z.string(), StringList),
	careerEntries: z.array(z.object({
		type: z.enum(["experience", "education"]),
		start: NonEmptyString,
		end: NonEmptyString,
		title: NonEmptyString,
		place: NonEmptyString,
		description: z.string(),
		lane: z.number().int().nonnegative(),
	})),
	timelineYears: z.array(NonEmptyString),
	yearWidth: z.number().positive(),
	certificates: z.array(z.object({
		label: NonEmptyString,
		title: NonEmptyString,
		description: z.string(),
		tags: StringList,
		url: z.string().url(),
		issuer: NonEmptyString,
	})),
	awards: z.array(z.object({
		title: NonEmptyString,
		position: NonEmptyString,
		date: NonEmptyString,
		description: z.string(),
		category: NonEmptyString,
		tags: StringList,
		url: z.string().url().optional(),
	})),
});

const ServicesContentSchema = z.object({
	services: z.array(z.object({
		id: NonEmptyString,
		number: NonEmptyString,
		title: NonEmptyString,
		description: z.string(),
		tags: StringList,
	})),
	approachSteps: z.array(z.object({
		id: NonEmptyString,
		number: NonEmptyString,
		title: NonEmptyString,
		description: z.string(),
		duration: NonEmptyString,
		deliverables: StringList,
	})),
	techStacks: z.array(z.object({ id: NonEmptyString, category: NonEmptyString, tools: StringList })),
	testimonials: z.array(z.object({
		id: NonEmptyString,
		quote: NonEmptyString,
		author: NonEmptyString,
		role: NonEmptyString,
		company: NonEmptyString,
	})),
	faqs: z.array(z.object({ id: NonEmptyString, question: NonEmptyString, answer: NonEmptyString })),
});

const CopyContentSchema = z.object({
	home: z.object({
		hero: z.object({
			nameLines: z.array(NonEmptyString),
			handle: NonEmptyString,
			role: NonEmptyString,
			description: z.string(),
			location: NonEmptyString,
		}).passthrough(),
		projects: z.object({
			marquee: NonEmptyString,
			label: NonEmptyString,
			description: z.string(),
			viewAllLabel: NonEmptyString,
		}),
		services: z.object({ marquee: NonEmptyString, viewAllLabel: NonEmptyString }),
	}).passthrough(),
	services: z.object({
		marquee: NonEmptyString,
		sections: z.object({
			services: LabelDescriptionSchema,
			techStack: LabelDescriptionSchema,
			approach: LabelDescriptionSchema,
			faq: LabelDescriptionSchema,
		}),
	}).passthrough(),
	about: z.object({
		marquee: NonEmptyString,
		hero: z.object({ headline: NonEmptyString, cta: NonEmptyString, paragraphs: z.array(NonEmptyString) }),
		skills: z.object({ heading: NonEmptyString, description: z.string() }),
	}).passthrough(),
	work: z.object({ marquee: NonEmptyString, section: LabelDescriptionSchema }).passthrough(),
	contact: z.object({ marquee: NonEmptyString, eyebrow: NonEmptyString, headline: NonEmptyString }).passthrough(),
}).passthrough();

const WorkDetailContentSchema = z.object({
	sectionOrder: z.array(z.object({
		type: NonEmptyString,
		label: NonEmptyString,
		id: NonEmptyString,
	})),
});

const CONTENT_SCHEMAS = {
	site: SiteContentSchema,
	about: AboutContentSchema,
	services: ServicesContentSchema,
	copy: CopyContentSchema,
	workDetail: WorkDetailContentSchema,
} satisfies Record<AdminContentKey, z.ZodType>;

type StoredContent = Omit<CmsContent, "projects">;

export const ContentUpdateEnvelopeSchema = z.object({ data: z.unknown() });

export function parseContentDocument<Key extends AdminContentKey>(
	key: Key,
	data: unknown,
): StoredContent[Key] {
	return CONTENT_SCHEMAS[key].parse(data) as StoredContent[Key];
}

