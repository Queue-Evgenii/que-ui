import { BaseElement } from '../../base/BaseElement'
import { spacerCSS } from './spacer.styles'
import { resolveSpacing } from '../../base/layout-utils'

export class QueSpacer extends BaseElement {
  static observedAttributes = ['size']

  protected render(): void {
    this.injectCSS(spacerCSS)

    const size = this.attr('size')

    this.className = this.cx('que-spacer', {
      flags: { fixed: !!size },
    })

    const resolved = resolveSpacing(size)
    if (resolved) this.style.setProperty('--que-spacer-size', resolved)
    else          this.style.removeProperty('--que-spacer-size')

    this.setAttribute('aria-hidden', 'true')
  }
}

customElements.define('que-spacer', QueSpacer)
