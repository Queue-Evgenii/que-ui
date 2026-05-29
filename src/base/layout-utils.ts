import { toPx } from '../utils/css'

/**
 * Maps named spacing tokens to CSS custom properties.
 * Shared by Stack, Grid, and Spacer — each imports from here, not from each other.
 */
export const SPACING_MAP: Record<string, string> = {
  xs:    'var(--que-space-1)',
  sm:    'var(--que-space-2)',
  md:    'var(--que-space-4)',
  lg:    'var(--que-space-6)',
  xl:    'var(--que-space-8)',
  '2xl': 'var(--que-space-12)',
}

/**
 * Resolves a spacing value to a CSS value string, or null if input is falsy.
 * Named token → CSS variable  |  numeric string → px  |  other string → passthrough
 */
export function resolveSpacing(val: string | null | undefined): string | null {
  if (!val) return null
  return SPACING_MAP[val] ?? toPx(val)
}

/** Returns true when `val` is a named spacing token. */
export function isNamedSpacing(val: string | null | undefined): boolean {
  return !!val && val in SPACING_MAP
}
