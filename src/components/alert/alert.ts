import { BaseElement } from '../../base/BaseElement'
import { alertCSS } from './alert.styles'
import type { Size, Intent, Variant } from '../../base/types'

type AlertIntent  = Extract<Intent, 'info' | 'success' | 'warning' | 'danger'>
type AlertVariant = Extract<Variant, 'subtle' | 'outline' | 'solid'>
type AlertSize    = Extract<Size, 'sm' | 'md' | 'lg'>

const ICONS: Record<AlertIntent, string> = {
  info: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd"/></svg>`,
  success: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/></svg>`,
  danger: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd"/></svg>`,
}

export class QueAlert extends BaseElement {
  static observedAttributes = ['intent', 'variant', 'size', 'title']

  protected render(): void {
    const intent  = (this.attr('intent') as AlertIntent)  ?? 'info'
    const variant = (this.attr('variant') as AlertVariant) ?? 'subtle'
    const size    = (this.attr('size') as AlertSize) ?? 'md'
    const title   = this.attr('title')

    this.injectCSS(alertCSS)
    this.className = this.cx('que-alert', {
      intent,
      variant: variant !== 'subtle' ? variant : null,
      size:    size !== 'md' ? size : null,
    })

    this.setAttribute('role', 'alert')

    const desc = this._slotHTML.trim()
    this.innerHTML = `
      <span class="que-alert__icon">${ICONS[intent]}</span>
      <span class="que-alert__body">
        ${title ? `<strong class="que-alert__title">${title}</strong>` : ''}
        ${desc  ? `<span class="que-alert__desc">${desc}</span>` : ''}
      </span>
    `
  }
}

customElements.define('que-alert', QueAlert)
