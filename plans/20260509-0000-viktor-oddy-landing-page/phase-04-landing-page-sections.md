# Phase 04 — Landing page sections

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-02-content-architecture-and-component-map.md](./phase-02-content-architecture-and-component-map.md)
- Depends on: [phase-03-global-theme-and-motion-foundation.md](./phase-03-global-theme-and-motion-foundation.md)

## Overview

- Date: 2026-05-09
- Description: Build static responsive landing sections before interactive polish.
- Priority: High
- Implementation status: Not started
- Review status: Pending

## Key Insights

- Static layout first reduces animation/debug complexity.
- `src/app/page.tsx` currently default starter and should be replaced if approved.
- Native `img` safer for remote animated GIF strips.
- lucide icons can enhance CTAs/services without custom SVG complexity.

## Requirements

- Single-page, responsive, creative studio feel.
- Sections: hero, marquee/visual proof, about/services, projects, testimonials, contact/footer.
- Semantic HTML landmarks/headings.
- Mobile-first Tailwind classes.

## Architecture

- Server components for static sections where possible.
- Shared Button handles primary/secondary variants.
- Section wrappers use consistent max-width, gutters, vertical rhythm.
- Use typed data arrays for cards and links.

## Related code files

- `src/app/page.tsx`
- `src/components/landing/*.tsx`
- `src/components/ui/Button.tsx`
- `src/lib/landing-data.ts`

## Implementation Steps

1. Compose page from section components.
2. Implement hero with strong title, CTA, and studio positioning.
3. Implement visual marquee shell with duplicated assets.
4. Implement about/services and featured projects grids.
5. Implement testimonials static shell.
6. Implement contact/footer with external links.

## Todo list

- [ ] Build Hero.
- [ ] Build Marquee shell.
- [ ] Build About/Services.
- [ ] Build Projects.
- [ ] Build Testimonials shell.
- [ ] Build Contact/Footer.

## Success Criteria

- Page matches intended structure without JS interactions.
- Layout works at mobile/tablet/desktop widths.
- Lighthouse-accessible semantics baseline.

## Risk Assessment

- Risk: visual mismatch due missing assets. Mitigation: placeholders with exact dimensions.
- Risk: too much custom one-off styling. Mitigation: shared section and button patterns.

## Security Considerations

- External links use safe rel.
- Image alts accurate; decorative images empty alt.
- No user-generated content.

## Next steps

- Add interactive motion components after static layout stable.

## Unresolved questions

- Final asset URLs and portfolio links.
