import { BaseElement } from '../../base/BaseElement'
import { buttonCSS } from './button.styles'
import { esc, sanitizeUrl } from '../../utils/html'
import type { Size, Intent, Variant } from '../../base/types'

type ButtonVariant = Extract<Variant, 'solid' | 'outline' | 'ghost'>
type ButtonIntent  = Extract<Intent, 'primary' | 'secondary' | 'danger' | 'success' | 'warning'>
type ButtonSize    = Extract<Size, 'sm' | 'md' | 'lg'>

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

    const classes = this.cx('que-button', {
      variant: variant !== 'solid' ? variant : null,
      size:    size !== 'md' ? size : null,
      intent,
      flags:   { disabled, full },
    })

    const label = this.attr('label') ? `aria-label="${esc(this.attr('label')!)}"` : ''
    const slot  = this._slotHTML

    const inner = href
      ? `<a
           class="${classes}"
           href="${sanitizeUrl(href)}"
           ${target ? `target="${esc(target)}"` : ''}
           ${disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
           ${label}
         >${slot}</a>`
      : `<button
           class="${classes}"
           ${disabled ? 'disabled aria-disabled="true"' : ''}
           type="${esc(this.attr('type') ?? 'button')}"
           ${label}
         >${slot}</button>`

    this.injectCSS(buttonCSS)
    this.innerHTML = inner
  }
}

customElements.define('que-button', QueButton)
