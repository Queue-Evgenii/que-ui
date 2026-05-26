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
    this._slotHTML = this.innerHTML
    this._connected = true
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

  protected abstract render(): void
}
