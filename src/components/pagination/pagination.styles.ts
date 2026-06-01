export const paginationCSS = `
/* Customizable: --que-pagination-gap, --que-pagination-item-size, --que-pagination-radius */

/* ── BASE ────────────────────────────────────────────────── */

.que-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--que-pagination-gap, 4px);
  font-family: var(--que-font-sans);
  font-size: var(--que-pagination-font-size, var(--que-font-size-sm));
  box-sizing: border-box;
}

/* ── ITEM (shared by page buttons and nav buttons) ───────── */

.que-pagination__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--que-pagination-item-size, 34px);
  height: var(--que-pagination-item-size, 34px);
  padding: 0 6px;
  border-radius: var(--que-pagination-radius, var(--que-radius-md));
  border: 1px solid transparent;
  font-size: inherit;
  font-family: inherit;
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  background: transparent;
  cursor: pointer;
  line-height: 1;
  text-decoration: none;
  transition: color var(--que-duration-fast), background var(--que-duration-fast), border-color var(--que-duration-fast);
  box-sizing: border-box;
  user-select: none;
}

.que-pagination__item:hover:not([aria-current]):not([disabled]):not(.que-pagination__ellipsis) {
  color: var(--que-color-text);
  background: var(--que-color-interactive-hover);
}

.que-pagination__item:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 1px;
}

/* ── ACTIVE PAGE ─────────────────────────────────────────── */

.que-pagination__item[aria-current="page"] {
  color: var(--que-color-primary-text, var(--que-color-primary));
  background: var(--que-color-primary-subtle);
  border-color: transparent;
  cursor: default;
  pointer-events: none;
}

/* ── OUTLINE VARIANT ─────────────────────────────────────── */

.que-pagination--outline .que-pagination__item {
  border-color: var(--que-color-border);
}
.que-pagination--outline .que-pagination__item:hover:not([aria-current]):not([disabled]):not(.que-pagination__ellipsis) {
  border-color: var(--que-color-border-strong);
}
.que-pagination--outline .que-pagination__item[aria-current="page"] {
  background: var(--que-color-primary);
  color: var(--que-color-primary-text);
  border-color: var(--que-color-primary);
}

/* ── GHOST VARIANT ───────────────────────────────────────── */

.que-pagination--ghost .que-pagination__item[aria-current="page"] {
  background: transparent;
  color: var(--que-color-primary);
  font-weight: var(--que-font-weight-bold);
  text-decoration: underline;
}

/* ── ELLIPSIS ────────────────────────────────────────────── */

.que-pagination__ellipsis {
  cursor: default;
  pointer-events: none;
  letter-spacing: 0.05em;
}

/* ── NAV BUTTONS (prev/next/first/last) ──────────────────── */

.que-pagination__item[disabled] {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-pagination--sm {
  --que-pagination-item-size: 28px;
  --que-pagination-font-size: var(--que-font-size-xs);
  --que-pagination-gap: 2px;
}

.que-pagination--lg {
  --que-pagination-item-size: 42px;
  --que-pagination-font-size: var(--que-font-size-base);
  --que-pagination-gap: 6px;
}
`
