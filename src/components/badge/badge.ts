import { BaseElement } from '../../base/BaseElement'
import { badgeCSS } from './badge.styles'
import type { Size, Intent, Variant } from '../../base/types'

type BadgeIntent  = Extract<Intent, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'>
type BadgeVariant = Extract<Variant, 'solid' | 'outline' | 'subtle'>
type BadgeSize    = Extract<Size, 'sm' | 'md' | 'lg'>
type BadgeShape   = 'pill' | 'rect'

const CLOSE_SVG = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1.5 1.5 5 5m0 0 3.5 3.5M5 5 8.5 1.5M5 5 1.5 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`

export class QueBadge extends BaseElement {
  static observedAttributes = ['intent', 'variant', 'size', 'shape', 'dismissible', 'disabled', 'clickable']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick)
  }

  #onClick = (e: MouseEvent): void => {
    if (!(e.target as HTMLElement).closest('.que-badge__dismiss')) return
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('que-dismiss', { bubbles: true, composed: true }))
  }

  protected render(): void {
    const intent      = this.attr('intent') as BadgeIntent | null
    const variant     = (this.attr('variant') as BadgeVariant) ?? 'solid'
    const size        = (this.attr('size') as BadgeSize) ?? 'md'
    const shape       = (this.attr('shape') as BadgeShape) ?? 'pill'
    const dismissible = this.boolAttr('dismissible')
    const disabled    = this.boolAttr('disabled')
    const clickable   = this.boolAttr('clickable')

    this.injectCSS(badgeCSS)
    this.className = this.cx('que-badge', {
      size:    size !== 'md' ? size : null,
      variant: variant !== 'solid' ? variant : null,
      intent,
      flags:   { rect: shape === 'rect', disabled, clickable },
    })

    if (!dismissible) {
      // Pure decorative — no DOM manipulation needed when no slot changes
      return
    }

    const dismiss = `<button class="que-badge__dismiss" aria-label="Remove" tabindex="${disabled ? '-1' : '0'}">${CLOSE_SVG}</button>`
    this.innerHTML = `<span class="que-badge__label">${this._slotHTML}</span>${dismiss}`
  }
}

customElements.define('que-badge', QueBadge)
