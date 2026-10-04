# SSOP upright-gilded

## Shapes

| Data | Origin | Destination | Boundary | Shape | Illegal state it forbids |
| ---- | ------ | ----------- | -------- | ----- | ------------------------ |
| Upright copy | the host page, as a prop | `ActionBadge`, the class of every line `span` | the type checker at the call, against `ActionBadgeProps` | `upright?: true` | `upright: false` beside badges that simply omit it |
| Gilded motif | the host page, as a prop | `ActionBadge`, the class of the motif `span` | the type checker at the call, against `ActionBadgeProps` | `gildedIcon?: true` | `gildedIcon: false` beside badges that simply omit it |
| Motif file | the host page, an image import | the motif's background, or its mask when gilded | the type checker at the call, against `StaticImageData` | `icon: StaticImageData`, unchanged | a motif without a file |

## Order

| Produces | Needs | Parameters | Returns | File |
| -------- | ----- | ---------- | ------- | ---- |
| upright and gilded styles | none | none | the `upright` and `gilded` classes | `action-badge/action-badge.module.css` |
| ActionBadge | upright and gilded styles, upright copy, gilded motif, motif file | `<ActionBadge lines icon background sectionId upright? gildedIcon? />` | the badge, its lines upright and its motif gilded on request | `action-badge/action-badge.tsx` |

Edges: ActionBadge needs the upright and gilded styles.
Boundary data: upright copy, gilded motif, motif file.

Sort:

1. action-badge.module.css
2. action-badge.tsx
3. README.md, package.json

## Checks

| Module | Change it confines | What a caller must know |
| ------ | ------------------ | ----------------------- |
| ActionBadge | which classes a line and the motif carry | `upright` sets every line upright; `gildedIcon` paints the motif in gold through the shape of `icon`; both left out keep v1.3.0 |
| action-badge.module.css | how an upright line and a gilded motif look: the offer badge's `font-style: normal`, and its gold gradient shifted by the aim, masked by the motif file | nothing, the classes stay inside the folder |

## Ownership

| Fact | Owner | Readers | Writer |
| ---- | ----- | ------- | ------ |
| Upright copy | the host page | ActionBadge | the host page |
| Gilded motif | the host page | ActionBadge | the host page |
| Motif file | the host page | ActionBadge | the host page |

## Amendments
