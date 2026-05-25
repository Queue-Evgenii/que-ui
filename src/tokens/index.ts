export { palette, defaultLightColors, defaultDarkColors } from './colors'
export type { ColorScale, SemanticColors } from './colors'
export { defaultTypography } from './typography'
export { defaultSpacing } from './spacing'
export { defaultRadius, defaultShadow, defaultMotion, defaultZIndex } from './misc'

import { defaultLightColors, defaultDarkColors } from './colors'
import { defaultTypography } from './typography'
import { defaultSpacing } from './spacing'
import { defaultRadius, defaultShadow, defaultMotion, defaultZIndex } from './misc'

export type TokenMap = Record<string, string>

export const defaultTokens: TokenMap = {
  ...defaultLightColors,
  ...defaultTypography,
  ...defaultSpacing,
  ...defaultRadius,
  ...defaultShadow,
  ...defaultMotion,
  ...defaultZIndex,
}

export const defaultDarkTokens: TokenMap = {
  ...defaultDarkColors,
}
