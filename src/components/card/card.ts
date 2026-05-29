import { BaseElement } from '../../base/BaseElement'
import { cardCSS } from './card.styles'

type CardVariant = 'default' | 'elevated' | 'flat'
type CardPadding = 'sm' | 'md' | 'lg'

// ── Sub-elements (styled via CSS, no logic needed) ──────────
export class QueCardHeader extends HTMLElement {}
customElements.define('que-card-header', QueCardHeader)

export class QueCardBody extends HTMLElement {}
customElements.define('que-card-body', QueCardBody)

export class QueCardFooter extends HTMLElement {}
customElements.define('que-card-footer', QueCardFooter)

export class QueCardMedia extends HTMLElement {}
customElements.define('que-card-media', QueCardMedia)

// ── QueCard ─────────────────────────────────────────────────
export class QueCard extends BaseElement {
  static observedAttributes = ['variant', 'padding']

  protected render(): void {
    const variant = (this.attr('variant') as CardVariant) ?? 'default'
    const padding = (this.attr('padding') as CardPadding) ?? 'md'

    this.injectCSS(cardCSS)
    this.className = this.cx('que-card', {
      variant: variant !== 'default' ? variant : null,
      flags:   { 'padding-sm': padding === 'sm', 'padding-lg': padding === 'lg' },
    })
  }
}

customElements.define('que-card', QueCard)
