export const statCSS = `
/* Customizable: --que-stat-gap, --que-stat-value-size, --que-stat-label-size */

/* ── BASE ────────────────────────────────────────────────── */

.que-stat {
  display: inline-flex;
  flex-direction: column;
  gap: var(--que-stat-gap, 4px);
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

/* ── LABEL ───────────────────────────────────────────────── */

.que-stat__label {
  font-size: var(--que-stat-label-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-tight);
}

/* ── VALUE ───────────────────────────────────────────────── */

.que-stat__value {
  font-size: var(--que-stat-value-size, var(--que-font-size-2xl, 28px));
  font-weight: var(--que-font-weight-bold);
  color: var(--que-color-text);
  line-height: 1;
  letter-spacing: -0.02em;
}

/* ── DELTA ───────────────────────────────────────────────── */

.que-stat__delta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: var(--que-stat-delta-size, var(--que-font-size-xs));
  font-weight: var(--que-font-weight-medium);
  line-height: 1;
  color: var(--que-color-text-muted);
}

.que-stat__delta-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.que-stat--trend-up   .que-stat__delta { color: var(--que-color-success-text, var(--que-color-success)); }
.que-stat--trend-down .que-stat__delta { color: var(--que-color-danger-text, var(--que-color-danger)); }

/* ── SIZES ───────────────────────────────────────────────── */

.que-stat--sm {
  --que-stat-value-size: var(--que-font-size-xl, 22px);
  --que-stat-label-size: var(--que-font-size-xs);
  --que-stat-gap: 3px;
}

.que-stat--lg {
  --que-stat-value-size: var(--que-font-size-4xl, 40px);
  --que-stat-label-size: var(--que-font-size-base);
  --que-stat-gap: 6px;
}

/* ── HORIZONTAL LAYOUT ───────────────────────────────────── */

.que-stat--horizontal {
  flex-direction: row;
  align-items: baseline;
  gap: 10px;
}

.que-stat--horizontal .que-stat__label {
  order: 1;
}
.que-stat--horizontal .que-stat__value {
  order: 0;
}
.que-stat--horizontal .que-stat__delta {
  order: 2;
}
`
