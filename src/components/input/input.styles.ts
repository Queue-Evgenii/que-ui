export const inputCSS = `
/* Customizable: --que-input-padding-x, --que-input-font-size, --que-input-radius */

:host { display: block; box-sizing: border-box; }

/* ── FIELD WRAPPER ──────────────────────────────────────────── */

.que-input-field {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-1);
}

/* ── FLOATING LABEL WRAPPER ─────────────────────────────────── */

.que-input-wrap {
  position: relative;
  display: block;
  --_que-pt: 12px;
  --_que-border-color: var(--que-color-border-strong);
}

.que-input-wrap:has(.que-input--sm) { --_que-pt: 8px; }
.que-input-wrap:has(.que-input--lg) { --_que-pt: 16px; }

/* Border color cascade: focus/hover first, then intents override */
.que-input-wrap:has(.que-input:hover:not(:disabled):not([readonly])),
.que-input-wrap:has(.que-input:focus) {
  --_que-border-color: var(--que-color-border-focus);
}

.que-input-wrap:has(.que-input--intent-danger)  { --_que-border-color: var(--que-color-danger); }
.que-input-wrap:has(.que-input--intent-success) { --_que-border-color: var(--que-color-success); }
.que-input-wrap:has(.que-input--intent-warning) { --_que-border-color: var(--que-color-warning); }

.que-input-wrap:has(.que-input[readonly]:hover),
.que-input-wrap:has(.que-input[readonly]:focus) {
  --_que-border-color: var(--que-color-border-strong);
}

/* ── INPUT ──────────────────────────────────────────────────── */

.que-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: var(--_que-pt) var(--que-input-padding-x, var(--que-space-3));
  border: 1px solid var(--_que-border-color);
  border-radius: var(--que-input-radius, var(--que-radius-md));
  font-family: var(--que-font-sans);
  font-size: var(--que-input-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-normal);
  line-height: var(--que-line-height-tight);
  color: var(--que-color-text);
  background: var(--que-color-bg);
  outline: none;
  transition: border-color var(--que-duration-fast) var(--que-easing-out);
  -webkit-appearance: none;
  appearance: none;
}

.que-input::placeholder {
  color: transparent;
  user-select: none;
}

.que-input:focus::placeholder {
  color: var(--que-color-text-subtle);
}


/* ── FLOATING LABEL ─────────────────────────────────────────── */

.que-input-label {
  position: absolute;
  top: var(--_que-pt);
  left: calc(var(--que-input-padding-x, var(--que-space-3)) + 1px);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text-subtle);
  pointer-events: none;
  background: transparent;
  padding: 0 3px;
  line-height: 1;
  white-space: nowrap;
  transition: top var(--que-duration-slow) var(--que-easing-out),
              font-size var(--que-duration-slow) var(--que-easing-out),
              color var(--que-duration-slow) var(--que-easing-out),
              transform var(--que-duration-slow) var(--que-easing-out);
}

.que-input-label--required::after {
  content: ' *';
  color: var(--que-color-danger);
}

/* Scope rest position to input only — prevents textarea.css from overriding.
   top accounts for: padding-top + border (1px) + half-leading ((line-height - 1) / 2 * font-size) */
.que-input ~ .que-input-label {
  top: calc(var(--_que-pt) + 1px + (var(--que-line-height-tight) - 1) / 2 * 1em);
  transform: none;
}

/* Label floats when focused or has value */
.que-input:focus ~ .que-input-label,
.que-input:not(:placeholder-shown) ~ .que-input-label,
.que-input--filled ~ .que-input-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--_que-border-color);
  background: var(--que-color-bg);
}


/* ── HINT / ERROR ────────────────────────────────────────────── */

.que-input-hint {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-input-padding-x, var(--que-space-3)) + 1px);
}

.que-input-error {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-danger);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-input-padding-x, var(--que-space-3)) + 1px);
}

/* ── SIZES ──────────────────────────────────────────────────── */

.que-input--sm {
  font-size: var(--que-font-size-xs);
}

.que-input--sm ~ .que-input-label {
  font-size: var(--que-font-size-xs);
}

.que-input--sm:focus ~ .que-input-label,
.que-input--sm:not(:placeholder-shown) ~ .que-input-label,
.que-input--sm.que-input--filled ~ .que-input-label {
  font-size: 10px;
}

.que-input--lg {
  font-size: var(--que-font-size-md);
}

.que-input--lg ~ .que-input-label {
  font-size: var(--que-font-size-md);
}

.que-input--lg:focus ~ .que-input-label,
.que-input--lg:not(:placeholder-shown) ~ .que-input-label,
.que-input--lg.que-input--filled ~ .que-input-label {
  font-size: 11px;
}

/* ── INTENTS ────────────────────────────────────────────────── */
/* Border color and floated label color are both driven by --_que-border-color on .que-input-wrap */

/* ── STATES ─────────────────────────────────────────────────── */

.que-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--que-color-disabled-bg);
}

.que-input:disabled ~ .que-input-label {
  opacity: 0.5;
}

.que-input[readonly] {
  cursor: default;
}

`
