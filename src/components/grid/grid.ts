import { BaseElement } from '../../base/BaseElement'
import { gridCSS } from './grid.styles'
import { resolveSpacing, isNamedSpacing } from '../../base/layout-utils'
import { toPx } from '../../utils/css'

type GridAlign   = 'start' | 'center' | 'end' | 'stretch'
type GridJustify = 'start' | 'center' | 'end' | 'stretch'

export class QueGrid extends BaseElement {
  static observedAttributes = [
    'cols', 'gap', 'gap-x', 'gap-y',
    'min-col-width', 'align', 'justify',
  ]

  protected render(): void {
    this.injectCSS(gridCSS)

    const cols        = this.attr('cols')        // null = default 1-col via CSS fallback
    const gap         = this.attr('gap')
    const gapX        = this.attr('gap-x')
    const gapY        = this.attr('gap-y')
    const minColWidth = this.attr('min-col-width')
    const align       = this.attr('align') as GridAlign | null
    const justify     = this.attr('justify') as GridJustify | null

    const isAuto = cols === 'auto-fill' || cols === 'auto-fit'
    const colNum = isAuto || !cols ? null : parseInt(cols, 10)

    // --que-grid-cols: only set for valid numeric cols (CSS fallback handles default)
    if (colNum) this.style.setProperty('--que-grid-cols', String(colNum))
    else        this.style.removeProperty('--que-grid-cols')

    if (minColWidth) this.style.setProperty('--que-grid-min-col-width', toPx(minColWidth))
    else             this.style.removeProperty('--que-grid-min-col-width')

    // Named gap → CSS class; custom → inline variable
    const setGapVar = (prop: string, val: string | null) => {
      const resolved = resolveSpacing(val)
      if (resolved) this.style.setProperty(prop, resolved)
      else          this.style.removeProperty(prop)
    }

    if (gap && !isNamedSpacing(gap)) setGapVar('--que-grid-gap', gap)
    else                              this.style.removeProperty('--que-grid-gap')

    setGapVar('--que-grid-gap-x', gapX)
    setGapVar('--que-grid-gap-y', gapY)

    this.className = this.cx('que-grid', {
      flags: {
        [`cols-${colNum}`]:      !!colNum,
        'auto-fill':             cols === 'auto-fill',
        'auto-fit':              cols === 'auto-fit',
        [`gap-${gap}`]:          isNamedSpacing(gap),
        [`align-${align}`]:      !!align,
        [`justify-${justify}`]:  !!justify,
      },
    })
  }
}

customElements.define('que-grid', QueGrid)
