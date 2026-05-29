import { BaseElement } from '../../base/BaseElement'
import { popoverCSS } from './popover.styles'
import type { Placement } from '../../base/types'

type PopoverPlacement = Placement

type PopoverTrigger = 'click' | 'hover' | 'manual'

export class QuePopover extends BaseElement {
  static observedAttributes = ['placement', 'trigger', 'open', 'arrow', 'disabled', 'offset']

  #trigger: HTMLElement | null = null
  #content: HTMLElement | null = null
  #open = false
  #hoverTimer: number | null = null

  get open(): boolean {
    return this.#open
  }

  set open(v: boolean) {
    v ? this.show() : this.hide()
  }

  show(): void {
    if (this.#open || this.boolAttr('disabled')) return
    this.#open = true
    this.classList.add('que-popover--open')
    this.#trigger?.setAttribute('aria-expanded', 'true')
    document.addEventListener('click', this.#onDocClick, true)
    document.addEventListener('keydown', this.#onDocKeydown)
    this.dispatchEvent(new CustomEvent('que-open', { bubbles: true, composed: true }))
  }

  hide(): void {
    if (!this.#open) return
    this.#open = false
    this.classList.remove('que-popover--open')
    this.#trigger?.setAttribute('aria-expanded', 'false')
    document.removeEventListener('click', this.#onDocClick, true)
    document.removeEventListener('keydown', this.#onDocKeydown)
    this.dispatchEvent(new CustomEvent('que-close', { bubbles: true, composed: true }))
  }

  toggle(): void {
    this.#open ? this.hide() : this.show()
  }

  connectedCallback(): void {
    super.connectedCallback()
    if (this.boolAttr('open')) this.show()
  }

  disconnectedCallback(): void {
    this.#detachTriggerEvents()
    document.removeEventListener('click', this.#onDocClick, true)
    document.removeEventListener('keydown', this.#onDocKeydown)
    if (this.#hoverTimer) clearTimeout(this.#hoverTimer)
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'open') {
      // Controlled open attribute — sync without recursion
      const desired = newValue !== null
      if (desired !== this.#open) (desired ? this.show() : this.hide())
      return
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  protected render(): void {
    const placement = (this.attr('placement') as PopoverPlacement) ?? 'bottom'
    const trigger   = (this.attr('trigger') as PopoverTrigger) ?? 'click'
    const arrow     = this.boolAttr('arrow')
    const disabled  = this.boolAttr('disabled')
    const offset    = this.attr('offset')

    this.className = this.cx('que-popover', {
      placement: `placement-${placement}`,
      flags: { arrow, disabled, open: this.#open },
    })

    if (offset) this.style.setProperty('--que-popover-offset', /^\d/.test(offset) ? `${offset}px` : offset)
    else        this.style.removeProperty('--que-popover-offset')

    this.injectCSS(popoverCSS)

    // Identify trigger (first non-content child) and content (.que-popover__content)
    this.#detachTriggerEvents()
    const children = Array.from(this.children) as HTMLElement[]
    this.#content = children.find(el => el.classList.contains('que-popover__content')) ?? null
    this.#trigger = children.find(el => el !== this.#content) ?? null

    if (this.#trigger) {
      this.#trigger.setAttribute('aria-haspopup', 'dialog')
      this.#trigger.setAttribute('aria-expanded', String(this.#open))
      this.#attachTriggerEvents(trigger)
    }
  }

  #attachTriggerEvents(mode: PopoverTrigger): void {
    if (!this.#trigger || mode === 'manual') return
    if (mode === 'click') {
      this.#trigger.addEventListener('click', this.#onTriggerClick)
    } else if (mode === 'hover') {
      this.#trigger.addEventListener('mouseenter', this.#onHoverEnter)
      this.#trigger.addEventListener('mouseleave', this.#onHoverLeave)
      this.addEventListener('mouseenter', this.#onHoverEnter)
      this.addEventListener('mouseleave', this.#onHoverLeave)
      this.#trigger.addEventListener('focus', this.#onHoverEnter)
      this.#trigger.addEventListener('blur', this.#onHoverLeave)
    }
  }

  #detachTriggerEvents(): void {
    if (!this.#trigger) return
    this.#trigger.removeEventListener('click', this.#onTriggerClick)
    this.#trigger.removeEventListener('mouseenter', this.#onHoverEnter)
    this.#trigger.removeEventListener('mouseleave', this.#onHoverLeave)
    this.#trigger.removeEventListener('focus', this.#onHoverEnter)
    this.#trigger.removeEventListener('blur', this.#onHoverLeave)
    this.removeEventListener('mouseenter', this.#onHoverEnter)
    this.removeEventListener('mouseleave', this.#onHoverLeave)
  }

  #onTriggerClick = (e: Event): void => {
    e.stopPropagation()
    this.toggle()
  }

  #onHoverEnter = (): void => {
    if (this.#hoverTimer) { clearTimeout(this.#hoverTimer); this.#hoverTimer = null }
    this.show()
  }

  #onHoverLeave = (): void => {
    if (this.#hoverTimer) clearTimeout(this.#hoverTimer)
    this.#hoverTimer = window.setTimeout(() => this.hide(), 120)
  }

  #onDocClick = (e: Event): void => {
    if (this.contains(e.target as Node)) return
    this.hide()
  }

  #onDocKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.hide()
      ;(this.#trigger as HTMLElement | null)?.focus?.()
    }
  }
}

customElements.define('que-popover', QuePopover)
