# SSOP action-badge

## Shapes

| Data | Origin | Destination | Boundary | Shape | Illegal state it forbids |
| ---- | ------ | ----------- | -------- | ----- | ------------------------ |
| Parameters | the host page, a server or client component | `ActionBadge` | the type checker at the call, against `ActionBadgeProps` | `{ lines: readonly [ActionBadgeLine, ...ActionBadgeLine[]]; icon: StaticImageData; background: string; sectionId: string }`, `ActionBadgeLine = { text: string; color: string }` | a badge with no copy, a line without its color, a color without its line |
| Motif and background | `ActionBadge` parameters | the CSS, through `--action-badge-motif` and `--action-badge-background` on the root | the `style` of the root, written once by `ActionBadge` | `url(<emitted path>)`, a CSS color | a motif path the host bundler never emitted: the icon is an import |
| Input kind | `matchMedia("(hover: hover) and (pointer: fine)")` | `startBadgeMotion` | the read at start | fine pointer runs `followPage`, anything else runs `breathe` | a badge driven by a cursor and by the clock at once |
| Aim | `followPage` from the cursor, `breathe` from the clock | `--action-badge-aim-x`, `--action-badge-aim-y` on the root, read by the CSS | `pose.aim` clamps both axes | `{ x: number, y: number }`, each in [-1, 1] | a tilt beyond the maximum angle the CSS allows |

## Order

| Produces | Needs | Parameters | Returns | File |
| -------- | ----- | ---------- | ------- | ---- |
| style sheet | none | none | class names | `action-badge/action-badge.module.css` |
| motif | none | none | the published motif, for the host to import as `icon` | `action-badge/palette.svg` |
| pose | badge | `createPose(badge)` | `Pose { aim(point), release(), dispose() }` | `action-badge/pose.ts` |
| followPage | badge, pose | `followPage({ badge, pose })` | stop | `action-badge/follow-page.ts` |
| breathe | pose | `breathe({ pose })` | stop | `action-badge/breathe.ts` |
| startBadgeMotion | badge, pose, followPage, breathe | `startBadgeMotion(badge)` | stop | `action-badge/start-badge-motion.ts` |
| BadgeMotion | startBadgeMotion, style sheet, children, style | `<BadgeMotion style>{children}</BadgeMotion>` | the badge root | `action-badge/badge-motion.tsx` |
| ActionBadge | BadgeMotion, style sheet, parameters | `<ActionBadge lines icon background sectionId />` | the badge | `action-badge/action-badge.tsx` |
| index | ActionBadge | none | `ActionBadge`, `ActionBadgeProps`, `ActionBadgeLine` | `action-badge/index.ts` |

Edges: followPage and breathe need pose. startBadgeMotion needs pose, followPage, breathe. BadgeMotion needs startBadgeMotion and the style sheet. ActionBadge needs BadgeMotion and the style sheet. index needs ActionBadge.
Boundary data: badge, parameters, children, style.

Sort:

1. action-badge.module.css, palette.svg, pose.ts
2. follow-page.ts, breathe.ts
3. start-badge-motion.ts
4. badge-motion.tsx
5. action-badge.tsx
6. index.ts, README.md

## Checks

| Module | Change it confines | What a caller must know |
| ------ | ------------------ | ----------------------- |
| pose | how the badge settles toward an aim: smoothing, rest pose, the variables the CSS reads | `aim` takes a point in [-1, 1], `release` returns to rest, `dispose` stops the frame loop |
| followPage | how far away a cursor still turns the badge | returns a stop function |
| breathe | the ambient motion of a phone | stays still under reduced motion; returns a stop function |
| startBadgeMotion | which behaviour each kind of screen runs | returns a stop function |
| BadgeMotion | where motion attaches in React: the root, mounted on the client | renders the root around its children |
| ActionBadge | the markup of the badge and how parameters reach the CSS | the four parameters |
| action-badge.module.css | the look: starburst, foil, light, slant, tilt range, corner position | nothing, the class names stay inside the folder |

## Ownership

| Fact | Owner | Readers | Writer |
| ---- | ----- | ------- | ------ |
| Parameters | the host page | ActionBadge | the host page |
| Current and target aim | pose | the CSS, through the custom properties | pose, asked by the running driver |
| Input kind | the browser, read once by startBadgeMotion | startBadgeMotion | none |

## Amendments
- The link is the face, an `a`; its outline is cut by the starburst `clip-path`, so keyboard focus draws an ink halo through the `drop-shadow` of the tilt, and the aim shadow moves into `--action-badge-shadow` so both filters share it.
- Every line takes one style, the one of the source's last line: `11cqi`, italic, 700, never wrapped.
- The type check needs `next`, `react`, `@types/react` and `typescript` only; `react-dom` comes in as a peer of `next`.
- The foil tones default to the background color and the relative colors override them inside `@supports`: a plain fallback declared before a `var()` value is lost, the later declaration wins the cascade and becomes invalid at computed value time.
- `prefers-reduced-motion` no longer changes the badge: `breathe` loses its early return and the style its reduced motion rule, so the breathe row of Checks no longer stays still.
