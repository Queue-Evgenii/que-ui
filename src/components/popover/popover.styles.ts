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

/* ── CONTENT PANEL — visual only, NO positioning here ────── */

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
  /* hidden state */
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 150ms var(--que-easing-out),
    transform 150ms var(--que-easing-out);
}

.que-popover--open > .que-popover__content {
  opacity: 1;
  pointer-events: auto;
}

/* ─────────────────────────────────────────────────────────────
   PLACEMENTS
   Every rule sets all 4 sides explicitly (auto where unused) to
   avoid conflicts from other placement rules at lower specificity.
   ───────────────────────────────────────────────────────────── */

/* BOTTOM CENTER — also default when no placement class present */
.que-popover--placement-bottom > .que-popover__content {
  top: calc(100% + var(--que-popover-offset, 8px)); bottom: auto;
  left: 50%; right: auto;
  transform-origin: top center;
  transform: translateX(-50%) translateY(-6px) scale(0.96);
}
.que-popover--placement-bottom.que-popover--open > .que-popover__content {
  transform: translateX(-50%) translateY(0) scale(1);
}

/* BOTTOM START */
.que-popover--placement-bottom-start > .que-popover__content {
  top: calc(100% + var(--que-popover-offset, 8px)); bottom: auto;
  left: 0; right: auto;
  transform-origin: top left;
  transform: translateY(-6px) scale(0.96);
}
.que-popover--placement-bottom-start.que-popover--open > .que-popover__content {
  transform: translateY(0) scale(1);
}

/* BOTTOM END */
.que-popover--placement-bottom-end > .que-popover__content {
  top: calc(100% + var(--que-popover-offset, 8px)); bottom: auto;
  right: 0; left: auto;
  transform-origin: top right;
  transform: translateY(-6px) scale(0.96);
}
.que-popover--placement-bottom-end.que-popover--open > .que-popover__content {
  transform: translateY(0) scale(1);
}

/* TOP CENTER */
.que-popover--placement-top > .que-popover__content {
  bottom: calc(100% + var(--que-popover-offset, 8px)); top: auto;
  left: 50%; right: auto;
  transform-origin: bottom center;
  transform: translateX(-50%) translateY(6px) scale(0.96);
}
.que-popover--placement-top.que-popover--open > .que-popover__content {
  transform: translateX(-50%) translateY(0) scale(1);
}

/* TOP START */
.que-popover--placement-top-start > .que-popover__content {
  bottom: calc(100% + var(--que-popover-offset, 8px)); top: auto;
  left: 0; right: auto;
  transform-origin: bottom left;
  transform: translateY(6px) scale(0.96);
}
.que-popover--placement-top-start.que-popover--open > .que-popover__content {
  transform: translateY(0) scale(1);
}

/* TOP END */
.que-popover--placement-top-end > .que-popover__content {
  bottom: calc(100% + var(--que-popover-offset, 8px)); top: auto;
  right: 0; left: auto;
  transform-origin: bottom right;
  transform: translateY(6px) scale(0.96);
}
.que-popover--placement-top-end.que-popover--open > .que-popover__content {
  transform: translateY(0) scale(1);
}

/* RIGHT CENTER */
.que-popover--placement-right > .que-popover__content {
  left: calc(100% + var(--que-popover-offset, 8px)); right: auto;
  top: 50%; bottom: auto;
  transform-origin: left center;
  transform: translateX(-6px) translateY(-50%) scale(0.96);
}
.que-popover--placement-right.que-popover--open > .que-popover__content {
  transform: translateX(0) translateY(-50%) scale(1);
}

/* RIGHT START */
.que-popover--placement-right-start > .que-popover__content {
  left: calc(100% + var(--que-popover-offset, 8px)); right: auto;
  top: 0; bottom: auto;
  transform-origin: top left;
  transform: translateX(-6px) scale(0.96);
}
.que-popover--placement-right-start.que-popover--open > .que-popover__content {
  transform: translateX(0) scale(1);
}

/* RIGHT END */
.que-popover--placement-right-end > .que-popover__content {
  left: calc(100% + var(--que-popover-offset, 8px)); right: auto;
  bottom: 0; top: auto;
  transform-origin: bottom left;
  transform: translateX(-6px) scale(0.96);
}
.que-popover--placement-right-end.que-popover--open > .que-popover__content {
  transform: translateX(0) scale(1);
}

/* LEFT CENTER */
.que-popover--placement-left > .que-popover__content {
  right: calc(100% + var(--que-popover-offset, 8px)); left: auto;
  top: 50%; bottom: auto;
  transform-origin: right center;
  transform: translateX(6px) translateY(-50%) scale(0.96);
}
.que-popover--placement-left.que-popover--open > .que-popover__content {
  transform: translateX(0) translateY(-50%) scale(1);
}

/* LEFT START */
.que-popover--placement-left-start > .que-popover__content {
  right: calc(100% + var(--que-popover-offset, 8px)); left: auto;
  top: 0; bottom: auto;
  transform-origin: top right;
  transform: translateX(6px) scale(0.96);
}
.que-popover--placement-left-start.que-popover--open > .que-popover__content {
  transform: translateX(0) scale(1);
}

/* LEFT END */
.que-popover--placement-left-end > .que-popover__content {
  right: calc(100% + var(--que-popover-offset, 8px)); left: auto;
  bottom: 0; top: auto;
  transform-origin: bottom right;
  transform: translateX(6px) scale(0.96);
}
.que-popover--placement-left-end.que-popover--open > .que-popover__content {
  transform: translateX(0) scale(1);
}

/* ─────────────────────────────────────────────────────────────
   ARROW
   Single ::before — rotated square, box-shadow for 2 border sides.
   ───────────────────────────────────────────────────────────── */

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
