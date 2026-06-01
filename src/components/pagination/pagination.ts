import { BaseElement } from '../../base/BaseElement'
import { paginationCSS } from './pagination.styles'
import type { Size, Variant } from '../../base/types'

type PaginationVariant = Extract<Variant, 'solid' | 'outline' | 'ghost'>
type PaginationSize    = Extract<Size, 'sm' | 'md' | 'lg'>

const PREV_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 2-5 5 5 5"/></svg>`
const NEXT_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 2 5 5-5 5"/></svg>`

/** Returns the page numbers + ellipsis markers to render. */
function buildPages(current: number, total: number, siblings: number): (number | '…')[] {
  if (total <= 1) return [1]
  const delta = siblings + 1
  const left  = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  const pages: (number | '…')[] = [1]
  if (left > 2)        pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  if (total > 1)       pages.push(total)
  return pages
}

export class QuePagination extends BaseElement {
  static observedAttributes = ['page', 'total', 'page-size', 'siblings', 'variant', 'size', 'disabled']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick)
  }

  get page(): number    { return Math.max(1, parseInt(this.attr('page') ?? '1', 10)) }
  get totalPages(): number {
    const total    = parseInt(this.attr('total') ?? '1', 10)
    const pageSize = parseInt(this.attr('page-size') ?? '0', 10)
    return pageSize > 0 ? Math.ceil(total / pageSize) : Math.max(1, total)
  }

  #onClick = (e: MouseEvent): void => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.que-pagination__item')
    if (!btn || btn.hasAttribute('disabled') || btn.getAttribute('aria-current') === 'page') return
    const page = parseInt(btn.dataset['page'] ?? '', 10)
    if (isNaN(page)) return
    this.setAttribute('page', String(page))
    this.dispatchEvent(new CustomEvent('que-change', { detail: { page }, bubbles: true, composed: true }))
  }

  protected render(): void {
    const variant  = (this.attr('variant') as PaginationVariant) ?? 'solid'
    const size     = (this.attr('size') as PaginationSize) ?? 'md'
    const siblings = Math.max(0, parseInt(this.attr('siblings') ?? '1', 10))
    const current  = this.page
    const total    = this.totalPages
    const disabled = this.boolAttr('disabled')

    this.injectCSS(paginationCSS)
    this.setAttribute('role', 'navigation')
    this.setAttribute('aria-label', 'Pagination')
    this.className = this.cx('que-pagination', {
      variant: variant !== 'solid' ? variant : null,
      size:    size !== 'md' ? size : null,
      flags:   { disabled },
    })

    const pages = buildPages(current, total, siblings)

    const btn = (label: string, page: number, isCurrent = false) =>
      `<button class="que-pagination__item" data-page="${page}" aria-label="Page ${page}"${isCurrent ? ' aria-current="page"' : ''}>${label}</button>`

    const navBtn = (icon: string, page: number, label: string, dis: boolean) =>
      `<button class="que-pagination__item" data-page="${page}" aria-label="${label}"${dis ? ' disabled' : ''}>${icon}</button>`

    const items = pages.map(p =>
      p === '…'
        ? `<span class="que-pagination__item que-pagination__ellipsis" aria-hidden="true">…</span>`
        : btn(String(p), p, p === current)
    ).join('')

    this.innerHTML =
      navBtn(PREV_ICON, current - 1, 'Previous page', current <= 1 || disabled) +
      items +
      navBtn(NEXT_ICON, current + 1, 'Next page', current >= total || disabled)
  }
}

customElements.define('que-pagination', QuePagination)
