# Le Duc Anh — Portfolio

Personal portfolio of **Le Duc Anh**, a full-stack developer and designer based in Da Nang, Vietnam.
Built to present selected work, offered services, background, and a direct contact flow.

→ [ducanhle.dn@gmail.com](mailto:ducanhle.dn@gmail.com) · [GitHub](https://github.com/ldanh270) ·
[LinkedIn](https://www.linkedin.com/in/ldanh270)

---

## What's Inside

### Work

Four featured projects across web, mobile, and design engineering:

| #   | Project                                                                     | Role                       | Year |
| --- | --------------------------------------------------------------------------- | -------------------------- | ---- |
| 01  | E-Commerce Platform — multi-tenant, 50k+ concurrent users, microservices    | Full-Stack Engineer        | 2024 |
| 02  | SaaS Analytics Dashboard — real-time streaming, multi-org, custom reporting | Lead Engineer              | 2024 |
| 03  | Mobile Banking App — React Native + Go, 99.9% uptime                        | Mobile Engineer & Designer | 2023 |
| 04  | Open Source Design System — 80+ components, Figma integration, WCAG 2.1     | Design Engineer            | 2023 |

### Services

- Strategy & Architecture
- UI / UX Design
- Full-Stack Development
- Mobile Development (React Native)
- Consulting
- Ongoing Support & Maintenance

### About

- Software Engineering student at FPT University Da Nang (2023–present)
- Full-stack Developer at OUTFIZ (2026–present)
- Freelance developer at VieTech Solutions
- 9 certifications (DeepLearning.AI, Google, Amazon, University of Michigan, HKUST)
- 11 competitive programming awards (city, regional, national level — 2020–2023)

---

## Tech Stack

**This site**

| Layer         | Tech                                    |
| ------------- | --------------------------------------- |
| Framework     | Next.js 16 (App Router)                 |
| UI            | React 19, Tailwind CSS 4, Framer Motion |
| Forms         | React Hook Form, Zod                    |
| Email         | Resend                                  |
| Persistence   | Upstash Redis                           |
| Notifications | Sonner                                  |
| Scroll        | Lenis                                   |

**Client work stack**

Frontend · React, Next.js, TypeScript, Tailwind CSS  
Backend · Node.js, Express, PostgreSQL, Redis, Prisma  
Mobile · React Native, Expo  
DevOps · Docker, GitHub Actions, Vercel, AWS

---

## Project Structure

```
src/
  app/            Route pages (/, /work, /work/[slug], /services, /about, /contact)
  components/
    layout/       Header, footer, smooth scroll wrapper
    sections/     Page-specific section components
    ui/           Reusable primitives and motion components
  data/           All portfolio content (edit here)
    projects.ts
    services.ts
    site.ts
    about.ts
  lib/            Contact action, Redis client, Zod schema
  hooks/          Shared hooks
```

---

## Content

All site content lives in `src/data/`. No component edits needed for copy changes.

| File          | Controls                                                |
| ------------- | ------------------------------------------------------- |
| `projects.ts` | Work listing and detail pages                           |
| `services.ts` | Services, approach steps, tech stack, testimonials, FAQ |
| `site.ts`     | Name, email, social links, nav                          |
| `about.ts`    | Stats, skills, career timeline, certificates, awards    |

Project detail pages auto-generate at `/work/[slug]` from `PROJECTS` array.

---

## Setup

```bash
npm install
cp .env.example .env
```

```env
RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

```bash
npm run dev       # http://localhost:3000
npm run build
npm run lint
```

---

## Contact Flow

`ContactForm.tsx` → Zod validation (shared client/server) → save to Upstash Redis → send email via
Resend.

Redis failure = hard error. Email failure = logged, non-blocking (data already saved).

---

## Deployment

Vercel-ready. Set the three env vars above and deploy. Verify before pushing:

```bash
npm run lint && npm run build
```
