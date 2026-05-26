export const switchCSS = `
/* Customizable: --que-switch-width, --que-switch-height */

/* ── WRAPPER ────────────────────────────────────────────────── */

.que-switch {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
  cursor: pointer;
  user-select: none;
}

.que-switch--label-left .que-switch__label {
  flex: 1;
}

.que-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── HIDDEN NATIVE INPUT ────────────────────────────────────── */

.que-switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

/* ── TRACK ──────────────────────────────────────────────────── */

.que-switch__track {
  flex-shrink: 0;
  position: relative;
  width: var(--que-switch-width, 40px);
  height: var(--que-switch-height, 22px);
  border-radius: var(--que-radius-full);
  background: var(--que-color-border-strong);
  transition: background var(--que-duration-normal) var(--que-easing-out);
}

.que-switch:hover .que-switch__track {
  background: var(--que-color-text-muted);
}

.que-switch__input:checked ~ .que-switch__track {
  background: var(--que-color-primary);
}

.que-switch:hover .que-switch__input:checked ~ .que-switch__track {
  background: var(--que-color-primary-hover);
}

/* focus ring */
.que-switch__input:focus-visible ~ .que-switch__track {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* ── THUMB ──────────────────────────────────────────────────── */

.que-switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(var(--que-switch-height, 22px) - 6px);
  height: calc(var(--que-switch-height, 22px) - 6px);
  border-radius: var(--que-radius-full);
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform var(--que-duration-normal) var(--que-easing-out);
}

.que-switch__input:checked ~ .que-switch__track .que-switch__thumb {
  transform: translateX(calc(var(--que-switch-width, 40px) - var(--que-switch-height, 22px)));
}

/* ── LABEL TEXT ─────────────────────────────────────────────── */

.que-switch__label {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-normal);
  line-height: var(--que-line-height-normal);
  color: var(--que-color-text);
}

/* ── HINT ───────────────────────────────────────────────────── */

.que-switch__hint {
  display: block;
  margin-top: var(--que-space-1);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-switch-width, 40px) + var(--que-space-2));
}

.que-switch--label-left ~ .que-switch__hint {
  padding-left: 0;
}

/* ── ERROR ──────────────────────────────────────────────────── */

.que-switch__error {
  display: block;
  margin-top: var(--que-space-1);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-danger);
  line-height: var(--que-line-height-normal);
  padding-left: calc(var(--que-switch-width, 40px) + var(--que-space-2));
}

.que-switch--label-left ~ .que-switch__error {
  padding-left: 0;
}

/* ── INTENTS ────────────────────────────────────────────────── */

.que-switch--intent-danger .que-switch__label {
  color: var(--que-color-danger);
}
.que-switch--intent-danger .que-switch__input:focus-visible ~ .que-switch__track {
  outline-color: var(--que-color-danger);
}

.que-switch--intent-warning .que-switch__label {
  color: var(--que-color-warning-text);
}
`
