import { BaseElement } from '../../base/BaseElement'
import { spinnerCSS } from './spinner.styles'
import type { Size, Intent } from '../../base/types'

type SpinnerIntent = Extract<Intent, 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'>
type SpinnerSize   = Size

export class QueSpinner extends BaseElement {
  static observedAttributes = ['intent', 'size', 'label', 'speed']

  protected render(): void {
    const intent = this.attr('intent') as SpinnerIntent | null
    const size   = (this.attr('size') as SpinnerSize) ?? 'md'
    const label  = this.attr('label') ?? 'Loading'
    const speed  = this.attr('speed')

    this.injectCSS(spinnerCSS)
    this.setAttribute('role', 'status')
    this.setAttribute('aria-label', label)
    if (speed) this.style.setProperty('--que-spinner-speed', speed)
    this.className = this.cx('que-spinner', {
      size: size !== 'md' ? size : null,
      intent,
    })
  }
}

customElements.define('que-spinner', QueSpinner)
