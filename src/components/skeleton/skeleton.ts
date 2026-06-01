import { BaseElement } from '../../base/BaseElement'
import { skeletonCSS } from './skeleton.styles'

type SkeletonVariant = 'text' | 'rect' | 'circle'

export class QueSkeleton extends BaseElement {
  static observedAttributes = ['variant', 'width', 'height', 'radius']

  protected render(): void {
    const variant = (this.attr('variant') as SkeletonVariant) ?? 'text'
    const width   = this.attr('width')
    const height  = this.attr('height')
    const radius  = this.attr('radius')

    this.injectCSS(skeletonCSS)
    this.setAttribute('aria-hidden', 'true')
    this.className = this.cx('que-skeleton', { variant })

    if (width)  this.style.setProperty('--que-skeleton-width',  width)
    if (height) this.style.setProperty('--que-skeleton-height', height)
    if (radius) this.style.setProperty('--que-skeleton-radius', radius)
  }
}

customElements.define('que-skeleton', QueSkeleton)
