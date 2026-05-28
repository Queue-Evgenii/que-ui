import { fieldFeedbackCSS } from '../../base/field-css'

export const textareaCSS = `
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
  --_que-label-float-size: 11px;
}

.que-input-wrap:has(.que-textarea:hover:not(:disabled):not([readonly])),
.que-input-wrap:has(.que-textarea:focus) {
  --_que-border-color: var(--que-color-border-focus);
}

.que-input-wrap:has(.que-textarea--intent-danger)  { --_que-border-color: var(--que-color-danger); }
.que-input-wrap:has(.que-textarea--intent-success) { --_que-border-color: var(--que-color-success); }
.que-input-wrap:has(.que-textarea--intent-warning) { --_que-border-color: var(--que-color-warning); }

.que-input-wrap:has(.que-textarea[readonly]:hover),
.que-input-wrap:has(.que-textarea[readonly]:focus) {
  --_que-border-color: var(--que-color-border-strong);
}

/* ── TEXTAREA ───────────────────────────────────────────────── */

.que-textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 96px;
  padding: 12px var(--que-input-padding-x, var(--que-space-3)) 8px;
  border: 1px solid var(--_que-border-color);
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


/* ── FLOATING LABEL ─────────────────────────────────────────── */

.que-input-label {
  position: absolute;
  top: 12px;
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

/* Scope rest position to textarea only — prevents input.css transform from bleeding in.
   top accounts for: padding-top + border (1px), aligns label with top of first text line */
.que-textarea ~ .que-input-label {
  top: calc(var(--_que-pt, 12px) + 1px);
  transform: none;
}

/* Label floats when focused or has value */
.que-textarea:focus ~ .que-input-label,
.que-textarea:not(:placeholder-shown) ~ .que-input-label,
.que-textarea--filled ~ .que-input-label {
  top: 0;
  transform: translateY(-50%);
  font-size: var(--_que-label-float-size);
  color: var(--_que-border-color);
  background: var(--que-color-bg);
}

/* ── LABEL REQUIRED / HINT / ERROR ──────────────────────────── */

${fieldFeedbackCSS('input', { paddingLeft: 'calc(var(--que-input-padding-x, var(--que-space-3)) + 1px)' })}

/* ── INTENTS ────────────────────────────────────────────────── */
/* Border color and floated label color are both driven by --_que-border-color on .que-input-wrap */

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

`
