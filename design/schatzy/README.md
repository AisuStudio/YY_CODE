# Handoff: Schatzy — Website (Home / Menu / About)

## Overview
Dummy marketing site for **Schatzy**, a Berlin QSR ("Do-Ball Deli") that serves only dumplings, rolled into balls and fried crisp all round, with a free self-serve sauce bar. Three pages: **Home**, **Menu**, **About**. Brand voice: "your cool cousin from around the block" — blunt, funny, no corporate polish.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, **not production code to copy directly**. The task is to **recreate these designs in the target codebase's own environment** (React/Next, Vue, Astro, whatever exists) using its established patterns, routing and component conventions. If no codebase exists yet, pick an appropriate framework (a static site generator or Next.js is plenty — the site has no backend) and implement there.

`Schatzy v2.dc.html` is authored in a proprietary streaming-component format and depends on `support.js`. Open it in a browser to see the design; **do not port that runtime**. Read it as markup + inline styles and translate to real components.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and interactions. Recreate pixel-faithfully. All type is TikTok Sans (bundled). All layout is inline-styled in the reference file — every value below is exact.

## Art direction rules (non-negotiable, client-approved)
- **Only four colours.** No tints, no gradients, no extra greys beyond the listed alpha values.
- **No rounded corners.** No `border-radius` anywhere.
- **No drop shadows.** No `box-shadow`, no elevation.
- **No box outlines** around content blocks. Only two kinds of rules exist: 1px/2px hairline **list separators**, and 2px **button borders**.
- Layout is **full-bleed horizontal colour bands**, edge to edge, stacked. Content sits on a 40px horizontal page gutter.
- Never distort the logo (`preserveAspectRatio` must stay `xMidYMid meet`).

## Design Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `cream` | `#F2EBE1` | page/band background, text on green & coral |
| `green` | `#083B32` | band background, primary text on cream/coral/lime |
| `coral` | `#F36C4E` | band background, accent text, secondary buttons |
| `lime` | `#D3FF02` | primary button fill, headings on green, marquee band |
| `brand-green` | `#00604E` | **logo artwork only** — never for UI |

Alpha variants in use: `rgba(8,59,50,.25)` and `rgba(8,59,50,.3)` (hairlines), `rgba(8,59,50,.65/.72/.75/.8)` (secondary text on light), `rgba(242,235,225,.2)` (footer hairline), `rgba(242,235,225,.5/.75/.78)` (secondary text on green).

### Typography
- Family: **TikTok Sans** (`fonts/*.ttf`, weights 400 / 500 / 700 / 900). Fallback `system-ui, sans-serif`.
- Nearly all display type is **weight 900**, uppercase, with **negative tracking**.
- Type scale (fluid, `clamp(min, vw, max)`):

| Role | Size | line-height | letter-spacing |
|---|---|---|---|
| Page H1 (Home hero) | `clamp(48px,8.4vw,132px)` | `.86` | `-.03em` |
| Page H1 (Menu / About) | `clamp(48px,8vw,124px)` / `clamp(44px,7.4vw,116px)` | `.85` | `-.03em` |
| Band H2 large | `clamp(36px,6vw,92px)` | `.86` | `-.03em` |
| Band H2 | `clamp(32px,4.6vw,68px)` | `.9` | `-.025em` |
| Band H2 small | `clamp(28px,3.8vw,56px)` | `.9` | `-.025em` |
| Menu item name | `clamp(24px,2.8vw,40px)` | **`1.08`** | `-.02em` |
| Deck / lead-in | `clamp(18px,2.2vw,30px)` w900 | `1.1` | — |
| Step / rule title | `24–28px` w900 | `1.02–1.05` | `-.01em` |
| Body | `16–19px` w400 | `1.45–1.5` | — |
| Eyebrow / label | `12–15px` w900 uppercase | — | `.08–.14em` |
| Nav link | `14px` w900 uppercase | — | `.06em` |
| Big stat number | `40px` w900 | `1` | `-.03em` |

`line-height: 1.08` on menu item names is deliberate — `1` clips descenders and collides with the description below.

### Spacing
Page gutter `40px`. Band vertical padding `44–64px` (Home hero `26px` top). Grid gaps `34px` (editorial columns), `20–24px` (button/label rows), `12px` (button groups). List row padding `12–20px` vertical. No radius, no shadow tokens.

### Buttons (3 variants, all rectangular)
1. **Primary** — `background:#D3FF02; color:#083B32; padding:16px 34px; font:900 20px; uppercase; letter-spacing:.04em`. Hover: `background:#083B32; color:#D3FF02`.
2. **Ghost on coral/green** — `border:2px solid #F2EBE1; color:#F2EBE1; padding:14px 32px`. Hover: `background:#F2EBE1; color:#F36C4E`.
3. **Ghost coral on green** — `border:2px solid #F36C4E; color:#F36C4E`. Hover: `background:#F36C4E; color:#083B32`.

Nav "Order" button is the primary variant at `font-size:15px; padding:11px 22px`.

## Screens

### Global — Header
Sticky (`top:0`, z above content), `background:#F2EBE1`, `padding:14px 40px`, flex space-between.
- Left: `img/logotype.svg` at `height:30px`, links to Home.
- Right: nav links `HOME / MENU / ABOUT` (gap 28px, green, hover coral) + primary "ORDER" button.

### Global — Footer
`background:#083B32`, `padding:46px 40px 30px`.
- Row 1: logotype (`height:40px`, **left-aligned**) + eyebrow "BERLIN DO-BALL DELI · BERLIN · SEOUL" in coral, `13px/900/.14em`.
- Row 2: three link columns (`PAGES`, `SHOPS`, `ELSEWHERE`) — column heads lime `12px/900/.14em`, items cream `15px` (hover coral), non-link items `rgba(242,235,225,.75)`.
- Row 3: `1px solid rgba(242,235,225,.2)` hairline, then `© 2026 Schatzy GmbH — dummy site, no real orders` / `Impressum · Datenschutz · Allergene`, `13px`, `rgba(242,235,225,.5)`.

### Home — bands in order
1. **Cream hero** (`padding:26px 40px 54px`): H1 `DO-BALL DELI`; coral deck `Dumplings, rolled round. Berlin & Seoul.`; 19px body paragraph (max-width 620px); right-aligned primary "MENU" button.
2. **Green band** (`padding:44px 40px 40px`): H2 lime `FIVE IN A BOAT €8.50`; cream 19px/700 subline `Seven if you skipped lunch — €11.50. Bring your cousins.`; coral ghost "ORDER" button right.
3. **Image strip**: `img/dumplings.png`, full width, `height:340px`, `object-fit:cover`, `object-position:50% 62%`, on green.
4. **Coral band** (`padding:46px 40px 40px`): H2 green `STEAMED & TOASTED`; 3-column `repeat(auto-fit,minmax(240px,1fr))` gap 34px — each column: cream `01/02/03` label, green 28px title, green body. Bottom row: cream 17px/700 `Kreuzberg + Mitte / Open till 2am, Thu–Sat` + cream-ghost "ABOUT" and primary "MENU".
5. **Lime marquee** (`padding:12px 0`): infinite horizontal scroll, green `900 19px/.04em`, items separated by `—`: SELF-SERVE SAUCE BAR / 5 BALLS €8.50 / NO RESERVATIONS / KREUZBERG + MITTE / OPEN TILL 2AM / DON'T MAKE A MESS. Implementation: outer `display:flex; width:max-content`, **two identical** halves each `flex:none; gap:34px; padding-right:34px; white-space:nowrap`, animation `translateX(0 → -50%)` over `26s linear infinite`. Do **not** use `width:200%` + `width:50%` halves — the nowrap content overflows and the copies overprint.
6. **Cream band** — `THIS WEEK'S FIVE`: H2 + coral "Full menu →" link, then 5 list rows (see Menu list row spec). No cards, no hover fill.
7. **Green split** — 2 equal columns: left H2 lime `THE SAUCE BAR IS FREE. DON'T ABUSE IT.` + cream body + coral `900 14px/.08em` uppercase ingredient row (gap `10px 22px`); right `img/saucebar.png` `object-fit:cover`, min-height 460px.
8. **Coral CTA** (`padding:64px 40px`, `overflow:hidden`, flex `align-items:flex-end`, gap `26px 48px`): left column (`flex:1 1 460px`, column, gap 30px) H2 `HUNGRY?<br>WE'RE ROUND<br>THE BLOCK.` + button row (primary "ORDER DELIVERY", cream-ghost "MENU"); right the **animated brand mark** as a static flex item, `height:320px; margin:0 -60px -104px auto` so it bleeds off the bottom-right corner. It must be a layout sibling, not absolutely positioned — absolute positioning made it overlap the buttons.

### Menu
1. **Green header** (`padding:34px 40px 46px`): H1 lime `MENU`; coral deck `Speisekarte · Kreuzberg & Mitte`; right cream 16px paragraph about allergens + sauce bar.
2. **Cream — MAINS**: H2 + coral eyebrow `5 St. €8.50 · 7 St. €11.50`; five list rows.
3. **Coral — WEEKLY SPECIALS**: H2 green + cream eyebrow `Gone Sunday night`; two rows (hairline `rgba(8,59,50,.3)`, second price line cream).
4. **Cream — 3 columns** (`repeat(auto-fit,minmax(280px,1fr))`, gap 44px): SIDES (4 rows, flat €3.50), SAUCE BAR (intro + 3 combos), DRINKS (5 rows) followed by a **lime block** (`padding:20px 22px`, no radius) with `STUDENT DEAL`.

**List row spec** (used in Mains, Specials, Home five): `display:grid; grid-template-columns:1fr auto; gap:20px; align-items:baseline; padding:20px 0; border-top:1px solid rgba(8,59,50,.25)`. Left: name (see scale) + coral `900 12px/.12em` uppercase diet tag, then description `16px, rgba(8,59,50,.75), max-width:640px, margin-top:6px`. Right: two lines, `900 19px`, first green, second coral.

### About
1. **Cream header** (`padding:26px 40px 48px`): H1 `YOUR COOL<br>COUSIN'S DELI`; coral deck `Since 2023 · Berlin & Seoul`; right 18px origin-story paragraph.
2. **Image strip**: `img/counter.png`, `height:420px`, `object-position:50% 40%`.
3. **Green — HOUSE RULES** (`padding:50px 40px`, `overflow:hidden`): heading row = flex space-between with H2 lime (`order:1`) and the **animated mark** (`order:2; height:270px; margin:-96px 0 0 auto`) cropped off the top edge. Below, `repeat(auto-fit,minmax(250px,1fr))` gap 34px, 6 rules: coral `900 14px/.14em` number, cream 24px title, `rgba(242,235,225,.78)` body.
4. **Coral split**: left `img/kitchen.png`; right H2 `ONE GRIDDLE,<br>TWO CITIES` + body + 4-up stat grid (cream 40px numbers, green `900 12px/.12em` labels): `2 Shops`, `1.4k Balls a day`, `21 Days of ferment`, `0 Reservations`.
5. **Cream — COME FIND US**: 3 columns, each opened by a `2px solid #083B32` top rule: Kreuzberg, Mitte, and a "WORK HERE?" column ending in a primary `jobs@schatzy.berlin` button.

## Interactions & Behaviour
- **Routing**: Home / Menu / About are real routes. The reference swaps them in local state and calls `window.scrollTo(0,0)` — use the framework router and restore scroll to top on navigation.
- **Hover** (only interactive states in the design): nav links green→coral; footer links cream→coral; buttons invert per variant above. No transitions specified except the ones below — instant is fine.
- **Marquee**: `26s linear infinite`, never pauses.
- **Eye animation** (see below): `9s ease-in-out infinite`, alternating.
- Placeholder links (`Order`, socials, jobs) `preventDefault()` — wire to real Lieferando/mail targets.
- **Responsive**: implemented. Breakpoints at **900px** (gutter 24px, band splits stack, image strips shorten, mark scales down, rules heading stacks) and **640px** (header nav wraps to its own row, buttons shrink, menu rows collapse to one column with prices inline separated by `·`). No JS involved.

## The animated brand mark
`source/SHZY_Type.glyphs` is a Glyphs 3 source with a `wght` axis, but only the glyph **S** is drawn — it *is* the croc mark. Its three masters (0 / 5 / 10) are byte-identical except the two **pupil** contours, which translate by **+74 x, +6 y** in em units (unitsPerEm 1000) from master 0 to master 10. That is the whole variable behaviour: the eyes look left→right.

Implementation in the reference: outlines converted to SVG paths, pupils grouped, group animated:
```css
@keyframes shzy-eyes{0%{transform:translate(0,0)}50%{transform:translate(74px,6px)}100%{transform:translate(0,0)}}
@media (prefers-reduced-motion:reduce){@keyframes shzy-eyes{0%,100%{transform:translate(37px,3px)}}}
```
applied to the pupil `<g>` with `animation: shzy-eyes 9s ease-in-out infinite`. The SVG root is `viewBox="-22 -22 644 789"` with an inner `<g transform="translate(0,710) scale(1,-1)">` (font coords are y-up); the `74px/6px` values are therefore in that flipped local space.

The SVG is **inlined into the markup**, not referenced as a file — an external `.svg` in an `<img>` was stripped of its animation by the asset pipeline. Keep it inline (or a real component). Mark layering, back to front: cream outline copies of all shapes at `stroke-width:40`, then the three green body shapes, then the cream eye-blob with `stroke:#00604E; stroke-width:17`, then the green pupils.

If you'd rather ship a real variable font: compile `SHZY_Type.glyphs` to a `wght` variable font and animate `font-variation-settings: 'wght' 0 → 10` on a text element containing `S`. Equivalent result, and it keeps the type source as the single point of truth.

## State Management
- `page: 'home' | 'menu' | 'about'` in the reference — replace with routing.
- All menu content is static data in the reference's logic class (`mains`, `specials`, `sides`, `combos`, `drinks`, `rules`, `shops`). Move to CMS/JSON if the client needs to edit the weekly specials themselves — that's the one section explicitly described as changing weekly.
- No fetching, no forms, no auth.

## Assets
| File | Origin | Notes |
|---|---|---|
| `img/logotype.svg` | converted from `source/SHZY-Logotype.pdf` | vector, brand green + cream. **Keep `preserveAspectRatio="xMidYMid meet"`** — the original conversion had `none` and squashed the logo. |
| `img/mark.svg` | converted from `source/SHZY-Mark.pdf` | static croc mark; superseded in-page by the inline animated version |
| `img/dumplings.png`, `img/saucebar.png`, `img/kitchen.png`, `img/interior.jpg` | extracted from the client brand PDF | **placeholders** — resolution is adequate but they should be replaced with commissioned photography |
| `img/counter.png` | client-supplied render | placeholder |
| `fonts/TikTokSans-*.ttf` | client-supplied | Regular 400, Medium 500, Bold 700, Black 900, Condensed-Black (unused in v2, kept for reference). Subset + convert to woff2 before shipping. |
| `source/SHZY_Type.glyphs` | client-supplied | logo type source, see above |

## Copy
All copy is final and in the reference file — take it verbatim, including German/English code-switching (`5 St.`, `Speisekarte`, `Sprudel`, `Späti`) and the apostrophes/em-dashes. Prices: mains €8.50 (5 pc) / €11.50 (7 pc); specials €10.00 / €13.50; sides €3.50.

## Files
**Working static site (start here) — plain HTML/CSS, no build step, no dependencies:**
- `index.html` · `menu.html` · `about.html` — the three pages
- `css/schatzy.css` — all styles, tokens in `:root`, responsive at 900px and 640px
- `img/`, `fonts/`, `source/`, `screenshots/`
- `CLAUDE.md` — the art-direction rules, as guardrails for further work

Open `index.html` in a browser — it runs as-is. Use it as the implementation baseline; port it into the target framework if the project needs one.

**Original design reference (optional):** `Schatzy v2.dc.html` + `support.js` — the design file this site was derived from, in a proprietary streaming-component format. **Do not port that runtime.** The static version above is the faithful translation.

`screenshots/` holds captures of all three pages at several scroll positions. They come from a DOM-rasteriser and occasionally mis-render tightly-set headlines — the HTML is authoritative, not the PNGs.

## Open items / suggested next steps
1. **Fonts to woff2** — the four TTFs are ~1MB each. Subset to Latin + `€·–—` and convert (`pyftsubset --flavor=woff2`), then update the `@font-face` blocks in `css/schatzy.css`. (Not done here: woff2 needs a compiler that isn't available in the design environment.)
2. Real photography to replace the extracted brand-PDF images.
3. Decide inline SVG vs. compiled variable font for the animated mark.
4. Weekly specials into a CMS.
5. Real Lieferando / Instagram / TikTok / mailto targets, plus Impressum, Datenschutz and Allergene pages (legally required in DE).
6. Responsive is implemented at 900px and 640px (nav wraps, splits stack, menu rows go single-column with inline prices) — review on real devices.
