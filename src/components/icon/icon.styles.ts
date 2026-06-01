export const iconCSS = `
/* Customizable: --que-icon-size, --que-icon-color */

.que-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--que-icon-size, 1em);
  height: var(--que-icon-size, 1em);
  flex-shrink: 0;
  line-height: 0;
  color: var(--que-icon-color, currentColor);
}

.que-icon > :not(style) {
  display: block;
  width: 100%;
  height: 100%;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-icon--xs { --que-icon-size: 12px; }
.que-icon--sm { --que-icon-size: 16px; }
.que-icon--md { --que-icon-size: 20px; }
.que-icon--lg { --que-icon-size: 24px; }
.que-icon--xl { --que-icon-size: 32px; }

/* ── INTENT COLORS ───────────────────────────────────────── */

.que-icon--intent-primary   { --que-icon-color: var(--que-color-primary); }
.que-icon--intent-secondary { --que-icon-color: var(--que-color-secondary); }
.que-icon--intent-success   { --que-icon-color: var(--que-color-success-text, var(--que-color-success)); }
.que-icon--intent-warning   { --que-icon-color: var(--que-color-warning-text, var(--que-color-warning)); }
.que-icon--intent-danger    { --que-icon-color: var(--que-color-danger); }
.que-icon--intent-muted     { --que-icon-color: var(--que-color-text-muted); }
`
