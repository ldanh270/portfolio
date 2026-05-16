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
		},
	});

	const onSubmit = async (data: ContactInput) => {
		try {
			const result = await sendEmail(data);

			if (result.success) {
				toast.success("Message sent! I'll get back to you soon.");
				reset(); // Only reset on absolute success
			} else {
				toast.error(result.error || "Failed to send message.");
			}
		} catch (error) {
			console.error("Form submission error:", error);
			toast.error("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<motion.form
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.1,
						delayChildren: 0.6,
					},
				},
			}}
			className="grid gap-6"
			onSubmit={handleSubmit(onSubmit)}
		>
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
					className={cn(
						"w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray transition-colors focus:border-brand-black disabled:opacity-50",
						errors.name && "border-red-500 focus:border-red-500",
					)}
					placeholder="Name"
					disabled={isSubmitting}
				/>
				{errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name.message}</p>}
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
						className={cn(
							"w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray transition-colors focus:border-brand-black disabled:opacity-50",
							errors.email && "border-red-500 focus:border-red-500",
						)}
						placeholder="Email"
						disabled={isSubmitting}
					/>
					{errors.email && <p className="mt-1 text-[10px] text-red-500">{errors.email.message}</p>}
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
						className={cn(
							"w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray transition-colors focus:border-brand-black disabled:opacity-50",
							errors.phone && "border-red-500 focus:border-red-500",
						)}
						placeholder="Phone"
						disabled={isSubmitting}
					/>
					{errors.phone && <p className="mt-1 text-[10px] text-red-500">{errors.phone.message}</p>}
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
					className={cn(
						"w-full border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray transition-colors focus:border-brand-black disabled:opacity-50",
						errors.title && "border-red-500 focus:border-red-500",
					)}
					placeholder="Project Title / Subject"
					disabled={isSubmitting}
				/>
				{errors.title && <p className="mt-1 text-[10px] text-red-500">{errors.title.message}</p>}
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
					className={cn(
						"min-h-40 w-full resize-none border-b border-brand-border bg-transparent py-4 font-display text-sm outline-none placeholder:text-brand-gray transition-colors focus:border-brand-black disabled:opacity-50",
						errors.message && "border-red-500 focus:border-red-500",
					)}
					placeholder="Tell me about your project"
					disabled={isSubmitting}
				/>
				{errors.message && (
					<p className="mt-1 text-[10px] text-red-500">{errors.message.message}</p>
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
