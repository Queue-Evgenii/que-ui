import { BaseElement } from '../../base/BaseElement'
import { spinnerCSS } from './spinner.styles'

type SpinnerIntent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'
type SpinnerSize   = 'sm' | 'md' | 'lg' | 'xl'

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
    this.className = [
      'que-spinner',
      size !== 'md' ? `que-spinner--${size}`          : '',
      intent        ? `que-spinner--intent-${intent}` : '',
    ].filter(Boolean).join(' ')
  }
}

customElements.define('que-spinner', QueSpinner)
