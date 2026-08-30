import { MarqueeText } from "@/components/ui/MarqueeText";

type PageMarqueeTextProps = {
	text: string;
	size?: "sm" | "md" | "lg" | "xl";
	speed?: number;
	direction?: "left" | "right";
	outlined?: boolean;
	heading?: string;
};

export default function PageMarqueeText({
	text,
	size = "xl",
	speed,
	direction,
	outlined,
	heading,
}: PageMarqueeTextProps) {
	return (
		<section className="border-y border-brand-border py-8">
			{heading && <h1 className="sr-only">{heading}</h1>}
			<div aria-hidden={Boolean(heading)}>
				<MarqueeText
					text={text}
					size={size}
					speed={speed}
					direction={direction}
					outlined={outlined}
				/>
			</div>
		</section>
	);
}
