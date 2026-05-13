# Scout report 01

Date: 2026-05-09
Plan dir: `plans/20260509-0000-viktor-oddy-landing-page`

## Found

- `package.json` — Next 16.2.6 app, React 19.2.4, Tailwind 4 via `@tailwindcss/postcss`, no Vite.
- `src/app/page.tsx` — default create-next-app page; target replacement location if staying Next.
- `src/app/layout.tsx` — imports Geist fonts now; metadata default; should change to Viktor Oddy metadata and remove Geist if using CSS fonts.
- `src/app/globals.css` — Tailwind 4 import, default dark-mode variables; should become white-only global styles, font faces, animations.
- `next.config.ts` — `reactCompiler: true`; no remote image config yet.
- `public/` — default SVGs only. `PPMondwest-Regular.woff2` not found.

## Missing

- `src/components/*`
- `src/hooks/useInViewAnimation.ts`
- `public/PPMondwest-Regular.woff2`
- `lucide-react` dependency
- Vite config files

## Key risk

User asks React TypeScript Vite, but repo is Next 16 app router. Project instruction says read Next docs before code. Plan should ask whether to keep Next or convert to Vite before implementation.

## Unresolved questions

- Keep Next 16 or convert scaffold to Vite?
- Can user provide `PPMondwest-Regular.woff2`?
