import { z } from "zod";
import { ADMIN_CONTENT_KEYS } from "@/config/admin";

export const AdminLoginSchema = z.object({
	email: z.string().email("Enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export const ContentKeySchema = z.enum(ADMIN_CONTENT_KEYS);

export const ContentUpdateSchema = z.object({
	data: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]),
});

const ProjectSchema = z
	.object({
		slug: z.string().min(1),
		number: z.string().min(1),
		title: z.string().min(1),
		summary: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		year: z.string(),
		role: z.string(),
		link: z.string().url().optional(),
		image: z.string().optional(),
		content: z.record(z.string(), z.unknown()).optional(),
	})
	.passthrough();

export const ProjectsUpdateSchema = z.object({
	projects: z.array(ProjectSchema),
});

const CoverImageSchema = z.object({
	url: z.string().url(),
	publicId: z.string().optional(),
	alt: z.string().min(1),
});

export const BlogPostSchema = z.object({
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug"),
	title: z.string().min(1).max(160),
	excerpt: z.string().max(320),
	body: z.string().min(1),
	tags: z.array(z.string().min(1)).max(20),
	status: z.enum(["draft", "published"]),
	publishedAt: z.string().datetime().nullable(),
	coverImage: CoverImageSchema.optional(),
	seo: z
		.object({
			title: z.string().max(160).optional(),
			description: z.string().max(320).optional(),
		})
		.optional(),
});

export const MediaSignatureSchema = z.object({
	folder: z.string().regex(/^[a-zA-Z0-9/_-]+$/).optional(),
});

export const MediaInputSchema = z.object({
	publicId: z.string().min(1),
	url: z.string().url(),
	alt: z.string().min(1),
	folder: z.string().min(1),
	resourceType: z.string().default("image"),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
export type BlogPostPayload = z.infer<typeof BlogPostSchema>;
