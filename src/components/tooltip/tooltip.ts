import { BaseElement } from '../../base/BaseElement'
import { tooltipCSS } from './tooltip.styles'
import type { Size, Placement } from '../../base/types'

type TooltipPlacement = Placement

export class QueTooltip extends BaseElement {
  static observedAttributes = ['content', 'placement', 'delay', 'offset', 'disabled']

  #open      = false
  #timer: number | null = null
  #trigger: HTMLElement | null = null
  #panel: HTMLElement | null = null

  show(): void {
    if (this.#open || this.boolAttr('disabled')) return
    this.#open = true
    this.classList.add('que-tooltip--open')
    this.#trigger?.setAttribute('aria-describedby', this.#panel?.id ?? '')
  }

  hide(): void {
    if (!this.#open) return
    this.#open = false
    this.classList.remove('que-tooltip--open')
    this.#trigger?.removeAttribute('aria-describedby')
  }

  connectedCallback(): void {
    super.connectedCallback()
  }

  disconnectedCallback(): void {
    this.#detach()
    if (this.#timer) clearTimeout(this.#timer)
  }

  protected render(): void {
    const placement = (this.attr('placement') as TooltipPlacement) ?? 'top'
    const content   = this.attr('content') ?? ''
    const disabled  = this.boolAttr('disabled')
    const offset    = this.attr('offset')

    this.className = this.cx('que-tooltip', {
      placement: `placement-${placement}`,
      flags: { disabled, open: this.#open },
    })

    if (offset) this.style.setProperty('--que-tooltip-offset', /^\d/.test(offset) ? `${offset}px` : offset)
    else        this.style.removeProperty('--que-tooltip-offset')

    this.injectCSS(tooltipCSS)

    // Identify trigger (first non-panel child) and ensure panel exists
    this.#detach()
    const children = Array.from(this.children) as HTMLElement[]
    this.#panel   = children.find(el => el.classList.contains('que-tooltip__content')) ?? null
    this.#trigger = children.find(el => el !== this.#panel) ?? null

    // Create the panel from `content` attribute if not present in light DOM
    if (!this.#panel && content) {
      this.#panel = document.createElement('div')
      this.#panel.className = 'que-tooltip__content'
      this.appendChild(this.#panel)
    }
    if (this.#panel && content) this.#panel.textContent = content

    if (this.#panel) {
      const id = `que-tooltip-${this._uid}`
      this.#panel.id = id
      this.#panel.setAttribute('role', 'tooltip')
    }

    if (this.#trigger) {
      this.#trigger.setAttribute('aria-describedby', this.#open ? (this.#panel?.id ?? '') : '')
      this.#attach()
    }
  }

  #attach(): void {
    if (!this.#trigger) return
    this.#trigger.addEventListener('mouseenter', this.#onEnter)
    this.#trigger.addEventListener('mouseleave', this.#onLeave)
    this.#trigger.addEventListener('focus',      this.#onFocus)
    this.#trigger.addEventListener('blur',       this.#onBlur)
  }

  #detach(): void {
    if (!this.#trigger) return
    this.#trigger.removeEventListener('mouseenter', this.#onEnter)
    this.#trigger.removeEventListener('mouseleave', this.#onLeave)
    this.#trigger.removeEventListener('focus',      this.#onFocus)
    this.#trigger.removeEventListener('blur',       this.#onBlur)
  }

  #delay(): number {
    return parseInt(this.attr('delay') ?? '400', 10)
  }

  #onEnter = (): void => {
    if (this.#timer) { clearTimeout(this.#timer); this.#timer = null }
    const d = this.#delay()
    if (d > 0) {
      this.#timer = window.setTimeout(() => this.show(), d)
    } else {
      this.show()
    }
  }

  #onLeave = (): void => {
    if (this.#timer) { clearTimeout(this.#timer); this.#timer = null }
    this.hide()
  }

  #onFocus = (): void => {
    if (this.#timer) clearTimeout(this.#timer)
    this.show()
  }

  #onBlur = (): void => {
    if (this.#timer) { clearTimeout(this.#timer); this.#timer = null }
    this.hide()
  }
}

customElements.define('que-tooltip', QueTooltip)
