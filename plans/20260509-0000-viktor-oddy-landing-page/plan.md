# Viktor Oddy Landing Page Implementation Plan

Date: 2026-05-09
Status: Draft for review
Scope: Single-page Viktor Oddy creative studio landing page
Default stack decision: keep current Next 16.2.6 App Router unless user explicitly approves Vite conversion.

## Context

- Existing app is Next 16.2.6, React 19.2.4, Tailwind 4, Bun.
- User requested React + TypeScript + Vite + Tailwind + lucide-react.
- Repo instruction: read relevant Next docs before code because APIs changed.
- Existing research says Next adaptation is lower-risk than converting to Vite.

## Phases

| Phase | File | Status | Progress |
| --- | --- | --- | --- |
| 00 | [Stack decision gate](./phase-00-stack-decision-gate.md) | Pending user review | 0% |
| 01 | [Next docs and dependency prep](./phase-01-next-docs-and-dependency-prep.md) | Pending | 0% |
| 02 | [Content architecture and component map](./phase-02-content-architecture-and-component-map.md) | Pending | 0% |
| 03 | [Global theme and motion foundation](./phase-03-global-theme-and-motion-foundation.md) | Pending | 0% |
| 04 | [Landing page sections](./phase-04-landing-page-sections.md) | Pending | 0% |
| 05 | [Interactive motion components](./phase-05-interactive-motion-components.md) | Pending | 0% |
| 06 | [QA accessibility and build validation](./phase-06-qa-accessibility-and-build-validation.md) | Pending | 0% |

## Default recommendation

Implement in current Next App Router. This preserves project setup, Bun lock, React 19, Tailwind 4, and avoids full scaffold churn. Treat Vite as explicit alternate path only after approval.

## Out of scope until approved

- Converting repo to Vite.
- Replacing Next config/build pipeline.
- Adding backend/CMS/data layer.
- Editing app code before plan approval.

## Review request

Confirm phase 00 stack choice before implementation: keep Next, or convert to Vite.

## Unresolved questions

- Should implementation keep Next 16 despite Vite request?
- Can user provide `public/PPMondwest-Regular.woff2`?
- Should reduced-motion fully stop auto carousel or only shorten transitions?
