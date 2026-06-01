import { BaseElement } from '../../base/BaseElement'
import { textareaCSS } from './textarea.styles'
import { esc } from '../../utils/html'
import type { Intent, Size } from '../../base/types'

type TextareaIntent = Extract<Intent, 'danger' | 'success' | 'warning'>
type TextareaSize   = Extract<Size, 'sm' | 'md' | 'lg'>

export class QueTextarea extends BaseElement {
  static observedAttributes = [
    'placeholder', 'value', 'name', 'id', 'rows',
    'disabled', 'readonly', 'required',
    'size', 'intent', 'label', 'hint', 'error',
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
    const size     = (this.attr('size') as TextareaSize) ?? 'md'
    const intent   = (this.attr('intent') as TextareaIntent) ?? null
    const label    = this.attr('label')
    const hint     = this.attr('hint')
    const error    = this.attr('error')
    const disabled = this.boolAttr('disabled')
    const readonly = this.boolAttr('readonly')
    const required = this.boolAttr('required')
    const rows     = this.attr('rows') ?? '4'
    const value    = this.attr('value') ?? ''
    const id       = this.attr('id') ?? this._uid

    const resolvedIntent = error ? 'danger' : intent

    const classes = this.cx('que-textarea', {
      size:   size !== 'md' ? size : null,
      intent: resolvedIntent,
      flags:  { filled: value.length > 0 },
    })

    this.injectCSS(textareaCSS)
    this.innerHTML = `
      <div class="que-textarea-field">
        <div class="que-textarea-wrap">
          <textarea
            class="${classes}"
            id="${esc(id)}"
            rows="${esc(rows)}"
            placeholder=" "
            ${this.attr('placeholder') ? `data-placeholder="${esc(this.attr('placeholder')!)}"` : ''}
            ${this.attr('name') ? `name="${esc(this.attr('name')!)}"` : ''}
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            ${required ? 'required' : ''}
          >${esc(value)}</textarea>
          ${label ? `<label class="que-textarea-label${required ? ' que-textarea-label--required' : ''}" for="${esc(id)}">${esc(label)}</label>` : ''}
        </div>
        ${error ? `<span class="que-textarea-error">${esc(error)}</span>` : ''}
        ${hint && !error ? `<span class="que-textarea-hint">${esc(hint)}</span>` : ''}
      </div>
    `

    this.#textarea = this.querySelector('textarea')
    this.#textarea?.addEventListener('input', this.#onInput)
    this.#textarea?.addEventListener('change', this.#onChange)

    if (this.attr('placeholder')) {
      this.#textarea?.addEventListener('focus', this.#onFocus)
      this.#textarea?.addEventListener('blur', this.#onBlur)
    }
  }

  #onFocus = (): void => {
    const ph = this.#textarea?.dataset.placeholder
    if (ph && this.#textarea) this.#textarea.placeholder = ph
  }

  #onBlur = (): void => {
    if (this.#textarea) this.#textarea.placeholder = ' '
  }
}

customElements.define('que-textarea', QueTextarea)
