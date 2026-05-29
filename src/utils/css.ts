import type { TokenMap } from '../tokens'

export function tokensToCSSVars(tokens: TokenMap, prefix = 'que'): string {
  return Object.entries(tokens)
    .map(([key, value]) => `  --${prefix}-${key}: ${value};`)
    .join('\n')
}

export function cssVar(token: string, prefix = 'que'): string {
  return `var(--${prefix}-${token})`
}

/** Converts a bare number string to a px value; passes anything else through.
 *  "16" → "16px"  |  "1rem" → "1rem"  |  "var(--x)" → "var(--x)" */
export function toPx(val: string): string {
  return /^\d/.test(val) ? `${val}px` : val
}
