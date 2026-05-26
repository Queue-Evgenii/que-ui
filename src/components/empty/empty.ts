import { BaseElement } from '../../base/BaseElement'
import { emptyCSS } from './empty.styles'
import { esc } from '../../utils/html'

type EmptySize = 'sm' | 'md' | 'lg'
type EmptyIcon = 'empty' | 'search' | 'files' | 'error' | 'none'

const ICONS: Record<Exclude<EmptyIcon, 'none'>, string> = {
  empty: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 36V16a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z"/>
    <path d="M8 26h8l4 4h8l4-4h8"/>
  </svg>`,
  search: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="22" cy="22" r="12"/>
    <path d="m32 32 8 8"/>
    <path d="M18 18h8M18 22h5"/>
  </svg>`,
  files: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28 8H14a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V18Z"/>
    <path d="M28 8v10h10"/>
    <path d="M18 26h12M18 31h8"/>
  </svg>`,
  error: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="24" r="16"/>
    <path d="M24 16v10M24 30v2"/>
  </svg>`,
}

export class QueEmpty extends BaseElement {
  static observedAttributes = ['title', 'description', 'icon', 'size']

  protected render(): void {
    const title       = this.attr('title')
    const description = this.attr('description')
    const icon        = (this.attr('icon') as EmptyIcon) ?? 'empty'
    const size        = (this.attr('size') as EmptySize) ?? 'md'

    this.injectCSS(emptyCSS)
    this.className = [
      'que-empty',
      size !== 'md' ? `que-empty--${size}` : '',
    ].filter(Boolean).join(' ')

    // Save action children before innerHTML wipes them
    const ownClasses = ['que-empty__icon', 'que-empty__title', 'que-empty__desc', 'que-empty__actions']
    const actionEls  = Array.from(this.children).filter(
      el => !ownClasses.some(c => el.classList.contains(c))
    )

    const iconHTML = icon !== 'none'
      ? `<span class="que-empty__icon">${ICONS[icon]}</span>`
      : ''

    this.innerHTML = `
      ${iconHTML}
      ${title       ? `<strong class="que-empty__title">${esc(title)}</strong>`  : ''}
      ${description ? `<span class="que-empty__desc">${esc(description)}</span>` : ''}
      ${actionEls.length ? '<div class="que-empty__actions"></div>'               : ''}
    `

    if (actionEls.length) {
      const div = this.querySelector('.que-empty__actions')!
      actionEls.forEach(el => div.appendChild(el))
    }
  }
}

customElements.define('que-empty', QueEmpty)
