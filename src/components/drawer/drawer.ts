import { BaseElement } from '../../base/BaseElement'
import { drawerCSS } from './drawer.styles'
import type { Size } from '../../base/types'

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'
type DrawerMode      = 'overlay' | 'push'
type DrawerSize      = Extract<Size, 'sm' | 'md' | 'lg' | 'xl'> | 'full' | (string & {})

const SIZE_MAP: Record<string, string> = {
  sm: '240px', md: '320px', lg: '400px', xl: '520px', full: '100%',
}

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
  'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',')

export class QueDrawer extends BaseElement {
  static observedAttributes = [
    'placement', 'mode', 'size', 'open',
    'no-backdrop', 'no-close-on-backdrop', 'no-close-on-esc',
  ]

  #open        = false
  #initialized = false
  #panel: HTMLElement | null    = null
  #backdrop: HTMLElement | null = null
  #prevFocus: HTMLElement | null = null

  get open(): boolean { return this.#open }

  show(): void {
    if (this.#open) return
    this.#open = true
    this.classList.add('que-drawer--open')
    this.#prevFocus = document.activeElement as HTMLElement | null
    requestAnimationFrame(() => this.#firstFocusable()?.focus())
    document.addEventListener('keydown', this.#onKeydown)
    this.dispatchEvent(new CustomEvent('que-open', { bubbles: true, composed: true }))
  }

  hide(): void {
    if (!this.#open) return
    this.#open = false
    this.classList.remove('que-drawer--open')
    document.removeEventListener('keydown', this.#onKeydown)
    this.#prevFocus?.focus()
    this.#prevFocus = null
    this.dispatchEvent(new CustomEvent('que-close', { bubbles: true, composed: true }))
  }

  toggle(): void { this.#open ? this.hide() : this.show() }

  connectedCallback(): void {
    super.connectedCallback()
    if (this.boolAttr('open')) this.show()
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.#onKeydown)
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'open') {
      const desired = newValue !== null
      if (desired !== this.#open) desired ? this.show() : this.hide()
      return
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  protected render(): void {
    const placement   = (this.attr('placement') as DrawerPlacement) ?? 'left'
    const mode        = (this.attr('mode') as DrawerMode) ?? 'overlay'
    const size        = (this.attr('size') as DrawerSize) ?? 'md'
    const noBackdrop  = this.boolAttr('no-backdrop') || mode === 'push'

    // Apply size CSS variable
    const sizeVal = SIZE_MAP[size] ?? size
    if (size !== 'md') {
      this.style.setProperty('--que-drawer-size', sizeVal)
    } else {
      this.style.removeProperty('--que-drawer-size')
    }

    this.className = this.cx('que-drawer', {
      placement: `placement-${placement}`,
      size:      size !== 'md' ? (SIZE_MAP[size] ? size : null) : null,
      flags: {
        open:         this.#open,
        push:         mode === 'push',
        'no-backdrop': noBackdrop,
      },
    })

    this.injectCSS(drawerCSS)

    if (this.#initialized) return

    // ── One-time DOM setup ─────────────────────────────────
    this.#initialized = true

    // Wrap existing children in panel
    const panel = document.createElement('div')
    panel.className = 'que-drawer__panel'
    panel.setAttribute('role', 'dialog')
    panel.setAttribute('aria-modal', 'true')
    while (this.firstChild) panel.appendChild(this.firstChild)
    this.appendChild(panel)
    this.#panel = panel

    // Backdrop
    const backdrop = document.createElement('div')
    backdrop.className = 'que-drawer__backdrop'
    backdrop.setAttribute('aria-hidden', 'true')
    this.prepend(backdrop)
    this.#backdrop = backdrop

    backdrop.addEventListener('click', () => {
      if (!this.boolAttr('no-close-on-backdrop')) this.hide()
    })
  }

  #firstFocusable(): HTMLElement | null {
    return this.#panel?.querySelector<HTMLElement>(FOCUSABLE) ?? null
  }

  #onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && !this.boolAttr('no-close-on-esc')) {
      this.hide()
      return
    }

    if (e.key === 'Tab' && this.#panel) {
      const focusable = Array.from(
        this.#panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(el => el.offsetParent !== null)

      if (!focusable.length) { e.preventDefault(); return }

      const first = focusable[0]!
      const last  = focusable[focusable.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}

customElements.define('que-drawer', QueDrawer)
