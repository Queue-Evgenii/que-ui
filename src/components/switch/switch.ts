import { BaseElement } from '../../base/BaseElement'
import { switchCSS } from './switch.styles'
import { esc } from '../../utils/html'

export class QueSwitch extends BaseElement {
  static observedAttributes = [
    'label', 'direction', 'hint', 'error', 'intent',
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
    const label     = this.attr('label') ?? ''
    const direction = this.attr('direction')
    const hint      = this.attr('hint')
    const error     = this.attr('error')
    const intent    = this.attr('intent')
    const checked   = this.boolAttr('checked')
    const disabled  = this.boolAttr('disabled')
    const required  = this.boolAttr('required')

    const resolvedIntent = error ? 'danger' : intent

    const wrapperClasses = [
      'que-switch',
      direction === 'ltr' ? 'que-switch--ltr' : '',
      disabled ? 'que-switch--disabled' : '',
      resolvedIntent ? `que-switch--intent-${resolvedIntent}` : '',
    ].filter(Boolean).join(' ')

    const inputEl = `<input
        class="que-switch__input"
        type="checkbox"
        role="switch"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${this.attr('name') ? `name="${esc(this.attr('name')!)}"` : ''}
        ${this.attr('value') ? `value="${esc(this.attr('value')!)}"` : ''}
        ${this.attr('id') ? `id="${esc(this.attr('id')!)}"` : ''}
      />`

    const trackEl = `<span class="que-switch__track"><span class="que-switch__thumb"></span></span>`
    const labelEl = label ? `<span class="que-switch__label">${esc(label)}</span>` : ''

    const inner = `${inputEl}${trackEl}${labelEl}`

    this.injectCSS(switchCSS)
    this.innerHTML = `
      <label class="${wrapperClasses}">${inner}</label>
      ${error ? `<span class="que-switch__error">${esc(error)}</span>` : ''}
      ${hint && !error ? `<span class="que-switch__hint">${esc(hint)}</span>` : ''}
    `

    this.#input = this.querySelector('input')
    this.#input?.addEventListener('change', this.#onChange)
  }
}

customElements.define('que-switch', QueSwitch)
