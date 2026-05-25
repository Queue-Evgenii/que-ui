export const inputCSS = `
/* Customizable: --que-input-padding-x, --que-input-font-size, --que-input-radius */

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
}

/* ── INPUT ──────────────────────────────────────────────────── */

.que-input {
  display: block;
  width: 100%;
  padding: 12px var(--que-input-padding-x, var(--que-space-3));
  border: 1px solid var(--que-color-border-strong);
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

.que-input:hover:not(:disabled):not([readonly]) {
  border-color: var(--que-color-border-focus);
}

.que-input:focus {
  border-color: var(--que-color-border-focus);
}

/* ── FLOATING LABEL ─────────────────────────────────────────── */

.que-input-label {
  position: absolute;
  top: 50%;
  left: calc(var(--que-input-padding-x, var(--que-space-3)) + 1px);
  transform: translateY(-50%);
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

/* Label floats when focused or has value */
.que-input:focus ~ .que-input-label,
.que-input:not(:placeholder-shown) ~ .que-input-label,
.que-input--filled ~ .que-input-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--que-color-text-muted);
  background: var(--que-color-bg);
}

.que-input:focus ~ .que-input-label {
  color: var(--que-color-primary);
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
  padding: 8px var(--que-input-padding-x, var(--que-space-3));
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
  padding: 16px var(--que-input-padding-x, var(--que-space-3));
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

.que-input--intent-danger {
  border-color: var(--que-color-danger);
}
.que-input--intent-danger:hover:not(:disabled):not([readonly]),
.que-input--intent-danger:focus {
  border-color: var(--que-color-danger);
}
.que-input--intent-danger ~ .que-input-label,
.que-input--intent-danger:focus ~ .que-input-label {
  color: var(--que-color-danger);
}

.que-input--intent-success {
  border-color: var(--que-color-success);
}
.que-input--intent-success:hover:not(:disabled):not([readonly]),
.que-input--intent-success:focus {
  border-color: var(--que-color-success);
}
.que-input--intent-success:focus ~ .que-input-label {
  color: var(--que-color-success);
}

.que-input--intent-warning {
  border-color: var(--que-color-warning);
}
.que-input--intent-warning:hover:not(:disabled):not([readonly]),
.que-input--intent-warning:focus {
  border-color: var(--que-color-warning);
}
.que-input--intent-warning:focus ~ .que-input-label {
  color: var(--que-color-warning-text);
}

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

.que-input[readonly]:hover,
.que-input[readonly]:focus {
  border-color: var(--que-color-border-strong);
}
`
