import { marqueeItems } from "@/lib/landing-data";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-neutral-200 bg-neutral-950 py-5 text-white" aria-label="Studio capabilities">
      <div className="marquee-track flex w-max gap-4">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-white/20 px-6 py-3 font-display text-4xl uppercase tracking-[-0.04em] text-white sm:text-6xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
