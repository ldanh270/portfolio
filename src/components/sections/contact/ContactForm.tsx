"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ContactSchema, type ContactInput } from "@/lib/validations/contact";
import { sendEmail } from "@/lib/contact.ts";
import { cn } from "@/lib/utils";

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
	},
};

const fieldClassName =
	"w-full border-b border-brand-border bg-transparent py-4 font-display text-sm placeholder:text-brand-gray transition-colors focus:border-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black disabled:opacity-50";

export function ContactForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactInput>({
		resolver: zodResolver(ContactSchema),
		mode: "onBlur",
		reValidateMode: "onBlur",
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			title: "",
			message: "",
			website: "",
		},
	});

	const onSubmit = async (data: ContactInput) => {
		try {
			const result = await sendEmail(data);

			if (result.success) {
				toast.success("Message sent", {
					description: "I'll get back to you soon.",
				});
				reset(); // Only reset on absolute success
			} else {
				toast.error("Failed to send message.", {
					description: result.error || "Please try again.",
				});
			}
		} catch (error) {
			console.error("Form submission error:", error);
			toast.error("An unexpected error occurred", {
				description: "Please try again.",
			});
		}
	};

	return (
		<motion.form
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false }}
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.1,
						delayChildren: 0.6,
					},
				},
			}}
			className="grid gap-6 px-6 py-16 sm:px-12"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div
				aria-hidden="true"
				className="absolute -left-[9999px] h-px w-px overflow-hidden"
			>
				<label htmlFor="website">Website</label>
				<input
					{...register("website")}
					id="website"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			{/* Name Field */}
			<motion.div variants={itemVariants}>
				<label
					htmlFor="name"
					className="sr-only"
				>
					Name
				</label>
				<input
					{...register("name")}
					id="name"
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "name-error" : undefined}
					className={cn(
						fieldClassName,
						errors.name && "border-red-500 focus:border-red-500",
					)}
					placeholder="Name"
					disabled={isSubmitting}
				/>
				{errors.name && (
					<p id="name-error" role="alert" className="mt-1 text-[10px] text-red-500">{errors.name.message}</p>
				)}
			</motion.div>

			<div className="grid gap-6 sm:grid-cols-2">
				{/* Email Field */}
				<motion.div variants={itemVariants}>
					<label
						htmlFor="email"
						className="sr-only"
					>
						Email
					</label>
					<input
						{...register("email")}
						id="email"
						type="email"
						aria-invalid={Boolean(errors.email)}
						aria-describedby={errors.email ? "email-error" : undefined}
						className={cn(
							fieldClassName,
							errors.email && "border-red-500 focus:border-red-500",
						)}
						placeholder="Email"
						disabled={isSubmitting}
					/>
					{errors.email && (
						<p id="email-error" role="alert" className="mt-1 text-[10px] text-red-500">{errors.email.message}</p>
					)}
				</motion.div>

				{/* Phone Field */}
				<motion.div variants={itemVariants}>
					<label
						htmlFor="phone"
						className="sr-only"
					>
						Phone
					</label>
					<input
						{...register("phone")}
						id="phone"
						type="tel"
						aria-invalid={Boolean(errors.phone)}
						aria-describedby={errors.phone ? "phone-error" : undefined}
						className={cn(
							fieldClassName,
							errors.phone && "border-red-500 focus:border-red-500",
						)}
						placeholder="Phone"
						disabled={isSubmitting}
					/>
					{errors.phone && (
						<p id="phone-error" role="alert" className="mt-1 text-[10px] text-red-500">{errors.phone.message}</p>
					)}
				</motion.div>
			</div>

			{/* Title/Subject Field */}
			<motion.div variants={itemVariants}>
				<label
					htmlFor="title"
					className="sr-only"
				>
					Title
				</label>
				<input
					{...register("title")}
					id="title"
					aria-invalid={Boolean(errors.title)}
					aria-describedby={errors.title ? "title-error" : undefined}
					className={cn(
						fieldClassName,
						errors.title && "border-red-500 focus:border-red-500",
					)}
					placeholder="Project Title / Subject"
					disabled={isSubmitting}
				/>
				{errors.title && (
					<p id="title-error" role="alert" className="mt-1 text-[10px] text-red-500">{errors.title.message}</p>
				)}
			</motion.div>

			{/* Message Field */}
			<motion.div variants={itemVariants}>
				<label
					htmlFor="message"
					className="sr-only"
				>
					Message
				</label>
				<textarea
					{...register("message")}
					id="message"
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? "message-error" : undefined}
					className={cn(
						"min-h-40 resize-none",
						fieldClassName,
						errors.message && "border-red-500 focus:border-red-500",
					)}
					placeholder="Tell me about your project"
					disabled={isSubmitting}
				/>
				{errors.message && (
					<p id="message-error" role="alert" className="mt-1 text-[10px] text-red-500">{errors.message.message}</p>
				)}
			</motion.div>

			{/* Submit Button */}
			<motion.div
				variants={itemVariants}
				className="relative"
			>
				<AnimatedButton
					variant="slide-right"
					className={cn(
						"w-full rounded-sm border border-brand-black bg-transparent py-5 font-semibold tracking-wide text-brand-black uppercase transition-all hover:text-brand-white",
						isSubmitting && "pointer-events-none opacity-50",
					)}
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Processing..." : "Send message"}
				</AnimatedButton>
			</motion.div>
		</motion.form>
	);
}
