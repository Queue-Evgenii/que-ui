import { BaseElement } from '../../base/BaseElement'
import { checkboxCSS } from './checkbox.styles'
import { esc } from '../../utils/html'

export class QueCheckbox extends BaseElement {
  static observedAttributes = [
    'label', 'direction', 'hint', 'error', 'intent',
    'checked', 'indeterminate', 'disabled', 'required',
    'name', 'value', 'id',
  ]

  get checked(): boolean {
    return this.#input?.checked ?? this.boolAttr('checked')
  }

  set checked(v: boolean) {
    if (this.#input) this.#input.checked = v
  }

  get indeterminate(): boolean {
    return this.#input?.indeterminate ?? this.boolAttr('indeterminate')
  }

  set indeterminate(v: boolean) {
    if (this.#input) this.#input.indeterminate = v
  }

  #input: HTMLInputElement | null = null

  disconnectedCallback(): void {
    this.#input?.removeEventListener('change', this.#onChange)
  }

  #onChange = (): void => {
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { checked: this.#input!.checked, value: this.attr('value') ?? '' },
      bubbles: true, composed: true,
    }))
  }

  protected render(): void {
    const label         = this.attr('label') ?? ''
    const direction     = this.attr('direction')
    const hint          = this.attr('hint')
    const error         = this.attr('error')
    const intent        = this.attr('intent')
    const checked       = this.boolAttr('checked')
    const indeterminate = this.boolAttr('indeterminate')
    const disabled      = this.boolAttr('disabled')
    const required      = this.boolAttr('required')

    const resolvedIntent = error ? 'danger' : intent

    const wrapperClasses = this.cx('que-checkbox', {
      intent: resolvedIntent,
      flags:  { ltr: direction === 'ltr', indeterminate, disabled },
    })

    const inputEl = `<input
          class="que-checkbox__input"
          type="checkbox"
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          ${this.attr('name') ? `name="${esc(this.attr('name')!)}"` : ''}
          ${this.attr('value') ? `value="${esc(this.attr('value')!)}"` : ''}
          ${this.attr('id') ? `id="${esc(this.attr('id')!)}"` : ''}
        />`
    const controlEl = `<span class="que-checkbox__control"></span>`
    const labelEl = label ? `<span class="que-checkbox__label">${esc(label)}</span>` : ''

    const inner = `${inputEl}${controlEl}${labelEl}`

    this.injectCSS(checkboxCSS)
    this.innerHTML = `
      <label class="${wrapperClasses}">${inner}</label>
      ${error ? `<span class="que-checkbox__error">${esc(error)}</span>` : ''}
      ${hint && !error ? `<span class="que-checkbox__hint">${esc(hint)}</span>` : ''}
    `

    this.#input = this.querySelector('input')
    if (this.#input && indeterminate) this.#input.indeterminate = true
    this.#input?.addEventListener('change', this.#onChange)
  }
}

customElements.define('que-checkbox', QueCheckbox)
