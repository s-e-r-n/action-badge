# action-badge

A floating starburst badge for Next.js. It sits in the bottom right corner of the page, partly past the edge, with a foil, a moving light and a slanted copy, and a click on it scrolls to a section of the page.

- On a computer (a fine pointer that can hover), the badge turns toward the cursor wherever it is on the page, and keeps following it over the badge.
- On a phone (no fine pointer), the badge sways on its own slow cycle and ignores touches, apart from the click.
- The badge moves the same way under `prefers-reduced-motion: reduce`: its motion never flashes and never morphs.

The module is one folder, `action-badge/`. It has no dependency beyond Next.js and React, and it is not published to npm: a project copies the folder and imports it.

The repository holds a second module, the [gift card](#gift-card), in its own folder `gift-card/`. The two share nothing, so a project copies only the one it needs.

## Copy the folder

Copy `action-badge/` from the tag you want into your project, next to your other components:

```sh
git clone --depth 1 --branch v1.0.0 https://github.com/s-e-r-n/action-badge.git /tmp/action-badge
cp -R /tmp/action-badge/action-badge src/action-badge
```

Only the folder is needed. The rest of this repository exists to type check it.

## Import it

The folder's `index.ts` exports the component and the types of its parameters:

```ts
import {
  ActionBadge,
  type ActionBadgeLine,
  type ActionBadgeProps,
  type ActionBadgeRun,
} from "@/action-badge";
```

`@/action-badge` assumes the default `@/*` path alias of `create-next-app`. Without it, import the folder by relative path.

`ActionBadge` renders on the server. Only its motion runs on the client, from the `"use client"` file inside the folder, so it can be placed in a server or a client component, in the App Router or the Pages Router.

## Set each parameter

| Parameter | Type | What it sets |
| --- | --- | --- |
| `lines` | `[ActionBadgeLine, ...ActionBadgeLine[]]` | The copy, one entry per line, at least one. Each line renders in its own `span`, on one line, in its own color. |
| `lines[n].text` | `string` or `[ActionBadgeRun, ...ActionBadgeRun[]]` | The words of the line: a plain string, or a list of at least one run when part of the line looks different. Keep lines short: the badge does not wrap or shrink them, and the starburst cuts off what overflows. Use `\u00a0` for a space that must not break, such as `"40\u00a0CHF"`. |
| `lines[n].text[n].text` | `string` | The words of one run. Runs sit side by side, so put the space between two runs inside one of them, such as `"Value "`. |
| `lines[n].text[n].struck` | `true`, optional | Strikes the run through, such as a former price. Leave it out for a plain run. |
| `lines[n].color` | `string` | Any CSS color for that line, such as `"#182038"`. |
| `icon` | `StaticImageData` | The motif repeated across the foil, as an image import. Light strokes on a transparent background read best. The folder ships its own motif, `palette.svg`. |
| `background` | `string` | Any CSS color. It is the middle tone of the foil: the badge derives a paler tone toward the light and a deeper, more saturated tone at the edges. |
| `sectionId` | `string` | The `id` of the section a click leads to, without `#`. The badge links to `#<sectionId>`, so an element with that `id` must exist on the page. |

## Example

```tsx
import { ActionBadge } from "@/action-badge";
import palette from "@/action-badge/palette.svg";

const Page = () => (
  <main>
    <section id="offer">...</section>
    <ActionBadge
      lines={[
        {
          text: [{ text: "Value " }, { text: "60\u00a0CHF", struck: true }],
          color: "#182038",
        },
        { text: "40\u00a0CHF", color: "#182038" },
        { text: "-33\u00a0%", color: "#b4235a" },
      ]}
      icon={palette}
      background="#b3c7f5"
      sectionId="offer"
    />
  </main>
);

export default Page;
```

`#b3c7f5` with the shipped `palette.svg` gives the original blue foil.

## Good to know

- Place one badge per page. It is `position: fixed` at `z-index: 40`, sized between 150 and 228 pixels.
- To scroll smoothly to the section instead of jumping, set `scroll-behavior: smooth` on `html` in your global styles.
- Next.js imports an SVG as a static image by default, which is what `icon` expects. If your project turns SVG imports into React components (SVGR), import the motif from a PNG, or exclude the folder's SVG from that rule.
- The badge takes its font from the page.
- The paler and deeper foil tones use CSS relative color syntax. A browser without it, such as an older iPhone, shows a flat foil in the `background` color, with the light, sheen and motif still on top.

## gift-card

A gift card for Next.js, drawn as a thick plastic card lying in perspective. Its print shows a lead, a title, a mark and a price in a brushed metal ink, with a gold gift icon in the top right corner.

- On a computer (a fine pointer that can hover), the card turns toward the cursor wherever it is on the page, and its light and metal ink follow.
- On a phone (no fine pointer), the card sways on its own slow cycle, paused while it is scrolled out of view.
- The card moves the same way under `prefers-reduced-motion: reduce`.

The module is one folder, `gift-card/`, since `v1.3.0`. It has no dependency beyond Next.js and React, and imports nothing from `action-badge/`.

### Copy the folder

```sh
git clone --depth 1 --branch v1.3.0 https://github.com/s-e-r-n/action-badge.git /tmp/action-badge
cp -R /tmp/action-badge/gift-card src/gift-card
```

Keep `gift.LICENSE` beside `gift.svg`: the icon comes from Phosphor Icons under the MIT license, whose notice must travel with it.

### Import it

The folder's `index.ts` exports the component and the type of its parameters:

```ts
import { GiftCard, type GiftCardProps } from "@/gift-card";
```

`GiftCard` renders on the server. Only its motion runs on the client, from the `"use client"` file inside the folder, so it can be placed in a server or a client component, in the App Router or the Pages Router.

### Set each parameter

| Parameter | Type | What it sets |
| --- | --- | --- |
| `lead` | `string` | The small line above the title. |
| `title` | `string` | The large line of the card. Keep it short enough for one line with its tail: the card does not shrink it, and a longer title crowds the mark and the price. |
| `titleTail` | `{ text: string; emoji?: string }`, optional | Words that follow the title on the same line at the size of the lead, such as a dedication. |
| `titleTail.emoji` | `string`, optional | An emoji after those words, drawn in its own colors instead of the metal ink. |
| `price` | `string` | The price, bottom right, always on one line with the former price. |
| `formerPrice` | `string`, optional | A former price, struck through, before `price`. |
| `mark` | `StaticImageData` | The mark, bottom left, as an image import. Only its shape counts: the card fills it with the metal ink. It keeps its own proportions, at a width of about a third of the card. |
| `markLabel` | `string` | The accessible name of the mark, such as the name it spells. |
| `giftLabel` | `string` | The accessible name of the gift icon, in the language of the page. |

### Example

```tsx
import { GiftCard } from "@/gift-card";
import mark from "@/assets/filigrane-alain-arlettaz.svg";

const Page = () => (
  <section style={{ width: "min(440px, 100%)" }}>
    <GiftCard
      lead="J’offre une…"
      title="Initiation de 3H"
      titleTail={{ text: "avec le", emoji: "❤️" }}
      price="40 CHF"
      formerPrice="60 CHF"
      mark={mark}
      markLabel="Alain Arlettaz"
      giftLabel="Cadeau"
    />
  </section>
);

export default Page;
```

These are the values of the published card: a French copy, and the mark `filigrane-alain-arlettaz.svg`, which the project provides, since the folder carries no mark of its own.

### Good to know

- The card fills the width of its parent and keeps a ratio of 100 to 72 around it: set the width on the parent, such as `min(440px, 100%)`.
- The card sets its own font, the system font stack at weight 500, and its own colors: the pale blue surface, the metal ink and the gold icon.
- Next.js imports an SVG as a static image by default, which is what `mark` expects. If your project turns SVG imports into React components (SVGR), import the mark from a PNG, or exclude it from that rule. The gift icon is read by the style module through `url("./gift.svg")`, so it is not affected.
- Next.js rounds the height of an SVG import to a whole pixel, so a mark whose `viewBox` height is fractional is stretched by that rounding, less than one percent for the example mark.

## Versions

The folders are released under git tags, `v1.0.0` first, and `gift-card/` from `v1.3.0`. `package.json` carries the same version. Both modules are type checked against Next.js 16 and React 19:

```sh
npm ci
npm run typecheck
```
