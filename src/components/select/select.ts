import { BaseElement } from '../../base/BaseElement'
import { selectCSS } from './select.styles'
import { esc } from '../../utils/html'

type SelectIntent = 'danger' | 'success' | 'warning'

interface SelectOption {
  value: string
  label: string
  disabled: boolean
}

const CHEVRON = `<svg class="que-select__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`

export class QueSelect extends BaseElement {
  static observedAttributes = [
    'label', 'placeholder', 'value', 'hint', 'error',
    'disabled', 'required', 'intent',
  ]

  #open = false
  #focusedIndex = -1
  #value = ''
  #trigger: HTMLButtonElement | null = null
  #observer: MutationObserver | null = null

  get value(): string { return this.#value }
  set value(v: string) {
    this.#value = v
    this.#updateDisplay()
  }

  connectedCallback(): void {
    this.#value = this.attr('value') ?? ''
    super.connectedCallback()
    this.#observer = new MutationObserver(() => { if (!this.#open) this.render() })
    this.#observer.observe(this, { childList: true, subtree: true, characterData: true })
  }

  disconnectedCallback(): void {
    this.#observer?.disconnect()
    document.removeEventListener('click', this.#onDocClick)
    document.removeEventListener('keydown', this.#onDocKeydown)
  }

  #getOptions(): SelectOption[] {
    return [...this.querySelectorAll('que-option')].map(el => ({
      value: el.getAttribute('value') ?? '',
      label: el.textContent?.trim() ?? '',
      disabled: el.hasAttribute('disabled'),
    }))
  }

  #updateDisplay(): void {
    if (!this.#trigger) return
    const valueEl = this.querySelector<HTMLElement>('.que-select__value')
    if (!valueEl) return

    const match = this.#getOptions().find(o => o.value === this.#value)
    if (this.#value && match) {
      valueEl.textContent = match.label
      valueEl.classList.remove('que-select__value--placeholder')
      this.#trigger.classList.add('que-select--filled')
    } else {
      const ph = this.attr('placeholder')
      valueEl.textContent = ph ?? ''
      valueEl.classList.toggle('que-select__value--placeholder', !!ph)
      this.#trigger.classList.remove('que-select--filled')
    }
  }

  #openDropdown(): void {
    this.#open = true
    this.#trigger?.classList.add('que-select--open')
    this.#trigger?.setAttribute('aria-expanded', 'true')
    this.#focusedIndex = this.#getOptions().findIndex(o => o.value === this.#value)
    this.#updateFocus()
    document.addEventListener('click', this.#onDocClick)
    document.addEventListener('keydown', this.#onDocKeydown)
  }

  #closeDropdown(): void {
    this.#open = false
    this.#trigger?.classList.remove('que-select--open')
    this.#trigger?.setAttribute('aria-expanded', 'false')
    this.#focusedIndex = -1
    this.#clearFocus()
    document.removeEventListener('click', this.#onDocClick)
    document.removeEventListener('keydown', this.#onDocKeydown)
  }

  #select(option: SelectOption): void {
    if (option.disabled) return
    this.#value = option.value
    this.#closeDropdown()
    this.#updateDisplay()
    this.dispatchEvent(new CustomEvent('que-change', {
      detail: { value: option.value, label: option.label },
      bubbles: true, composed: true,
    }))
  }

  #updateFocus(): void {
    const items = this.querySelectorAll<HTMLElement>('.que-select__option')
    items.forEach((item, i) => {
      item.classList.toggle('que-select__option--focused', i === this.#focusedIndex)
    })
    if (this.#focusedIndex >= 0) {
      items[this.#focusedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }

  #clearFocus(): void {
    this.querySelectorAll('.que-select__option--focused').forEach(el => {
      el.classList.remove('que-select__option--focused')
    })
  }

  #onTriggerClick = (e: Event): void => {
    e.stopPropagation()
    if (this.boolAttr('disabled')) return
    this.#open ? this.#closeDropdown() : this.#openDropdown()
  }

  #onOptionClick = (e: Event): void => {
    e.stopPropagation()
    const el = (e.target as HTMLElement).closest<HTMLElement>('.que-select__option')
    if (!el) return
    const index = parseInt(el.dataset.index ?? '-1', 10)
    const options = this.#getOptions()
    if (options[index]) this.#select(options[index])
  }

  #onDocClick = (): void => {
    this.#closeDropdown()
  }

  #onDocKeydown = (e: KeyboardEvent): void => {
    const options = this.#getOptions()

    if (e.key === 'Escape' || e.key === 'Tab') {
      this.#closeDropdown()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      let next = this.#focusedIndex + 1
      while (next < options.length && options[next]!.disabled) next++
      if (next < options.length) { this.#focusedIndex = next; this.#updateFocus() }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      let prev = this.#focusedIndex - 1
      while (prev >= 0 && options[prev]!.disabled) prev--
      if (prev >= 0) { this.#focusedIndex = prev; this.#updateFocus() }
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[this.#focusedIndex]
      if (opt) this.#select(opt)
    }
  }

  protected render(): void {
    const label    = this.attr('label')
    const hint     = this.attr('hint')
    const error    = this.attr('error')
    const disabled = this.boolAttr('disabled')
    const required = this.boolAttr('required')
    const intent   = (this.attr('intent') as SelectIntent) ?? null
    const ph       = this.attr('placeholder')

    const resolvedIntent = error ? 'danger' : intent

    // Read option data and preserve elements before innerHTML overwrite
    this.#observer?.disconnect()
    const optionEls = [...this.querySelectorAll('que-option')]
    const options = this.#getOptions()

    const match = options.find(o => o.value === this.#value)
    const isFilled = Boolean(this.#value && match)
    const triggerId = this.attr('id') ?? this._uid

    const triggerClasses = [
      'que-select',
      resolvedIntent ? `que-select--intent-${resolvedIntent}` : '',
      isFilled       ? 'que-select--filled' : '',
      this.#open     ? 'que-select--open' : '',
    ].filter(Boolean).join(' ')

    const valueHTML = isFilled
      ? `<span class="que-select__value">${esc(match!.label)}</span>`
      : ph
        ? `<span class="que-select__value que-select__value--placeholder">${esc(ph)}</span>`
        : `<span class="que-select__value"></span>`

    const optionsHTML = options.map((o, i) => `
      <li
        class="que-select__option${o.value === this.#value ? ' que-select__option--selected' : ''}${o.disabled ? ' que-select__option--disabled' : ''}"
        role="option"
        aria-selected="${o.value === this.#value}"
        data-index="${i}"
      >${esc(o.label)}</li>
    `).join('')

    this.injectCSS(selectCSS)
    this.innerHTML = `
      <div class="que-select-field">
        <div class="que-select-wrap">
          <button
            class="${triggerClasses}"
            type="button"
            id="${esc(triggerId)}"
            aria-haspopup="listbox"
            aria-expanded="${this.#open}"
            ${disabled ? 'disabled' : ''}
          >${valueHTML}${CHEVRON}</button>
          ${label ? `<label class="que-select-label${required ? ' que-select-label--required' : ''}" for="${esc(triggerId)}">${esc(label)}</label>` : ''}
          <div class="que-select__dropdown" role="listbox">
            <ul class="que-select__list">${optionsHTML}</ul>
          </div>
        </div>
        ${error ? `<span class="que-input-error">${esc(error)}</span>` : ''}
        ${hint && !error ? `<span class="que-input-hint">${esc(hint)}</span>` : ''}
      </div>
    `

    // Re-append hidden que-option elements so #getOptions() keeps working
    optionEls.forEach(el => this.appendChild(el))

    this.#trigger = this.querySelector('.que-select')
    this.#trigger?.addEventListener('click', this.#onTriggerClick)
    this.querySelector('.que-select__list')?.addEventListener('click', this.#onOptionClick)

    this.#observer?.observe(this, { childList: true, subtree: true, characterData: true })
  }
}

customElements.define('que-select', QueSelect)
