# Le Duc Anh — Portfolio

Personal portfolio of **Le Duc Anh**, a full-stack developer and designer based in Da Nang, Vietnam.
Built to present selected work, background, and a direct contact flow.

→ [ducanhle.dn@gmail.com](mailto:ducanhle.dn@gmail.com) · [GitHub](https://github.com/ldanh270) · [LinkedIn](https://www.linkedin.com/in/ldanh270)

---

## What's Inside

### Selected Work

Featured projects across web, AI integration, and open-source contributions:

| #   | Project                                                                     | Role                       | Year |
| --- | --------------------------------------------------------------------------- | -------------------------- | ---- |
| 01  | **Smart PC Store** — Full-stack commerce with Java, Python AI & Next.js     | Lead Developer             | 2026 |
| 02  | **Youth for Change** — SDG landing page & Notion-powered learning hub       | Frontend Developer         | 2026 |
| 03  | **Smart Glass** — Realtime IoT translation system with ESP32 & WebSockets   | IoT & Backend Developer    | 2026 |
| 04  | **MovieOn** — Modern cinematic movie interface with Next.js 15 & Supabase   | Fullstack Developer        | 2025 |
| 05  | **Kiro** — Agentic IDE and CLI for spec-driven AI development              | Open Source Contributor    | 2026 |

### Experience & Education

- **Full-stack Developer** at **OUTFIZ** (2026–Present)
- **Freelance Developer** at **VieTech Solutions** (2026–Present)
- **Software Engineering Student** at **FPT University Da Nang** (2023–Present)
- **9 Certifications** (DeepLearning.AI, Google, Amazon, University of Michigan, HKUST)
- **11 Competitive Programming Awards** (Regional & National levels, 2020–2023)

---

## Tech Stack

**Portfolio Site**

| Layer         | Tech                                     |
| ------------- | ---------------------------------------- |
| Framework     | **Next.js 16** (App Router)              |
| Core UI       | **React 19**, **Tailwind CSS 4**         |
| Animation     | **Framer Motion**, **Lenis** (Smooth)    |
| Optimization  | **React Compiler**                       |
| Forms / Val.  | **React Hook Form**, **Zod**             |
| Services      | **Resend** (Email), **Upstash** (Redis)  |
| Feedback      | **Sonner** (Toasts)                      |

**Engineering Stack**

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Java (Jakarta EE), Python (FastAPI)
- **Database**: PostgreSQL, Redis, MongoDB, Hibernate
- **Mobile**: React Native, Expo, Flutter
- **Tools**: Docker, Git, Figma, Postman

---

## Project Structure

```text
src/
  app/            Route pages (/, /work, /about, /contact, etc.)
  components/
    layout/       Header, Footer, Navigation, Lenis Wrapper
    sections/     Page-specific sections (Hero, Bento, Services, etc.)
    ui/           Reusable primitives and motion components
  data/           Static content and data models (edit here for content updates)
    about.ts      Career, stats, certifications, awards
    projects.ts   Project listings and rich content details
    services.ts   Service offerings, FAQ, testimonials
    site.ts       Metadata, socials, contact info
  lib/            Server actions, Redis client, Zod schemas, utility functions
  hooks/          Shared React hooks
```

---

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   *Required variables:*
   ```env
   RESEND_API_KEY=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

3. **Development:**
   ```bash
   npm run dev       # Runs at http://localhost:3000
   npm run build     # Production build
   npm run lint      # Code style check
   ```

---

## Features

- **Dynamic Work Pages**: Detail pages auto-generated from `PROJECTS` data.
- **Notion Integration**: Supports mapping external content for specific project blogs.
- **Contact Flow**: Secure form submission with Zod validation, persisted to Upstash Redis, and notified via Resend.
- **Performance First**: Optimized with React 19 and the new React Compiler for minimal re-renders.
- **Smooth Interaction**: Lenis smooth scrolling paired with Framer Motion entry animations.

---

## Deployment

Optimized for **Vercel**. Simply connect your repository and configure the environment variables mentioned in the Setup section.

Verify before pushing:
```bash
npm run lint && npm run build
```
