import { BaseElement } from '../../base/BaseElement'
import { tableCSS } from './table.styles'

type TableSize = 'sm' | 'md' | 'lg'

export class QueTable extends BaseElement {
  static observedAttributes = ['striped', 'hoverable', 'borderless', 'size']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onHeaderClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onHeaderClick)
  }

  #onHeaderClick = (e: Event): void => {
    const th = (e.target as Element).closest('th[data-sortable]') as HTMLElement | null
    if (!th) return

    const table = this.querySelector('table')
    if (!table) return

    const col = Array.from(th.parentElement!.children).indexOf(th)
    const current = th.getAttribute('aria-sort')
    const next = current === 'ascending' ? 'descending' : 'ascending'

    // Reset other headers
    table.querySelectorAll('th[data-sortable]').forEach(h => h.removeAttribute('aria-sort'))
    th.setAttribute('aria-sort', next)

    this.#sortTable(table, col, next === 'ascending')
  }

  #sortTable(table: HTMLTableElement, col: number, asc: boolean): void {
    const tbody = table.querySelector('tbody')
    if (!tbody) return
    const rows = Array.from(tbody.querySelectorAll('tr'))
    rows.sort((a, b) => {
      const aText = a.cells[col]?.textContent?.trim() ?? ''
      const bText = b.cells[col]?.textContent?.trim() ?? ''
      const aNum = parseFloat(aText)
      const bNum = parseFloat(bText)
      const cmp = !isNaN(aNum) && !isNaN(bNum)
        ? aNum - bNum
        : aText.localeCompare(bText)
      return asc ? cmp : -cmp
    })
    rows.forEach(r => tbody.appendChild(r))
  }

  protected render(): void {
    const size       = (this.attr('size') as TableSize) ?? 'md'
    const striped    = this.boolAttr('striped')
    const hoverable  = this.boolAttr('hoverable')
    const borderless = this.boolAttr('borderless')

    this.injectCSS(tableCSS)
    this.className = this.cx('que-table', {
      size: size !== 'md' ? size : null,
      flags: { striped, hoverable, borderless },
    })
  }
}

customElements.define('que-table', QueTable)
