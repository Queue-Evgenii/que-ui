import { BaseElement } from '../../base/BaseElement'
import { toastCSS } from './toast.styles'
import { esc } from '../../utils/html'

type ToastIntent   = 'info' | 'success' | 'warning' | 'danger'
type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

const ICONS: Record<ToastIntent, string> = {
  info:    `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd"/></svg>`,
  success: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/></svg>`,
  danger:  `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd"/></svg>`,
}

/* ── QueToaster — the fixed container ───────────────────── */

export class QueToaster extends BaseElement {
  static observedAttributes = ['position']

  protected render(): void {
    const position = (this.attr('position') as ToastPosition) ?? 'top-right'
    this.injectCSS(toastCSS)
    this.className = `que-toaster que-toaster--${position}`
  }
}

customElements.define('que-toaster', QueToaster)

/* ── toast() utility ────────────────────────────────────── */

export interface ToastOptions {
  intent?:      ToastIntent
  title?:       string
  description?: string
  duration?:    number
}

function dismiss(el: HTMLElement): void {
  el.classList.add('que-toast--exiting')
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

export function toast(options: ToastOptions): void {
  const { intent = 'info', title, description, duration = 4000 } = options

  const toaster = document.querySelector<HTMLElement>('que-toaster') ?? (() => {
    const t = document.createElement('que-toaster') as HTMLElement
    document.body.appendChild(t)
    return t
  })()

  const el = document.createElement('div')
  el.className = ['que-toast', `que-toast--intent-${intent}`].join(' ')
  el.setAttribute('role', 'status')
  el.setAttribute('aria-live', 'polite')
  el.innerHTML = `
    <span class="que-toast__icon">${ICONS[intent]}</span>
    <span class="que-toast__body">
      ${title       ? `<strong class="que-toast__title">${esc(title)}</strong>` : ''}
      ${description ? `<span class="que-toast__desc">${esc(description)}</span>` : ''}
    </span>
    <button class="que-toast__close" aria-label="Dismiss">&#x2715;</button>
  `

  el.querySelector('.que-toast__close')!.addEventListener('click', () => dismiss(el))
  toaster.appendChild(el)

  if (duration > 0) setTimeout(() => dismiss(el), duration)
}

toast.info    = (title: string, opts?: Omit<ToastOptions, 'intent' | 'title'>) => toast({ ...opts, intent: 'info',    title })
toast.success = (title: string, opts?: Omit<ToastOptions, 'intent' | 'title'>) => toast({ ...opts, intent: 'success', title })
toast.warning = (title: string, opts?: Omit<ToastOptions, 'intent' | 'title'>) => toast({ ...opts, intent: 'warning', title })
toast.danger  = (title: string, opts?: Omit<ToastOptions, 'intent' | 'title'>) => toast({ ...opts, intent: 'danger',  title })
