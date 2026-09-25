# Past decisions

Append only. One row per decision. A row is never edited or deleted, a reversal is a new row.

A row exists when a problem was raised and a decision closed it. Nothing else gets a row.
Problem and decision are one line each. An error code, a trace id or a ticket number goes in Ref, never the error itself.

| Date | Problem | Decision | Ref |
| ---- | ------- | -------- | --- |
| 2026-09-25 | One background color is given, the foil of the offer badge has three tones | The color is the middle tone; the pale and deep tones are OKLCH offsets from it, measured on the original `#e6eefe`, `#b3c7f5`, `#86a4ea` | |
| 2026-09-25 | The copy becomes free lines, the offer badge styled three price lines each its own way | One style for every line, the one of the offer badge's discount line | |
| 2026-09-25 | The starburst `clip-path` hides the focus outline of the badge link | Keyboard focus draws an ink halo with `drop-shadow` on the tilt, outside the clip | |
| 2026-09-25 | The module must pass a type check without a Next.js application | `tsc --noEmit` over the folder with `types: ["next"]`, which declares CSS modules; dependencies are `next`, `react`, `@types/react`, `typescript` | |
| 2026-09-25 | Older browsers, such as older iPhones reached by Meta ads, drop OKLCH relative colors and the foil gradient became `none` | The three tones default to the background color, and the relative colors override them inside `@supports` testing the exact expression | |
| 2026-09-25 | Should `prefers-reduced-motion` still freeze the badge | No: every reduced motion guard is removed, the human judging that the motion never flashes and never morphs aggressively | inbox 003 |
| 2026-09-25 | The offer needs "Value 60 CHF" with only "60 CHF" struck through, and a line was one plain string | A line's text is a string or a non-empty list of runs `{ text, struck?: true }`, a struck run in an `s` with the source's `0.11em` line; plain strings stay valid | inbox 004 |
<!-- | 2026-08-30 | Build fails on the host, passes locally | Node pinned to 22 in .nvmrc and engines | ERR_REQUIRE_ESM | -->
