import { BaseElement } from '../../base/BaseElement'
import { contextMenuCSS } from './context-menu.styles'
import { menuCSS } from '../menu/menu.styles'

export class QueContextMenu extends BaseElement {
  static observedAttributes = []

  #panel: HTMLElement | null = null
  #open = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('contextmenu', this.#onContextMenu)
    document.addEventListener('click', this.#onDocClick)
    document.addEventListener('keydown', this.#onDocKeydown)
    document.addEventListener('contextmenu', this.#onDocContextMenu)
  }

  disconnectedCallback(): void {
    this.removeEventListener('contextmenu', this.#onContextMenu)
    document.removeEventListener('click', this.#onDocClick)
    document.removeEventListener('keydown', this.#onDocKeydown)
    document.removeEventListener('contextmenu', this.#onDocContextMenu)
    this.#panel?.remove()
    this.#panel = null
  }

  #onContextMenu = (e: MouseEvent): void => {
    e.preventDefault()
    this.#showAt(e.clientX, e.clientY)
  }

  // Close on any right-click outside
  #onDocContextMenu = (e: MouseEvent): void => {
    if (this.#open && !this.contains(e.target as Node)) this.#hide()
  }

  #onDocClick = (e: MouseEvent): void => {
    if (!this.#open) return
    const item = (e.target as Element).closest('que-menu-item:not([disabled])')
    if (item) {
      const value = item.getAttribute('value')
      if (value !== null) {
        this.dispatchEvent(new CustomEvent('que-select', { bubbles: true, detail: { value } }))
      }
    }
    this.#hide()
  }

  #onDocKeydown = (e: KeyboardEvent): void => {
    if (!this.#open) return
    const items = this.#items()
    if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault()
      this.#hide()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      this.#focusNext(items, 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      this.#focusNext(items, -1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const focused = this.#panel?.querySelector('.que-menu-item--focused') as HTMLElement | null
      focused?.click()
    }
  }

  #items(): HTMLElement[] {
    return Array.from(
      this.#panel?.querySelectorAll<HTMLElement>('que-menu-item:not([disabled])') ?? []
    )
  }

  #focusNext(items: HTMLElement[], dir: 1 | -1): void {
    const current = this.#panel?.querySelector('.que-menu-item--focused')
    const idx = current ? items.indexOf(current as HTMLElement) : -1
    const next = Math.max(0, Math.min(items.length - 1, idx + dir))
    items.forEach((el, i) => el.classList.toggle('que-menu-item--focused', i === next))
    items[next]?.scrollIntoView({ block: 'nearest' })
  }

  #showAt(x: number, y: number): void {
    if (!this.#panel) this.#createPanel()
    this.#open = true

    // Clamp to viewport
    const panel = this.#panel!
    panel.style.visibility = 'hidden'
    panel.style.left = `${x}px`
    panel.style.top  = `${y}px`
    panel.classList.add('que-context-menu__panel--open')
    panel.setAttribute('aria-hidden', 'false')

    requestAnimationFrame(() => {
      const rect = panel.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (rect.right  > vw) panel.style.left = `${x - rect.width}px`
      if (rect.bottom > vh) panel.style.top  = `${y - rect.height}px`
      panel.style.visibility = ''
      panel.focus()
    })
  }

  #hide(): void {
    this.#open = false
    this.#panel?.classList.remove('que-context-menu__panel--open')
    this.#panel?.setAttribute('aria-hidden', 'true')
  }

  #createPanel(): void {
    const itemEls = Array.from(
      this.querySelectorAll('que-menu-item, que-menu-divider, que-menu-group')
    )
    const itemsHTML = itemEls.map(el => el.outerHTML).join('')

    const panel = document.createElement('div')
    panel.className = 'que-context-menu__panel'
    panel.setAttribute('role', 'menu')
    panel.setAttribute('tabindex', '-1')
    panel.setAttribute('aria-hidden', 'true')
    panel.innerHTML = itemsHTML
    document.body.appendChild(panel)
    this.#panel = panel
  }

  protected render(): void {
    this.injectCSS(contextMenuCSS)
    this.injectCSS(menuCSS)
    this.className = 'que-context-menu'
  }
}

customElements.define('que-context-menu', QueContextMenu)
