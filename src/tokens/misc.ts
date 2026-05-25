export const defaultRadius = {
  'radius-none': '0px',
  'radius-sm':   '0.25rem',   // 4px
  'radius-md':   '0.375rem',  // 6px
  'radius-lg':   '0.5rem',    // 8px
  'radius-xl':   '0.75rem',   // 12px
  'radius-2xl':  '1rem',      // 16px
  'radius-3xl':  '1.5rem',    // 24px
  'radius-full': '9999px',
} as const

export const defaultShadow = {
  'shadow-none': 'none',
  'shadow-xs':   '0 1px 2px 0 rgba(0,0,0,0.05)',
  'shadow-sm':   '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
  'shadow-md':   '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  'shadow-lg':   '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  'shadow-xl':   '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  'shadow-2xl':  '0 25px 50px -12px rgba(0,0,0,0.25)',
  'shadow-inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
} as const

export const defaultMotion = {
  'duration-instant': '0ms',
  'duration-fast':    '100ms',
  'duration-normal':  '200ms',
  'duration-slow':    '300ms',
  'duration-slower':  '500ms',

  'easing-linear':    'linear',
  'easing-in':        'cubic-bezier(0.4, 0, 1, 1)',
  'easing-out':       'cubic-bezier(0, 0, 0.2, 1)',
  'easing-in-out':    'cubic-bezier(0.4, 0, 0.2, 1)',
  'easing-spring':    'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const

export const defaultZIndex = {
  'z-hide':    '-1',
  'z-base':    '0',
  'z-raised':  '10',
  'z-dropdown':'100',
  'z-sticky':  '200',
  'z-overlay': '300',
  'z-modal':   '400',
  'z-toast':   '500',
  'z-tooltip': '600',
} as const
