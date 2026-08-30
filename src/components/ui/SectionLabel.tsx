type SectionLabelProps = {
	label: string;
	description: string;
};

export function SectionLabel({ label, description }: SectionLabelProps) {
	return (
		<div className="flex flex-col justify-between gap-4 border-b border-brand-border px-6 py-8 sm:px-12 md:flex-row md:items-center">
			<h2 className="font-mono text-xs uppercase tracking-widest text-brand-gray">{label}</h2>
			<p className="max-w-sm text-sm leading-relaxed text-brand-gray md:text-right">
				{description}
			</p>
		</div>
	);
}
