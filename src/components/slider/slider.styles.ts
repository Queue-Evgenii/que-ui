export const sliderCSS = `
/* Customizable: --que-slider-color, --que-slider-track-height, --que-slider-thumb-size */

/* ── FIELD WRAPPER ──────────────────────────────────────────── */

.que-slider-field {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-2);
  width: 100%;
}

/* ── HEADER (label + value) ─────────────────────────────────── */

.que-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--que-space-2);
}

.que-slider-label {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text);
  line-height: var(--que-line-height-tight);
}

.que-slider-label--required::after {
  content: ' *';
  color: var(--que-color-danger);
}

.que-slider-output {
  font-family: var(--que-font-mono);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-tight);
  min-width: 2ch;
  text-align: right;
}

/* ── TRACK ──────────────────────────────────────────────────── */

.que-slider {
  --que-slider-color: var(--que-color-primary);
  --que-slider-track-height: 4px;
  --que-slider-thumb-size: 18px;

  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: var(--que-slider-track-height);
  border-radius: var(--que-radius-full);
  background: linear-gradient(
    to right,
    var(--que-slider-color) var(--pct, 0%),
    var(--que-color-bg-muted) var(--pct, 0%)
  );
  outline: none;
  cursor: pointer;
  transition: opacity var(--que-duration-fast);
}

/* ── WEBKIT THUMB ───────────────────────────────────────────── */

.que-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--que-slider-thumb-size);
  height: var(--que-slider-thumb-size);
  border-radius: var(--que-radius-full);
  background: var(--que-slider-color);
  cursor: pointer;
  border: 2px solid var(--que-color-bg);
  box-shadow: var(--que-shadow-sm);
  transition: transform var(--que-duration-fast) var(--que-easing-out),
              box-shadow var(--que-duration-fast) var(--que-easing-out);
}

.que-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: var(--que-shadow-md);
}

.que-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--que-color-primary-subtle), var(--que-shadow-sm);
}

/* ── FIREFOX TRACK ──────────────────────────────────────────── */

.que-slider::-moz-range-track {
  height: var(--que-slider-track-height);
  border-radius: var(--que-radius-full);
  background: var(--que-color-bg-muted);
}

.que-slider::-moz-range-progress {
  height: var(--que-slider-track-height);
  border-radius: var(--que-radius-full);
  background: var(--que-slider-color);
}

/* ── FIREFOX THUMB ──────────────────────────────────────────── */

.que-slider::-moz-range-thumb {
  width: var(--que-slider-thumb-size);
  height: var(--que-slider-thumb-size);
  border-radius: var(--que-radius-full);
  background: var(--que-slider-color);
  cursor: pointer;
  border: 2px solid var(--que-color-bg);
  box-shadow: var(--que-shadow-sm);
  transition: transform var(--que-duration-fast) var(--que-easing-out);
}

.que-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
}

/* ── INTENTS ────────────────────────────────────────────────── */

.que-slider--intent-danger  { --que-slider-color: var(--que-color-danger); }
.que-slider--intent-success { --que-slider-color: var(--que-color-success); }
.que-slider--intent-warning { --que-slider-color: var(--que-color-warning); }

/* ── DISABLED ───────────────────────────────────────────────── */

.que-slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.que-slider:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
  pointer-events: none;
}

.que-slider:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
`
