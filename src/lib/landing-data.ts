export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  gradient: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const navLinks: NavLink[] = [
  { label: "Studio", href: "#studio" },
  { label: "Work", href: "#work" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export const services: Service[] = [
  {
    title: "Brand systems",
    description: "Naming, identity, art direction, and launch-ready visual rules.",
  },
  {
    title: "Digital experiences",
    description: "Fast editorial websites with sharp interaction and clean conversion paths.",
  },
  {
    title: "Campaign worlds",
    description: "Concepts, assets, and motion language for product drops and cultural moments.",
  },
];

export const projects: Project[] = [
  {
    title: "Nord Archive",
    category: "Identity / Web",
    year: "2026",
    description: "A quiet luxury system for an independent furniture archive.",
    gradient: "from-stone-200 via-zinc-100 to-neutral-300",
  },
  {
    title: "Signal Room",
    category: "Campaign",
    year: "2025",
    description: "Launch visuals and motion toolkit for a spatial audio collective.",
    gradient: "from-lime-200 via-yellow-100 to-orange-200",
  },
  {
    title: "Edition 04",
    category: "Editorial / Commerce",
    year: "2025",
    description: "Digital storefront shaped like a fashion field note.",
    gradient: "from-sky-200 via-indigo-100 to-fuchsia-200",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Viktor gave our launch a point of view before he gave it polish. That changed everything.",
    author: "Mara Ellis",
    role: "Founder, Nord Archive",
  },
  {
    quote: "Fast, exacting, and strangely calm under pressure. The work landed with real heat.",
    author: "Theo Grant",
    role: "Creative Director, Signal Room",
  },
  {
    quote: "He turned a loose reference folder into a brand people could recognize in one second.",
    author: "Anika Rao",
    role: "Head of Product, Edition 04",
  },
];

export const marqueeItems = ["Brand", "Web", "Motion", "Campaign", "Editorial", "Launch"] as const;
