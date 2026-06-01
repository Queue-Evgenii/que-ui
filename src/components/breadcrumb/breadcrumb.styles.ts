export const breadcrumbCSS = `
/* Customizable: --que-breadcrumb-gap, --que-breadcrumb-font-size, --que-breadcrumb-separator-color */

/* ── BASE ────────────────────────────────────────────────── */

.que-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--que-breadcrumb-gap, 4px);
  font-family: var(--que-font-sans);
  font-size: var(--que-breadcrumb-font-size, var(--que-font-size-sm));
  line-height: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ── ITEM ────────────────────────────────────────────────── */

.que-breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: var(--que-breadcrumb-gap, 4px);
}

/* ── LINK ────────────────────────────────────────────────── */

.que-breadcrumb__link {
  color: var(--que-color-text-muted);
  text-decoration: none;
  border-radius: var(--que-radius-sm);
  transition: color var(--que-duration-fast);
  white-space: nowrap;
}
.que-breadcrumb__link:hover {
  color: var(--que-color-text);
  text-decoration: underline;
}
.que-breadcrumb__link:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* ── CURRENT (last item) ─────────────────────────────────── */

.que-breadcrumb__item[aria-current="page"] .que-breadcrumb__link,
.que-breadcrumb__current {
  color: var(--que-color-text);
  font-weight: var(--que-font-weight-medium);
  pointer-events: none;
  cursor: default;
}

/* ── SEPARATOR ───────────────────────────────────────────── */

.que-breadcrumb__sep {
  display: inline-flex;
  align-items: center;
  color: var(--que-breadcrumb-separator-color, var(--que-color-border-strong));
  flex-shrink: 0;
  user-select: none;
  aria-hidden: true;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-breadcrumb--sm {
  --que-breadcrumb-font-size: var(--que-font-size-xs);
  --que-breadcrumb-gap: 3px;
}

.que-breadcrumb--lg {
  --que-breadcrumb-font-size: var(--que-font-size-base);
  --que-breadcrumb-gap: 6px;
}
`
