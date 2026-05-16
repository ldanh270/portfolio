# Le Duc Anh Portfolio

Personal portfolio for Le Duc Anh, built with Next.js App Router, React, Tailwind CSS, and Framer Motion. The site presents selected work, services, background, certificates, awards, and a contact flow backed by Resend and Upstash Redis.

## Features

- Editorial portfolio homepage with animated hero, works, and services sections.
- Work listing and dynamic project detail pages.
- Services page with offer cards, tech stack, process timeline, and FAQ accordion.
- About page with skills, timeline journey, certificates, awards, and credentials.
- Contact page with validated form, email delivery, and inquiry persistence.
- Smooth scrolling, page transitions, custom cursor, and reduced-motion aware interactions.
- Shared content data in TypeScript files for simple portfolio updates.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Hook Form
- Zod
- Resend
- Upstash Redis
- Sonner toast notifications

## Project Structure

```txt
src/
  app/                  Route pages and metadata
    about/
    contact/
    services/
    work/
  components/
    layout/             Header, footer, smooth scroll
    sections/           Page-specific sections
    ui/                 Reusable UI and motion primitives
  data/                 Portfolio content
  lib/                  Contact action, Redis client, validation
  hooks/                Shared hooks
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in:

```env
RESEND_API_KEY=YOUR_RESEND_API_KEY_HERE
UPSTASH_REDIS_REST_URL=YOUR_UPSTASH_REDIS_REST_URL_HERE
UPSTASH_REDIS_REST_TOKEN=YOUR_UPSTASH_REDIS_REST_TOKEN_HERE
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production app
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Content Editing

Most site content is data-driven:

- Projects: `src/data/projects.ts`
- Services, approach, tech stack, FAQ: `src/data/services.ts`
- Site links, navigation, profile data: `src/data/site.ts`
- About timeline: `src/data/about.ts`

Project detail pages are generated from `projects` by slug:

```txt
/work/[slug]
```

## Contact Flow

The contact form lives in:

```txt
src/components/sections/contact/ContactForm.tsx
```

Validation is shared between client and server:

```txt
src/lib/validations/contact.ts
```

Submission is handled by:

```txt
src/lib/contact.ts
```

On submit:

1. Input is validated with Zod.
2. Inquiry is saved to Upstash Redis.
3. Email is sent with Resend.
4. Redis failure returns an error.
5. Email failure is logged but does not block success if data was saved.

## Deployment

This app is ready for Vercel or any Next.js-compatible host.

Required production environment variables:

```env
RESEND_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Before deploying, verify locally:

```bash
npm run lint
npm run build
```

## Notes

- The UI uses custom motion heavily; check reduced-motion behavior when adding new animations.
- Keep portfolio content in `src/data/*` when possible instead of hardcoding it into components.
- Contact form changes should keep client and server validation aligned through the shared Zod schema.
