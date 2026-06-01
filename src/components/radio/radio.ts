import { BaseElement } from '../../base/BaseElement'
import { radioCSS } from './radio.styles'
import { esc } from '../../utils/html'
import type { Orientation } from '../../base/types'

export class QueRadio extends BaseElement {
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

  connectedCallback(): void {
    super.connectedCallback()
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
    const label     = this.attr('label') ?? ''
    const direction = this.attr('direction')
    const hint      = this.attr('hint')
    const error     = this.attr('error')
    const checked   = this.boolAttr('checked')
    const disabled  = this.boolAttr('disabled')
    const required  = this.boolAttr('required')
    const name      = this.attr('name') ?? ''
    const value     = this.attr('value') ?? ''
    const intent    = this.attr('intent')

    const resolvedIntent = error ? 'danger' : intent

    const wrapperClasses = this.cx('que-radio', {
      intent: resolvedIntent,
      flags: { ltr: direction === 'ltr', disabled },
    })

    const inputEl = `<input
        class="que-radio__input"
        type="radio"
        ${name ? `name="${esc(name)}"` : ''}
        ${value ? `value="${esc(value)}"` : ''}
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${this.attr('id') ? `id="${esc(this.attr('id')!)}"` : ''}
      />`

    const controlEl = `<span class="que-radio__control"></span>`
    const labelEl = label ? `<span class="que-radio__label">${esc(label)}</span>` : ''

    const inner = `${inputEl}${controlEl}${labelEl}`

    this.injectCSS(radioCSS)
    this.innerHTML = `
      <label class="${wrapperClasses}">${inner}</label>
      ${error ? `<span class="que-radio__error">${esc(error)}</span>` : ''}
      ${hint && !error ? `<span class="que-radio__hint">${esc(hint)}</span>` : ''}
    `

    this.#input = this.querySelector('input')
    this.#input?.addEventListener('change', this.#onChange)
  }
}

export class QueRadioGroup extends BaseElement {
  static observedAttributes = ['name', 'label', 'orientation', 'value', 'intent', 'error']

  connectedCallback(): void {
    super.connectedCallback()
    this.#propagateName()
    this.#propagateIntent()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue)
    if (name === 'intent' || name === 'error') this.#propagateIntent()
  }

  #propagateName(): void {
    const name = this.attr('name')
    if (!name) return
    this.querySelectorAll('que-radio').forEach(radio => {
      if (!radio.getAttribute('name')) radio.setAttribute('name', name)
    })
  }

  #propagateIntent(): void {
    const error  = this.attr('error')
    const intent = this.attr('intent')
    const resolved = error ? 'danger' : intent
    this.querySelectorAll('que-radio').forEach(radio => {
      if (resolved) radio.setAttribute('intent', resolved)
      else radio.removeAttribute('intent')
    })
  }

  protected render(): void {
    const label       = this.attr('label')
    const error       = this.attr('error')
    const orientation = (this.attr('orientation') as Orientation) ?? 'vertical'

    const groupClasses = this.cx('que-radio-group', {
      flags: { horizontal: orientation === 'horizontal' },
    })

    // Preserve que-radio children before overwriting innerHTML
    const radioChildren = [...this.children].filter(
      el => el.tagName === 'QUE-RADIO'
    )

    this.injectCSS(radioCSS)
    this.innerHTML = `
      ${label ? `<div class="que-radio-group__label">${esc(label)}</div>` : ''}
      <div class="${groupClasses}"></div>
      ${error ? `<div class="que-radio-group__error">${esc(error)}</div>` : ''}
    `

    const groupEl = this.querySelector(`.que-radio-group`)
    radioChildren.forEach(child => groupEl?.appendChild(child))
  }
}

customElements.define('que-radio', QueRadio)
customElements.define('que-radio-group', QueRadioGroup)
