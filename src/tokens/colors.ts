export type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

// Primitive palette — raw color values, not meant to be used directly
export const palette = {
  slate: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  gray: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  indigo: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  violet: {
    50:  '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  green: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  yellow: {
    50:  '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  red: {
    50:  '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  orange: {
    50:  '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const

// Semantic color tokens — what components actually reference
export type SemanticColors = {
  [K in keyof typeof defaultLightColors]: string
}

export const defaultLightColors = {
  // Brand
  'color-primary':          palette.indigo[500],
  'color-primary-hover':    palette.indigo[600],
  'color-primary-active':   palette.indigo[700],
  'color-primary-subtle':   palette.indigo[50],
  'color-primary-text':     palette.white,

  // Secondary
  'color-secondary':        palette.violet[500],
  'color-secondary-hover':  palette.violet[600],
  'color-secondary-active': palette.violet[700],
  'color-secondary-subtle': palette.violet[50],
  'color-secondary-text':   palette.white,

  // Surfaces
  'color-bg':               palette.white,
  'color-bg-subtle':        palette.gray[50],
  'color-bg-muted':         palette.gray[100],
  'color-surface':          palette.white,
  'color-surface-raised':   palette.white,
  'color-surface-overlay':  palette.white,

  // Borders
  'color-border':           palette.gray[200],
  'color-border-strong':    palette.gray[300],
  'color-border-focus':     palette.indigo[500],

  // Text
  'color-text':             palette.gray[900],
  'color-text-muted':       palette.gray[500],
  'color-text-subtle':      palette.gray[400],
  'color-text-disabled':    palette.gray[300],
  'color-text-inverse':     palette.white,
  'color-text-link':        palette.indigo[600],
  'color-text-link-hover':  palette.indigo[700],

  // Status — success
  'color-success':          palette.green[500],
  'color-success-hover':    palette.green[600],
  'color-success-subtle':   palette.green[50],
  'color-success-text':     palette.green[700],

  // Status — warning
  'color-warning':          palette.yellow[400],
  'color-warning-hover':    palette.yellow[500],
  'color-warning-subtle':   palette.yellow[50],
  'color-warning-text':     palette.yellow[600],

  // Status — danger
  'color-danger':           palette.red[500],
  'color-danger-hover':     palette.red[600],
  'color-danger-subtle':    palette.red[50],
  'color-danger-text':      palette.red[700],

  // Status — info
  'color-info':             palette.indigo[400],
  'color-info-hover':       palette.indigo[500],
  'color-info-subtle':      palette.indigo[50],
  'color-info-text':        palette.indigo[700],

  // Interactive hover/active overlays — semi-transparent, work on any background
  'color-interactive-hover':  'rgba(0, 0, 0, 0.06)',
  'color-interactive-active': 'rgba(0, 0, 0, 0.12)',

  // Overlay / backdrop
  'color-overlay':          'rgba(0, 0, 0, 0.45)',

  // Disabled
  'color-disabled-bg':      palette.gray[100],
  'color-disabled-text':    palette.gray[400],
  'color-disabled-border':  palette.gray[200],
} as const

export const defaultDarkColors: SemanticColors = {
  // Brand
  'color-primary':          palette.indigo[400],
  'color-primary-hover':    palette.indigo[300],
  'color-primary-active':   palette.indigo[200],
  'color-primary-subtle':   palette.indigo[950],
  'color-primary-text':     palette.white,

  // Secondary
  'color-secondary':        palette.violet[400],
  'color-secondary-hover':  palette.violet[300],
  'color-secondary-active': palette.violet[200],
  'color-secondary-subtle': palette.violet[950],
  'color-secondary-text':   palette.white,

  // Surfaces
  'color-bg':               palette.gray[950],
  'color-bg-subtle':        palette.gray[900],
  'color-bg-muted':         palette.gray[800],
  'color-surface':          palette.gray[900],
  'color-surface-raised':   palette.gray[800],
  'color-surface-overlay':  palette.gray[800],

  // Borders
  'color-border':           palette.gray[700],
  'color-border-strong':    palette.gray[600],
  'color-border-focus':     palette.indigo[400],

  // Text
  'color-text':             palette.gray[50],
  'color-text-muted':       palette.gray[400],
  'color-text-subtle':      palette.gray[500],
  'color-text-disabled':    palette.gray[600],
  'color-text-inverse':     palette.gray[900],
  'color-text-link':        palette.indigo[400],
  'color-text-link-hover':  palette.indigo[300],

  // Status — success
  'color-success':          palette.green[400],
  'color-success-hover':    palette.green[300],
  'color-success-subtle':   palette.green[950],
  'color-success-text':     palette.green[400],

  // Status — warning
  'color-warning':          palette.yellow[400],
  'color-warning-hover':    palette.yellow[300],
  'color-warning-subtle':   palette.yellow[950],
  'color-warning-text':     palette.yellow[600],

  // Status — danger
  'color-danger':           palette.red[400],
  'color-danger-hover':     palette.red[300],
  'color-danger-subtle':    palette.red[950],
  'color-danger-text':      palette.red[400],

  // Status — info
  'color-info':             palette.indigo[400],
  'color-info-hover':       palette.indigo[300],
  'color-info-subtle':      palette.indigo[950],
  'color-info-text':        palette.indigo[400],

  // Interactive hover/active overlays — lighter tint for dark backgrounds
  'color-interactive-hover':  'rgba(255, 255, 255, 0.08)',
  'color-interactive-active': 'rgba(255, 255, 255, 0.15)',

  // Overlay / backdrop
  'color-overlay':          'rgba(0, 0, 0, 0.65)',

  // Disabled
  'color-disabled-bg':      palette.gray[800],
  'color-disabled-text':    palette.gray[600],
  'color-disabled-border':  palette.gray[700],
}
