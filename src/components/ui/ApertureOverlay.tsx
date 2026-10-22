import type { RefObject } from "react";

type ApertureOverlayProps = {
	circleRef: RefObject<SVGCircleElement | null>;
	ringRef: RefObject<SVGCircleElement | null>;
};

export function ApertureOverlay({ circleRef, ringRef }: ApertureOverlayProps) {
	return (
		<svg
			className="absolute inset-0 h-full w-full pointer-events-none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<mask id="loader-reveal-mask">
					<rect width="100%" height="100%" fill="#ffffff" />
					<circle
						ref={circleRef}
						cx="50%"
						cy="50%"
						r="0"
						fill="#000000"
					/>
				</mask>
			</defs>

			<rect
				width="100%"
				height="100%"
				fill="var(--white)"
				mask="url(#loader-reveal-mask)"
			/>

			<circle
				ref={ringRef}
				cx="50%"
				cy="50%"
				r="0"
				fill="none"
				stroke="var(--black)"
				strokeWidth="1.2"
				opacity="0.22"
			/>
		</svg>
	);
}
