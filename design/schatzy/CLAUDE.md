# CLAUDE.md — Schatzy site

Rules for anyone (human or agent) working on `design/schatzy/`.

## What this is
Static marketing site for **Schatzy**, a Berlin QSR that serves only dumplings rolled into balls ("Do-Balls"), with a free self-serve sauce bar. Three pages: `index.html` (Home), `menu.html`, `about.html`. Shared stylesheet `css/schatzy.css`. No build step, no JS framework, no dependencies — open `index.html` in a browser.

Brand voice: **your cool cousin from around the block.** Blunt, funny, a bit rude, never corporate. German/English code-switching is intentional (`5 St.`, `Speisekarte`, `Sprudel`, `Späti`). Copy is client-approved — do not "improve" it.

## Art direction — do not break these
1. **Four colours only:** cream `#F2EBE1`, dark green `#083B32`, coral `#F36C4E`, lime `#D3FF02`. `#00604E` exists *only* inside the logo artwork. No new colours, no gradients, no greys beyond the `rgba()` alpha variants already in `:root`.
2. **No `border-radius`.** Anywhere. Zero.
3. **No `box-shadow`.** No elevation, no glow.
4. **No box outlines around content.** Only two kinds of lines exist: 1–2px hairline **list separators** and 2px **button borders**.
5. **Layout is full-bleed horizontal colour bands**, edge to edge, stacked vertically. Content sits on the `--gutter` (40px desktop / 24px mobile). No centred max-width container, no cards, no grids of boxes.
6. **Type is TikTok Sans**, almost always weight 900, uppercase, negative tracking. Sizes are fluid `clamp()` — see the type classes in the CSS, don't invent new sizes.
7. **Never distort the logo.** `img/logotype.svg` and `img/mark.svg` must keep `preserveAspectRatio="xMidYMid meet"` and be sized by `height` with `width:auto`.

## The animated brand mark
`source/SHZY_Type.glyphs` is the logo type source. Only the glyph **S** is drawn — it *is* the croc mark. Its three masters differ **only** in the two pupil contours, which translate `+74 / +6` em units (unitsPerEm 1000): the eyes look left→right.

The mark is **inlined SVG** in `index.html` and `about.html`, with the pupils in `<g class="pupils">` driven by the `eyes` keyframes in the CSS (9s, ease-in-out, infinite, with a `prefers-reduced-motion` fallback). It is inline on purpose — as an external `.svg` in an `<img>` the animation gets stripped by asset pipelines. If you refactor, keep it inline or make it a component; do not move it back to a file reference.

Mark layering, back to front: cream outline copies of every shape at `stroke-width:40` → three green body shapes → cream eye-blob with `stroke:#00604E; stroke-width:17` → green pupils.

## The mark is editorial, not decoration
It appears exactly **twice**: cropped off the bottom-right of the coral CTA band on Home, and cropped off the top of the House Rules heading row on About. Both times it is a **static layout sibling** with negative margins, never `position:absolute` — absolute positioning made it overlap buttons and body copy. If you add a third placement, reserve layout space for it.

## When editing
- Change styles in `css/schatzy.css`, not with inline `style` attributes. (A handful of one-off inline values survive from the design conversion; move them into classes if you touch them.)
- The three pages duplicate header and footer markup by design (no template engine). Change all three, or introduce a build step / framework properly.
- Menu data (mains, specials, sides, sauce combos, drinks, house rules, shops) is hand-written HTML. Weekly specials are the one thing the client will want to edit themselves — that section is the first candidate for a CMS.
- Keep the marquee construction: outer `width:max-content`, **two identical** halves, `translateX(0 → -50%)`. Do not use `width:200%` with `50%` halves — the `nowrap` content overflows and the copies overprint.
- `line-height` on menu item names must stay `1.08`. At `1` the glyph box overflows the flex row and collides with the description below.

## Outstanding work
- Fonts are TTF. Subset and convert to woff2 before shipping (`fonttools`/`woff2_compress`); then update the four `@font-face` blocks.
- All photography is **placeholder** — extracted from the client's brand PDF or AI-rendered. Replace with commissioned shots.
- Legally required in DE: real Impressum, Datenschutz and Allergene pages. Footer links are dead.
- Order / Instagram / TikTok links are dead anchors; wire to Lieferando and the real profiles.
