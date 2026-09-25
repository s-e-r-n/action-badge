# SSOP struck-line

## Shapes

| Data | Origin | Destination | Boundary | Shape | Illegal state it forbids |
| ---- | ------ | ----------- | -------- | ----- | ------------------------ |
| Line text | the host page, inside `lines` | `ActionBadge`, rendered in the line's `span` | the type checker at the call, against `ActionBadgeLine` | `string \| readonly [ActionBadgeRun, ...ActionBadgeRun[]]`, `ActionBadgeRun = { text: string; struck?: true }` | a line made of zero runs, a run marked `struck: false` beside runs that simply omit it |

## Order

| Produces | Needs | Parameters | Returns | File |
| -------- | ----- | ---------- | ------- | ---- |
| struck style | none | none | the `struck` class | `action-badge/action-badge.module.css` |
| ActionBadge | struck style, line text | `<ActionBadge lines icon background sectionId />` | the badge, a struck run in an `s` | `action-badge/action-badge.tsx` |
| index | ActionBadge | none | adds `ActionBadgeRun` | `action-badge/index.ts` |

Edges: ActionBadge needs the struck style. index needs ActionBadge.
Boundary data: line text.

Sort:

1. action-badge.module.css
2. action-badge.tsx
3. index.ts, README.md

## Checks

| Module | Change it confines | What a caller must know |
| ------ | ------------------ | ----------------------- |
| ActionBadge | how a line and its runs become markup | a line's `text` is a string or a non-empty list of runs; a run with `struck: true` is struck through |
| action-badge.module.css | how a struck run looks: the source's `0.11em` line | nothing, the class stays inside the folder |

## Ownership

| Fact | Owner | Readers | Writer |
| ---- | ----- | ------- | ------ |
| Line text and its runs | the host page | ActionBadge | the host page |

## Amendments
- The README carried literal no-break spaces where `\u00a0` escapes were meant, invisible in its tip; they are written back as escapes.
