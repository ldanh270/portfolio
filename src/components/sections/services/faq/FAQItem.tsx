import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ } from "@/data/services";
import { AnimatePresence, motion } from "framer-motion";

type FAQItemProps = {
	faq: FAQ;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const rowVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -3, boxShadow: "0 14px 38px rgba(10,10,10,0.06)" },
};

const surfaceVariants = {
	rest: { opacity: 0, scale: 0.99 },
	hover: { opacity: 1, scale: 1 },
};

const lineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const questionVariants = {
	rest: { x: 0 },
	hover: { x: 6 },
};

export default function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
	return (
		<FadeIn
			delay={index * 0.08}
			y={16}
		>
			<motion.div
				initial="rest"
				whileHover="hover"
				variants={rowVariants}
				transition={{ duration: 0.35, ease }}
				className="group relative isolate overflow-hidden border-b border-brand-border bg-brand-white"
			>
				<motion.span
					aria-hidden="true"
					variants={surfaceVariants}
					transition={{ duration: 0.28, ease }}
					className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={lineVariants}
					transition={{ duration: 0.35, ease }}
					className="absolute left-6 right-6 top-0 z-10 h-px origin-left bg-brand-black sm:left-48 sm:right-48"
				/>

				<button
					type="button"
					onClick={onToggle}
					className="relative z-10 grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-6 text-left sm:px-48"
					aria-expanded={isOpen}
				>
					<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-gray transition-colors duration-300 group-hover:text-brand-black">
						{String(index + 1).padStart(2, "0")}
					</span>
					<motion.h3
						variants={questionVariants}
						transition={{ duration: 0.3, ease }}
						className="font-bold uppercase tracking-tight"
					>
						{faq.question}
					</motion.h3>
					<motion.span
						animate={{ rotate: isOpen ? 45 : 0 }}
						variants={{
							rest: { scale: 1, borderColor: "rgba(10,10,10,0.12)" },
							hover: { scale: 1.06, borderColor: "rgba(10,10,10,0.55)" },
						}}
						transition={{ duration: 0.25, ease }}
						className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-border bg-brand-white text-2xl font-light leading-none"
						aria-hidden="true"
					>
						+
					</motion.span>
				</button>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							key="answer"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							style={{ overflow: "hidden" }}
						>
							<p className="relative z-10 px-6 pb-8 pl-17 text-sm leading-8 text-[#555] sm:px-48 sm:pl-53">
								{faq.answer}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</FadeIn>
	);
}
