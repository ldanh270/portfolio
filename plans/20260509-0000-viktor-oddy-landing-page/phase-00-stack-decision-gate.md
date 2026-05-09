# Phase 00 — Stack decision gate

## Context links

- Parent plan: [plan.md](./plan.md)
- Scout: [scout-01-report.md](./scout/scout-01-report.md)
- Research: [researcher-01-report.md](./research/researcher-01-report.md)
- Project instruction: `CLAUDE.md` -> `AGENTS.md`

## Overview

- Date: 2026-05-09
- Description: Resolve requested Vite stack vs existing Next 16 App Router repo.
- Priority: Critical
- Implementation status: Not started
- Review status: Needs user decision

## Key Insights

- Repo is not Vite; it is Next 16.2.6 + React 19.2.4 + Tailwind 4.
- Vite conversion touches package scripts, dependencies, routing, public entry, and build pipeline.
- Keeping Next delivers same single-page React UI with much less risk.
- Project instruction requires reading Next docs before writing code.

## Requirements

- Do not edit app code in this planning step.
- Ask user to approve either keep Next or convert to Vite.
- Default to Next if no explicit Vite approval.
- Document Vite as alternate path, not hidden assumption.

## Architecture

- Default: Next App Router page composition in `src/app/page.tsx`.
- Alternate: Vite entry with `index.html`, `src/main.tsx`, `src/App.tsx`, Vite config.
- Shared UI plan remains React + TypeScript + Tailwind + lucide-react.

## Related code files

- `package.json`
- `bun.lock`
- `next.config.ts`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`

## Implementation Steps

1. Present decision: Next adaptation recommended.
2. If approved, continue with phases 01-06 as Next plan.
3. If Vite required, create separate conversion plan before UI work.
4. Record final decision in plan status.

## Todo list

- [ ] Confirm keep Next vs convert Vite.
- [ ] If Next, proceed to docs/dependency prep.
- [ ] If Vite, scope migration and risk separately.

## Success Criteria

- User understands tradeoff.
- One stack chosen before implementation.
- No code modified before approval.

## Risk Assessment

- Risk: Implementing Vite expectation inside Next repo causes mismatch. Mitigation: explicit gate.
- Risk: Converting to Vite breaks existing Next setup. Mitigation: separate migration plan.

## Security Considerations

- No security-sensitive changes in this phase.
- Avoid adding external scripts or fonts until source reviewed.

## Next steps

- Ask user to approve default Next path or request Vite conversion.

## Unresolved questions

- Keep Next 16 or convert to Vite?
