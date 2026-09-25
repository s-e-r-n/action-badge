# SSOP gift-card

## Shapes

| Data | Origin | Destination | Boundary | Shape | Illegal state it forbids |
| ---- | ------ | ----------- | -------- | ----- | ------------------------ |
| Parameters | the host page, a server or client component | `GiftCard` | the type checker at the call, against `GiftCardProps` | `{ lead: string; title: string; titleTail?: { text: string; emoji?: string }; price: string; formerPrice?: string; mark: StaticImageData; markLabel: string; giftLabel: string }` | a card without its price or title, an emoji without the words it follows, a mark without its accessible name, a former price standing alone |
| Mark | `GiftCard` parameters | the CSS, through `--gift-card-mark` and `--gift-card-mark-ratio` on the scene | the `style` of the scene, written once by `GiftCard` | `url(<emitted path>)`, `<width> / <height>` of the import | a mark path the host bundler never emitted, a mark stretched to another mark's proportions |
| Gift icon | the folder, `gift.svg` | the CSS mask of the gift | `url("./gift.svg")` in the style module, resolved by the host bundler | a file beside the style module, its notice in `gift.LICENSE` | an icon shipped without its license |
| Input kind | `matchMedia("(hover: hover) and (pointer: fine)")` | `startCardMotion` | the read at start | fine pointer runs `followPage`, anything else runs `breathe` | a card driven by a cursor and by the clock at once |
| Scene on screen | `IntersectionObserver` | `breathe` | the observer callback | `isIntersecting: boolean` | a sway running while the card is scrolled away |
| Aim | `followPage` from the cursor, `breathe` from the clock | `--gift-card-aim-x`, `--gift-card-aim-y` on the scene, read by the CSS | `pose.aim` clamps both axes | `{ x: number, y: number }`, each in [-1, 1] | a tilt beyond the maximum angle the CSS allows |

## Order

| Produces | Needs | Parameters | Returns | File |
| -------- | ----- | ---------- | ------- | ---- |
| style sheet | gift icon | none | class names | `gift-card/gift-card.module.css` |
| gift icon | none | none | the icon the style sheet masks, with its notice | `gift-card/gift.svg`, `gift-card/gift.LICENSE` |
| pose | scene | `createPose(scene)` | `Pose { aim(point), release(), dispose() }` | `gift-card/pose.ts` |
| followPage | scene, pose | `followPage({ scene, pose })` | stop | `gift-card/follow-page.ts` |
| breathe | scene, pose | `breathe({ scene, pose })` | stop | `gift-card/breathe.ts` |
| startCardMotion | scene, pose, followPage, breathe | `startCardMotion(scene)` | stop | `gift-card/start-card-motion.ts` |
| CardMotion | startCardMotion, style sheet, children, style | `<CardMotion style>{children}</CardMotion>` | the scene | `gift-card/card-motion.tsx` |
| GiftCard | CardMotion, style sheet, parameters | `<GiftCard lead title titleTail price formerPrice mark markLabel giftLabel />` | the card | `gift-card/gift-card.tsx` |
| index | GiftCard | none | `GiftCard`, `GiftCardProps` | `gift-card/index.ts` |

Edges: the style sheet needs the gift icon. followPage and breathe need pose. startCardMotion needs pose, followPage, breathe. CardMotion needs startCardMotion and the style sheet. GiftCard needs CardMotion and the style sheet. index needs GiftCard.
Boundary data: scene, parameters, children, style.

Sort:

1. gift.svg, gift.LICENSE, pose.ts
2. gift-card.module.css, follow-page.ts, breathe.ts
3. start-card-motion.ts
4. card-motion.tsx
5. gift-card.tsx
6. index.ts, README.md, package.json, package-lock.json, tsconfig.json

## Checks

| Module | Change it confines | What a caller must know |
| ------ | ------------------ | ----------------------- |
| pose | how the card settles toward an aim: smoothing, rest pose, the variables the CSS reads | `aim` takes a point in [-1, 1], `release` returns to rest, `dispose` stops the frame loop |
| followPage | how far away a cursor still turns the card | returns a stop function |
| breathe | the ambient motion of a phone, paused while the card is off screen | returns a stop function |
| startCardMotion | which behaviour each kind of screen runs | returns a stop function |
| CardMotion | where motion attaches in React: the scene, mounted on the client | renders the scene around its children |
| GiftCard | the markup of the card and how parameters reach the CSS | the eight parameters; the parent sets the width |
| gift-card.module.css with gift.svg | the look: surface, thickness, metal and gold inks, light, layout of the print, tilt range | nothing, the class names and the icon stay inside the folder |

## Ownership

| Fact | Owner | Readers | Writer |
| ---- | ----- | ------- | ------ |
| Parameters | the host page | GiftCard | the host page |
| Current and target aim | pose | the CSS, through the custom properties | pose, asked by the running driver |
| Input kind | the browser, read once by startCardMotion | startCardMotion | none |
| Scene on screen | the browser, reported to breathe | breathe | none |

## Amendments
