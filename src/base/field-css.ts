/**
 * Generates CSS for the standard form-field feedback elements (required-label
 * asterisk, hint, error message) scoped to a given prefix.
 *
 * Each form component inlines its own copy via this helper, so every CSS
 * bundle stays self-contained for CSS-only consumers (e.g. someone writing
 * `<div class="que-select-error">…</div>` by hand without the custom element).
 *
 *   fieldFeedbackCSS('select')
 *   → .que-select-label--required::after { content: ' *'; … }
 *     .que-select-hint  { … }
 *     .que-select-error { … }
 *
 * `paddingLeft` is the optional left padding for hint/error text — useful when
 * the feedback should align with the input/trigger's left padding edge.
 */
export function fieldFeedbackCSS(prefix: string, opts: { paddingLeft?: string } = {}): string {
  const pad = opts.paddingLeft ? `padding-left: ${opts.paddingLeft};` : ''
  return `
.que-${prefix}-label--required::after {
  content: ' *';
  color: var(--que-color-danger);
}

.que-${prefix}-hint {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
  ${pad}
}

.que-${prefix}-error {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-danger);
  line-height: var(--que-line-height-normal);
  ${pad}
}
`
}
