import { BaseElement } from '../../base/BaseElement'
import { sliderCSS } from './slider.styles'
import { esc } from '../../utils/html'

import type { Intent } from '../../base/types'

type SliderIntent = Extract<Intent, 'danger' | 'success' | 'warning'>

export class QueSlider extends BaseElement {
  static observedAttributes = [
    'label', 'min', 'max', 'step', 'value', 'hint', 'error',
    'disabled', 'required', 'intent', 'show-value',
  ]

  #value = 0
  #input: HTMLInputElement | null = null

  get value(): number { return this.#value }
  set value(v: number) {
    this.#value = v
    this.#updateTrack()
  }

  connectedCallback(): void {
    this.#value = parseFloat(this.attr('value') ?? '0')
    super.connectedCallback()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'value' && newValue !== null) this.#value = parseFloat(newValue)
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  disconnectedCallback(): void {
    this.#input?.removeEventListener('input', this.#onInput)
    this.#input?.removeEventListener('change', this.#onChange)
  }

  #pct(): number {
    const min = parseFloat(this.attr('min') ?? '0')
    const max = parseFloat(this.attr('max') ?? '100')
    return Math.round(((this.#value - min) / (max - min)) * 100)
  }

  #updateTrack(): void {
    if (!this.#input) return
    this.#input.value = String(this.#value)
    this.#input.style.setProperty('--pct', `${this.#pct()}%`)
    const output = this.querySelector<HTMLOutputElement>('.que-slider-output')
    if (output) output.textContent = String(this.#value)
  }

  #onInput = (e: Event): void => {
    this.#value = parseFloat((e.target as HTMLInputElement).value)
    this.#updateTrack()
    this.dispatchEvent(new CustomEvent('que-input', {
      detail: { value: this.#value },
      bubbles: true, composed: true,
    }))
  }

  #onChange = (e: Event): void => {
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { value: parseFloat((e.target as HTMLInputElement).value) },
      bubbles: true, composed: true,
    }))
  }

  protected render(): void {
    const label     = this.attr('label')
    const hint      = this.attr('hint')
    const error     = this.attr('error')
    const disabled  = this.boolAttr('disabled')
    const required  = this.boolAttr('required')
    const intent    = (this.attr('intent') as SliderIntent) ?? null
    const showValue = this.boolAttr('show-value')
    const min       = this.attr('min') ?? '0'
    const max       = this.attr('max') ?? '100'
    const step      = this.attr('step') ?? '1'

    const resolvedIntent = error ? 'danger' : intent
    const pct = this.#pct()

    const inputClasses = this.cx('que-slider', { intent: resolvedIntent })

    this.injectCSS(sliderCSS)
    this.innerHTML = `
      <div class="que-slider-field">
        ${label || showValue ? `
          <div class="que-slider-header">
            ${label ? `<label class="que-slider-label${required ? ' que-slider-label--required' : ''}">${esc(label)}</label>` : ''}
            ${showValue ? `<output class="que-slider-output">${this.#value}</output>` : ''}
          </div>
        ` : ''}
        <input
          class="${inputClasses}"
          type="range"
          min="${min}" max="${max}" step="${step}"
          value="${this.#value}"
          style="--pct: ${pct}%"
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
        />
        ${error ? `<span class="que-input-error">${esc(error)}</span>` : ''}
        ${hint && !error ? `<span class="que-input-hint">${esc(hint)}</span>` : ''}
      </div>
    `

    this.#input = this.querySelector('input')
    this.#input?.addEventListener('input', this.#onInput)
    this.#input?.addEventListener('change', this.#onChange)
  }
}

customElements.define('que-slider', QueSlider)
