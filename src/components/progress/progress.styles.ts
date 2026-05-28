import { intentVarCSS } from '../../base/intent-css'

export const progressCSS = `
/* Customizable: --que-progress-height, --que-progress-radius, --que-progress-track-color, --que-progress-color */
/* Circular: --que-progress-size, --que-progress-thickness */

@keyframes que-progress-slide {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

@keyframes que-progress-spin {
  to { transform: rotate(360deg); }
}

/* ── BASE ────────────────────────────────────────────────── */

.que-progress {
  display: block;
  width: 100%;
  height: var(--que-progress-height, 8px);
  border-radius: var(--que-progress-radius, var(--que-radius-full));
  background: var(--que-progress-track-color, var(--que-color-bg-muted));
  overflow: hidden;
  box-sizing: border-box;
}

.que-progress__bar {
  height: 100%;
  border-radius: inherit;
  background: var(--que-progress-color, var(--que-color-primary));
  transition: width 0.3s var(--que-easing-out);
  transform-origin: left;
}

/* ── INDETERMINATE ───────────────────────────────────────── */

.que-progress--indeterminate .que-progress__bar {
  width: 25% !important;
  animation: que-progress-slide 1.4s var(--que-easing-in-out) infinite;
  transition: none;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-progress--sm { --que-progress-height: 4px; }
.que-progress--lg { --que-progress-height: 12px; }
.que-progress--xl { --que-progress-height: 18px; }

/* ── INTENTS ─────────────────────────────────────────────── */

${intentVarCSS('que-progress', '--que-progress-color', ['primary', 'secondary', 'success', 'warning', 'danger'])}
.que-progress--intent-neutral { --que-progress-color: var(--que-color-text-muted); }

/* ── CIRCULAR ────────────────────────────────────────────── */

.que-progress--circular {
  width:  var(--que-progress-size, 48px);
  height: var(--que-progress-size, 48px);
  background: none;
  border-radius: 0;
  overflow: visible;
}

.que-progress--circular svg {
  display: block;
  width: 100%;
  height: 100%;
}

.que-progress__track {
  stroke: var(--que-progress-track-color, var(--que-color-bg-muted));
  stroke-width: var(--que-progress-thickness, 3.5);
  fill: none;
}

.que-progress__fill {
  stroke: var(--que-progress-color, var(--que-color-primary));
  stroke-width: var(--que-progress-thickness, 3.5);
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.4s var(--que-easing-out);
}

/* ── CIRCULAR INDETERMINATE ──────────────────────────────── */

.que-progress--circular.que-progress--indeterminate svg {
  animation: que-progress-spin 1.2s linear infinite;
}

.que-progress--circular.que-progress--indeterminate .que-progress__fill {
  stroke-dashoffset: 75 !important;
  transition: none;
}

/* ── CIRCULAR SIZES ──────────────────────────────────────── */

.que-progress--circular.que-progress--sm { --que-progress-size: 28px; --que-progress-thickness: 3; }
.que-progress--circular.que-progress--lg { --que-progress-size: 64px; --que-progress-thickness: 4; }
.que-progress--circular.que-progress--xl { --que-progress-size: 88px; --que-progress-thickness: 4.5; }
`
