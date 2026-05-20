import { MarqueeText } from "@/components/ui/MarqueeText";

type PageMarqueeTextProps = {
	text: string;
	size?: "sm" | "md" | "lg" | "xl";
	speed?: number;
	direction?: "left" | "right";
	outlined?: boolean;
};

export default function PageMarqueeText({
	text,
	size = "xl",
	speed,
	direction,
	outlined,
}: PageMarqueeTextProps) {
	return (
		<section className="border-y border-brand-border py-8">
			<MarqueeText
				text={text}
				size={size}
				speed={speed}
				direction={direction}
				outlined={outlined}
			/>
		</section>
	);
}
