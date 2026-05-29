import { BaseElement } from '../../base/BaseElement'
import { viewCSS } from './view.styles'
import { toPx } from '../../utils/css'

type ViewSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

const SIZE_MAP: Record<string, string> = {
  sm:    '640px',
  md:    '768px',
  lg:    '1024px',
  xl:    '1280px',
  '2xl': '1536px',
  full:  '100%',
}

export class QueView extends BaseElement {
  static observedAttributes = [
    'size', 'max-width', 'padding-x', 'padding-y',
    'pad-y', 'no-padding', 'full-height',
  ]

  protected render(): void {
    this.injectCSS(viewCSS)

    const size       = this.attr('size') as ViewSize | null
    const maxWidth   = this.attr('max-width')
    const paddingX   = this.attr('padding-x')
    const paddingY   = this.attr('padding-y')
    const padY       = this.boolAttr('pad-y')
    const noPadding  = this.boolAttr('no-padding')
    const fullHeight = this.boolAttr('full-height')

    const setVar = (prop: string, val: string | null) => {
      if (val) this.style.setProperty(prop, toPx(val))
      else     this.style.removeProperty(prop)
    }

    // max-width: explicit attribute wins over named size
    setVar('--que-view-max-width', maxWidth ?? (size && !SIZE_MAP[size] ? size : null))
    setVar('--que-view-padding-x', paddingX)
    setVar('--que-view-padding-y', paddingY)

    const namedSize = size && SIZE_MAP[size] ? size : null

    this.className = this.cx('que-view', {
      size: namedSize,
      flags: {
        'pad-y':       padY,
        'no-padding':  noPadding,
        'full-height': fullHeight,
      },
    })
  }
}

customElements.define('que-view', QueView)
