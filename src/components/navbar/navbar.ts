import { BaseElement } from '../../base/BaseElement'
import { navbarCSS } from './navbar.styles'

type NavbarVariant = 'solid' | 'transparent' | 'blur'

// ── QueNavbar ────────────────────────────────────────────────
export class QueNavbar extends BaseElement {
  static observedAttributes = ['variant', 'sticky', 'fixed']

  protected render(): void {
    const variant = (this.attr('variant') as NavbarVariant) ?? 'solid'
    const sticky  = this.boolAttr('sticky')
    const fixed   = this.boolAttr('fixed')

    this.injectCSS(navbarCSS)
    this.setAttribute('role', 'banner')
    this.className = this.cx('que-navbar', {
      flags: {
        sticky,
        fixed,
        transparent: variant === 'transparent',
        blur:        variant === 'blur',
      },
    })
  }
}
customElements.define('que-navbar', QueNavbar)

// ── QueNavbarBrand ───────────────────────────────────────────
export class QueNavbarBrand extends BaseElement {
  static observedAttributes = ['href']

  protected render(): void {
    const href = this.attr('href')

    this.injectCSS(navbarCSS)
    this.className = 'que-navbar__brand'

    if (href) {
      this.setAttribute('role', 'link')
      this.setAttribute('tabindex', '0')
      this.style.cursor = 'pointer'
      this.onclick = () => { window.location.href = href }
    }
  }
}
customElements.define('que-navbar-brand', QueNavbarBrand)

// ── QueNavbarSection ─────────────────────────────────────────
type SectionAlign = 'start' | 'center' | 'end'

export class QueNavbarSection extends BaseElement {
  static observedAttributes = ['align']

  protected render(): void {
    const align = (this.attr('align') as SectionAlign) ?? 'start'

    this.injectCSS(navbarCSS)
    this.className = this.cx('que-navbar__section', {
      flags: {
        end:    align === 'end',
        center: align === 'center',
      },
    })
  }
}
customElements.define('que-navbar-section', QueNavbarSection)
