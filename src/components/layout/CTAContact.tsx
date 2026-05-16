"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { RadialHover } from "@/components/ui/RadialHover";

export function CTAContact() {
	return (
		<section className="border-t border-brand-border px-6 py-24 sm:px-12">
			<FadeIn y={28}>
				<div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
					{/* Text */}
					<div>
						<p className="mb-5 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-brand-gray">
							Ready to build?
						</p>
						<h2
							className="font-extrabold uppercase leading-[0.92] tracking-[-0.07em]"
							style={{ fontSize: "clamp(2.6rem,6vw,5.5rem)" }}
						>
							Let&apos;s work
							<br />
							together.
						</h2>
					</div>

					{/* CTA Button */}
					<FadeIn
						delay={0.25}
						y={16}
					>
						<RadialHover
							shape="horizontal"
							className="border border-brand-border"
						>
							<Link
								href="/contact"
								className="block px-8 py-5 font-mono text-[11px] uppercase tracking-widest"
							>
								Get in touch ↗
							</Link>
						</RadialHover>
					</FadeIn>
				</div>
			</FadeIn>
		</section>
	);
}
