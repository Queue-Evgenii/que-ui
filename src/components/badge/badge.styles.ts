import { intentSolidCSS, intentOutlineCSS, intentSubtleCSS } from '../../base/intent-css'

const INTENTS = ['primary', 'secondary', 'success', 'warning', 'danger'] as const

export const badgeCSS = `
/* Customizable: --que-badge-padding-x, --que-badge-padding-y, --que-badge-font-size, --que-badge-radius */

/* ── BASE ────────────────────────────────────────────────── */

.que-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
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

/* ── SHAPE ───────────────────────────────────────────────── */

.que-badge--rect {
  --que-badge-radius: var(--que-radius-md);
  --que-badge-padding-x: 10px;
  --que-badge-padding-y: 4px;
  --que-badge-font-size: var(--que-font-size-sm);
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-badge--sm {
  --que-badge-padding-x: 6px;
  --que-badge-padding-y: 2px;
  --que-badge-font-size: 10px;
}
.que-badge--rect.que-badge--sm {
  --que-badge-padding-x: 7px;
  --que-badge-padding-y: 2px;
}

.que-badge--lg {
  --que-badge-padding-x: 14px;
  --que-badge-padding-y: 5px;
  --que-badge-font-size: var(--que-font-size-sm);
}
.que-badge--rect.que-badge--lg {
  --que-badge-padding-x: 14px;
  --que-badge-padding-y: 6px;
  --que-badge-font-size: var(--que-font-size-base);
}

/* ── DISMISS BUTTON ──────────────────────────────────────── */

.que-badge__label {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.que-badge__dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: var(--que-radius-full);
  background: transparent;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  line-height: 1;
  transition: opacity var(--que-duration-fast), background var(--que-duration-fast);
}
.que-badge__dismiss:hover  { opacity: 1; background: rgba(0,0,0,0.1); }
.que-badge__dismiss:active { background: rgba(0,0,0,0.18); }

.que-badge--sm .que-badge__dismiss { width: 12px; height: 12px; }
.que-badge--lg .que-badge__dismiss { width: 16px; height: 16px; }

/* ── CLICKABLE ───────────────────────────────────────────── */

.que-badge--clickable {
  cursor: pointer;
  transition: filter var(--que-duration-fast);
}
.que-badge--clickable:hover  { filter: brightness(0.92); }
.que-badge--clickable:active { filter: brightness(0.84); }

/* ── DISABLED ────────────────────────────────────────────── */

.que-badge--disabled {
  opacity: 0.45;
  pointer-events: none;
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
