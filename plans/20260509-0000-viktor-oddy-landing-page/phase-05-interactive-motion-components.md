# Phase 05 — Interactive motion components

## Context links

- Parent plan: [plan.md](./plan.md)
- Depends on: [phase-04-landing-page-sections.md](./phase-04-landing-page-sections.md)
- Research: [researcher-02-report.md](./research/researcher-02-report.md)

## Overview

- Date: 2026-05-09
- Description: Add reveal, parallax, infinite carousel, and mouse-trail interactions safely.
- Priority: Medium
- Implementation status: Not started
- Review status: Pending

## Key Insights

- Any hook/event listener component must be client component.
- IntersectionObserver should disconnect after first reveal.
- Scroll/parallax should use refs + RAF, not React state.
- Carousel must cleanup intervals and pause on hover.
- Mouse trail should only run on pointer devices.

## Requirements

- `useInViewAnimation` hook with threshold `0.1`.
- CSS-only marquee for image strip.
- Parallax image enabled only while visible.
- Testimonials auto-scroll every 3000ms, pause on hover.
- Mouse trail throttled to 80ms, items expire after 1000ms.
- Respect reduced motion.

## Architecture

- `src/hooks/useInViewAnimation.ts` for reveal logic.
- Client components for `ParallaxImage`, `TestimonialsCarousel`, `MouseTrailSection`.
- CSS keyframes handle repeated marquee and fade-up.
- Cleanup all observers/listeners/timers/RAF in effects.

## Related code files

- `src/hooks/useInViewAnimation.ts`
- `src/components/landing/ParallaxImage.tsx`
- `src/components/landing/TestimonialsCarousel.tsx`
- `src/components/landing/MouseTrailSection.tsx`
- `src/app/globals.css`

## Implementation Steps

1. Implement reveal hook and apply to section wrappers.
2. Add CSS marquee using duplicated content list.
3. Implement parallax image with visibility observer and RAF-throttled transform.
4. Implement infinite-feel testimonial carousel via tripled array and transition reset.
5. Implement mouse-trail thumbnails with pointer capability guard.
6. Add reduced-motion fallbacks.

## Todo list

- [ ] Build reveal hook.
- [ ] Wire section reveal animations.
- [ ] Build parallax component.
- [ ] Build testimonial carousel.
- [ ] Build mouse-trail effect.
- [ ] Verify cleanup paths.

## Success Criteria

- Interactions feel smooth on desktop and do not break mobile.
- No memory leaks from listeners/timers/RAF.
- Reduced-motion mode disables or minimizes nonessential motion.

## Risk Assessment

- Risk: animation jank. Mitigation: transform only, RAF throttle, no scroll state.
- Risk: hydration mismatch. Mitigation: client components isolate browser APIs.
- Risk: noisy cursor effect. Mitigation: throttle and pointer-only guard.

## Security Considerations

- No direct DOM HTML injection.
- Mouse trail nodes pointer-events none; no click hijack.

## Next steps

- Validate build, accessibility, and visual behavior.

## Unresolved questions

- Reduced-motion policy: stop carousel auto-scroll or shorten transitions only?
