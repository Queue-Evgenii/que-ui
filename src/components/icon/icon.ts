import { BaseElement } from '../../base/BaseElement'
import { iconCSS } from './icon.styles'
import type { Intent } from '../../base/types'

type IconSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type IconIntent = Extract<Intent, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> | 'muted'

export class QueIcon extends BaseElement {
  static observedAttributes = ['size', 'intent', 'label', 'name']

  private static readonly _packs: Record<string, Record<string, string>> = {}

  /** Register a named icon pack. Icons are SVG strings keyed by icon name.
   *  Usage: QueIcon.registerPack('ionic', { star: '<svg>...</svg>', ... })
   *  Then:  <que-icon name="ionic:star"></que-icon>
   */
  static registerPack(packName: string, icons: Record<string, string>): void {
    QueIcon._packs[packName] = icons
  }

  protected render(): void {
    const size   = this.attr('size') as IconSize | null
    const intent = this.attr('intent') as IconIntent | null
    const label  = this.attr('label')
    const name   = this.attr('name')

    this.injectCSS(iconCSS)
    this.className = this.cx('que-icon', { size, intent })

    if (label) {
      this.setAttribute('role', 'img')
      this.setAttribute('aria-label', label)
      this.removeAttribute('aria-hidden')
    } else {
      this.setAttribute('aria-hidden', 'true')
      this.removeAttribute('role')
      this.removeAttribute('aria-label')
    }

    if (name) {
      let packName: string | null = null
      let iconName = name
      const colon = name.indexOf(':')
      if (colon !== -1) {
        packName = name.slice(0, colon)
        iconName = name.slice(colon + 1)
      }
      const pack = packName ? QueIcon._packs[packName] : Object.values(QueIcon._packs)[0]
      this.innerHTML = pack?.[iconName] ?? ''
    } else if (this.innerHTML !== this._slotHTML) {
      this.innerHTML = this._slotHTML
    }
  }
}

customElements.define('que-icon', QueIcon)
