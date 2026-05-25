import { BaseElement } from '../../base/BaseElement'
import { radioCSS } from './radio.styles'

export class QueRadio extends BaseElement {
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
    // inherit name from parent que-radio-group if not explicitly set
    if (!this.attr('name')) {
      const group = this.closest('que-radio-group')
      if (group) {
        const groupName = group.getAttribute('name')
        if (groupName) this.setAttribute('name', groupName)
      }
    }
  }

  disconnectedCallback(): void {
    this.#input?.removeEventListener('change', this.#onChange)
  }

  #onChange = (): void => {
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { checked: true, value: this.attr('value') ?? '' },
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
    const name          = this.attr('name') ?? ''
    const value         = this.attr('value') ?? ''

    const wrapperClasses = [
      'que-radio',
      labelPosition === 'left' ? 'que-radio--label-left' : '',
      disabled ? 'que-radio--disabled' : '',
    ].filter(Boolean).join(' ')

    const inputEl = `<input
        class="que-radio__input"
        type="radio"
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${this.attr('id') ? `id="${this.attr('id')}"` : ''}
      />`

    const controlEl = `<span class="que-radio__control"></span>`
    const labelEl = label ? `<span class="que-radio__label">${label}</span>` : ''

    const inner = labelPosition === 'left'
      ? `${inputEl}${labelEl}${controlEl}`
      : `${inputEl}${controlEl}${labelEl}`

    this.shadow.innerHTML = `
      <style>${radioCSS}</style>
      <label class="${wrapperClasses}">${inner}</label>
      ${hint ? `<span class="que-radio__hint">${hint}</span>` : ''}
    `

    this.#input = this.shadow.querySelector('input')
    this.#input?.addEventListener('change', this.#onChange)
  }
}

export class QueRadioGroup extends BaseElement {
  static observedAttributes = ['name', 'label', 'orientation', 'value']

  connectedCallback(): void {
    super.connectedCallback()
    // propagate name to child radios that don't have their own
    this.#propagateName()
  }

  #propagateName(): void {
    const name = this.attr('name')
    if (!name) return
    this.querySelectorAll('que-radio').forEach(radio => {
      if (!radio.getAttribute('name')) radio.setAttribute('name', name)
    })
  }

  protected render(): void {
    const label       = this.attr('label')
    const orientation = this.attr('orientation') ?? 'vertical'

    const classes = [
      'que-radio-group',
      orientation === 'horizontal' ? 'que-radio-group--horizontal' : '',
    ].filter(Boolean).join(' ')

    this.shadow.innerHTML = `
      <style>${radioCSS}</style>
      ${label ? `<div class="que-radio-group__label">${label}</div>` : ''}
      <div class="${classes}">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('que-radio', QueRadio)
customElements.define('que-radio-group', QueRadioGroup)
