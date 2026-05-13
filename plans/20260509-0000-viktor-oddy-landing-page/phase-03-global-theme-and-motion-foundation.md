# Phase 03 — Global theme and motion foundation

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-01-next-docs-and-dependency-prep.md](./phase-01-next-docs-and-dependency-prep.md)
- Research: [researcher-01-report.md](./research/researcher-01-report.md)
- Research: [researcher-02-report.md](./research/researcher-02-report.md)

## Overview

- Date: 2026-05-09
- Description: Establish fonts, colors, base styles, and reusable motion CSS.
- Priority: High
- Implementation status: Not started
- Review status: Pending

## Key Insights

- Current CSS has dark-mode variables; target likely white editorial studio page.
- Tailwind 4 can define theme tokens in CSS.
- `@font-face` should live in `globals.css`.
- Motion must honor `prefers-reduced-motion`.

## Requirements

- Configure PP Neue Montreal and PP Mondwest fallback strategy.
- Remove default create-next-app dark visual assumptions.
- Add CSS keyframes/classes for fade-up and marquee.
- Keep animations performant: transform/opacity only.

## Architecture

- `globals.css` owns `@import "tailwindcss"`, `@theme`, base body styles, font classes, keyframes.
- `layout.tsx` owns metadata and global html/body classes.
- Motion hook later toggles CSS classes; CSS controls animation behavior.

## Related code files

- `src/app/globals.css`
- `src/app/layout.tsx`
- `public/PPMondwest-Regular.woff2`

## Implementation Steps

1. Update metadata for Viktor Oddy creative studio.
2. Define global font variables/classes.
3. Set white background and black foreground baseline.
4. Add `fade-in-up`, marquee, and reduced-motion rules.
5. Avoid large Tailwind config unless necessary.

## Todo list

- [ ] Define theme tokens.
- [ ] Add font-face rules.
- [ ] Add motion keyframes.
- [ ] Add reduced-motion overrides.
- [ ] Update metadata plan.

## Success Criteria

- Global styling supports all planned sections.
- No dark-mode inversion leaks from default app.
- Reduced-motion users get stable UI.

## Risk Assessment

- Risk: custom font unavailable. Mitigation: fallback stack and asset request.
- Risk: global CSS bloat. Mitigation: only shared tokens/keyframes.

## Security Considerations

- External font CDN should be trusted or avoided.
- No inline third-party scripts.

## Next steps

- Implement static landing sections using theme primitives.

## Unresolved questions

- Exact font source licensing and file availability.
