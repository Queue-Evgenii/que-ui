import { BaseElement } from '../../base/BaseElement'
import { tabsCSS } from './tabs.styles'
import type { Size, Orientation } from '../../base/types'

type TabsVariant = 'line' | 'pills' | 'enclosed'
type TabsSize    = Extract<Size, 'sm' | 'md' | 'lg'>

// ── QueTabPanel ─────────────────────────────────────────────
export class QueTabPanel extends HTMLElement {
  connectedCallback(): void {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tabpanel')
    if (!this.hasAttribute('aria-hidden')) this.setAttribute('aria-hidden', 'true')
  }
}
customElements.define('que-tab-panel', QueTabPanel)

// ── QueTabs ─────────────────────────────────────────────────
export class QueTabs extends BaseElement {
  static observedAttributes = ['variant', 'size', 'orientation', 'value']

  #listEl:   HTMLElement | null = null
  #panelsEl: HTMLElement | null = null

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onClick)
    this.addEventListener('keydown', this.#onKeydown)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick)
    this.removeEventListener('keydown', this.#onKeydown)
  }

  /** Programmatically select a tab by its value */
  select(value: string): void {
    this.setAttribute('value', value)
  }

  #onClick = (e: MouseEvent): void => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('.que-tabs__tab')
    if (!tab || tab.hasAttribute('disabled')) return
    const value = tab.dataset['value'] ?? ''
    this.select(value)
    this.dispatchEvent(new CustomEvent('que-change', { detail: { value }, bubbles: true, composed: true }))
  }

  #onKeydown = (e: KeyboardEvent): void => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('.que-tabs__tab')
    if (!tab || !this.#listEl) return

    const tabs = Array.from(this.#listEl.querySelectorAll<HTMLElement>('.que-tabs__tab:not([disabled])'))
    const idx  = tabs.indexOf(tab)
    const vertical = this.attr('orientation') === 'vertical'

    let next = -1
    if (e.key === (vertical ? 'ArrowDown' : 'ArrowRight'))  next = (idx + 1) % tabs.length
    if (e.key === (vertical ? 'ArrowUp'   : 'ArrowLeft'))   next = (idx - 1 + tabs.length) % tabs.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End')  next = tabs.length - 1

    if (next >= 0) {
      e.preventDefault()
      tabs[next]!.focus()
      tabs[next]!.click()
    }
  }

  protected render(): void {
    const variant     = (this.attr('variant') as TabsVariant) ?? 'line'
    const size        = (this.attr('size') as TabsSize) ?? 'md'
    const orientation = (this.attr('orientation') as Orientation) ?? 'horizontal'
    const value       = this.attr('value')

    this.injectCSS(tabsCSS)
    this.className = this.cx('que-tabs', {
      variant,
      size:  size !== 'md' ? size : null,
      flags: { vertical: orientation === 'vertical' },
    })

    if (this.#listEl) {
      // Already initialised — just sync selected state
      this.#syncSelected(value)
      return
    }

    // ── One-time DOM setup ──────────────────────────────────
    // Collect <que-tab-panel> children before restructuring
    const panels = Array.from(this.querySelectorAll<HTMLElement>('que-tab-panel'))
    const tabs   = Array.from(this.querySelectorAll<HTMLElement>('que-tab'))

    // Build tab list
    const list = document.createElement('div')
    list.className  = 'que-tabs__list'
    list.setAttribute('role', 'tablist')
    list.setAttribute('aria-orientation', orientation)

    // Build panels wrapper
    const panelsWrap = document.createElement('div')
    panelsWrap.className = 'que-tabs__panels'

    // Use <que-tab> elements if present, otherwise derive from panels
    const tabDefs: { value: string; label: string; disabled: boolean }[] = tabs.length
      ? tabs.map(t => ({
          value:    t.dataset['value'] ?? t.getAttribute('value') ?? t.textContent?.trim() ?? '',
          label:    t.innerHTML,
          disabled: t.hasAttribute('disabled'),
        }))
      : panels.map((p, i) => ({
          value:    p.dataset['value'] ?? p.getAttribute('value') ?? String(i),
          label:    p.getAttribute('label') ?? `Tab ${i + 1}`,
          disabled: p.hasAttribute('disabled'),
        }))

    const activeValue = value ?? tabDefs.find(t => !t.disabled)?.value ?? ''

    tabDefs.forEach(({ value: v, label, disabled }) => {
      const btn = document.createElement('button')
      btn.className           = 'que-tabs__tab'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(v === activeValue))
      btn.setAttribute('tabindex', v === activeValue ? '0' : '-1')
      btn.dataset['value']    = v
      btn.innerHTML           = label
      if (disabled) btn.setAttribute('disabled', '')
      list.appendChild(btn)
    })

    panels.forEach((panel, i) => {
      const v = tabDefs[i]?.value ?? String(i)
      panel.setAttribute('aria-hidden', String(v !== activeValue))
      panelsWrap.appendChild(panel)
    })

    // Remove stray <que-tab> elements (they're now in the list)
    tabs.forEach(t => t.remove())

    this.#listEl   = list
    this.#panelsEl = panelsWrap

    this.innerHTML = ''
    this.appendChild(list)
    this.appendChild(panelsWrap)

    if (!this.hasAttribute('value')) this.setAttribute('value', activeValue)
  }

  #syncSelected(value: string | null): void {
    if (!this.#listEl || !this.#panelsEl) return
    const tabs   = this.#listEl.querySelectorAll<HTMLElement>('.que-tabs__tab')
    const panels = this.#panelsEl.querySelectorAll<HTMLElement>('que-tab-panel')

    tabs.forEach(tab => {
      const active = tab.dataset['value'] === value
      tab.setAttribute('aria-selected', String(active))
      tab.setAttribute('tabindex', active ? '0' : '-1')
    })
    panels.forEach(panel => {
      const v = panel.dataset['value'] ?? panel.getAttribute('value')
      panel.setAttribute('aria-hidden', String(v !== value))
    })
  }
}

customElements.define('que-tabs', QueTabs)
