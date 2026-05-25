export const textareaCSS = `
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

/* ── TEXTAREA ───────────────────────────────────────────────── */

.que-textarea {
  display: block;
  width: 100%;
  min-height: 96px;
  padding: 20px var(--que-input-padding-x, var(--que-space-3)) 8px;
  border: 1px solid var(--que-color-border-strong);
  border-radius: var(--que-input-radius, var(--que-radius-md));
  font-family: var(--que-font-sans);
  font-size: var(--que-input-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-normal);
  line-height: var(--que-line-height-normal);
  color: var(--que-color-text);
  background: var(--que-color-bg);
  outline: none;
  resize: vertical;
  transition: border-color var(--que-duration-fast) var(--que-easing-out);
  -webkit-appearance: none;
  appearance: none;
}

.que-textarea::placeholder {
  color: transparent;
  user-select: none;
}

.que-textarea:focus::placeholder {
  color: var(--que-color-text-subtle);
}

.que-textarea:hover:not(:disabled):not([readonly]) {
  border-color: var(--que-color-border-focus);
}

.que-textarea:focus {
  border-color: var(--que-color-border-focus);
}

/* ── FLOATING LABEL ─────────────────────────────────────────── */

.que-input-label {
  position: absolute;
  top: 14px;
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

/* Label floats when focused or has value */
.que-textarea:focus ~ .que-input-label,
.que-textarea:not(:placeholder-shown) ~ .que-input-label,
.que-textarea--filled ~ .que-input-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--que-color-text-muted);
  background: var(--que-color-bg);
}

.que-textarea:focus ~ .que-input-label {
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

/* ── INTENTS ────────────────────────────────────────────────── */

.que-textarea--intent-danger {
  border-color: var(--que-color-danger);
}
.que-textarea--intent-danger:hover:not(:disabled):not([readonly]),
.que-textarea--intent-danger:focus {
  border-color: var(--que-color-danger);
}
.que-textarea--intent-danger ~ .que-input-label,
.que-textarea--intent-danger:focus ~ .que-input-label {
  color: var(--que-color-danger);
}

.que-textarea--intent-success {
  border-color: var(--que-color-success);
}
.que-textarea--intent-success:hover:not(:disabled):not([readonly]),
.que-textarea--intent-success:focus {
  border-color: var(--que-color-success);
}
.que-textarea--intent-success:focus ~ .que-input-label {
  color: var(--que-color-success);
}

.que-textarea--intent-warning {
  border-color: var(--que-color-warning);
}
.que-textarea--intent-warning:hover:not(:disabled):not([readonly]),
.que-textarea--intent-warning:focus {
  border-color: var(--que-color-warning);
}
.que-textarea--intent-warning:focus ~ .que-input-label {
  color: var(--que-color-warning-text);
}

/* ── STATES ─────────────────────────────────────────────────── */

.que-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--que-color-disabled-bg);
}

.que-textarea:disabled ~ .que-input-label {
  opacity: 0.5;
}

.que-textarea[readonly] {
  cursor: default;
}

.que-textarea[readonly]:hover,
.que-textarea[readonly]:focus {
  border-color: var(--que-color-border-strong);
}
`
