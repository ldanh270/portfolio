import { services } from "@/data/services";

export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="grid md:grid-cols-2">
      {visibleServices.map((service) => (
        <article key={service.number} className="border-b border-brand-border px-6 py-12 transition hover:bg-[rgba(10,10,10,0.02)] sm:px-12 md:odd:border-r">
          <p className="mb-6 font-mono text-xs tracking-wide text-brand-gray">{service.number}</p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight">{service.title}</h2>
          <p className="text-sm leading-relaxed text-[#555]">{service.description}</p>
        </article>
      ))}
    </div>
  );
}
