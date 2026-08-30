"use server";

import { SITE } from "@/data/site";
import { headers } from "next/headers";
import { Resend } from "resend";
import {
	CONTACT_EMAIL_FROM,
	CONTACT_RATE_LIMIT_MAX_ATTEMPTS,
	CONTACT_RATE_LIMIT_WINDOW_MS,
} from "@/config/contact";
import { redis } from "@/lib/redis";
import { getClientIdentifier, hashIdentifier } from "@/lib/security/client-identifier";
import { escapeHtml } from "@/lib/security/html";
import { checkRateLimit } from "@/lib/security/rate-limit";
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

	const { website, ...validatedData } = validation.data;
	if (website) return { success: true };

	const requestHeaders = await headers();
	const clientIdentifier = getClientIdentifier(requestHeaders);
	const rateLimitIdentifier =
		clientIdentifier === "unknown" ? hashIdentifier(validatedData.email.toLowerCase()) : clientIdentifier;
	const timestamp = new Date().toISOString();
	const inquiryId = `inquiry:${timestamp}:${validatedData.email}`;

	try {
		const canSend = await checkRateLimit({
			namespace: "contact",
			identifier: rateLimitIdentifier,
			limit: CONTACT_RATE_LIMIT_MAX_ATTEMPTS,
			windowMs: CONTACT_RATE_LIMIT_WINDOW_MS,
		});
		if (!canSend) {
			return { success: false, error: "Too many messages. Please try again later." };
		}

		const safeData = {
			name: escapeHtml(validatedData.name),
			title: escapeHtml(validatedData.title),
			email: escapeHtml(validatedData.email),
			phone: escapeHtml(validatedData.phone),
			message: escapeHtml(validatedData.message),
		};
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
				from: CONTACT_EMAIL_FROM,
				to: [SITE.email],
				replyTo: validatedData.email,
				subject: `New Inquiry: ${validatedData.title}`,
				html: `
						<div style="font-family: sans-serif; color: #0a0a0a;">
							<h2>New Inquiry from ${safeData.name}</h2>
							<p><strong>Title:</strong> ${safeData.title}</p>
							<p><strong>Email:</strong> ${safeData.email}</p>
							<p><strong>Phone:</strong> ${safeData.phone}</p>
							<hr />
							<p style="white-space: pre-wrap;">${safeData.message}</p>
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
