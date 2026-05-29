import { BaseElement } from '../../base/BaseElement'
import { avatarCSS } from './avatar.styles'
import { esc, sanitizeUrl } from '../../utils/html'
import type { Size, Placement } from '../../base/types'

type AvatarSize   = Extract<Size, 'sm' | 'md' | 'lg' | 'xl'>
type AvatarShape  = 'circle' | 'square'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

function initials(name: string): string {
  return name.trim().split(/\s+/).map(w => w[0] ?? '').join('').slice(0, 2).toUpperCase()
}

function colorIndex(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return Math.abs(h) % 8
}

export class QueAvatar extends BaseElement {
  static observedAttributes = ['src', 'name', 'alt', 'size', 'shape', 'status']

  protected render(): void {
    const src    = this.attr('src')
    const name   = this.attr('name') ?? ''
    const alt    = this.attr('alt') ?? name
    const size   = (this.attr('size') as AvatarSize) ?? 'md'
    const shape  = (this.attr('shape') as AvatarShape) ?? 'circle'
    const status = this.attr('status') as AvatarStatus | null

    const colorCls = !src && name ? ` que-avatar--color-${colorIndex(name)}` : ''

    this.className = this.cx('que-avatar', {
      size:  size !== 'md' ? size : null,
      flags: { 'square': shape === 'square' },
    }) + colorCls + (status ? ` que-avatar--status-${status}` : '')

    this.injectCSS(avatarCSS)

    const inner = src
      ? `<img class="que-avatar__img" src="${sanitizeUrl(src)}" alt="${esc(alt)}" />`
      : name
        ? `<span class="que-avatar__initials" aria-label="${esc(alt)}">${esc(initials(name))}</span>`
        : `<span class="que-avatar__initials" aria-hidden="true">${this._slotHTML}</span>`

    this.innerHTML = inner + (status ? `<span class="que-avatar__status" aria-hidden="true"></span>` : '')
  }
}

customElements.define('que-avatar', QueAvatar)
