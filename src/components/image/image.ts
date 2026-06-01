import { BaseElement } from '../../base/BaseElement'
import { imageCSS } from './image.styles'

type ImageFit    = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

const SVG_ZOOM_IN     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`
const SVG_ZOOM_OUT    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`
const SVG_ROTATE_L    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`
const SVG_ROTATE_R    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`
const SVG_RESET       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.51 9a9 9 0 0 1 14.85-3.36L21 8M21 3v5h-5"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L3 16m0 5v-5h5"/></svg>`
const SVG_CLOSE       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`

export class QueImage extends BaseElement {
  static observedAttributes = ['src', 'alt', 'fit', 'radius', 'aspect', 'width', 'height', 'lazy', 'zoom']

  #errored = false

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'src' && oldValue !== newValue) this.#errored = false
    super.attributeChangedCallback(name, oldValue, newValue)
  }

  protected render(): void {
    const src    = this.attr('src')
    const alt    = this.attr('alt') ?? ''
    const fit    = (this.attr('fit') as ImageFit) ?? 'cover'
    const radius = (this.attr('radius') as ImageRadius) ?? 'none'
    const aspect = this.attr('aspect')
    const width  = this.attr('width')
    const height = this.attr('height')
    const lazy   = this.boolAttr('lazy')
    const zoom   = this.boolAttr('zoom')

    this.injectCSS(imageCSS)
    this.className = this.cx('que-image', { flags: { errored: this.#errored, zoom } })

    const r = radius === 'none' ? '0' : `var(--que-radius-${radius})`
    this.style.setProperty('--que-image-radius', r)
    this.style.setProperty('--que-image-fit', fit)
    if (aspect) this.style.setProperty('--que-image-aspect', aspect)
    if (width)  this.style.setProperty('--que-image-width',  /^\d+$/.test(width) ? `${width}px` : width)
    if (height) this.style.setProperty('--que-image-height', /^\d+$/.test(height) ? `${height}px` : height)

    if (!src || this.#errored) {
      this.innerHTML = `<div class="que-image__fallback">${this._slotHTML}</div>`
      return
    }

    const img = document.createElement('img')
    img.className = 'que-image__img'
    img.alt = alt
    img.src = src
    if (lazy) img.loading = 'lazy'
    img.onerror = () => { this.#errored = true; this.render() }
    if (zoom) img.addEventListener('click', () => this.#openLightbox(src, alt))

    this.innerHTML = ''
    this.appendChild(img)
  }

  #openLightbox(src: string, alt: string): void {
    let scale    = 1
    let rotation = 0

    /* ── overlay ── */
    const overlay = document.createElement('div')
    overlay.className = 'que-image-lightbox'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', alt || 'Image preview')

    /* ── image ── */
    const img = document.createElement('img')
    img.className = 'que-image-lightbox__img'
    img.src = src
    img.alt = alt
    img.draggable = false

    const applyTransform = () => {
      img.style.transform = `scale(${scale}) rotate(${rotation}deg)`
    }

    /* ── toolbar ── */
    const toolbar = document.createElement('div')
    toolbar.className = 'que-image-lightbox__toolbar'

    const btn = (svg: string, title: string, action: () => void) => {
      const b = document.createElement('button')
      b.className = 'que-image-lightbox__btn'
      b.type = 'button'
      b.title = title
      b.innerHTML = svg
      b.addEventListener('click', e => { e.stopPropagation(); action() })
      return b
    }

    toolbar.append(
      btn(SVG_ZOOM_IN,  'Zoom in',       () => { scale = Math.min(scale * 1.25, 10); applyTransform() }),
      btn(SVG_ZOOM_OUT, 'Zoom out',      () => { scale = Math.max(scale / 1.25, 0.1); applyTransform() }),
      btn(SVG_ROTATE_L, 'Rotate left',   () => { rotation -= 90; applyTransform() }),
      btn(SVG_ROTATE_R, 'Rotate right',  () => { rotation += 90; applyTransform() }),
      btn(SVG_RESET,    'Reset',         () => { scale = 1; rotation = 0; applyTransform() }),
      btn(SVG_CLOSE,    'Close',         close),
    )

    /* ── close ── */
    function close() {
      overlay.classList.remove('que-image-lightbox--visible')
      const tid = setTimeout(() => overlay.remove(), 250)
      overlay.addEventListener('transitionend', () => { clearTimeout(tid); overlay.remove() }, { once: true })
      document.removeEventListener('keydown', onKey)
      overlay.removeEventListener('wheel', onWheel)
    }

    /* ── keyboard ── */
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': close(); break
        case '+': case '=': scale = Math.min(scale * 1.25, 10); applyTransform(); break
        case '-': scale = Math.max(scale / 1.25, 0.1); applyTransform(); break
        case 'ArrowLeft':  rotation -= 90; applyTransform(); break
        case 'ArrowRight': rotation += 90; applyTransform(); break
        case '0': scale = 1; rotation = 0; applyTransform(); break
      }
    }

    /* ── wheel zoom ── */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.1 : 0.9
      scale = Math.min(Math.max(scale * factor, 0.1), 10)
      applyTransform()
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) close() })
    overlay.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKey)

    overlay.append(img, toolbar)
    document.body.appendChild(overlay)

    requestAnimationFrame(() => requestAnimationFrame(() =>
      overlay.classList.add('que-image-lightbox--visible')
    ))
  }
}

customElements.define('que-image', QueImage)
