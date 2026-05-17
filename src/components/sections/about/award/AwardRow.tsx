import { FadeIn } from "@/components/ui/FadeIn";
import { Award } from "@/data/about";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Constants

const ease = [0.22, 1, 0.36, 1] as const;

const awardRowVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -3, boxShadow: "0 14px 38px rgba(10,10,10,0.06)" },
};

const awardSurfaceVariants = {
	rest: { opacity: 0, scale: 0.99 },
	hover: { opacity: 1, scale: 1 },
};

const awardLineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const awardTitleVariants = {
	rest: { x: 0 },
	hover: { x: 6 },
};

// Helpers

function formatIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}

export default function AwardRow({
	award,
	index,
	isOpen,
	onToggle,
}: {
	award: Award;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<FadeIn
			y={20}
			delay={index * 0.06}
		>
			<motion.div
				initial="rest"
				whileHover="hover"
				variants={awardRowVariants}
				transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease }}
				className="group relative isolate overflow-hidden border-b border-brand-border bg-brand-white"
			>
				<motion.span
					aria-hidden="true"
					variants={awardSurfaceVariants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease }}
					className="absolute inset-2 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
				/>
				<motion.span
					aria-hidden="true"
					variants={awardLineVariants}
					transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease }}
					className="absolute left-2 right-2 top-0 z-10 h-px origin-left bg-brand-black sm:left-4 sm:right-4"
				/>

				<button
					type="button"
					data-cursor="view"
					onClick={onToggle}
					className="relative z-10 flex w-full items-center gap-6 px-2 py-6 text-left sm:gap-10 sm:px-4 sm:py-8"
				>
					<span className="flex-none font-mono text-2xl font-light tracking-tight text-brand-gray transition-colors duration-300 group-hover:text-brand-black sm:text-4xl">
						{formatIndex(index)}
					</span>

					<span className="min-w-0 flex-1">
						<motion.span
							variants={awardTitleVariants}
							transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease }}
							className="block text-lg font-bold leading-tight tracking-tight sm:text-2xl"
						>
							{award.title}
						</motion.span>
						<span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.position}
						</span>
					</span>

					<span className="hidden flex-none items-center gap-4 sm:flex">
						<span className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 group-hover:border-black/30">
							{award.category}
						</span>
						<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
							{award.date}
						</span>
					</span>

					<motion.span
						animate={{ rotate: isOpen ? 45 : 0 }}
						variants={{
							rest: { scale: 1, borderColor: "rgba(10,10,10,0.12)" },
							hover: { scale: 1.06, borderColor: "rgba(10,10,10,0.55)" },
						}}
						transition={{
							duration: shouldReduceMotion ? 0 : 0.4,
							ease,
						}}
						className="grid size-9 flex-none place-items-center rounded-full border border-brand-border bg-brand-white text-xl leading-none text-brand-gray transition-colors duration-200 group-hover:text-brand-black"
					>
						+
					</motion.span>
				</button>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							initial={
								shouldReduceMotion ?
									{ height: "auto", opacity: 1 }
								:	{ height: 0, opacity: 0 }
							}
							animate={{ height: "auto", opacity: 1 }}
							exit={
								shouldReduceMotion ?
									{ height: "auto", opacity: 1 }
								:	{ height: 0, opacity: 0 }
							}
							transition={{
								duration: shouldReduceMotion ? 0 : 0.5,
								ease,
							}}
							className="overflow-hidden"
						>
							<div className="relative z-10 grid gap-4 px-2 pb-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-4">
								<span className="hidden font-mono text-4xl font-light tracking-tight text-transparent sm:block">
									{formatIndex(index)}
								</span>

								<div className="max-w-xl">
									<p className="text-sm leading-7 text-[#444]">
										{award.description}
									</p>

									<div className="mt-4 flex flex-wrap gap-2">
										{award.tags.map((tag) => (
											<span
												key={tag}
												className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
											>
												{tag}
											</span>
										))}
									</div>

									<div className="mt-3 flex items-center gap-3 sm:hidden">
										<span className="border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
											{award.category}
										</span>
										<span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
											{award.date}
										</span>
									</div>

									{award.url && (
										<a
											href={award.url}
											target="_blank"
											rel="noopener noreferrer"
											data-cursor="view"
											className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gray transition-colors duration-200 hover:text-brand-black"
										>
											View details
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="10"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M7 17L17 7" />
												<path d="M7 7h10v10" />
											</svg>
										</a>
									)}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</FadeIn>
	);
}
