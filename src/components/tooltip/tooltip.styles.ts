import { placementCSS } from '../../base/placement-css'

export const tooltipCSS = `
/* Customizable: --que-tooltip-bg, --que-tooltip-color, --que-tooltip-radius,
                 --que-tooltip-padding, --que-tooltip-offset, --que-tooltip-max-width,
                 --que-tooltip-font-size, --que-tooltip-arrow-size */

/* ── WRAPPER ─────────────────────────────────────────────── */

.que-tooltip {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

/* ── CONTENT PANEL ───────────────────────────────────────── */

.que-tooltip__content {
  position: absolute;
  z-index: var(--que-z-tooltip, 600);
  max-width: var(--que-tooltip-max-width, 240px);
  padding: var(--que-tooltip-padding, 5px 10px);
  background: var(--que-tooltip-bg, var(--que-color-text));
  color: var(--que-tooltip-color, var(--que-color-bg));
  border-radius: var(--que-tooltip-radius, var(--que-radius-md));
  font-family: var(--que-font-sans);
  font-size: var(--que-tooltip-font-size, var(--que-font-size-xs));
  font-weight: var(--que-font-weight-medium);
  line-height: var(--que-line-height-normal);
  white-space: normal;
  min-width: max-content;
  word-break: break-word;
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;
  /* hidden */
  opacity: 0;
  transition:
    opacity var(--que-duration-fast) var(--que-easing-out),
    transform var(--que-duration-fast) var(--que-easing-out);
}

/* JS open */
.que-tooltip--open > .que-tooltip__content {
  opacity: 1;
}

/* CSS-only: :hover and :focus-within */
.que-tooltip:hover > .que-tooltip__content,
.que-tooltip:focus-within > .que-tooltip__content {
  opacity: 1;
}

/* ── PLACEMENTS ──────────────────────────────────────────── */

${placementCSS('tooltip', {
  openSel:    '.que-tooltip--open > .que-tooltip__content',
  hoverSel:   '.que-tooltip:hover > CONTENT, .que-tooltip:focus-within > CONTENT',
  slideOffset: 4,
  scale:       0.93,
})}

/* ── ARROW ───────────────────────────────────────────────── */

.que-tooltip__content::before {
  content: '';
  position: absolute;
  width:  var(--que-tooltip-arrow-size, 6px);
  height: var(--que-tooltip-arrow-size, 6px);
  background: var(--que-tooltip-bg, var(--que-color-text));
  transform: rotate(45deg);
}

/* bottom / bottom-* → arrow at top */
.que-tooltip--placement-bottom > .que-tooltip__content::before {
  top: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  left: 50%; margin-left: calc(var(--que-tooltip-arrow-size, 6px) / -2);
}
.que-tooltip--placement-bottom-start > .que-tooltip__content::before {
  top: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  left: 10px;
}
.que-tooltip--placement-bottom-end > .que-tooltip__content::before {
  top: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  right: 10px;
}

/* top / top-* → arrow at bottom */
.que-tooltip--placement-top > .que-tooltip__content::before {
  bottom: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  left: 50%; margin-left: calc(var(--que-tooltip-arrow-size, 6px) / -2);
}
.que-tooltip--placement-top-start > .que-tooltip__content::before {
  bottom: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  left: 10px;
}
.que-tooltip--placement-top-end > .que-tooltip__content::before {
  bottom: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  right: 10px;
}

/* right / right-* → arrow at left */
.que-tooltip--placement-right > .que-tooltip__content::before {
  left: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  top: 50%; margin-top: calc(var(--que-tooltip-arrow-size, 6px) / -2);
}
.que-tooltip--placement-right-start > .que-tooltip__content::before {
  left: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  top: 8px;
}
.que-tooltip--placement-right-end > .que-tooltip__content::before {
  left: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  bottom: 8px;
}

/* left / left-* → arrow at right */
.que-tooltip--placement-left > .que-tooltip__content::before {
  right: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  top: 50%; margin-top: calc(var(--que-tooltip-arrow-size, 6px) / -2);
}
.que-tooltip--placement-left-start > .que-tooltip__content::before {
  right: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  top: 8px;
}
.que-tooltip--placement-left-end > .que-tooltip__content::before {
  right: calc(var(--que-tooltip-arrow-size, 6px) / -2);
  bottom: 8px;
}

/* ── DISABLED ────────────────────────────────────────────── */

.que-tooltip--disabled > .que-tooltip__content {
  display: none;
}
`
