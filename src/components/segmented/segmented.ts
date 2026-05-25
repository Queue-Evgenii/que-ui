import { BaseElement } from '../../base/BaseElement'
import { segmentedCSS } from './segmented.styles'

export class QueSegmented extends BaseElement {
  static observedAttributes = ['name', 'value', 'disabled', 'shape']

  get value(): string {
    return this.attr('value') ?? ''
  }

  set value(v: string) {
    this.setAttribute('value', v)
  }

  connectedCallback(): void {
    super.connectedCallback()
  }

  #onChange = (e: Event): void => {
    const input = e.target as HTMLInputElement
    this.setAttribute('value', input.value)
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { value: input.value },
      bubbles: true, composed: true,
    }))
  }

  protected render(): void {
    const name     = this.attr('name') ?? `segmented-${Math.random().toString(36).slice(2, 7)}`
    const value    = this.attr('value') ?? ''
    const disabled = this.boolAttr('disabled')
    const shape    = this.attr('shape') ?? 'pill'

    // Read options from light-DOM <que-segment> children
    const segments = [...this.querySelectorAll('que-segment')].map(el => ({
      value:    el.getAttribute('value') ?? '',
      label:    el.textContent?.trim() ?? '',
      disabled: el.hasAttribute('disabled'),
    }))

    const items = segments.map(seg => {
      const checked  = seg.value === value
      const itemDis  = disabled || seg.disabled
      return `
        <label class="que-segmented__item${itemDis ? ' que-segmented__item--disabled' : ''}">
          <input
            class="que-segmented__input"
            type="radio"
            name="${name}"
            value="${seg.value}"
            ${checked ? 'checked' : ''}
            ${itemDis ? 'disabled' : ''}
          />
          <span class="que-segmented__label">${seg.label}</span>
        </label>`
    }).join('')

    this.shadow.innerHTML = `
      <style>${segmentedCSS}</style>
      <div class="que-segmented que-segmented--${shape}" role="group">${items}</div>
    `

    this.shadow.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', this.#onChange)
    })
  }
}

customElements.define('que-segmented', QueSegmented)
