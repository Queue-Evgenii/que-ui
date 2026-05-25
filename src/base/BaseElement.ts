export abstract class BaseElement extends HTMLElement {
  static observedAttributes: string[] = []

  protected shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    this.render()
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue) this.render()
  }

  protected attr(name: string): string | null {
    return this.getAttribute(name)
  }

  protected boolAttr(name: string): boolean {
    return this.hasAttribute(name)
  }

  protected abstract render(): void
}
