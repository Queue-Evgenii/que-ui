import { BaseElement } from '../../base/BaseElement'
import { typographyCSS } from './typography.styles'
import { esc, sanitizeUrl } from '../../utils/html'
import type { Size, Intent } from '../../base/types'

// ── QueText ─────────────────────────────────────────────────
type TextSize   = Extract<Size, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
type TextColor  = 'default' | 'muted' | 'subtle'

export class QueText extends BaseElement {
  static observedAttributes = ['size', 'weight', 'color', 'truncate']

  protected render(): void {
    const size     = (this.attr('size') as TextSize) ?? 'sm'
    const weight   = (this.attr('weight') as TextWeight) ?? 'normal'
    const color    = (this.attr('color') as TextColor) ?? 'default'
    const truncate = this.boolAttr('truncate')

    this.injectCSS(typographyCSS)
    this.className = this.cx('que-text', {
      size:  size !== 'sm' ? size : null,
      flags: {
        medium:   weight === 'medium',
        semibold: weight === 'semibold',
        bold:     weight === 'bold',
        muted:    color === 'muted',
        subtle:   color === 'subtle',
        truncate,
      },
    })
  }
}
customElements.define('que-text', QueText)

// ── QueHeading ──────────────────────────────────────────────
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export class QueHeading extends BaseElement {
  static observedAttributes = ['level', 'truncate']

  protected render(): void {
    const level    = Math.min(6, Math.max(1, parseInt(this.attr('level') ?? '2', 10))) as HeadingLevel
    const truncate = this.boolAttr('truncate')

    this.injectCSS(typographyCSS)
    this.setAttribute('role', 'heading')
    this.setAttribute('aria-level', String(level))
    this.className = this.cx('que-heading', {
      flags: { [`${level}`]: true, truncate },
    })
  }
}
customElements.define('que-heading', QueHeading)

// ── QueCode ─────────────────────────────────────────────────
export class QueCode extends BaseElement {
  static observedAttributes = ['block']

  protected render(): void {
    const block = this.boolAttr('block')

    this.injectCSS(typographyCSS)
    this.className = this.cx('que-code', {
      flags: { block },
    })
  }
}
customElements.define('que-code', QueCode)

// ── QueLink ─────────────────────────────────────────────────
type LinkUnderline = 'hover' | 'always' | 'none'
type LinkIntent    = Extract<Intent, 'secondary' | 'success' | 'danger'> | 'muted'

export class QueLink extends BaseElement {
  static observedAttributes = ['href', 'target', 'external', 'underline', 'intent', 'disabled']

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.#onClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick)
  }

  #onClick = (e: Event): void => {
    if (this.boolAttr('disabled')) { e.preventDefault(); e.stopImmediatePropagation() }
  }

  protected render(): void {
    const href       = this.attr('href')
    const target     = this.attr('target')
    const external   = this.boolAttr('external')
    const underline  = (this.attr('underline') as LinkUnderline) ?? 'hover'
    const intent     = this.attr('intent') as LinkIntent | null
    const disabled   = this.boolAttr('disabled')

    this.injectCSS(typographyCSS)
    this.className = this.cx('que-link', {
      intent,
      flags: {
        'underline-always': underline === 'always',
        'underline-none':   underline === 'none',
        disabled,
      },
    })

    const attrs = [
      href     ? `href="${sanitizeUrl(href)}"` : '',
      target   ? `target="${esc(target)}"` : '',
      external ? 'rel="noopener noreferrer"' : '',
      external ? 'target="_blank"' : '',
      disabled ? 'aria-disabled="true" tabindex="-1"' : '',
    ].filter(Boolean).join(' ')

    this.innerHTML = `<a ${attrs}>${this._slotHTML}</a>`
  }
}
customElements.define('que-link', QueLink)
