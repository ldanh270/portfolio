# Phase 06 — QA accessibility and build validation

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-05-interactive-motion-components.md](./phase-05-interactive-motion-components.md)
- Research: [researcher-01-report.md](./research/researcher-01-report.md)
- Research: [researcher-02-report.md](./research/researcher-02-report.md)

## Overview

- Date: 2026-05-09
- Description: Validate code quality, build, accessibility, and responsive visual behavior.
- Priority: High
- Implementation status: Not started
- Review status: Pending

## Key Insights

- Visual page needs browser inspection, not only lint/build.
- `bun run lint` and `bun run build` are baseline checks.
- Motion cleanup and reduced-motion need manual verification.
- Next config/dependency changes should be minimal.

## Requirements

- Run lint and production build.
- Inspect local dev page across common breakpoints.
- Check keyboard focus and semantic headings.
- Check no console errors or hydration warnings.
- Check reduced-motion behavior.

## Architecture

- Validation uses existing scripts in `package.json`.
- No test framework required unless project adds one later.
- Manual browser QA covers visual/motion specifics.

## Related code files

- `package.json`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/landing/*`
- `src/hooks/useInViewAnimation.ts`

## Implementation Steps

1. Run `bun run lint`.
2. Run `bun run build`.
3. Start dev server and inspect page.
4. Test mobile, tablet, desktop widths.
5. Test keyboard navigation and focus styles.
6. Test reduced-motion mode.
7. Fix only issues found within approved scope.

## Todo list

- [ ] Lint passes.
- [ ] Build passes.
- [ ] No console/hydration errors.
- [ ] Responsive QA complete.
- [ ] Accessibility QA complete.
- [ ] Reduced-motion QA complete.

## Success Criteria

- Production build succeeds.
- Landing page visually complete and responsive.
- Motion smooth, safe, and cleaned up.
- Basic accessibility standards met.

## Risk Assessment

- Risk: build catches client/server boundary issue. Mitigation: isolate browser APIs in client components.
- Risk: remote assets slow/fail. Mitigation: graceful dimensions/fallbacks.
- Risk: visual regressions. Mitigation: browser QA before handoff.

## Security Considerations

- Verify external links safe.
- No secrets/env changes.
- No third-party script injection.
- Remote assets limited to trusted sources.

## Next steps

- Present implementation summary and test results after code phase, if approved.

## Unresolved questions

- Which viewport/browser matrix is required beyond Chrome responsive QA?
