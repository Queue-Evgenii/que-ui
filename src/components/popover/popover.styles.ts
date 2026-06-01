import { placementCSS } from '../../base/placement-css'

export const popoverCSS = `
/* Customizable: --que-popover-bg, --que-popover-border-color, --que-popover-radius,
                 --que-popover-padding, --que-popover-offset, --que-popover-min-width,
                 --que-popover-max-width, --que-popover-arrow-size */

/* ── WRAPPER ─────────────────────────────────────────────── */

.que-popover {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

/* ── CONTENT PANEL ───────────────────────────────────────── */

.que-popover__content {
  position: absolute;
  z-index: var(--que-z-popover, 150);
  min-width: var(--que-popover-min-width, 160px);
  max-width: var(--que-popover-max-width, 320px);
  padding: var(--que-popover-padding, var(--que-space-3) var(--que-space-4));
  background: var(--que-popover-bg, var(--que-color-surface-raised));
  border: 1px solid var(--que-popover-border-color, var(--que-color-border));
  border-radius: var(--que-popover-radius, var(--que-radius-xl));
  box-shadow: var(--que-shadow-xl);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
  white-space: normal;
  word-break: break-word;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity var(--que-duration-fast) var(--que-easing-out),
    transform var(--que-duration-fast) var(--que-easing-out);
}

.que-popover--open > .que-popover__content {
  opacity: 1;
  pointer-events: auto;
}

/* ── PLACEMENTS ──────────────────────────────────────────── */

${placementCSS('popover')}

/* ── ARROW ───────────────────────────────────────────────── */

.que-popover--arrow > .que-popover__content::before {
  content: '';
  position: absolute;
  width:  var(--que-popover-arrow-size, 8px);
  height: var(--que-popover-arrow-size, 8px);
  background: var(--que-popover-bg, var(--que-color-surface-raised));
  transform: rotate(45deg);
}

/* bottom / bottom-* → arrow at top of panel */
.que-popover--placement-bottom.que-popover--arrow > .que-popover__content::before {
  top: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  left: 50%; margin-left: calc(var(--que-popover-arrow-size, 8px) / -2);
  box-shadow: -1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-bottom-start.que-popover--arrow > .que-popover__content::before {
  top: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  left: 16px;
  box-shadow: -1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-bottom-end.que-popover--arrow > .que-popover__content::before {
  top: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  right: 16px;
  box-shadow: -1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}

/* top / top-* → arrow at bottom of panel */
.que-popover--placement-top.que-popover--arrow > .que-popover__content::before {
  bottom: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  left: 50%; margin-left: calc(var(--que-popover-arrow-size, 8px) / -2);
  box-shadow: 1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-top-start.que-popover--arrow > .que-popover__content::before {
  bottom: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  left: 16px;
  box-shadow: 1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-top-end.que-popover--arrow > .que-popover__content::before {
  bottom: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  right: 16px;
  box-shadow: 1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}

/* right / right-* → arrow at left of panel */
.que-popover--placement-right.que-popover--arrow > .que-popover__content::before {
  left: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  top: 50%; margin-top: calc(var(--que-popover-arrow-size, 8px) / -2);
  box-shadow: -1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-right-start.que-popover--arrow > .que-popover__content::before {
  left: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  top: 12px;
  box-shadow: -1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-right-end.que-popover--arrow > .que-popover__content::before {
  left: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  bottom: 12px;
  box-shadow: -1px 1px 0 var(--que-popover-border-color, var(--que-color-border));
}

/* left / left-* → arrow at right of panel */
.que-popover--placement-left.que-popover--arrow > .que-popover__content::before {
  right: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  top: 50%; margin-top: calc(var(--que-popover-arrow-size, 8px) / -2);
  box-shadow: 1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-left-start.que-popover--arrow > .que-popover__content::before {
  right: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  top: 12px;
  box-shadow: 1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}
.que-popover--placement-left-end.que-popover--arrow > .que-popover__content::before {
  right: calc(var(--que-popover-arrow-size, 8px) / -2 - 1px);
  bottom: 12px;
  box-shadow: 1px -1px 0 var(--que-popover-border-color, var(--que-color-border));
}

/* ── DISABLED ────────────────────────────────────────────── */

.que-popover--disabled > :not(.que-popover__content) {
  opacity: 0.5;
  pointer-events: none;
}
`
