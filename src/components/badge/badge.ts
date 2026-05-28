import { BaseElement } from '../../base/BaseElement'
import { badgeCSS } from './badge.styles'
import type { Size, Intent, Variant } from '../../base/types'

type BadgeIntent  = Extract<Intent, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'>
type BadgeVariant = Extract<Variant, 'solid' | 'outline' | 'subtle'>
type BadgeSize    = Extract<Size, 'sm' | 'md' | 'lg'>

export class QueBadge extends BaseElement {
  static observedAttributes = ['intent', 'variant', 'size']

  protected render(): void {
    const intent  = this.attr('intent') as BadgeIntent | null
    const variant = (this.attr('variant') as BadgeVariant) ?? 'solid'
    const size    = (this.attr('size') as BadgeSize) ?? 'md'

    this.injectCSS(badgeCSS)
    this.className = this.cx('que-badge', {
      size:    size !== 'md' ? size : null,
      variant: variant !== 'solid' ? variant : null,
      intent,
    })
  }
}

customElements.define('que-badge', QueBadge)
