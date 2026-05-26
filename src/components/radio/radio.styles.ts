export const radioCSS = `
/* Customizable: --que-radio-size */

/* ── RADIO GROUP ────────────────────────────────────────────── */

.que-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-2);
}

.que-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--que-space-4);
}

.que-radio-group__label {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  margin-bottom: var(--que-space-1);
}

/* ── RADIO WRAPPER ──────────────────────────────────────────── */

.que-radio {
  display: flex;
  align-items: flex-start;
  gap: var(--que-space-2);
  cursor: pointer;
  user-select: none;
}

.que-radio--label-left .que-radio__label {
  flex: 1;
}

.que-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── HIDDEN NATIVE INPUT ────────────────────────────────────── */

.que-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

/* ── VISUAL CONTROL ─────────────────────────────────────────── */

.que-radio__control {
  flex-shrink: 0;
  width: var(--que-radio-size, 18px);
  height: var(--que-radio-size, 18px);
  border: 1.5px solid var(--que-color-border-strong);
  border-radius: var(--que-radius-full);
  background: var(--que-color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--que-duration-fast) var(--que-easing-out),
              border-color var(--que-duration-fast) var(--que-easing-out);
  margin-top: 1px;
}

.que-radio:hover .que-radio__control {
  border-color: var(--que-color-border-focus);
}

.que-radio__input:checked ~ .que-radio__control {
  border-color: var(--que-color-primary);
}

.que-radio__input:checked ~ .que-radio__control::after {
  content: '';
  display: block;
  width: calc(var(--que-radio-size, 18px) / 2.25);
  height: calc(var(--que-radio-size, 18px) / 2.25);
  border-radius: var(--que-radius-full);
  background: var(--que-color-primary);
}

.que-radio__input:focus-visible ~ .que-radio__control {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* ── LABEL TEXT ─────────────────────────────────────────────── */

.que-radio__label {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-normal);
  line-height: var(--que-line-height-normal);
  color: var(--que-color-text);
}

/* ── HINT ───────────────────────────────────────────────────── */

.que-radio__hint {
  display: block;
  margin-top: var(--que-space-1);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-radio-size, 18px) + var(--que-space-2));
}

.que-radio--label-left ~ .que-radio__hint {
  padding-left: 0;
}

/* ── GROUP ERROR ─────────────────────────────────────────────── */

.que-radio-group__error {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-danger);
  line-height: var(--que-line-height-normal);
  margin-top: var(--que-space-1);
}

/* ── INTENTS (applied via group or individual radio) ─────────── */

.que-radio--intent-danger .que-radio__control {
  border-color: var(--que-color-danger);
}
.que-radio--intent-danger:hover .que-radio__control {
  border-color: var(--que-color-danger);
}
.que-radio--intent-danger .que-radio__input:checked ~ .que-radio__control {
  border-color: var(--que-color-danger);
}
.que-radio--intent-danger .que-radio__input:checked ~ .que-radio__control::after {
  background: var(--que-color-danger);
}
.que-radio--intent-danger .que-radio__label {
  color: var(--que-color-danger);
}

.que-radio--intent-success .que-radio__control {
  border-color: var(--que-color-success);
}
.que-radio--intent-success:hover .que-radio__control {
  border-color: var(--que-color-success);
}
.que-radio--intent-success .que-radio__input:checked ~ .que-radio__control {
  border-color: var(--que-color-success);
}
.que-radio--intent-success .que-radio__input:checked ~ .que-radio__control::after {
  background: var(--que-color-success);
}

.que-radio--intent-warning .que-radio__control {
  border-color: var(--que-color-warning);
}
.que-radio--intent-warning:hover .que-radio__control {
  border-color: var(--que-color-warning);
}
.que-radio--intent-warning .que-radio__input:checked ~ .que-radio__control {
  border-color: var(--que-color-warning);
}
.que-radio--intent-warning .que-radio__input:checked ~ .que-radio__control::after {
  background: var(--que-color-warning);
}
`
