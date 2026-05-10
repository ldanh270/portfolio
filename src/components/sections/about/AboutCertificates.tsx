import { MarqueeText } from "@/components/ui/MarqueeText";

type Certificate = {
  name: string;
  issuer: string;
  platform: string;
  date: string;
  category: string;
  credentialUrl: string;
};

const certificates: Certificate[] = [
  {
    name: "[Certificate Name]",
    issuer: "Google",
    platform: "Coursera",
    date: "2024",
    category: "AI / ML",
    credentialUrl: "#",
  },
  {
    name: "[Certificate Name]",
    issuer: "Meta",
    platform: "Coursera",
    date: "2023",
    category: "Frontend",
    credentialUrl: "#",
  },
  {
    name: "[Certificate Name]",
    issuer: "Udemy",
    platform: "Udemy",
    date: "2023",
    category: "Backend",
    credentialUrl: "#",
  },
];

export function AboutCertificates() {
  return (
    <>
      <div className="border-y border-brand-border py-8">
        <MarqueeText text="Certificates." size="lg" direction="left" />
      </div>
      <section className="grid border-b border-brand-border sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={`${cert.issuer}-${cert.name}`}
            className="flex flex-col justify-between gap-6 border-b border-r border-brand-border px-6 py-8 transition-colors hover:bg-[rgba(10,10,10,0.02)] sm:px-10"
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
                {cert.category} · {cert.date}
              </span>
              <p className="text-base font-bold leading-snug tracking-tight">{cert.name}</p>
              <p className="font-mono text-xs text-brand-gray">
                {cert.issuer} via {cert.platform}
              </p>
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start font-mono text-[10px] uppercase tracking-widest text-brand-gray underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
            >
              Verify →
            </a>
          </div>
        ))}
      </section>
    </>
  );
}
