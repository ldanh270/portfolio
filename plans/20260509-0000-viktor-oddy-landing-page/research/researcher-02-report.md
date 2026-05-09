# Researcher 02 report — interactions and animation

Date: 2026-05-09
Plan dir: `plans/20260509-0000-viktor-oddy-landing-page`

## Scope

IntersectionObserver fade-ins, parallax image, infinite marquee, testimonial carousel, mouse-trail hover thumbnails.

## Findings

- `useInViewAnimation` should return `ref` + `isInView`, use threshold `0.1`, disconnect after first intersect.
- Use CSS `animate-fade-in-up`; components render `opacity-0` until `isInView`, then add animation class and inline `animationDelay`.
- Parallax image should use refs, `IntersectionObserver` to enable scroll listener only when visible, and `requestAnimationFrame` to throttle transform updates.
- Store RAF id and remove scroll listener on cleanup. Avoid React state during scroll; update DOM style directly.
- Marquee should be CSS-only: flex row of duplicated image list; keyframes translate `0` to `-50%`; use media query for 10s mobile and 30s desktop.
- Carousel can use React state for active index, `setInterval` 3000ms, pause on hover, transition transform with `cubic-bezier(0.4,0,0.2,1)` and `0.8s`.
- For tripled testimonials, start at middle set; when reaching edges, jump without transition in next frame to preserve infinite feel.
- Mouse-trail thumbnails should only run on pointer devices, throttle spawn to 80ms, cleanup expired items after 1000ms, and clear timers/RAF on unmount.
- Honor `prefers-reduced-motion`: disable/shorten animations, stop auto carousel/mouse trail if needed.

## Risk controls

- Do not attach global listeners before mount.
- Do not leave interval, scroll listener, observer, timeout, or RAF alive after unmount.
- Keep hover thumbnails `pointer-events-none` and absolute inside section.

## Citations

No web used. Based on React/browser API patterns.

## Unresolved questions

- Should motion reduce mode fully disable carousel auto-scroll or only shorten transitions?
