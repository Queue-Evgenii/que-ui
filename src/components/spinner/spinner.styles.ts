export const spinnerCSS = `
/* Customizable: --que-spinner-size, --que-spinner-color, --que-spinner-track-color, --que-spinner-thickness, --que-spinner-speed */

@keyframes que-spin {
  to { transform: rotate(360deg); }
}

/* ── BASE ────────────────────────────────────────────────── */

.que-spinner {
  display: inline-block;
  flex-shrink: 0;
  width: var(--que-spinner-size, 24px);
  height: var(--que-spinner-size, 24px);
  border-radius: 50%;
  border: var(--que-spinner-thickness, 2.5px) solid var(--que-spinner-track-color, var(--que-color-border-strong));
  border-top-color: var(--que-spinner-color, var(--que-color-primary));
  animation: que-spin var(--que-spinner-speed, 0.75s) linear infinite;
  box-sizing: border-box;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-spinner--sm {
  --que-spinner-size: 16px;
  --que-spinner-thickness: 2px;
}

.que-spinner--lg {
  --que-spinner-size: 32px;
  --que-spinner-thickness: 3px;
}

.que-spinner--xl {
  --que-spinner-size: 48px;
  --que-spinner-thickness: 4px;
}

/* ── INTENTS ─────────────────────────────────────────────── */

.que-spinner--intent-primary   { --que-spinner-color: var(--que-color-primary); }
.que-spinner--intent-secondary { --que-spinner-color: var(--que-color-secondary); }
.que-spinner--intent-success   { --que-spinner-color: var(--que-color-success); }
.que-spinner--intent-warning   { --que-spinner-color: var(--que-color-warning-hover); }
.que-spinner--intent-danger    { --que-spinner-color: var(--que-color-danger); }
.que-spinner--intent-neutral   { --que-spinner-color: var(--que-color-text-muted); }
`
