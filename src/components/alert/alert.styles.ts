export const alertCSS = `
/* Customizable: --que-alert-padding-x, --que-alert-padding-y, --que-alert-font-size, --que-alert-radius, --que-alert-gap */

/* ── BASE ────────────────────────────────────────────────── */

.que-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--que-alert-gap, 12px);
  padding: var(--que-alert-padding-y, 12px) var(--que-alert-padding-x, 16px);
  border-radius: var(--que-alert-radius, var(--que-radius-lg));
  border: 1px solid transparent;
  font-family: var(--que-font-sans);
  font-size: var(--que-alert-font-size, var(--que-font-size-sm));
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
  background: var(--que-color-bg-muted);
  color: var(--que-color-text-muted);
}

.que-alert__icon {
  flex-shrink: 0;
  width: var(--que-alert-icon-size, 20px);
  height: var(--que-alert-icon-size, 20px);
  margin-top: 1px;
}

.que-alert__body {
  flex: 1;
  min-width: 0;
}

.que-alert__title {
  display: block;
  font-weight: var(--que-font-weight-semibold);
  line-height: var(--que-line-height-normal);
}

.que-alert__title + .que-alert__desc {
  margin-top: 2px;
}

.que-alert__desc {
  display: block;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-alert--sm {
  --que-alert-padding-x: 12px;
  --que-alert-padding-y: 8px;
  --que-alert-font-size: var(--que-font-size-xs);
  --que-alert-gap: 8px;
  --que-alert-icon-size: 16px;
}

.que-alert--lg {
  --que-alert-padding-x: 20px;
  --que-alert-padding-y: 16px;
  --que-alert-font-size: var(--que-font-size-base);
  --que-alert-gap: 14px;
  --que-alert-icon-size: 22px;
}

/* ── SUBTLE VARIANT (default) ────────────────────────────── */

.que-alert--intent-info {
  background: var(--que-color-primary-subtle);
  border-color: color-mix(in srgb, var(--que-color-primary) 30%, transparent);
  color: var(--que-color-primary);
}
.que-alert--intent-success {
  background: var(--que-color-success-subtle);
  border-color: color-mix(in srgb, var(--que-color-success) 30%, transparent);
  color: var(--que-color-success-text);
}
.que-alert--intent-warning {
  background: var(--que-color-warning-subtle);
  border-color: color-mix(in srgb, var(--que-color-warning) 30%, transparent);
  color: var(--que-color-warning-text);
}
.que-alert--intent-danger {
  background: var(--que-color-danger-subtle);
  border-color: color-mix(in srgb, var(--que-color-danger) 30%, transparent);
  color: var(--que-color-danger-text);
}

/* ── OUTLINE VARIANT ─────────────────────────────────────── */

.que-alert--outline {
  background: transparent;
}
.que-alert--outline.que-alert--intent-info    { border-color: var(--que-color-primary); color: var(--que-color-primary); }
.que-alert--outline.que-alert--intent-success { border-color: var(--que-color-success); color: var(--que-color-success-text); }
.que-alert--outline.que-alert--intent-warning { border-color: var(--que-color-warning); color: var(--que-color-warning-text); }
.que-alert--outline.que-alert--intent-danger  { border-color: var(--que-color-danger);  color: var(--que-color-danger-text); }

/* ── SOLID VARIANT ───────────────────────────────────────── */

.que-alert--solid.que-alert--intent-info    { background: var(--que-color-primary);      border-color: transparent; color: var(--que-color-primary-text); }
.que-alert--solid.que-alert--intent-success { background: var(--que-color-success);      border-color: transparent; color: #fff; }
.que-alert--solid.que-alert--intent-warning { background: var(--que-color-warning-hover); border-color: transparent; color: #fff; }
.que-alert--solid.que-alert--intent-danger  { background: var(--que-color-danger);       border-color: transparent; color: #fff; }
`
