import { BaseElement } from '../../base/BaseElement'
import { stackCSS } from './stack.styles'
import { resolveSpacing, isNamedSpacing } from '../../base/layout-utils'

type StackDirection = 'row' | 'column'
type StackAlign     = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type StackJustify   = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export class QueStack extends BaseElement {
  static observedAttributes = ['direction', 'gap', 'align', 'justify', 'wrap', 'inline']

  protected render(): void {
    this.injectCSS(stackCSS)

    const direction = (this.attr('direction') as StackDirection) ?? 'column'
    const gap       = this.attr('gap')
    const align     = this.attr('align') as StackAlign | null
    const justify   = this.attr('justify') as StackJustify | null
    const wrap      = this.boolAttr('wrap')
    const inline    = this.boolAttr('inline')

    // Named token → CSS class; custom value → inline CSS variable
    if (gap && !isNamedSpacing(gap)) {
      this.style.setProperty('--que-stack-gap', resolveSpacing(gap)!)
    } else {
      this.style.removeProperty('--que-stack-gap')
    }

    this.className = this.cx('que-stack', {
      flags: {
        row:                     direction === 'row',
        inline,
        wrap,
        [`gap-${gap}`]:          isNamedSpacing(gap),
        [`align-${align}`]:      !!align,
        [`justify-${justify}`]:  !!justify,
      },
    })
  }
}

customElements.define('que-stack', QueStack)
