export const selectCSS = `
/* ── FIELD WRAPPER ──────────────────────────────────────────── */

.que-select-field {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-1);
}

/* ── WRAP ───────────────────────────────────────────────────── */

.que-select-wrap {
  position: relative;
  display: block;
}

/* ── TRIGGER ────────────────────────────────────────────────── */

.que-select {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
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
  cursor: pointer;
  text-align: left;
  outline: none;
  transition: border-color var(--que-duration-fast) var(--que-easing-out);
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
}

.que-select__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.que-select__value--placeholder {
  color: var(--que-color-text-subtle);
}

.que-select__arrow {
  flex-shrink: 0;
  color: var(--que-color-text-muted);
  transition: transform var(--que-duration-normal) var(--que-easing-out);
}

.que-select--open .que-select__arrow {
  transform: rotate(180deg);
}

.que-select:hover:not(:disabled) {
  border-color: var(--que-color-border-focus);
}

.que-select--open,
.que-select:focus-visible {
  border-color: var(--que-color-border-focus);
}

/* ── FLOATING LABEL ─────────────────────────────────────────── */

.que-select-label {
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

.que-select-label--required::after {
  content: ' *';
  color: var(--que-color-danger);
}

.que-select--open ~ .que-select-label,
.que-select--filled ~ .que-select-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--que-color-text-muted);
  background: var(--que-color-bg);
}

.que-select--open ~ .que-select-label {
  color: var(--que-color-primary);
}

/* ── DROPDOWN ───────────────────────────────────────────────── */

.que-select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--que-color-bg);
  border: 1px solid var(--que-color-border-strong);
  border-radius: var(--que-input-radius, var(--que-radius-md));
  box-shadow: var(--que-shadow-md);
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: opacity var(--que-duration-normal) var(--que-easing-out),
              transform var(--que-duration-normal) var(--que-easing-out);
}

.que-select--open ~ .que-select__dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.que-select__list {
  list-style: none;
  margin: 0;
  padding: var(--que-space-1) 0;
  max-height: 240px;
  overflow-y: auto;
}

.que-select__option {
  padding: var(--que-space-2) var(--que-space-3);
  cursor: pointer;
  font-family: var(--que-font-sans);
  font-size: var(--que-input-font-size, var(--que-font-size-sm));
  color: var(--que-color-text);
  transition: background var(--que-duration-fast);
}

.que-select__option:hover:not(.que-select__option--disabled) {
  background: var(--que-color-bg-hover);
}

.que-select__option--selected {
  color: var(--que-color-primary);
  font-weight: var(--que-font-weight-medium);
}

.que-select__option--focused {
  background: var(--que-color-bg-hover);
}

.que-select__option--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── INTENTS ────────────────────────────────────────────────── */

.que-select--intent-danger {
  border-color: var(--que-color-danger);
}
.que-select--intent-danger:hover:not(:disabled),
.que-select--intent-danger.que-select--open {
  border-color: var(--que-color-danger);
}
.que-select--intent-danger ~ .que-select-label,
.que-select--intent-danger.que-select--open ~ .que-select-label {
  color: var(--que-color-danger);
}

.que-select--intent-success {
  border-color: var(--que-color-success);
}
.que-select--intent-success:hover:not(:disabled),
.que-select--intent-success.que-select--open {
  border-color: var(--que-color-success);
}
.que-select--intent-success.que-select--open ~ .que-select-label {
  color: var(--que-color-success);
}

.que-select--intent-warning {
  border-color: var(--que-color-warning);
}
.que-select--intent-warning:hover:not(:disabled),
.que-select--intent-warning.que-select--open {
  border-color: var(--que-color-warning);
}
.que-select--intent-warning.que-select--open ~ .que-select-label {
  color: var(--que-color-warning-text);
}

/* ── DISABLED ───────────────────────────────────────────────── */

.que-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--que-color-disabled-bg);
}

.que-select:disabled ~ .que-select-label {
  opacity: 0.5;
}
`
