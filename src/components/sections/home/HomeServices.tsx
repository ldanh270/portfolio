import Link from "next/link";
import { services } from "@/data/services";
import { MarqueeText } from "@/components/ui/MarqueeText";

export function HomeServices() {
  return (
    <section>
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Services." size="lg" direction="left" />
      </div>
      <div className="grid md:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <article key={service.number} className="border-b border-brand-border px-6 py-10 sm:px-12 md:border-r">
            <p className="mb-6 font-mono text-xs tracking-wide text-brand-gray">{service.number}</p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">{service.title}</h2>
            <p className="text-sm leading-relaxed text-[#555]">{service.description}</p>
          </article>
        ))}
      </div>
      <div className="flex justify-end px-6 py-10 sm:px-12">
        <Link href="/services" className="border-b border-brand-black pb-1 font-display text-sm font-bold uppercase tracking-wide">
          See all services →
        </Link>
      </div>
    </section>
  );
}
