# Phase 02 — Content architecture and component map

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-00-stack-decision-gate.md](./phase-00-stack-decision-gate.md)
- Research: [researcher-01-report.md](./research/researcher-01-report.md)

## Overview

- Date: 2026-05-09
- Description: Define content model and component boundaries for the single-page studio landing page.
- Priority: High
- Implementation status: Not started
- Review status: Pending

## Key Insights

- Static arrays are enough; no CMS/data layer needed.
- `src/app/page.tsx` should be composition root only.
- Major sections should be separate components for readability.
- Reusable `Button` likely worth it due repeated variants/shadows.

## Requirements

- Build one-page creative studio landing page for Viktor Oddy.
- Use TypeScript typed static data.
- Keep components simple and local to landing page unless reuse is clear.
- Include responsive mobile-first layout.

## Architecture

- `src/app/page.tsx`: imports and orders sections.
- `src/components/landing/*`: section components.
- `src/components/ui/Button.tsx`: shared button if repeated.
- `src/lib/landing-data.ts`: projects, testimonials, marquee images, nav links if useful.
- Client components only where hooks/interactions exist.

## Related code files

- `src/app/page.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/landing/Marquee.tsx`
- `src/components/landing/Projects.tsx`
- `src/components/landing/Testimonials.tsx`
- `src/components/landing/Contact.tsx`
- `src/components/ui/Button.tsx`
- `src/lib/landing-data.ts`

## Implementation Steps

1. Replace default page content with section composition.
2. Define content arrays with stable ids and alt text.
3. Map visual sections: hero, image marquee, about/services, featured work, testimonials, contact/footer.
4. Keep copy and image URLs centralized if repeated.
5. Decide server vs client per component.

## Todo list

- [ ] Draft component tree.
- [ ] Draft static data shape.
- [ ] Identify client-only sections.
- [ ] Define responsive section order.

## Success Criteria

- Page structure clear before styling.
- No duplicated content constants.
- Components remain small and testable.

## Risk Assessment

- Risk: over-componentization. Mitigation: split only major sections/reused UI.
- Risk: data indirection too heavy. Mitigation: plain arrays only.

## Security Considerations

- Sanitize external URLs by hardcoding trusted values.
- Add descriptive alt text.
- Avoid target blank without rel.

## Next steps

- Build global theme, fonts, and animation primitives.

## Unresolved questions

- Final copy, links, and project images need user confirmation if not already specified.
