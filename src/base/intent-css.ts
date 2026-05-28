/**
 * CSS generators for the recurring intent patterns across components.
 * Each helper returns a CSS string fragment scoped to a component prefix.
 *
 * Each component composes its own CSS string by calling these — no component
 * imports another, only this shared infra. Per-component bundles stay lean
 * because esbuild inlines the function call sites and dead-code-eliminates
 * unused helpers.
 *
 * Semantic fields:
 *   solid     — saturated accent color (used as bg in solid variant, as the
 *               foreground color in spinner/progress/slider tracks)
 *   onSolid   — text color when placed ON a solid bg (white for status,
 *               *-text for brand)
 *   subtle    — tinted bg for subtle variant
 *   onSubtle  — text color on subtle bg (saturated color for legibility)
 *   border    — accent color for outline borders (often lighter than `solid`)
 */

type IntentTokens = { solid: string; onSolid: string; subtle: string; onSubtle: string; border: string }

const TOKEN: Record<string, IntentTokens> = {
  primary:   { solid: 'var(--que-color-primary)',       onSolid: 'var(--que-color-primary-text)',   subtle: 'var(--que-color-primary-subtle)',   onSubtle: 'var(--que-color-primary)',   border: 'var(--que-color-primary)'   },
  secondary: { solid: 'var(--que-color-secondary)',     onSolid: 'var(--que-color-secondary-text)', subtle: 'var(--que-color-secondary-subtle)', onSubtle: 'var(--que-color-secondary)', border: 'var(--que-color-secondary)' },
  success:   { solid: 'var(--que-color-success)',       onSolid: '#fff',                            subtle: 'var(--que-color-success-subtle)',   onSubtle: 'var(--que-color-success-text)', border: 'var(--que-color-success)' },
  warning:   { solid: 'var(--que-color-warning-hover)', onSolid: '#fff',                            subtle: 'var(--que-color-warning-subtle)',   onSubtle: 'var(--que-color-warning-text)', border: 'var(--que-color-warning)' },
  danger:    { solid: 'var(--que-color-danger)',        onSolid: '#fff',                            subtle: 'var(--que-color-danger-subtle)',    onSubtle: 'var(--que-color-danger-text)',  border: 'var(--que-color-danger)'  },
  info:      { solid: 'var(--que-color-info)',          onSolid: 'var(--que-color-primary-text)',   subtle: 'var(--que-color-info-subtle)',      onSubtle: 'var(--que-color-info-text)',    border: 'var(--que-color-info)'    },
  neutral:   { solid: 'var(--que-color-bg-muted)',      onSolid: 'var(--que-color-text-muted)',     subtle: 'var(--que-color-bg-muted)',         onSubtle: 'var(--que-color-text-muted)',   border: 'var(--que-color-border-strong)' },
}

/**
 * Single-CSS-variable intent override. Used by components whose intents only
 * change one accent color (spinner, progress).
 *
 *   intentVarCSS('que-spinner', '--que-spinner-color', ['primary', 'success'])
 *   → .que-spinner--intent-primary { --que-spinner-color: var(--que-color-primary); } ...
 */
export function intentVarCSS(
  prefix: string,
  cssVar: string,
  intents: readonly string[],
  field: keyof IntentTokens = 'solid',
): string {
  return intents.map(i => {
    const t = TOKEN[i]
    return t ? `.${prefix}--intent-${i} { ${cssVar}: ${t[field]}; }` : ''
  }).filter(Boolean).join('\n')
}

/**
 * Solid intent pattern: saturated bg + legible text.
 */
export function intentSolidCSS(prefix: string, intents: readonly string[]): string {
  return intents.map(i => {
    const t = TOKEN[i]
    return t ? `.${prefix}--intent-${i} { background: ${t.solid}; color: ${t.onSolid}; }` : ''
  }).filter(Boolean).join('\n')
}

/**
 * Outline intent pattern, scoped to a variant modifier.
 *   intentOutlineCSS('que-badge', 'outline', [...])
 *   → .que-badge--outline.que-badge--intent-X { border-color: …; color: …; }
 */
export function intentOutlineCSS(prefix: string, variant: string, intents: readonly string[]): string {
  return intents.map(i => {
    const t = TOKEN[i]
    return t ? `.${prefix}--${variant}.${prefix}--intent-${i} { border-color: ${t.border}; color: ${t.onSubtle}; }` : ''
  }).filter(Boolean).join('\n')
}

/**
 * Subtle intent pattern, scoped to a variant modifier.
 */
export function intentSubtleCSS(prefix: string, variant: string, intents: readonly string[]): string {
  return intents.map(i => {
    const t = TOKEN[i]
    return t ? `.${prefix}--${variant}.${prefix}--intent-${i} { background: ${t.subtle}; color: ${t.onSubtle}; }` : ''
  }).filter(Boolean).join('\n')
}
