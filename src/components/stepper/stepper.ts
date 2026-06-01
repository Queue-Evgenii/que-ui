import { BaseElement } from '../../base/BaseElement'
import { stepperCSS } from './stepper.styles'
import { esc } from '../../utils/html'
import type { Orientation } from '../../base/types'

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error'

const CHECK_ICON = `<svg class="que-step__check" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 7 4 4 6-6"/></svg>`
const ERROR_ICON = `<svg class="que-step__check" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12"/></svg>`

// ── QueStep ─────────────────────────────────────────────────
export class QueStep extends HTMLElement {}
customElements.define('que-step', QueStep)

// ── QueStepper ──────────────────────────────────────────────
export class QueStepper extends BaseElement {
  static observedAttributes = ['step', 'orientation']

  protected render(): void {
    const currentStep = Math.max(1, parseInt(this.attr('step') ?? '1', 10))
    const orientation = (this.attr('orientation') as Orientation) ?? 'horizontal'

    this.injectCSS(stepperCSS)
    this.className = this.cx('que-stepper', {
      flags: { vertical: orientation === 'vertical' },
    })
    this.setAttribute('role', 'list')

    const stepEls = Array.from(this.querySelectorAll<HTMLElement>('que-step'))
    if (!stepEls.length) return

    const items = stepEls.map((el, i) => {
      const num   = i + 1
      const label = el.getAttribute('label') ?? `Step ${num}`
      const desc  = el.getAttribute('description') ?? ''

      // Derive status: explicit attr > auto from step index
      const explicitStatus = el.getAttribute('status') as StepStatus | null
      const status: StepStatus = explicitStatus ?? (
        num < currentStep ? 'complete' :
        num === currentStep ? 'current' : 'upcoming'
      )

      const iconInner = status === 'complete' ? CHECK_ICON
        : status === 'error' ? ERROR_ICON
        : String(num)

      const descHTML = desc
        ? `<div class="que-step__description">${esc(desc)}</div>`
        : ''

      const content = el.innerHTML.trim()
      const panelHTML = content
        ? `<div class="que-step__panel">${content}</div>`
        : ''

      return `
        <li class="que-step que-step--${status}" role="listitem" aria-current="${status === 'current' ? 'step' : 'false'}">
          <div class="que-step__icon-col">
            <div class="que-step__icon" aria-hidden="true">${iconInner}</div>
            <div class="que-step__connector" aria-hidden="true"></div>
          </div>
          <div class="que-step__content">
            <div class="que-step__label">${esc(label)}</div>
            ${descHTML}
            ${panelHTML}
          </div>
        </li>`
    }).join('')

    this.innerHTML = `<ol class="que-stepper__list" style="display:contents;">${items}</ol>`
    // Flatten: move <li> items directly into stepper for correct flex layout
    const ol = this.querySelector('.que-stepper__list')!
    while (ol.firstChild) this.insertBefore(ol.firstChild, ol)
    ol.remove()
  }
}

customElements.define('que-stepper', QueStepper)
