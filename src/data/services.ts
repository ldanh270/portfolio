// ─── Types ───────────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export type ApproachStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type TechCategory = {
  id: string;
  category: string;
  tools: string[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

// ─── Services ────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy & Architecture",
    description:
      "Navigate technical complexity with confidence. Architectural guidance and product strategy tailored to your scale and business goals.",
    tags: ["System Design", "Tech Stack", "Scalability"],
  },
  {
    id: "ui-ux",
    number: "02",
    title: "UI / UX Design",
    description:
      "Where form meets function. Clean, intuitive interfaces that connect with users and elevate your brand identity.",
    tags: ["Figma", "Wireframes", "Design Systems"],
  },
  {
    id: "fullstack",
    number: "03",
    title: "Full-Stack Development",
    description:
      "From frontend precision to backend power. Modern, scalable web solutions optimised for performance and long-term maintainability.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "mobile",
    number: "04",
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications with React Native. Polished experiences for iOS and Android from a single codebase.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    id: "consulting",
    number: "05",
    title: "Consulting",
    description:
      "Clear, practical guidance on design, tech stack decisions, and product direction to help your team move with confidence.",
    tags: ["Code Review", "Architecture", "Team Coaching"],
  },
  {
    id: "support",
    number: "06",
    title: "Ongoing Support",
    description:
      "Beyond launch, I stay by your side — fixing bugs, shipping updates, and scaling features as your product grows.",
    tags: ["Maintenance", "Monitoring", "Feature Updates"],
  },
];

// ─── Approach ─────────────────────────────────────────────────────────────────

export const approachSteps: ApproachStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery & Research",
    description:
      "Every project starts with listening. I dig into your goals, users, and constraints before a single line of code is written.",
    duration: "1–2 weeks",
    deliverables: ["Project brief", "User personas", "Technical requirements"],
  },
  {
    id: "design",
    number: "02",
    title: "Design & Prototype",
    description:
      "Fast, iterative wireframes and high-fidelity prototypes that validate ideas early — saving cost and avoiding wrong turns.",
    duration: "2–3 weeks",
    deliverables: ["Wireframes", "Hi-fi prototypes", "Design system"],
  },
  {
    id: "build",
    number: "03",
    title: "Build & Test",
    description:
      "Clean, documented, tested code. Built with scalability in mind — CI/CD, automated testing, and code reviews in every delivery.",
    duration: "4–8 weeks",
    deliverables: ["Production codebase", "Test suite", "CI/CD pipeline"],
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Monitor",
    description:
      "Smooth deployment with real-time monitoring. Your product goes live confidently, with alerts in place before your users notice.",
    duration: "1 week",
    deliverables: ["Live deployment", "Monitoring setup", "Performance report"],
  },
  {
    id: "iterate",
    number: "05",
    title: "Iterate & Scale",
    description:
      "Products are never finished. I help teams move fast on improvements using data, feedback, and measurable goals.",
    duration: "Ongoing",
    deliverables: ["Sprint roadmap", "Feature releases", "Analytics insights"],
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────

export const techStack: TechCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    category: "Backend",
    tools: ["Node.js", "Express", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    id: "mobile",
    category: "Mobile",
    tools: ["React Native", "Expo", "Reanimated", "Zustand"],
  },
  {
    id: "devops",
    category: "DevOps",
    tools: ["Docker", "GitHub Actions", "Vercel", "Supabase", "AWS"],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Duc Anh delivered a full redesign of our dashboard in under three weeks. The attention to detail and interaction quality was beyond what we expected.",
    author: "Nguyen Minh Khoa",
    role: "Product Lead",
    company: "OUTFIZ",
  },
  {
    id: "t2",
    quote:
      "Working with Duc Anh felt like having a co-founder who actually ships. He understood our vision immediately and built exactly what we needed.",
    author: "Tran Thi Bao Chau",
    role: "Founder",
    company: "VieTech Solutions",
  },
  {
    id: "t3",
    quote:
      "The codebase he left us is clean, well-documented, and our entire team can actually work with it. That's rare.",
    author: "Le Van Thanh",
    role: "Engineering Manager",
    company: "Freelance Client",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What types of projects do you take on?",
    answer:
      "I work on web apps, mobile apps, SaaS products, and design systems. Projects range from greenfield builds to improving existing codebases. I'm most effective when brought in early — before the architecture is locked in.",
  },
  {
    id: "faq-2",
    question: "How does the engagement typically work?",
    answer:
      "Most projects start with a discovery call to understand goals and constraints. From there I'll propose a scope, timeline, and rate. I work in focused sprints with regular check-ins — no black boxes, no surprises.",
  },
  {
    id: "faq-3",
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. I enjoy working with early-stage teams where product direction is still taking shape. I can help you move fast without accumulating tech debt that slows you down six months later.",
  },
  {
    id: "faq-4",
    question: "Can you take over an existing codebase?",
    answer:
      "Absolutely. I'll start with a technical audit to understand the current state, identify risks, and plan a path forward. Inheriting legacy code is not a problem — I've done it often.",
  },
  {
    id: "faq-5",
    question: "What does ongoing support look like?",
    answer:
      "After launch, I offer retainer-based support covering bug fixes, performance monitoring, feature additions, and dependency updates. Think of it as keeping a senior engineer on speed dial.",
  },
];
