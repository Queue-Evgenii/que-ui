import { BaseElement } from '../../base/BaseElement'
import { dividerCSS } from './divider.styles'
import { esc } from '../../utils/html'
import type { Orientation } from '../../base/types'

type DividerVariant   = 'solid' | 'dashed' | 'dotted'
type DividerLabelAlign = 'left' | 'center' | 'right'
type DividerSpacing   = 'sm' | 'md' | 'lg'

export class QueDivider extends BaseElement {
  static observedAttributes = ['label', 'orientation', 'variant', 'label-align', 'spacing']

  protected render(): void {
    const label      = this.attr('label')
    const orientation = (this.attr('orientation') as Orientation) ?? 'horizontal'
    const vertical    = orientation === 'vertical'
    const variant    = (this.attr('variant') as DividerVariant) ?? 'solid'
    const labelAlign = (this.attr('label-align') as DividerLabelAlign) ?? 'center'
    const spacing    = this.attr('spacing') as DividerSpacing | null

    this.setAttribute('role', 'separator')
    this.setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal')

    this.className = this.cx('que-divider', {
      variant: variant !== 'solid' ? variant : null,
      flags: {
        vertical,
        'has-label':              !!label,
        [`label-${labelAlign}`]:  !!label && labelAlign !== 'center',
      },
      spacing: spacing ?? undefined,
    })

    this.injectCSS(dividerCSS)

    this.innerHTML = label
      ? `<span class="que-divider__label">${esc(label)}</span>`
      : ''
  }
}

customElements.define('que-divider', QueDivider)
