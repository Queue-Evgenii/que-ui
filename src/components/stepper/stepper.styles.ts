export const stepperCSS = `
/* Customizable: --que-stepper-gap, --que-step-icon-size, --que-step-connector-color */

/* ── STEPPER CONTAINER ───────────────────────────────────── */

.que-stepper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

.que-stepper--vertical {
  flex-direction: column;
}

/* ── STEP ────────────────────────────────────────────────── */

.que-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  position: relative;
  box-sizing: border-box;
}

.que-stepper--vertical .que-step {
  flex-direction: column;
  flex: unset;
  width: 100%;
}

/* ── ICON COLUMN ─────────────────────────────────────────── */

.que-step__icon-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.que-stepper--vertical .que-step__icon-col {
  flex-direction: row;
  align-items: flex-start;
}

/* ── STEP ICON ───────────────────────────────────────────── */

.que-step__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--que-step-icon-size, 32px);
  height: var(--que-step-icon-size, 32px);
  border-radius: var(--que-radius-full);
  border: 2px solid var(--que-step-connector-color, var(--que-color-border-strong));
  background: var(--que-color-bg);
  color: var(--que-color-text-muted);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-semibold);
  flex-shrink: 0;
  transition: background var(--que-duration-normal), border-color var(--que-duration-normal), color var(--que-duration-normal);
  box-sizing: border-box;
  z-index: 1;
}

/* ── CONNECTOR LINE ──────────────────────────────────────── */

.que-step__connector {
  flex: 1;
  background: var(--que-step-connector-color, var(--que-color-border));
  transition: background var(--que-duration-normal);
}

/* Horizontal connector */
.que-stepper:not(.que-stepper--vertical) .que-step__connector {
  height: 2px;
  margin-top: calc(var(--que-step-icon-size, 32px) / 2 - 1px);
  min-width: 20px;
}

/* Vertical connector */
.que-stepper--vertical .que-step__connector {
  width: 2px;
  min-height: 20px;
  flex: 1;
  margin-left: calc(var(--que-step-icon-size, 32px) / 2 - 1px);
  align-self: stretch;
}

/* Hide connector on last step */
.que-step:last-child .que-step__connector { display: none; }

/* ── STEP CONTENT ────────────────────────────────────────── */

.que-step__content {
  padding-bottom: 20px;
  min-width: 0;
}

.que-stepper:not(.que-stepper--vertical) .que-step__content {
  position: absolute;
  top: calc(var(--que-step-icon-size, 32px) + 8px);
  left: 0;
  padding-bottom: 0;
  min-width: 80px;
}

.que-step__label {
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-tight);
  white-space: nowrap;
  transition: color var(--que-duration-normal);
}

.que-step__description {
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  margin-top: 2px;
  line-height: var(--que-line-height-normal);
  transition: color var(--que-duration-normal);
}

/* ── STATUS: COMPLETE ────────────────────────────────────── */

.que-step--complete .que-step__icon {
  background: var(--que-color-primary);
  border-color: var(--que-color-primary);
  color: #fff;
}
.que-step--complete .que-step__connector {
  background: var(--que-color-primary);
}
.que-step--complete .que-step__label {
  color: var(--que-color-text-muted);
}

/* ── STATUS: CURRENT ─────────────────────────────────────── */

.que-step--current .que-step__icon {
  background: var(--que-color-bg);
  border-color: var(--que-color-primary);
  border-width: 2px;
  color: var(--que-color-primary);
}
.que-step--current .que-step__label {
  color: var(--que-color-text);
}
.que-step--current .que-step__description {
  color: var(--que-color-text-muted);
}

/* ── STATUS: ERROR ───────────────────────────────────────── */

.que-step--error .que-step__icon {
  background: var(--que-color-danger-subtle);
  border-color: var(--que-color-danger);
  color: var(--que-color-danger);
}
.que-step--error .que-step__label {
  color: var(--que-color-danger-text, var(--que-color-danger));
}

/* ── CHECKMARK SVG ───────────────────────────────────────── */

.que-step__check {
  display: block;
}
`
