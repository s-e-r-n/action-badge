# action-badge

A floating starburst badge for Next.js. It sits in the bottom right corner of the page, partly past the edge, with a foil, a moving light and a slanted copy, and a click on it scrolls to a section of the page.

- On a computer (a fine pointer that can hover), the badge turns toward the cursor wherever it is on the page, and keeps following it over the badge.
- On a phone (no fine pointer), the badge sways on its own slow cycle and ignores touches, apart from the click.
- Under `prefers-reduced-motion: reduce`, the badge does not tilt, sway or animate in.

The module is one folder, `action-badge/`. It has no dependency beyond Next.js and React, and it is not published to npm: a project copies the folder and imports it.

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
import { ActionBadge, type ActionBadgeProps, type ActionBadgeLine } from "@/action-badge";
```

`@/action-badge` assumes the default `@/*` path alias of `create-next-app`. Without it, import the folder by relative path.

`ActionBadge` renders on the server. Only its motion runs on the client, from the `"use client"` file inside the folder, so it can be placed in a server or a client component, in the App Router or the Pages Router.

## Set each parameter

| Parameter | Type | What it sets |
| --- | --- | --- |
| `lines` | `[ActionBadgeLine, ...ActionBadgeLine[]]` | The copy, one entry per line, at least one. Each line renders in its own `span`, on one line, in its own color. |
| `lines[n].text` | `string` | The words of the line. Keep lines short: the badge does not wrap or shrink them, and the starburst cuts off what overflows. Use ` ` for a space that must not break, such as `"40 CHF"`. |
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
        { text: "Value 60 CHF", color: "#182038" },
        { text: "40 CHF", color: "#182038" },
        { text: "-33 %", color: "#b4235a" },
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

## Versions

The folder is released under git tags, `v1.0.0` first. `package.json` carries the same version. The module is type checked against Next.js 16 and React 19:

```sh
npm ci
npm run typecheck
```
