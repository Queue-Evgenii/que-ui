import { BaseElement } from '../../base/BaseElement'
import { badgeCSS } from './badge.styles'

type BadgeIntent  = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
type BadgeVariant = 'solid' | 'outline' | 'subtle'
type BadgeSize    = 'sm' | 'md' | 'lg'

export class QueBadge extends BaseElement {
  static observedAttributes = ['intent', 'variant', 'size']

  protected render(): void {
    const intent  = this.attr('intent') as BadgeIntent | null
    const variant = (this.attr('variant') as BadgeVariant) ?? 'solid'
    const size    = (this.attr('size') as BadgeSize) ?? 'md'

    this.injectCSS(badgeCSS)
    this.className = [
      'que-badge',
      size !== 'md'       ? `que-badge--${size}`          : '',
      variant !== 'solid' ? `que-badge--${variant}`       : '',
      intent              ? `que-badge--intent-${intent}` : '',
    ].filter(Boolean).join(' ')
  }
}

customElements.define('que-badge', QueBadge)
