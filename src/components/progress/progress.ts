import { BaseElement } from '../../base/BaseElement'
import { progressCSS } from './progress.styles'
import type { Size, Intent } from '../../base/types'

type ProgressIntent = Extract<Intent, 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'>
type ProgressSize   = Size
type ProgressType   = 'linear' | 'circular'

export class QueProgress extends BaseElement {
  static observedAttributes = ['value', 'max', 'intent', 'size', 'type', 'indeterminate', 'label']

  protected render(): void {
    const type          = (this.attr('type') as ProgressType) ?? 'linear'
    const intent        = this.attr('intent') as ProgressIntent | null
    const size          = (this.attr('size') as ProgressSize) ?? 'md'
    const indeterminate = this.boolAttr('indeterminate')
    const max           = parseFloat(this.attr('max') ?? '100')
    const value         = parseFloat(this.attr('value') ?? '0')
    const label         = this.attr('label') ?? 'Loading'
    const pct           = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

    this.injectCSS(progressCSS)
    this.className = this.cx('que-progress', {
      size: size !== 'md' ? size : null,
      intent,
      flags: { circular: type === 'circular', indeterminate },
    })

    this.setAttribute('role', 'progressbar')
    this.setAttribute('aria-valuemin', '0')
    this.setAttribute('aria-valuemax', String(max))
    this.setAttribute('aria-label', label)
    if (indeterminate) {
      this.removeAttribute('aria-valuenow')
    } else {
      this.setAttribute('aria-valuenow', String(value))
    }

    if (type === 'circular') {
      const offset = indeterminate ? 75 : 100 - pct
      this.innerHTML = `
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle class="que-progress__track" cx="18" cy="18" r="15.9"/>
          <circle class="que-progress__fill"  cx="18" cy="18" r="15.9" style="stroke-dashoffset:${offset}"/>
        </svg>`
    } else {
      this.innerHTML = `<div class="que-progress__bar" style="width:${pct}%"></div>`
    }
  }
}

customElements.define('que-progress', QueProgress)
