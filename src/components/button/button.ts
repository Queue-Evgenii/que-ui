import { BaseElement } from '../../base/BaseElement'
import { buttonCSS } from './button.styles'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonIntent  = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
type ButtonSize    = 'sm' | 'md' | 'lg'

export class QueButton extends BaseElement {
  static observedAttributes = ['variant', 'intent', 'size', 'disabled', 'full', 'type', 'label', 'href', 'target']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#handleClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#handleClick)
  }

  #handleClick = (e: Event): void => {
    if (this.boolAttr('disabled')) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }

  get variant(): ButtonVariant {
    return (this.attr('variant') as ButtonVariant) ?? 'solid'
  }

  get intent(): ButtonIntent | null {
    return (this.attr('intent') as ButtonIntent) ?? null
  }

  get size(): ButtonSize {
    return (this.attr('size') as ButtonSize) ?? 'md'
  }

  get disabled(): boolean {
    return this.boolAttr('disabled')
  }

  protected render(): void {
    const variant  = this.variant
    const intent   = this.intent
    const size     = this.size
    const disabled = this.disabled
    const full     = this.boolAttr('full')
    const href     = this.attr('href')
    const target   = this.attr('target')

    const classes = [
      'que-button',
      variant !== 'solid'    ? `que-button--${variant}` : '',
      intent ? `que-button--intent-${intent}` : '',
      size    !== 'md'       ? `que-button--${size}` : '',
      disabled               ? 'que-button--disabled' : '',
      full                   ? 'que-button--full' : '',
    ].filter(Boolean).join(' ')

    const label = this.attr('label') ? `aria-label="${this.attr('label')}"` : ''
    const slot  = this._slotHTML

    const inner = href
      ? `<a
           class="${classes}"
           href="${href}"
           ${target ? `target="${target}"` : ''}
           ${disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
           ${label}
         >${slot}</a>`
      : `<button
           class="${classes}"
           ${disabled ? 'disabled aria-disabled="true"' : ''}
           type="${this.attr('type') ?? 'button'}"
           ${label}
         >${slot}</button>`

    this.injectCSS(buttonCSS)
    this.innerHTML = inner
  }
}

customElements.define('que-button', QueButton)
