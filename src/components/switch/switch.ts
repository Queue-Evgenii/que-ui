import { BaseElement } from '../../base/BaseElement'
import { switchCSS } from './switch.styles'

export class QueSwitch extends BaseElement {
  static observedAttributes = [
    'label', 'label-position', 'hint',
    'checked', 'disabled', 'required',
    'name', 'value', 'id',
  ]

  get checked(): boolean {
    return this.#input?.checked ?? this.boolAttr('checked')
  }

  set checked(v: boolean) {
    if (this.#input) this.#input.checked = v
  }

  #input: HTMLInputElement | null = null

  connectedCallback(): void {
    super.connectedCallback()
  }

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
    const labelPosition = this.attr('label-position') ?? 'right'
    const hint          = this.attr('hint')
    const checked       = this.boolAttr('checked')
    const disabled      = this.boolAttr('disabled')
    const required      = this.boolAttr('required')

    const wrapperClasses = [
      'que-switch',
      labelPosition === 'left' ? 'que-switch--label-left' : '',
      disabled ? 'que-switch--disabled' : '',
    ].filter(Boolean).join(' ')

    const inputEl = `<input
        class="que-switch__input"
        type="checkbox"
        role="switch"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${this.attr('name') ? `name="${this.attr('name')}"` : ''}
        ${this.attr('value') ? `value="${this.attr('value')}"` : ''}
        ${this.attr('id') ? `id="${this.attr('id')}"` : ''}
      />`

    const trackEl = `<span class="que-switch__track"><span class="que-switch__thumb"></span></span>`
    const labelEl = label ? `<span class="que-switch__label">${label}</span>` : ''

    const inner = labelPosition === 'left'
      ? `${inputEl}${labelEl}${trackEl}`
      : `${inputEl}${trackEl}${labelEl}`

    this.shadow.innerHTML = `
      <style>${switchCSS}</style>
      <label class="${wrapperClasses}">${inner}</label>
      ${hint ? `<span class="que-switch__hint">${hint}</span>` : ''}
    `

    this.#input = this.shadow.querySelector('input')
    this.#input?.addEventListener('change', this.#onChange)
  }
}

customElements.define('que-switch', QueSwitch)
