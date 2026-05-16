"use server";

import { site } from "@/data/site";
import { Resend } from "resend";
import { redis } from "@/lib/redis";
import { ContactSchema, type ContactInput } from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Server Action: Process Contact Form
 * Handles DB saving and Email sending in parallel for optimal performance.
 * Implements graceful degradation: DB failure is critical, Email failure is not.
 */
export async function sendEmail(data: ContactInput) {
	// 1. Server-side validation (Security layer)
	const validation = ContactSchema.safeParse(data);
	if (!validation.success) {
		return {
			success: false,
			error: "Invalid data provided. Please check your inputs.",
		};
	}

	const validatedData = validation.data;
	const timestamp = new Date().toISOString();
	const inquiryId = `inquiry:${timestamp}:${validatedData.email}`;

	try {
		// 2. Parallel Operations using Promise.allSettled
		// We execute DB save and Email send concurrently to reduce TTI
		const [dbResult, emailResult] = await Promise.allSettled([
			// Task A: Save to Database (Critical)
			redis.hset(inquiryId, {
				...validatedData,
				createdAt: timestamp,
			}),

			// Task B: Send Email (Non-critical / Graceful degradation)
			resend.emails.send({
				from: "Portfolio Contact <onboarding@resend.dev>",
				to: [site.email],
				replyTo: validatedData.email,
				subject: `New Inquiry: ${validatedData.title}`,
				html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>New Inquiry from ${validatedData.name}</h2>
            <p><strong>Title:</strong> ${validatedData.title}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <hr />
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
          </div>
        `,
			}),
		]);

		// 3. Evaluate results
		if (dbResult.status === "rejected") {
			console.error("Critical Failure: DB Save failed", dbResult.reason);
			return { success: false, error: "System busy. Please try again later." };
		}

		if (emailResult.status === "rejected") {
			// Log error quietly but return success as data is safely in DB
			console.warn("Soft Failure: Email delivery failed", emailResult.reason);
		}

		return { success: true };
	} catch (error) {
		console.error("Unexpected error in sendEmail action:", error);
		return { success: false, error: "An unexpected error occurred." };
	}
}
