# Phase 01 — Next docs and dependency prep

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-00-stack-decision-gate.md](./phase-00-stack-decision-gate.md)
- Scout: [scout-01-report.md](./scout/scout-01-report.md)
- Research: [researcher-01-report.md](./research/researcher-01-report.md)

## Overview

- Date: 2026-05-09
- Description: Prepare implementation inputs for current Next 16 + Tailwind 4 app.
- Priority: High
- Implementation status: Not started
- Review status: Pending

## Key Insights

- `lucide-react` missing.
- Tailwind 4 already configured via `@import "tailwindcss"` and PostCSS package.
- `next.config.ts` has `reactCompiler: true`.
- Next docs must be consulted before code due project instruction.

## Requirements

- Read relevant local/official Next 16 App Router docs before code.
- Add only needed dependency: `lucide-react`.
- Keep Bun lock consistent if dependency changes.
- Do not introduce Tailwind config unless CSS-first setup insufficient.

## Architecture

- Runtime framework: Next App Router.
- Styling: Tailwind 4 CSS-first + global CSS variables/classes.
- Icons: `lucide-react` imported in client/server components as needed.
- Assets: `public/` for local font; remote GIFs via native `img` unless Next config changed.

## Related code files

- `package.json`
- `bun.lock`
- `next.config.ts`
- `postcss.config.mjs`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `public/PPMondwest-Regular.woff2`

## Implementation Steps

1. Locate relevant Next 16 docs in `node_modules/next/dist/docs/` or official docs if unavailable.
2. Review App Router page/layout conventions, metadata, images/assets, client component rules.
3. Install `lucide-react` with Bun if phase approved.
4. Decide image approach: native `img` default for animated remote GIFs.
5. Verify font asset availability; request missing `PPMondwest-Regular.woff2` if absent.

## Todo list

- [ ] Read Next docs before code.
- [ ] Add `lucide-react`.
- [ ] Confirm font asset source.
- [ ] Confirm image loading approach.

## Success Criteria

- Dependency plan minimal and lockfile-safe.
- Next implementation constraints known.
- No unneeded scaffold conversion.

## Risk Assessment

- Risk: Next 16 API drift. Mitigation: docs-first.
- Risk: missing font causes visual mismatch. Mitigation: fallback and request asset.
- Risk: animated GIF mishandled by `next/image`. Mitigation: native `img`.

## Security Considerations

- Vet remote font/image URLs.
- Use `rel="noopener noreferrer"` for external links.
- Avoid unsafe HTML injection.

## Next steps

- Proceed to content architecture after stack and deps confirmed.

## Unresolved questions

- Where should `PPMondwest-Regular.woff2` come from?
