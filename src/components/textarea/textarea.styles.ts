import { fieldFeedbackCSS } from '../../base/field-css'

export const textareaCSS = `
/* Customizable: --que-textarea-padding-x, --que-textarea-font-size, --que-textarea-radius
   (fall through to --que-input-* if not set) */

que-textarea { display: block; box-sizing: border-box; }

/* ── FIELD WRAPPER ──────────────────────────────────────────── */

.que-textarea-field {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-1);
}

/* ── FLOATING LABEL WRAPPER ─────────────────────────────────── */

.que-textarea-wrap {
  position: relative;
  display: block;
  --_que-pt: 12px;
  --_que-border-color: var(--que-color-border-strong);
  --_que-label-float-size: 11px;
}

.que-textarea-wrap:has(.que-textarea--sm) { --_que-pt: 8px;  --_que-label-float-size: 10px; }
.que-textarea-wrap:has(.que-textarea--lg) { --_que-pt: 16px; }

.que-textarea-wrap:has(.que-textarea:hover:not(:disabled):not([readonly])),
.que-textarea-wrap:has(.que-textarea:focus) {
  --_que-border-color: var(--que-color-border-focus);
}

.que-textarea-wrap:has(.que-textarea--intent-danger)  { --_que-border-color: var(--que-color-danger); }
.que-textarea-wrap:has(.que-textarea--intent-success) { --_que-border-color: var(--que-color-success); }
.que-textarea-wrap:has(.que-textarea--intent-warning) { --_que-border-color: var(--que-color-warning); }

.que-textarea-wrap:has(.que-textarea[readonly]:hover),
.que-textarea-wrap:has(.que-textarea[readonly]:focus) {
  --_que-border-color: var(--que-color-border-strong);
}

/* ── TEXTAREA ───────────────────────────────────────────────── */

.que-textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 96px;
  padding: var(--_que-pt) var(--que-textarea-padding-x, var(--que-input-padding-x, var(--que-space-3))) 8px;
  border: 1px solid var(--_que-border-color);
  border-radius: var(--que-textarea-radius, var(--que-input-radius, var(--que-radius-md)));
  font-family: var(--que-font-sans);
  font-size: var(--que-textarea-font-size, var(--que-input-font-size, var(--que-font-size-sm)));
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

.que-textarea-label {
  position: absolute;
  top: calc(var(--_que-pt) + 1px);
  left: calc(var(--que-textarea-padding-x, var(--que-input-padding-x, var(--que-space-3))) + 1px);
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

/* Label floats when focused or has value */
.que-textarea:focus ~ .que-textarea-label,
.que-textarea:not(:placeholder-shown) ~ .que-textarea-label,
.que-textarea--filled ~ .que-textarea-label {
  top: 0;
  transform: translateY(-50%);
  font-size: var(--_que-label-float-size);
  color: var(--_que-border-color);
  background: var(--que-color-bg);
}

/* ── SIZES ─────────────────────────────────────────────────── */

.que-textarea--sm {
  font-size: var(--que-font-size-xs);
}

.que-textarea--sm ~ .que-textarea-label {
  font-size: var(--que-font-size-xs);
}

.que-textarea--sm:focus ~ .que-textarea-label,
.que-textarea--sm:not(:placeholder-shown) ~ .que-textarea-label,
.que-textarea--sm.que-textarea--filled ~ .que-textarea-label {
  font-size: var(--_que-label-float-size);
}

.que-textarea--lg {
  font-size: var(--que-font-size-md);
}

.que-textarea--lg ~ .que-textarea-label {
  font-size: var(--que-font-size-md);
}

.que-textarea--lg:focus ~ .que-textarea-label,
.que-textarea--lg:not(:placeholder-shown) ~ .que-textarea-label,
.que-textarea--lg.que-textarea--filled ~ .que-textarea-label {
  font-size: var(--_que-label-float-size);
}

/* ── LABEL REQUIRED / HINT / ERROR ──────────────────────────── */

${fieldFeedbackCSS('textarea', { paddingLeft: 'calc(var(--que-textarea-padding-x, var(--que-input-padding-x, var(--que-space-3))) + 1px)' })}

/* ── INTENTS ────────────────────────────────────────────────── */
/* Border color and floated label color are both driven by --_que-border-color on .que-textarea-wrap */

/* ── STATES ─────────────────────────────────────────────────── */

.que-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--que-color-disabled-bg);
}

.que-textarea:disabled ~ .que-textarea-label {
  opacity: 0.5;
}

.que-textarea[readonly] {
  cursor: default;
}

`
