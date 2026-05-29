/**
 * Canonical design-system unions. Components import these and narrow as needed
 * via `Extract<Intent, ...>`. Pure types — erased at compile time, zero runtime
 * overhead per per-component bundle.
 */

export type Size    = 'sm' | 'md' | 'lg' | 'xl'
export type Intent  = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type Variant = 'solid' | 'outline' | 'subtle' | 'ghost'

/** All 12 standard placement values (trigger-relative and viewport-anchored). */
export type Placement =
  | 'top'    | 'top-start'    | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left'   | 'left-start'   | 'left-end'
  | 'right'  | 'right-start'  | 'right-end'
