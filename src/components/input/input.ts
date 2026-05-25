import { BaseElement } from '../../base/BaseElement'
import { inputCSS } from './input.styles'

type InputIntent = 'danger' | 'success' | 'warning'
type InputSize   = 'sm' | 'md' | 'lg'

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

  connectedCallback(): void {
    super.connectedCallback()
  }

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

    const resolvedIntent = error ? 'danger' : intent

    const inputClasses = [
      'que-input',
      size !== 'md'           ? `que-input--${size}` : '',
      resolvedIntent          ? `que-input--intent-${resolvedIntent}` : '',
      value.length > 0        ? 'que-input--filled' : '',
    ].filter(Boolean).join(' ')

    this.shadow.innerHTML = `
      <style>${inputCSS}</style>
      <div class="que-input-field">
        <div class="que-input-wrap">
          <input
            class="${inputClasses}"
            type="${type}"
            placeholder=" "
            ${value ? `value="${value}"` : ''}
            ${this.attr('placeholder') ? `data-placeholder="${this.attr('placeholder')}"` : ''}
            ${this.attr('name') ? `name="${this.attr('name')}"` : ''}
            ${this.attr('id') ? `id="${this.attr('id')}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            ${required ? 'required' : ''}
          />
          ${label ? `<label class="que-input-label${required ? ' que-input-label--required' : ''}">${label}</label>` : ''}
        </div>
        ${error ? `<span class="que-input-error">${error}</span>` : ''}
        ${hint && !error ? `<span class="que-input-hint">${hint}</span>` : ''}
      </div>
    `

    this.#input = this.shadow.querySelector('input')
    this.#input?.addEventListener('input', this.#onInput)
    this.#input?.addEventListener('change', this.#onChange)

    // Show real placeholder on focus via data attribute
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
