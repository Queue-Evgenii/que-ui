export abstract class BaseElement extends HTMLElement {
  static observedAttributes: string[] = []

  private static _injected = new Set<string>()
  private static _counter  = 0

  protected _slotHTML = ''
  protected readonly _uid: string
  private _connected = false

  constructor() {
    super()
    this._uid = `que-${++BaseElement._counter}`
  }

  protected injectCSS(css: string): void {
    const tag = this.tagName.toLowerCase()
    if (BaseElement._injected.has(tag)) return
    BaseElement._injected.add(tag)
    const style = document.createElement('style')
    // :host([attr]) → tag[attr], :host → tag
    style.textContent = css.replace(/:host(\(([^)]*)\))?/g, (_, _g1, inner) =>
      inner ? `${tag}${inner}` : tag
    )
    document.head.appendChild(style)
  }

  connectedCallback(): void {
    if (!this._connected) {
      this._slotHTML = this.innerHTML
      this._connected = true
    }
    this.render()
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue && this._connected) this.render()
  }

  protected attr(name: string): string | null {
    return this.getAttribute(name)
  }

  protected boolAttr(name: string): boolean {
    return this.hasAttribute(name)
  }

  /**
   * Compose a className from a base + modifiers.
   *
   *   cx('que-button', {
   *     size:    size !== 'md' ? size : null,   // → que-button--lg
   *     variant: variant !== 'solid' ? variant : null,
   *     intent,                                  // → que-button--intent-primary
   *     flags: { disabled, full },               // → que-button--disabled, --full
   *   })
   *
   * Skip rules:
   *  - `size`/`variant`: falsy → skipped (caller decides default via ternary)
   *  - `intent`: prefixed `--intent-<value>` (matches the codebase convention)
   *  - `flags`: only keys whose value is true are emitted as `base--<key>`
   *  - any extra string keys: `base--<value>`
   */
  protected cx(
    base: string,
    mods: {
      size?:    string | null
      variant?: string | null
      intent?:  string | null
      flags?:   Record<string, boolean | null | undefined>
      [key: string]: string | null | undefined | Record<string, boolean | null | undefined>
    } = {}
  ): string {
    const out = [base]
    const { size, variant, intent, flags, ...rest } = mods
    if (size)    out.push(`${base}--${size}`)
    if (variant) out.push(`${base}--${variant}`)
    if (intent)  out.push(`${base}--intent-${intent}`)
    if (flags) {
      for (const k in flags) if (flags[k]) out.push(`${base}--${k}`)
    }
    for (const k in rest) {
      const v = rest[k]
      if (typeof v === 'string' && v) out.push(`${base}--${v}`)
    }
    return out.join(' ')
  }

  protected abstract render(): void
}
