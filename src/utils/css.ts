import type { TokenMap } from '../tokens'

export function tokensToCSSVars(tokens: TokenMap, prefix = 'que'): string {
  return Object.entries(tokens)
    .map(([key, value]) => `  --${prefix}-${key}: ${value};`)
    .join('\n')
}

export function cssVar(token: string, prefix = 'que'): string {
  return `var(--${prefix}-${token})`
}
