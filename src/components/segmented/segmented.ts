import { BaseElement } from '../../base/BaseElement'
import { segmentedCSS } from './segmented.styles'
import { esc } from '../../utils/html'

export class QueSegmented extends BaseElement {
  static observedAttributes = ['name', 'value', 'disabled', 'shape']

  #name = ''

  get value(): string {
    return this.attr('value') ?? ''
  }

  set value(v: string) {
    this.setAttribute('value', v)
  }

  connectedCallback(): void {
    this.#name = this.attr('name') ?? this._uid
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
    const name     = this.#name
    const value    = this.attr('value') ?? ''
    const disabled = this.boolAttr('disabled')
    const shape    = this.attr('shape') ?? 'pill'

    const tmp = document.createElement('div')
    tmp.innerHTML = this._slotHTML
    const segmentEls = [...tmp.querySelectorAll('que-segment')]
    const segments = segmentEls.map(el => ({
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
            name="${esc(name)}"
            value="${esc(seg.value)}"
            ${checked ? 'checked' : ''}
            ${itemDis ? 'disabled' : ''}
          />
          <span class="que-segmented__label">${esc(seg.label)}</span>
        </label>`
    }).join('')

    this.injectCSS(segmentedCSS)
    this.className = this.cx('que-segmented', { shape })
    this.setAttribute('role', 'group')
    this.innerHTML = items

    this.querySelectorAll<HTMLInputElement>('input').forEach(input => {
      input.addEventListener('change', this.#onChange)
    })
  }
}

customElements.define('que-segmented', QueSegmented)
