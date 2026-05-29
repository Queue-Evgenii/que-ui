import { BaseElement } from '../../base/BaseElement'
import { kbdCSS } from './kbd.styles'
import type { Size } from '../../base/types'

type KbdSize = Extract<Size, 'sm' | 'md' | 'lg'>

export class QueKbd extends BaseElement {
  static observedAttributes = ['size']

  protected render(): void {
    const size = (this.attr('size') as KbdSize) ?? 'md'

    this.injectCSS(kbdCSS)
    this.className = this.cx('que-kbd', {
      size: size !== 'md' ? size : null,
    })
  }
}

customElements.define('que-kbd', QueKbd)
