import { BaseElement } from '../../base/BaseElement'
import { statCSS } from './stat.styles'
import { esc } from '../../utils/html'
import type { Size } from '../../base/types'

type StatTrend = 'up' | 'down' | 'neutral'
type StatSize  = Extract<Size, 'sm' | 'md' | 'lg'>

const ARROW_UP   = `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M6 2.5 10 7H2L6 2.5Z"/></svg>`
const ARROW_DOWN = `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M6 9.5 2 5h8L6 9.5Z"/></svg>`

export class QueStat extends BaseElement {
  static observedAttributes = ['label', 'value', 'delta', 'trend', 'size', 'horizontal']

  protected render(): void {
    const label      = this.attr('label') ?? ''
    const value      = this.attr('value') ?? ''
    const delta      = this.attr('delta')
    const trend      = (this.attr('trend') as StatTrend) ?? 'neutral'
    const size       = (this.attr('size') as StatSize) ?? 'md'
    const horizontal = this.boolAttr('horizontal')

    this.injectCSS(statCSS)
    this.className = this.cx('que-stat', {
      size:  size !== 'md' ? size : null,
      flags: {
        'trend-up':   trend === 'up',
        'trend-down': trend === 'down',
        horizontal,
      },
    })

    const icon = trend === 'up' ? ARROW_UP : trend === 'down' ? ARROW_DOWN : ''

    const deltaHTML = delta
      ? `<span class="que-stat__delta">
           ${icon ? `<span class="que-stat__delta-icon">${icon}</span>` : ''}
           <span>${esc(delta)}</span>
         </span>`
      : ''

    this.innerHTML = `
      ${label ? `<span class="que-stat__label">${esc(label)}</span>` : ''}
      <span class="que-stat__value">${esc(value)}</span>
      ${deltaHTML}
    `
  }
}

customElements.define('que-stat', QueStat)
