export const dividerCSS = `
/* Customizable: --que-divider-color, --que-divider-thickness, --que-divider-label-gap */

/* ── HORIZONTAL (default) ────────────────────────────────── */

.que-divider {
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --_que-style: solid;
  --_que-color: var(--que-divider-color, var(--que-color-border));
  --_que-size:  var(--que-divider-thickness, 1px);
}

/* Line on both sides of label — or single line when no label */
.que-divider::before,
.que-divider::after {
  content: '';
  flex: 1;
  border-top: var(--_que-size) var(--_que-style) var(--_que-color);
}

/* Label */
.que-divider__label {
  padding: 0 var(--que-divider-label-gap, 10px);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* No label: collapse one side so the single line spans full width */
.que-divider:not(.que-divider--has-label)::before { display: none; }

/* ── LABEL ALIGNMENT ─────────────────────────────────────── */

.que-divider--label-left::before   { flex: 0 0 16px; }
.que-divider--label-right::after   { flex: 0 0 16px; }

/* ── VERTICAL ────────────────────────────────────────────── */

.que-divider--vertical {
  display: inline-flex;
  flex-direction: column;
  align-self: stretch;
  width: auto;
}

.que-divider--vertical::before,
.que-divider--vertical::after {
  border-top: none;
  border-left: var(--_que-size) var(--_que-style) var(--_que-color);
  flex: 1;
  width: 0;
}

.que-divider--vertical .que-divider__label {
  padding: var(--que-divider-label-gap, 8px) 0;
  writing-mode: vertical-lr;
}

.que-divider--vertical:not(.que-divider--has-label)::before { display: none; }

/* ── VARIANTS ────────────────────────────────────────────── */

.que-divider--dashed  { --_que-style: dashed; }
.que-divider--dotted  { --_que-style: dotted; }

/* ── SPACING SHORTHANDS ──────────────────────────────────── */

.que-divider--sm { margin: var(--que-space-2) 0; }
.que-divider--md { margin: var(--que-space-4) 0; }
.que-divider--lg { margin: var(--que-space-6) 0; }
`
