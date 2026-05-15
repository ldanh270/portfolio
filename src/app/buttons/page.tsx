import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function ButtonShowcase() {
	return (
		<div className="min-h-screen bg-brand-white p-12">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-12 font-display text-4xl font-bold">Button Hover Effects</h1>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{/* Slide Effects */}
					<div className="space-y-4">
						<h2 className="font-mono text-xs uppercase tracking-widest text-brand-gray">Slide</h2>
						<AnimatedButton variant="slide-left" className="w-full border border-brand-black">
							Slide Left
						</AnimatedButton>
						<AnimatedButton variant="slide-right" className="w-full border border-brand-black">
							Slide Right
						</AnimatedButton>
						<AnimatedButton variant="slide-top" className="w-full border border-brand-black">
							Slide Top
						</AnimatedButton>
						<AnimatedButton variant="slide-bottom" className="w-full border border-brand-black">
							Slide Bottom
						</AnimatedButton>
					</div>

					{/* Circle Effects */}
					<div className="space-y-4">
						<h2 className="font-mono text-xs uppercase tracking-widest text-brand-gray">Circle</h2>
						<AnimatedButton variant="circle-center" className="w-full border border-brand-black">
							Circle Center
						</AnimatedButton>
						<AnimatedButton variant="circle-corner" className="w-full border border-brand-black">
							Circle Corner
						</AnimatedButton>
						<AnimatedButton variant="circle-left" className="w-full border border-brand-black">
							Circle Left
						</AnimatedButton>
						<AnimatedButton variant="circle-right" className="w-full border border-brand-black">
							Circle Right
						</AnimatedButton>
						<AnimatedButton variant="circle-top" className="w-full border border-brand-black">
							Circle Top
						</AnimatedButton>
						<AnimatedButton variant="circle-bottom" className="w-full border border-brand-black">
							Circle Bottom
						</AnimatedButton>
						<AnimatedButton variant="arc-bottom" className="w-full border border-brand-black">
							Arc Bottom ⭐
						</AnimatedButton>
					</div>

					{/* Special Effects */}
					<div className="space-y-4">
						<h2 className="font-mono text-xs uppercase tracking-widest text-brand-gray">Special</h2>
						<AnimatedButton variant="border-sweep" className="w-full border border-brand-black">
							Border Sweep
						</AnimatedButton>
						<AnimatedButton variant="glow-pulse" className="w-full border border-brand-black">
							Glow Pulse
						</AnimatedButton>
					</div>

					{/* Split Effects */}
					<div className="space-y-4">
						<h2 className="font-mono text-xs uppercase tracking-widest text-brand-gray">Split</h2>
						<AnimatedButton variant="split-horizontal" className="w-full border border-brand-black">
							Split Horizontal
						</AnimatedButton>
						<AnimatedButton variant="split-vertical" className="w-full border border-brand-black">
							Split Vertical
						</AnimatedButton>
					</div>
				</div>
			</div>
		</div>
	);
}
