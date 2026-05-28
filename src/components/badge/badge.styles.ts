import { intentSolidCSS, intentOutlineCSS, intentSubtleCSS } from '../../base/intent-css'

const INTENTS = ['primary', 'secondary', 'success', 'warning', 'danger'] as const

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

${intentSolidCSS('que-badge', INTENTS)}

/* ── OUTLINE VARIANT ─────────────────────────────────────── */

.que-badge--outline {
  background: transparent;
  border-color: var(--que-color-border-strong);
  color: var(--que-color-text-muted);
}
${intentOutlineCSS('que-badge', 'outline', INTENTS)}

/* ── SUBTLE VARIANT ──────────────────────────────────────── */

.que-badge--subtle {
  background: var(--que-color-bg-muted);
  color: var(--que-color-text-muted);
}
${intentSubtleCSS('que-badge', 'subtle', INTENTS)}
`
