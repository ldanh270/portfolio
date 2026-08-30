import { z } from "zod";

/**
 * Shared Contact Validation Schema
 * Applied on both Client (React Hook Form) and Server (Server Actions)
 */
export const ContactSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	email: z.string().email("Please enter a valid email address"),
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 digits")
		.max(15, "Phone number too long"),
	title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
	website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
