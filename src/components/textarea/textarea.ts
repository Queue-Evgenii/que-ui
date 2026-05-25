import { BaseElement } from '../../base/BaseElement'
import { textareaCSS } from './textarea.styles'

type TextareaIntent = 'danger' | 'success' | 'warning'

export class QueTextarea extends BaseElement {
  static observedAttributes = [
    'placeholder', 'value', 'name', 'id', 'rows',
    'disabled', 'readonly', 'required',
    'intent', 'label', 'hint', 'error',
  ]

  get value(): string {
    return this.#textarea?.value ?? this.attr('value') ?? ''
  }

  set value(v: string) {
    if (this.#textarea) {
      this.#textarea.value = v
      this.#textarea.classList.toggle('que-textarea--filled', v.length > 0)
    }
  }

  #textarea: HTMLTextAreaElement | null = null

  connectedCallback(): void {
    super.connectedCallback()
  }

  disconnectedCallback(): void {
    this.#textarea?.removeEventListener('input', this.#onInput)
    this.#textarea?.removeEventListener('change', this.#onChange)
  }

  #onInput = (e: Event): void => {
    const val = (e.target as HTMLTextAreaElement).value
    this.#textarea?.classList.toggle('que-textarea--filled', val.length > 0)
    this.dispatchEvent(new CustomEvent('que-input', {
      detail: { value: val },
      bubbles: true, composed: true,
    }))
  }

  #onChange = (e: Event): void => {
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { value: (e.target as HTMLTextAreaElement).value },
      bubbles: true, composed: true,
    }))
  }

  protected render(): void {
    const intent   = (this.attr('intent') as TextareaIntent) ?? null
    const label    = this.attr('label')
    const hint     = this.attr('hint')
    const error    = this.attr('error')
    const disabled = this.boolAttr('disabled')
    const readonly = this.boolAttr('readonly')
    const required = this.boolAttr('required')
    const rows     = this.attr('rows') ?? '4'
    const value    = this.attr('value') ?? ''

    const resolvedIntent = error ? 'danger' : intent

    const classes = [
      'que-textarea',
      resolvedIntent   ? `que-textarea--intent-${resolvedIntent}` : '',
      value.length > 0 ? 'que-textarea--filled' : '',
    ].filter(Boolean).join(' ')

    this.shadow.innerHTML = `
      <style>${textareaCSS}</style>
      <div class="que-input-field">
        <div class="que-input-wrap">
          <textarea
            class="${classes}"
            rows="${rows}"
            placeholder=" "
            ${this.attr('name') ? `name="${this.attr('name')}"` : ''}
            ${this.attr('id') ? `id="${this.attr('id')}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            ${required ? 'required' : ''}
          >${value}</textarea>
          ${label ? `<label class="que-input-label${required ? ' que-input-label--required' : ''}">${label}</label>` : ''}
        </div>
        ${error ? `<span class="que-input-error">${error}</span>` : ''}
        ${hint && !error ? `<span class="que-input-hint">${hint}</span>` : ''}
      </div>
    `

    this.#textarea = this.shadow.querySelector('textarea')
    this.#textarea?.addEventListener('input', this.#onInput)
    this.#textarea?.addEventListener('change', this.#onChange)

    if (this.attr('placeholder')) {
      this.#textarea?.addEventListener('focus', this.#onFocus)
      this.#textarea?.addEventListener('blur', this.#onBlur)
    }
  }

  #onFocus = (): void => {
    const ph = this.attr('placeholder')
    if (ph && this.#textarea) this.#textarea.placeholder = ph
  }

  #onBlur = (): void => {
    if (this.#textarea) this.#textarea.placeholder = ' '
  }
}

customElements.define('que-textarea', QueTextarea)
