import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Work — Le Duc Anh" };
  }

  return {
    title: `${project.title} — Le Duc Anh`,
    description: project.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="pt-16">
      <section className="border-b border-brand-border px-6 py-16 sm:px-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-brand-gray">Project {project.number} / {project.year}</p>
        <h1 className="text-[clamp(3rem,8vw,8rem)] font-extrabold leading-none tracking-tighter">
          <RevealText>{project.title}</RevealText>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gray">{project.role}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs uppercase tracking-widest text-brand-gray">/ {tag}</span>
          ))}
        </div>
      </section>

      <section className="grid border-y border-brand-border md:grid-cols-3">
        <div className="border-r border-brand-border px-6 py-8 sm:px-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">Year</p>
          <p className="text-sm font-medium">{project.year}</p>
        </div>
        <div className="border-r border-brand-border px-6 py-8 sm:px-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">Role</p>
          <p className="text-sm font-medium">{project.role}</p>
        </div>
        <div className="px-6 py-8 sm:px-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-gray">Technologies</p>
          <p className="text-sm font-medium">{project.tags.join(", ")}</p>
        </div>
      </section>

      <section className="border-b border-brand-border px-6 py-12 sm:px-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-[#e0ddd8]">
          <Image src={project.image ?? "/work-placeholder.svg"} fill alt={project.title} className="object-cover" loading="lazy" />
        </div>
      </section>

      <section className="grid gap-8 border-b border-brand-border px-6 py-16 sm:px-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-gray lg:sticky lg:top-24 lg:self-start">About this project</p>
        <p className="text-base leading-8 text-[#444]">{project.description}</p>
      </section>

      <Link href={`/work/${nextProject.slug}`} className="block border-t border-brand-border px-6 py-12 transition hover:bg-[rgba(10,10,10,0.02)] sm:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-gray">Next project →</p>
        <p className="text-[clamp(2rem,6vw,6rem)] font-extrabold leading-none tracking-tighter">{nextProject.title}</p>
      </Link>
    </main>
  );
}
