export const spacerCSS = `
/* Customizable: --que-spacer-size */

/* ── FLEX SPACER (default) ───────────────────────────────── */

.que-spacer {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

/* ── FIXED SIZE ──────────────────────────────────────────── */

/* When size is set, flex-basis controls spacing in both row and column */
.que-spacer--fixed {
  flex: 0 0 var(--que-spacer-size, 16px);
  min-width: 0;
  min-height: 0;
}
`
