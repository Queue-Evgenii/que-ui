import { BaseElement } from '../../base/BaseElement'
import { timelineCSS } from './timeline.styles'
import { esc } from '../../utils/html'

type TimelineStatus = 'done' | 'active' | 'pending' | 'error'

const ICON_CHECK  = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 7 4 4 6-6"/></svg>`
const ICON_X      = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12"/></svg>`
const ICON_CIRCLE = `<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="currentColor"/></svg>`

// ── QueTimeline ──────────────────────────────────────────────
export class QueTimeline extends BaseElement {
  static observedAttributes = []

  protected render(): void {
    this.injectCSS(timelineCSS)
    this.className = 'que-timeline'
    this.setAttribute('role', 'list')
  }
}
customElements.define('que-timeline', QueTimeline)

// ── QueTimelineItem ──────────────────────────────────────────
export class QueTimelineItem extends BaseElement {
  static observedAttributes = ['label', 'date', 'status']

  protected render(): void {
    const label  = this.attr('label') ?? ''
    const date   = this.attr('date')
    const status = (this.attr('status') as TimelineStatus) ?? 'pending'

    this.injectCSS(timelineCSS)
    this.setAttribute('role', 'listitem')
    this.className = this.cx('que-timeline-item', {
      flags: {
        done:   status === 'done',
        active: status === 'active',
        error:  status === 'error',
      },
    })

    const icon     = status === 'done' ? ICON_CHECK : status === 'error' ? ICON_X : status === 'active' ? ICON_CIRCLE : ''
    const dateHTML = date ? `<span class="que-timeline-item__date">${esc(date)}</span>` : ''

    this.innerHTML = `
      <div class="que-timeline-item__indicator">
        <div class="que-timeline-item__dot">${icon}</div>
        <div class="que-timeline-item__line" aria-hidden="true"></div>
      </div>
      <div class="que-timeline-item__body">
        <div class="que-timeline-item__header">
          <span class="que-timeline-item__label">${esc(label)}</span>
          ${dateHTML}
        </div>
        <div class="que-timeline-item__content">${this._slotHTML}</div>
      </div>
    `
  }
}
customElements.define('que-timeline-item', QueTimelineItem)
