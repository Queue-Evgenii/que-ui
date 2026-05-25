import { TokenMap, defaultTokens, defaultDarkTokens } from '../tokens'
import type { SemanticColors } from '../tokens'
import { tokensToCSSVars } from '../utils/css'

export type ColorMode = 'light' | 'dark' | 'system'

export type ThemeConfig = {
  // Override any tokens for both modes
  tokens?: Partial<TokenMap>
  // Override semantic colors for light mode only
  light?: Partial<SemanticColors>
  // Override semantic colors for dark mode only
  dark?: Partial<SemanticColors>
  // CSS selector where tokens are applied (default: ':root')
  selector?: string
}

export type Theme = {
  tokens: TokenMap
  darkTokens: TokenMap
  selector: string
  cssText: (mode: 'light' | 'dark') => string
}

export function createTheme(config: ThemeConfig = {}): Theme {
  const selector = config.selector ?? ':root'

  const tokens: TokenMap = {
    ...defaultTokens,
    ...config.tokens,
    ...config.light,
  }

  const darkTokens: TokenMap = {
    ...defaultDarkTokens,
    ...config.tokens,
    ...config.dark,
  }

  const cssText = (mode: 'light' | 'dark'): string => {
    const vars = tokensToCSSVars(mode === 'dark' ? { ...tokens, ...darkTokens } : tokens)
    return `${selector} {\n${vars}\n}`
  }

  return { tokens, darkTokens, selector, cssText }
}

export const defaultTheme = createTheme()

type ApplyOptions = {
  target?: HTMLElement | ShadowRoot
  mode?: ColorMode
}

export function applyTheme(theme: Theme = defaultTheme, options: ApplyOptions = {}): ThemeController {
  return new ThemeController(theme, options)
}

export class ThemeController {
  private theme: Theme
  private styleEl: HTMLStyleElement
  private _mode: ColorMode
  private _resolved: 'light' | 'dark' = 'light'
  private mediaQuery: MediaQueryList | null = null
  private listeners = new Set<(mode: 'light' | 'dark') => void>()

  constructor(theme: Theme, options: ApplyOptions = {}) {
    this.theme = theme
    this._mode = options.mode ?? 'system'

    this.styleEl = document.createElement('style')
    this.styleEl.dataset.queTheme = ''
    const target = options.target ?? document.head
    target.appendChild(this.styleEl)

    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      this.mediaQuery.addEventListener('change', this.onSystemChange)
    }

    this.update()
  }

  get mode(): ColorMode {
    return this._mode
  }

  get resolvedMode(): 'light' | 'dark' {
    return this._resolved
  }

  setMode(mode: ColorMode): void {
    this._mode = mode
    this.update()
  }

  toggle(): void {
    if (this._mode === 'system') {
      this.setMode(this._resolved === 'dark' ? 'light' : 'dark')
    } else {
      this.setMode(this._mode === 'dark' ? 'light' : 'dark')
    }
  }

  onChange(listener: (mode: 'light' | 'dark') => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  destroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onSystemChange)
    this.styleEl.remove()
    this.listeners.clear()
  }

  private resolve(): 'light' | 'dark' {
    if (this._mode === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light'
    }
    return this._mode
  }

  private update(): void {
    const next = this.resolve()
    const changed = next !== this._resolved
    this._resolved = next

    // Light tokens are always the base; dark overrides via media query for system mode,
    // or via direct selector block for manual mode.
    const parts: string[] = [
      this.theme.cssText('light'),
      `@media (prefers-color-scheme: dark) {\n${this.theme.cssText('dark')}\n}`,
    ]

    if (this._mode === 'dark') {
      parts.push(`${this.theme.selector} {\n${tokensToCSSVars(this.theme.darkTokens)}\n}`)
    } else if (this._mode === 'light') {
      // Force light: override the dark media query back to light tokens
      parts.push(`@media (prefers-color-scheme: dark) {\n${this.theme.cssText('light')}\n}`)
    }

    this.styleEl.textContent = parts.join('\n\n')

    if (changed) {
      this.listeners.forEach(fn => fn(this._resolved))
    }
  }

  private onSystemChange = (): void => {
    if (this._mode === 'system') this.update()
  }
}
