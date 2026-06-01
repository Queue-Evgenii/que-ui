import { BaseElement } from '../../base/BaseElement'
import { menuCSS } from './menu.styles'
import { esc } from '../../utils/html'
import type { Intent } from '../../base/types'

type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
type MenuItemIntent = Extract<Intent, 'danger'>

// ── QueMenuItem ──────────────────────────────────────────────
export class QueMenuItem extends BaseElement {
  static observedAttributes = ['value', 'intent', 'disabled', 'shortcut', 'href']

  protected render(): void {
    const intent   = this.attr('intent') as MenuItemIntent | null
    const disabled = this.boolAttr('disabled')
    const shortcut = this.attr('shortcut')
    const href     = this.attr('href')

    this.injectCSS(menuCSS)
    this.setAttribute('role', 'menuitem')
    this.setAttribute('tabindex', disabled ? '-1' : '-1') // focus managed by parent
    if (disabled) this.setAttribute('aria-disabled', 'true')
    else          this.removeAttribute('aria-disabled')

    this.className = this.cx('que-menu-item', {
      intent,
      flags: { disabled },
    })

    // Preserve inner icon slot if present
    const iconEl = this.querySelector('.que-menu-item__icon')
    const iconHTML = iconEl ? iconEl.outerHTML : ''

    const labelHTML = `<span class="que-menu-item__label">${this._slotHTML}</span>`
    const shortcutHTML = shortcut
      ? `<span class="que-menu-item__shortcut">${esc(shortcut)}</span>`
      : ''

    this.innerHTML = `${iconHTML}${labelHTML}${shortcutHTML}`

    if (href && !disabled) {
      this.style.cursor = 'pointer'
      this.onclick = () => { window.location.href = href }
    }
  }
}
customElements.define('que-menu-item', QueMenuItem)

// ── QueMenuDivider ───────────────────────────────────────────
export class QueMenuDivider extends HTMLElement {
  connectedCallback(): void {
    this.className = 'que-menu-divider'
    this.setAttribute('role', 'separator')
    this.setAttribute('aria-hidden', 'true')
  }
}
customElements.define('que-menu-divider', QueMenuDivider)

// ── QueMenuGroup ─────────────────────────────────────────────
export class QueMenuGroup extends HTMLElement {
  connectedCallback(): void {
    this.className = 'que-menu-group'
    this.setAttribute('role', 'group')
    const label = this.getAttribute('label') ?? this.textContent ?? ''
    if (this.getAttribute('label')) this.textContent = label
  }
}
customElements.define('que-menu-group', QueMenuGroup)

// ── QueMenu ──────────────────────────────────────────────────
export class QueMenu extends BaseElement {
  static observedAttributes = ['placement', 'open']

  #open        = false
  #focusedIdx  = -1
  #panel: HTMLElement | null = null

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('click', this.#onDocClick)
    document.addEventListener('keydown', this.#onDocKeydown)
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.#onDocClick)
    document.removeEventListener('keydown', this.#onDocKeydown)
  }

  show(): void { this.#setOpen(true) }
  hide(): void { this.#setOpen(false) }
  toggle(): void { this.#setOpen(!this.#open) }

  #setOpen(val: boolean): void {
    this.#open = val
    this.#focusedIdx = val ? 0 : -1
    this.#syncPanel()
    if (val) {
      requestAnimationFrame(() => {
        this.#updateFocus()
        this.#panel?.focus()
      })
    }
    this.dispatchEvent(new CustomEvent(val ? 'que-open' : 'que-close', { bubbles: true }))
  }

  #syncPanel(): void {
    if (!this.#panel) return
    if (this.#open) {
      this.#panel.classList.add('que-menu__panel--open')
    } else {
      this.#panel.classList.remove('que-menu__panel--open')
    }
  }

  #items(): QueMenuItem[] {
    return Array.from(this.#panel?.querySelectorAll<QueMenuItem>('que-menu-item:not([disabled])') ?? [])
  }

  #updateFocus(): void {
    const items = this.#items()
    items.forEach((item, i) => {
      item.classList.toggle('que-menu-item--focused', i === this.#focusedIdx)
    })
    items[this.#focusedIdx]?.scrollIntoView({ block: 'nearest' })
  }

  #onDocClick = (e: MouseEvent): void => {
    if (this.#open && !this.contains(e.target as Node)) this.hide()
  }

  #onDocKeydown = (e: KeyboardEvent): void => {
    if (!this.#open) return
    const items = this.#items()
    if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault()
      this.hide()
      this.querySelector<HTMLElement>('.que-menu__trigger > *')?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.#focusedIdx = Math.min(this.#focusedIdx + 1, items.length - 1)
      this.#updateFocus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.#focusedIdx = Math.max(this.#focusedIdx - 1, 0)
      this.#updateFocus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      items[this.#focusedIdx]?.click()
      this.hide()
    } else if (e.key === 'Home') {
      e.preventDefault()
      this.#focusedIdx = 0
      this.#updateFocus()
    } else if (e.key === 'End') {
      e.preventDefault()
      this.#focusedIdx = items.length - 1
      this.#updateFocus()
    }
  }

  protected render(): void {
    const placement = (this.attr('placement') as MenuPlacement) ?? 'bottom-start'

    // Detach trigger before wiping innerHTML so it survives as a live element
    const triggerEl = this.querySelector('[slot="trigger"]') as HTMLElement | null
    if (triggerEl) triggerEl.remove()

    const itemEls = Array.from(this.querySelectorAll<HTMLElement>(
      'que-menu-item, que-menu-divider, que-menu-group'
    ))
    const itemsHTML = itemEls.map(el => el.outerHTML).join('')

    this.injectCSS(menuCSS)
    this.className = 'que-menu'
    this.setAttribute('role', 'presentation')

    this.innerHTML = `
      <div class="que-menu__trigger"></div>
      <div class="que-menu__panel que-menu__panel--${esc(placement)}"
           role="menu" tabindex="-1" aria-hidden="${this.#open ? 'false' : 'true'}">
        ${itemsHTML}
      </div>
    `

    // Re-attach the live element — avoids re-parsing outerHTML which would create
    // a new element with _slotHTML = already-rendered HTML → nested <button> bug
    const triggerWrap = this.querySelector<HTMLElement>('.que-menu__trigger')!
    if (triggerEl) triggerWrap.appendChild(triggerEl)

    this.#panel = this.querySelector('.que-menu__panel')
    if (this.#open) this.#syncPanel()

    // Trigger click handler
    triggerWrap.addEventListener('click', (e) => {
      e.stopPropagation()
      this.toggle()
    })

    // Item click → close
    this.#panel?.addEventListener('click', (e) => {
      const item = (e.target as Element).closest('que-menu-item:not([disabled])')
      if (!item) return
      const value = item.getAttribute('value')
      if (value !== null) {
        this.dispatchEvent(new CustomEvent('que-select', { bubbles: true, detail: { value } }))
      }
      this.hide()
    })
  }
}
customElements.define('que-menu', QueMenu)
