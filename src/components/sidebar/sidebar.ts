import { BaseElement } from '../../base/BaseElement'
import { sidebarCSS } from './sidebar.styles'
import { esc, sanitizeUrl } from '../../utils/html'

// ── QueSidebar ───────────────────────────────────────────────
export class QueSidebar extends BaseElement {
  static observedAttributes = ['collapsed', 'position', 'width']

  protected render(): void {
    const collapsed = this.boolAttr('collapsed')
    const position  = this.attr('position') ?? 'left'
    const width     = this.attr('width')

    this.injectCSS(sidebarCSS)
    this.className = this.cx('que-sidebar', {
      flags: { collapsed, right: position === 'right' },
    })

    if (width) this.style.setProperty('--que-sidebar-width', /^\d+$/.test(width) ? `${width}px` : width)
  }

  toggle(): void {
    if (this.boolAttr('collapsed')) {
      this.removeAttribute('collapsed')
    } else {
      this.setAttribute('collapsed', '')
    }
  }
}
customElements.define('que-sidebar', QueSidebar)

// ── QueSidebarHeader ─────────────────────────────────────────
export class QueSidebarHeader extends BaseElement {
  static observedAttributes = []

  protected render(): void {
    this.injectCSS(sidebarCSS)
    this.className = 'que-sidebar__header'
  }
}
customElements.define('que-sidebar-header', QueSidebarHeader)

// ── QueSidebarSection ────────────────────────────────────────
export class QueSidebarSection extends BaseElement {
  static observedAttributes = ['label']

  protected render(): void {
    const label = this.attr('label')

    this.injectCSS(sidebarCSS)
    this.className = 'que-sidebar__section'

    const existing = this.querySelector('.que-sidebar__section-label')
    if (label && !existing) {
      const el = document.createElement('div')
      el.className = 'que-sidebar__section-label'
      el.textContent = label
      this.insertBefore(el, this.firstChild)
    } else if (existing) {
      existing.textContent = label ?? ''
    }
  }
}
customElements.define('que-sidebar-section', QueSidebarSection)

// ── QueSidebarItem ───────────────────────────────────────────
export class QueSidebarItem extends BaseElement {
  static observedAttributes = ['href', 'active', 'disabled', 'label']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onClick)
    this.addEventListener('keydown', this.#onKeydown)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick)
    this.removeEventListener('keydown', this.#onKeydown)
  }

  #onClick = (e: Event): void => {
    if (this.boolAttr('disabled')) { e.preventDefault(); e.stopImmediatePropagation() }
    const href = this.attr('href')
    if (href && !this.boolAttr('disabled')) window.location.href = sanitizeUrl(href)
  }

  #onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.#onClick(e) }
  }

  protected render(): void {
    const active   = this.boolAttr('active')
    const disabled = this.boolAttr('disabled')
    const href     = this.attr('href')

    this.injectCSS(sidebarCSS)
    this.setAttribute('role', 'menuitem')
    this.setAttribute('tabindex', disabled ? '-1' : '0')
    if (href) this.setAttribute('aria-current', active ? 'page' : 'false')

    this.className = this.cx('que-sidebar__item', {
      flags: { active, disabled },
    })
  }
}
customElements.define('que-sidebar-item', QueSidebarItem)

// ── QueSidebarFooter ─────────────────────────────────────────
export class QueSidebarFooter extends BaseElement {
  static observedAttributes = []

  protected render(): void {
    this.injectCSS(sidebarCSS)
    this.className = 'que-sidebar__footer'
  }
}
customElements.define('que-sidebar-footer', QueSidebarFooter)
