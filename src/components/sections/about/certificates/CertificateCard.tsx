import { Certification } from "@/data/about";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const certCardVariants = {
	rest: { y: 0, boxShadow: "0 0 0 rgba(10,10,10,0)" },
	hover: { y: -6, boxShadow: "0 20px 55px rgba(10,10,10,0.09)" },
};

const certSurfaceVariants = {
	rest: { opacity: 0, scale: 0.985 },
	hover: { opacity: 1, scale: 1 },
};

const certLineVariants = {
	rest: { scaleX: 0 },
	hover: { scaleX: 1 },
};

const certTitleVariants = {
	rest: { x: 0 },
	hover: { x: 6 },
};

export default function CertificateCard({
	cert,
	isDragging,
	onClick,
}: {
	cert: Certification;
	isDragging: boolean;
	onClick: () => void;
}) {
	return (
		<motion.button
			type="button"
			data-cursor="view"
			onClick={(e) => {
				if (isDragging) {
					e.preventDefault();
					return;
				}
				onClick();
			}}
			whileHover="hover"
			initial="rest"
			variants={certCardVariants}
			transition={{ duration: 0.38, ease }}
			className="group relative flex h-full w-full flex-col overflow-hidden border border-brand-border bg-brand-white px-8 py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
		>
			<motion.span
				aria-hidden="true"
				variants={certSurfaceVariants}
				transition={{ duration: 0.28, ease }}
				className="absolute inset-3 z-0 border border-brand-border bg-[rgba(10,10,10,0.018)]"
			/>
			<motion.span
				aria-hidden="true"
				variants={certLineVariants}
				transition={{ duration: 0.34, ease }}
				className="absolute left-8 right-8 top-0 z-10 h-px origin-left bg-brand-black"
			/>

			<header className="relative z-10 mb-3 flex items-center gap-3">
				<span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{cert.issuer}
				</span>
				<span className="flex-none font-mono text-[10px] uppercase tracking-widest text-brand-gray">
					{cert.label}
				</span>
			</header>
			<motion.h3
				variants={certTitleVariants}
				transition={{ duration: 0.3, ease }}
				className="relative z-10 text-xl font-bold leading-snug tracking-tight"
			>
				{cert.title}
			</motion.h3>
			<p className="relative z-10 mt-3 text-sm leading-7 text-[#444] line-clamp-2">
				{cert.description}
			</p>
			<div className="relative z-10 mt-auto overflow-x-auto no-scrollbar pt-5">
				<div className="flex items-center gap-2">
					{cert.tags.map((t, index) => (
						<motion.span
							key={t}
							variants={{
								rest: { y: 0, opacity: 0.78 },
								hover: { y: -2, opacity: 1 },
							}}
							transition={{ duration: 0.22, delay: index * 0.02, ease }}
							className="flex-none border border-brand-border bg-brand-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-gray transition-colors duration-200 group-hover:border-black/30 group-hover:text-brand-black"
						>
							{t}
						</motion.span>
					))}
				</div>
			</div>
		</motion.button>
	);
}
