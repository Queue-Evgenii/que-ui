import { BaseElement } from '../../base/BaseElement'
import { breadcrumbCSS } from './breadcrumb.styles'
import { esc, sanitizeUrl } from '../../utils/html'
import type { Size } from '../../base/types'

type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot'
type BreadcrumbSize      = Extract<Size, 'sm' | 'md' | 'lg'>

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  slash:   `/`,
  chevron: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4 2 4 4-4 4"/></svg>`,
  dot:     `·`,
}

function buildSep(value: string): string {
  const known = SEPARATORS[value as BreadcrumbSeparator]
  const inner = known ?? esc(value)
  return `<span class="que-breadcrumb__sep" aria-hidden="true">${inner}</span>`
}

// ── QueBreadcrumbItem ───────────────────────────────────────
export class QueBreadcrumbItem extends HTMLElement {}
customElements.define('que-breadcrumb-item', QueBreadcrumbItem)

// ── QueBreadcrumb ───────────────────────────────────────────
export class QueBreadcrumb extends BaseElement {
  static observedAttributes = ['separator', 'size']

  protected render(): void {
    const separator = (this.attr('separator') as BreadcrumbSeparator) ?? 'chevron'
    const size      = (this.attr('size') as BreadcrumbSize) ?? 'md'

    this.injectCSS(breadcrumbCSS)
    this.setAttribute('aria-label', 'Breadcrumb')
    this.className = this.cx('que-breadcrumb', {
      size: size !== 'md' ? size : null,
    })

    const sep = buildSep(separator ?? 'chevron')
    const items = Array.from(this.querySelectorAll<HTMLElement>('que-breadcrumb-item'))

    if (!items.length) return

    const html = items.map((item, i) => {
      const href     = item.getAttribute('href')
      const label    = item.textContent?.trim() ?? ''
      const isCurrent = i === items.length - 1
      const disabled  = item.hasAttribute('disabled')

      const inner = (!isCurrent && href && !disabled)
        ? `<a class="que-breadcrumb__link" href="${sanitizeUrl(href)}">${esc(label)}</a>`
        : `<span class="que-breadcrumb__${isCurrent ? 'current' : 'link'}">${esc(label)}</span>`

      const liAttrs = isCurrent ? ' aria-current="page"' : ''
      const sepHtml = i < items.length - 1 ? sep : ''

      return `<li class="que-breadcrumb__item"${liAttrs}>${inner}${sepHtml}</li>`
    }).join('')

    this.innerHTML = html
    this.setAttribute('role', 'list')
  }
}

customElements.define('que-breadcrumb', QueBreadcrumb)
