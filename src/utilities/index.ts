import { defaultLightColors } from '../tokens/colors'
import { defaultTypography } from '../tokens/typography'
import { defaultSpacing } from '../tokens/spacing'
import { defaultRadius } from '../tokens/misc'

// Background color utilities — .bg-primary, .bg-danger, etc.
const bgColors = Object.keys(defaultLightColors)
  .filter(k => k.startsWith('color-') && !k.includes('text') && !k.includes('border') && !k.includes('overlay') && !k.includes('disabled'))
  .map(k => {
    const name = k.replace('color-', '').replace(/-/g, '-')
    return `.bg-${name} { background: var(--que-${k}); }`
  })
  .join('\n')

// Text color utilities — .text-primary, .text-muted, etc.
const textColors = Object.keys(defaultLightColors)
  .filter(k => k.startsWith('color-text-'))
  .map(k => {
    const name = k.replace('color-text-', '')
    return `.text-${name} { color: var(--que-${k}); }`
  })
  .join('\n')

// Border color utilities — .border-strong, .border-focus, etc.
const borderColors = Object.keys(defaultLightColors)
  .filter(k => k.startsWith('color-border-'))
  .map(k => {
    const name = k.replace('color-border-', '')
    return `.border-${name} { border-color: var(--que-${k}); }`
  })
  .join('\n')

// Font size utilities — .text-xs, .text-sm, etc.
const fontSizes = Object.keys(defaultTypography)
  .filter(k => k.startsWith('font-size-'))
  .map(k => {
    const name = k.replace('font-size-', '')
    return `.text-${name} { font-size: var(--que-${k}); }`
  })
  .join('\n')

// Font weight utilities — .font-medium, .font-bold, etc.
const fontWeights = Object.keys(defaultTypography)
  .filter(k => k.startsWith('font-weight-'))
  .map(k => {
    const name = k.replace('font-weight-', '')
    return `.font-${name} { font-weight: var(--que-${k}); }`
  })
  .join('\n')

// Spacing utilities — .p-4, .px-4, .py-4, .m-4, .gap-4, etc.
const spacing = Object.keys(defaultSpacing)
  .map(k => {
    const rawName = k.replace('space-', '')
    // Escape dots so `.p-0.5` becomes `.p-0\.5` (valid CSS selector)
    const name = rawName.replace(/\./g, '\\.')
    return [
      `.p-${name}  { padding: var(--que-${k}); }`,
      `.px-${name} { padding-left: var(--que-${k}); padding-right: var(--que-${k}); }`,
      `.py-${name} { padding-top: var(--que-${k}); padding-bottom: var(--que-${k}); }`,
      `.pt-${name} { padding-top: var(--que-${k}); }`,
      `.pb-${name} { padding-bottom: var(--que-${k}); }`,
      `.pl-${name} { padding-left: var(--que-${k}); }`,
      `.pr-${name} { padding-right: var(--que-${k}); }`,
      `.m-${name}  { margin: var(--que-${k}); }`,
      `.mx-${name} { margin-left: var(--que-${k}); margin-right: var(--que-${k}); }`,
      `.my-${name} { margin-top: var(--que-${k}); margin-bottom: var(--que-${k}); }`,
      `.gap-${name} { gap: var(--que-${k}); }`,
    ].join('\n')
  })
  .join('\n')

// Border radius utilities — .rounded-sm, .rounded-md, etc.
const radius = Object.keys(defaultRadius)
  .map(k => {
    const name = k.replace('radius-', '')
    return `.rounded-${name} { border-radius: var(--que-${k}); }`
  })
  .join('\n')

export const utilitiesCSS = [
  '/* que-ui utilities — requires tokens.css */',
  bgColors,
  textColors,
  borderColors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
].join('\n\n')
