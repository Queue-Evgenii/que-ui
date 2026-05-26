export const checkboxCSS = `
/* Customizable: --que-checkbox-size, --que-checkbox-radius */

/* ── WRAPPER ────────────────────────────────────────────────── */

.que-checkbox {
  display: flex;
  align-items: flex-start;
  gap: var(--que-space-2);
  cursor: pointer;
  user-select: none;
}

.que-checkbox--label-left .que-checkbox__label {
  flex: 1;
}


.que-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── HIDDEN NATIVE INPUT ────────────────────────────────────── */

.que-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

/* ── VISUAL CONTROL ─────────────────────────────────────────── */

.que-checkbox__control {
  flex-shrink: 0;
  width: var(--que-checkbox-size, 18px);
  height: var(--que-checkbox-size, 18px);
  border: 1.5px solid var(--que-color-border-strong);
  border-radius: var(--que-checkbox-radius, var(--que-radius-sm));
  background: var(--que-color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--que-duration-fast) var(--que-easing-out),
              border-color var(--que-duration-fast) var(--que-easing-out);
  margin-top: 1px;
}

.que-checkbox:hover .que-checkbox__control {
  border-color: var(--que-color-border-focus);
}

/* checked */
.que-checkbox__input:checked ~ .que-checkbox__control {
  background: var(--que-color-primary);
  border-color: var(--que-color-primary);
}

.que-checkbox__input:checked ~ .que-checkbox__control::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath d='M1 4l3 3 5-6' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

/* indeterminate */
.que-checkbox__input:indeterminate ~ .que-checkbox__control,
.que-checkbox--indeterminate .que-checkbox__control {
  background: var(--que-color-primary);
  border-color: var(--que-color-primary);
}

.que-checkbox__input:indeterminate ~ .que-checkbox__control::after,
.que-checkbox--indeterminate .que-checkbox__control::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 2'%3E%3Cpath d='M1 1h8' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

/* focus-visible ring */
.que-checkbox__input:focus-visible ~ .que-checkbox__control {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* ── LABEL TEXT ─────────────────────────────────────────────── */

.que-checkbox__label {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-normal);
  line-height: var(--que-line-height-normal);
  color: var(--que-color-text);
}

/* ── HINT / ERROR ────────────────────────────────────────────── */

.que-checkbox__hint {
  display: block;
  margin-top: var(--que-space-1);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-checkbox-size, 18px) + var(--que-space-2));
}

.que-checkbox__error {
  display: block;
  margin-top: var(--que-space-1);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-danger);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-checkbox-size, 18px) + var(--que-space-2));
}

/* ── INTENTS ────────────────────────────────────────────────── */

.que-checkbox--intent-danger .que-checkbox__control {
  border-color: var(--que-color-danger);
}
.que-checkbox--intent-danger:hover .que-checkbox__control {
  border-color: var(--que-color-danger);
}
.que-checkbox--intent-danger .que-checkbox__input:checked ~ .que-checkbox__control,
.que-checkbox--intent-danger .que-checkbox__input:indeterminate ~ .que-checkbox__control,
.que-checkbox--intent-danger.que-checkbox--indeterminate .que-checkbox__control {
  background: var(--que-color-danger);
  border-color: var(--que-color-danger);
}
.que-checkbox--intent-danger .que-checkbox__label {
  color: var(--que-color-danger);
}

.que-checkbox--intent-success .que-checkbox__control {
  border-color: var(--que-color-success);
}
.que-checkbox--intent-success:hover .que-checkbox__control {
  border-color: var(--que-color-success);
}
.que-checkbox--intent-success .que-checkbox__input:checked ~ .que-checkbox__control,
.que-checkbox--intent-success .que-checkbox__input:indeterminate ~ .que-checkbox__control,
.que-checkbox--intent-success.que-checkbox--indeterminate .que-checkbox__control {
  background: var(--que-color-success);
  border-color: var(--que-color-success);
}

.que-checkbox--intent-warning .que-checkbox__control {
  border-color: var(--que-color-warning);
}
.que-checkbox--intent-warning:hover .que-checkbox__control {
  border-color: var(--que-color-warning);
}
.que-checkbox--intent-warning .que-checkbox__input:checked ~ .que-checkbox__control,
.que-checkbox--intent-warning .que-checkbox__input:indeterminate ~ .que-checkbox__control,
.que-checkbox--intent-warning.que-checkbox--indeterminate .que-checkbox__control {
  background: var(--que-color-warning);
  border-color: var(--que-color-warning);
}

`
