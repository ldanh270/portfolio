# Researcher 01 report — stack and styling

Date: 2026-05-09
Plan dir: `plans/20260509-0000-viktor-oddy-landing-page`

## Scope

Single-page landing page with React, TypeScript, Tailwind, custom fonts, CSS animations, lucide-react.

## Findings

- Repo currently uses Next 16 + Tailwind 4, not Vite. Best plan: either adapt implementation to Next app router or explicitly convert/bootstrap Vite after user approval.
- Tailwind 4 uses CSS-first config via `@import "tailwindcss"` and `@theme`; no required `tailwind.config.*` unless custom config needed.
- Put `@font-face` in global CSS. Use Webflow CDN for PP Neue Montreal, `/PPMondwest-Regular.woff2` for PP Mondwest.
- Use CSS variables/classes for fonts: `.font-mondwest` and global body font. Avoid Tailwind config unless needed.
- Use native `<img>` for remote GIFs. `next/image` needs remotePatterns and may not be ideal for animated GIF strips.
- Add `lucide-react` dependency before importing icons.
- Use static arrays for marquee images, projects, testimonials. No data layer needed.

## Implementation notes

- Keep reusable `Button` component due repeated shadows/variants.
- Keep each major section component separate for readability.
- Use `src/app/page.tsx` as composition root if staying Next.
- Client-only interactions require `"use client"` in components using hooks/event listeners.
- Global CSS should remove default dark-mode background and set white background throughout.

## Validation

- Run `bun install` if dependency added and lockfile needs update.
- Run `bun run lint` and `bun run build`.
- Start dev server and inspect UI in browser because this is visual work.

## Citations

No web used. Based on repo state and Tailwind/React implementation practice.

## Unresolved questions

- Should implementation keep Next 16 despite Vite request?
- Where should missing `PPMondwest-Regular.woff2` come from?
