export type Project = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  link?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    number: "01",
    title: "E-Commerce Platform",
    summary: "High-performance, multi-tenant e-commerce built on microservices architecture. Handles 50k+ concurrent users.",
    description:
      "A scalable commerce system designed for tenant isolation, fast catalogue operations, resilient checkout flows, and operational clarity under real traffic. The work covered frontend architecture, backend services, caching strategy, and production rollout discipline.",
    tags: ["React", "Node.js", "Microservices", "PostgreSQL", "Redis"],
    year: "2024",
    role: "Full-Stack Engineer",
  },
  {
    slug: "saas-analytics-dashboard",
    number: "02",
    title: "SaaS Analytics Dashboard",
    summary: "End-to-end analytics platform with real-time streaming, custom reporting, and multi-org support.",
    description:
      "A data-heavy SaaS product built for teams that need fast insight without fragile reporting workflows. The system combines typed dashboards, real-time event streams, organization-level permissions, and visual reporting patterns that stay usable at scale.",
    tags: ["Next.js", "TypeScript", "Kafka", "D3.js", "AWS"],
    year: "2024",
    role: "Lead Engineer",
  },
  {
    slug: "mobile-banking-app",
    number: "03",
    title: "Mobile Banking App",
    summary: "Fintech mobile app for payments and account management. 99.9% uptime, built with React Native + Go.",
    description:
      "A mobile banking experience focused on trust, speed, and reliability. Work spanned interaction design, React Native implementation, GraphQL integration, Go services, release hardening, and production incident prevention.",
    tags: ["React Native", "Go", "GraphQL", "Firebase"],
    year: "2023",
    role: "Mobile Engineer & Designer",
  },
  {
    slug: "design-system",
    number: "04",
    title: "Open Source Design System",
    summary: "Scalable component library used across 3 enterprise products. 80+ components with full Figma integration.",
    description:
      "A design engineering initiative that aligned product teams around accessible primitives, durable tokens, Storybook documentation, and Figma-ready component contracts. Built to reduce inconsistency while keeping product teams fast.",
    tags: ["Design System", "Storybook", "Figma", "WCAG 2.1"],
    year: "2023",
    role: "Design Engineer",
  },
];
