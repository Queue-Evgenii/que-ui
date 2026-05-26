export const badgeCSS = `
/* Customizable: --que-badge-padding-x, --que-badge-padding-y, --que-badge-font-size, --que-badge-radius */

/* ── BASE ────────────────────────────────────────────────── */

.que-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: var(--que-badge-padding-y, 3px) var(--que-badge-padding-x, 10px);
  border-radius: var(--que-badge-radius, var(--que-radius-full));
  border: 1px solid transparent;
  font-family: var(--que-font-sans);
  font-size: var(--que-badge-font-size, var(--que-font-size-xs));
  font-weight: var(--que-font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  background: var(--que-color-bg-muted);
  color: var(--que-color-text-muted);
  box-sizing: border-box;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-badge--sm {
  --que-badge-padding-x: 6px;
  --que-badge-padding-y: 2px;
  --que-badge-font-size: 10px;
}

.que-badge--lg {
  --que-badge-padding-x: 14px;
  --que-badge-padding-y: 5px;
  --que-badge-font-size: var(--que-font-size-sm);
}

/* ── SOLID INTENTS (default variant) ─────────────────────── */

.que-badge--intent-primary {
  background: var(--que-color-primary);
  color: var(--que-color-primary-text);
}
.que-badge--intent-secondary {
  background: var(--que-color-secondary);
  color: var(--que-color-secondary-text);
}
.que-badge--intent-success {
  background: var(--que-color-success);
  color: #fff;
}
.que-badge--intent-warning {
  background: var(--que-color-warning-hover);
  color: #fff;
}
.que-badge--intent-danger {
  background: var(--que-color-danger);
  color: #fff;
}

/* ── OUTLINE VARIANT ─────────────────────────────────────── */

.que-badge--outline {
  background: transparent;
  border-color: var(--que-color-border-strong);
  color: var(--que-color-text-muted);
}
.que-badge--outline.que-badge--intent-primary {
  border-color: var(--que-color-primary);
  color: var(--que-color-primary);
}
.que-badge--outline.que-badge--intent-secondary {
  border-color: var(--que-color-secondary);
  color: var(--que-color-secondary);
}
.que-badge--outline.que-badge--intent-success {
  border-color: var(--que-color-success);
  color: var(--que-color-success-text);
}
.que-badge--outline.que-badge--intent-warning {
  border-color: var(--que-color-warning);
  color: var(--que-color-warning-text);
}
.que-badge--outline.que-badge--intent-danger {
  border-color: var(--que-color-danger);
  color: var(--que-color-danger);
}

/* ── SUBTLE VARIANT ──────────────────────────────────────── */

.que-badge--subtle {
  background: var(--que-color-bg-muted);
  color: var(--que-color-text-muted);
}
.que-badge--subtle.que-badge--intent-primary {
  background: var(--que-color-primary-subtle);
  color: var(--que-color-primary);
}
.que-badge--subtle.que-badge--intent-secondary {
  background: var(--que-color-secondary-subtle);
  color: var(--que-color-secondary);
}
.que-badge--subtle.que-badge--intent-success {
  background: var(--que-color-success-subtle);
  color: var(--que-color-success-text);
}
.que-badge--subtle.que-badge--intent-warning {
  background: var(--que-color-warning-subtle);
  color: var(--que-color-warning-text);
}
.que-badge--subtle.que-badge--intent-danger {
  background: var(--que-color-danger-subtle);
  color: var(--que-color-danger-text);
}
`
