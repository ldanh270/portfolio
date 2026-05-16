import { FadeIn } from "@/components/ui/FadeIn";
import { HomeServiceCard } from "@/components/sections/home/HomeServiceCard";
import Link from "next/link";
import { services } from "@/data/services";
import { MarqueeText } from "@/components/ui/MarqueeText";

export function HomeServices() {
  return (
    <section>
      <FadeIn
        y={18}
        duration={0.7}
        className="border-y border-brand-border py-8"
      >
        <MarqueeText
          text="Services."
          size="lg"
          direction="left"
        />
      </FadeIn>

      <div className="grid md:grid-cols-3">
        {services.slice(0, 3).map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            y={24}
            className="h-full"
          >
            <HomeServiceCard service={service} />
          </FadeIn>
        ))}
      </div>

      <FadeIn
        delay={0.35}
        y={16}
        className="flex justify-end px-6 py-10 sm:px-12"
      >
        <Link
          href="/services"
          className="border-b border-brand-black pb-1 font-display text-sm font-bold uppercase tracking-wide"
        >
          See all services →
        </Link>
      </FadeIn>
    </section>
  );
}
