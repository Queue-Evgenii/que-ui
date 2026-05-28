import { BaseElement } from '../../base/BaseElement'
import { inputCSS } from './input.styles'
import { esc } from '../../utils/html'
import type { Size, Intent } from '../../base/types'

type InputIntent = Extract<Intent, 'danger' | 'success' | 'warning'>
type InputSize   = Extract<Size, 'sm' | 'md' | 'lg'>

export class QueInput extends BaseElement {
  static observedAttributes = [
    'type', 'placeholder', 'value', 'name', 'id',
    'disabled', 'readonly', 'required',
    'size', 'intent', 'label', 'hint', 'error',
  ]

  get value(): string {
    return this.#input?.value ?? this.attr('value') ?? ''
  }

  set value(v: string) {
    if (this.#input) {
      this.#input.value = v
      this.#input.classList.toggle('que-input--filled', v.length > 0)
    }
  }

  #input: HTMLInputElement | null = null

  disconnectedCallback(): void {
    this.#input?.removeEventListener('input', this.#onInput)
    this.#input?.removeEventListener('change', this.#onChange)
  }

  #onInput = (e: Event): void => {
    const val = (e.target as HTMLInputElement).value
    this.#input?.classList.toggle('que-input--filled', val.length > 0)
    this.dispatchEvent(new CustomEvent('que-input', {
      detail: { value: val },
      bubbles: true, composed: true,
    }))
  }

  #onChange = (e: Event): void => {
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { value: (e.target as HTMLInputElement).value },
      bubbles: true, composed: true,
    }))
  }

  protected render(): void {
    const type     = this.attr('type') ?? 'text'
    const size     = (this.attr('size') as InputSize) ?? 'md'
    const intent   = (this.attr('intent') as InputIntent) ?? null
    const label    = this.attr('label')
    const hint     = this.attr('hint')
    const error    = this.attr('error')
    const disabled = this.boolAttr('disabled')
    const readonly = this.boolAttr('readonly')
    const required = this.boolAttr('required')
    const value    = this.attr('value') ?? ''
    const id       = this.attr('id') ?? this._uid

    const resolvedIntent = error ? 'danger' : intent

    const inputClasses = this.cx('que-input', {
      size:   size !== 'md' ? size : null,
      intent: resolvedIntent,
      flags:  { filled: value.length > 0 },
    })

    this.injectCSS(inputCSS)
    this.innerHTML = `
      <div class="que-input-field">
        <div class="que-input-wrap">
          <input
            class="${inputClasses}"
            type="${esc(type)}"
            id="${esc(id)}"
            placeholder=" "
            ${value ? `value="${esc(value)}"` : ''}
            ${this.attr('placeholder') ? `data-placeholder="${esc(this.attr('placeholder')!)}"` : ''}
            ${this.attr('name') ? `name="${esc(this.attr('name')!)}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            ${required ? 'required' : ''}
          />
          ${label ? `<label class="que-input-label${required ? ' que-input-label--required' : ''}" for="${esc(id)}">${esc(label)}</label>` : ''}
        </div>
        ${error ? `<span class="que-input-error">${esc(error)}</span>` : ''}
        ${hint && !error ? `<span class="que-input-hint">${esc(hint)}</span>` : ''}
      </div>
    `

    this.#input = this.querySelector('input')
    this.#input?.addEventListener('input', this.#onInput)
    this.#input?.addEventListener('change', this.#onChange)

    if (this.attr('placeholder')) {
      this.#input?.addEventListener('focus', this.#onFocus)
      this.#input?.addEventListener('blur', this.#onBlur)
    }
  }

  #onFocus = (): void => {
    const ph = this.#input?.dataset.placeholder
    if (ph && this.#input) this.#input.placeholder = ph
  }

  #onBlur = (): void => {
    if (this.#input) this.#input.placeholder = ' '
  }
}

customElements.define('que-input', QueInput)
