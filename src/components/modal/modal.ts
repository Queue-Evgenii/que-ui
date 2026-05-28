import { BaseElement } from '../../base/BaseElement'
import { modalCSS } from './modal.styles'
import { esc } from '../../utils/html'
import type { Size } from '../../base/types'

type ModalSize = Extract<Size, 'sm' | 'md' | 'lg' | 'xl'> | 'full'

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
  'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',')

const CLOSE_ICON = `<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
</svg>`

// ── Static z-index manager ──────────────────────────────────
class ZManager {
  static _top = 400
  static #scrollLocked = 0

  static next(): number { return ++this._top }
  static get top(): number { return this._top }

  static lockScroll(): void {
    if (++this.#scrollLocked === 1) document.body.style.overflow = 'hidden'
  }

  static unlockScroll(): void {
    if (--this.#scrollLocked <= 0) {
      this.#scrollLocked = 0
      document.body.style.overflow = ''
    }
  }
}

// ── QueModalBody / QueModalFooter ───────────────────────────
export class QueModalBody extends HTMLElement {}
customElements.define('que-modal-body', QueModalBody)

export class QueModalFooter extends HTMLElement {}
customElements.define('que-modal-footer', QueModalFooter)

// ── QueModal ────────────────────────────────────────────────
export class QueModal extends BaseElement {
  static observedAttributes = [
    'title', 'size', 'open', 'draggable',
    'no-backdrop', 'no-close-btn', 'persistent',
  ]

  #open        = false
  #initialized = false
  #panel: HTMLElement | null    = null
  #backdrop: HTMLElement | null = null
  #titleEl: HTMLElement | null  = null
  #prevFocus: HTMLElement | null = null
  #z = 0

  // drag state
  #dragging   = false
  #dragOffset = { x: 0, y: 0 }
  #pos: { x: number; y: number } | null = null

  // ── Public API ────────────────────────────────────────────

  get open(): boolean { return this.#open }

  show(): void {
    if (this.#open) return
    this.#open = true
    this.#z = ZManager.next()
    this.#applyZ()
    this.classList.add('que-modal--open')
    this.#prevFocus = document.activeElement as HTMLElement | null
    if (!this.boolAttr('no-backdrop')) ZManager.lockScroll()
    requestAnimationFrame(() => this.#firstFocusable()?.focus())
    document.addEventListener('keydown', this.#onKeydown)
    this.dispatchEvent(new CustomEvent('que-open', { bubbles: true, composed: true }))
  }

  hide(): void {
    if (!this.#open) return
    this.#open = false
    this.classList.remove('que-modal--open')
    if (!this.boolAttr('no-backdrop')) ZManager.unlockScroll()
    document.removeEventListener('keydown', this.#onKeydown)
    this.#prevFocus?.focus()
    this.#prevFocus = null
    this.dispatchEvent(new CustomEvent('que-close', { bubbles: true, composed: true }))
  }

  toggle(): void { this.#open ? this.hide() : this.show() }

  /** Re-center after dragging */
  resetPosition(): void {
    if (!this.#panel) return
    this.#pos = null
    this.#panel.style.removeProperty('left')
    this.#panel.style.removeProperty('top')
    this.#panel.style.removeProperty('transform')
  }

  // ── Lifecycle ─────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback()
    if (this.boolAttr('open')) this.show()
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.#onKeydown)
    document.removeEventListener('mousemove', this.#onDragMove)
    document.removeEventListener('mouseup', this.#onDragEnd)
    document.removeEventListener('touchmove', this.#onDragMove)
    document.removeEventListener('touchend', this.#onDragEnd)
    if (this.#open && !this.boolAttr('no-backdrop')) ZManager.unlockScroll()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'open') {
      const desired = newValue !== null
      if (desired !== this.#open) desired ? this.show() : this.hide()
      return
    }
    // Update title text without full re-render
    if (name === 'title' && this.#titleEl) {
      this.#titleEl.textContent = newValue ?? ''
      return
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  protected render(): void {
    const size       = (this.attr('size') as ModalSize) ?? 'md'
    const draggable  = this.boolAttr('draggable')
    const noBackdrop = this.boolAttr('no-backdrop')
    const persistent = this.boolAttr('persistent')

    this.className = this.cx('que-modal', {
      size: size !== 'md' ? size : null,
      flags: {
        open:         this.#open,
        draggable,
        persistent,
        'no-backdrop': noBackdrop,
        floating:     noBackdrop || draggable,
      },
    })

    this.injectCSS(modalCSS)

    if (this.#initialized) {
      // Update z-index in case it was changed
      if (this.#open) this.#applyZ()
      return
    }

    // ── One-time DOM setup ──────────────────────────────────
    this.#initialized = true

    // Panel wraps existing children
    const panel = document.createElement('div')
    panel.className = 'que-modal__panel'
    panel.setAttribute('role', 'dialog')
    panel.setAttribute('aria-modal', 'true')
    while (this.firstChild) panel.appendChild(this.firstChild)

    // Header (rendered when title attribute is set)
    const title = this.attr('title')
    if (title !== null) {
      const header = document.createElement('div')
      header.className = 'que-modal__header'

      const titleEl = document.createElement('span')
      titleEl.className = 'que-modal__title'
      titleEl.textContent = title
      this.#titleEl = titleEl

      header.appendChild(titleEl)

      if (!this.boolAttr('no-close-btn')) {
        const closeBtn = document.createElement('button')
        closeBtn.className = 'que-modal__close'
        closeBtn.setAttribute('aria-label', 'Close')
        closeBtn.innerHTML = CLOSE_ICON
        closeBtn.addEventListener('click', () => this.#tryClose())
        header.appendChild(closeBtn)
      }

      panel.prepend(header)

      if (draggable) {
        panel.querySelector<HTMLElement>('.que-modal__header')?.addEventListener(
          'mousedown', this.#onDragStart
        )
        panel.querySelector<HTMLElement>('.que-modal__header')?.addEventListener(
          'touchstart', this.#onDragStart, { passive: false }
        )
      }

      panel.setAttribute('aria-labelledby', `${this._uid}-title`)
      titleEl.id = `${this._uid}-title`
    }

    // Backdrop
    const backdrop = document.createElement('div')
    backdrop.className = 'que-modal__backdrop'
    backdrop.setAttribute('aria-hidden', 'true')
    backdrop.addEventListener('click', () => this.#tryClose())
    this.#backdrop = backdrop

    // Bring to front on panel click (for floating/overlapping mode)
    panel.addEventListener('mousedown', this.#onPanelMouseDown)

    this.#panel = panel
    this.appendChild(backdrop)
    this.appendChild(panel)
  }

  // ── Close logic ───────────────────────────────────────────

  #tryClose(): void {
    if (this.boolAttr('persistent')) {
      this.#shake()
      this.dispatchEvent(new CustomEvent('que-persist', { bubbles: true, composed: true }))
    } else {
      this.hide()
    }
  }

  #shake(): void {
    const panel = this.#panel
    if (!panel) return
    panel.classList.remove('que-modal__panel--shake')
    void panel.offsetWidth // force reflow to restart animation
    panel.classList.add('que-modal__panel--shake')
    panel.addEventListener('animationend', () => {
      panel.classList.remove('que-modal__panel--shake')
    }, { once: true })
  }

  // ── Z-index ───────────────────────────────────────────────

  #applyZ(): void {
    if (!this.#panel || !this.#backdrop) return
    this.#panel.style.zIndex    = String(this.#z)
    this.#backdrop.style.zIndex = String(this.#z - 1)
  }

  #onPanelMouseDown = (): void => {
    if (!this.#open) return
    if (this.#z < ZManager.top) {
      this.#z = ZManager.next()
      this.#applyZ()
    }
  }

  // ── Focus trap ────────────────────────────────────────────

  #firstFocusable(): HTMLElement | null {
    return this.#panel?.querySelector<HTMLElement>(FOCUSABLE) ?? null
  }

  #onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') { this.#tryClose(); return }

    if (e.key === 'Tab' && this.#panel) {
      const focusable = Array.from(
        this.#panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(el => el.offsetParent !== null)

      if (!focusable.length) { e.preventDefault(); return }

      const first = focusable[0]!
      const last  = focusable[focusable.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  }

  // ── Drag ─────────────────────────────────────────────────

  #onDragStart = (e: MouseEvent | TouchEvent): void => {
    if (!this.#open) return
    e.preventDefault()

    const touch = 'touches' in e ? e.touches[0]! : e
    const panel = this.#panel!

    // First drag: compute absolute position from current centered state
    if (!this.#pos) {
      const rect = panel.getBoundingClientRect()
      this.#pos = { x: rect.left, y: rect.top }
      panel.style.left      = `${rect.left}px`
      panel.style.top       = `${rect.top}px`
      panel.style.transform = 'none'
    }

    this.#dragOffset = {
      x: touch.clientX - this.#pos.x,
      y: touch.clientY - this.#pos.y,
    }
    this.#dragging = true

    document.addEventListener('mousemove', this.#onDragMove)
    document.addEventListener('mouseup',   this.#onDragEnd)
    document.addEventListener('touchmove', this.#onDragMove, { passive: false })
    document.addEventListener('touchend',  this.#onDragEnd)
  }

  #onDragMove = (e: MouseEvent | TouchEvent): void => {
    if (!this.#dragging || !this.#panel) return
    e.preventDefault()

    const touch  = 'touches' in e ? e.touches[0]! : e
    const panel  = this.#panel
    const margin = 8

    const x = Math.max(margin, Math.min(
      touch.clientX - this.#dragOffset.x,
      window.innerWidth - panel.offsetWidth - margin,
    ))
    const y = Math.max(margin, Math.min(
      touch.clientY - this.#dragOffset.y,
      window.innerHeight - panel.offsetHeight - margin,
    ))

    this.#pos = { x, y }
    panel.style.left = `${x}px`
    panel.style.top  = `${y}px`
  }

  #onDragEnd = (): void => {
    this.#dragging = false
    document.removeEventListener('mousemove', this.#onDragMove)
    document.removeEventListener('mouseup',   this.#onDragEnd)
    document.removeEventListener('touchmove', this.#onDragMove)
    document.removeEventListener('touchend',  this.#onDragEnd)
  }
}

customElements.define('que-modal', QueModal)
