export const imageCSS = `
/* Customizable: --que-image-width, --que-image-height, --que-image-aspect,
                 --que-image-fit, --que-image-radius */

.que-image {
  display: block;
  position: relative;
  overflow: hidden;
  width: var(--que-image-width, auto);
  height: var(--que-image-height, auto);
  aspect-ratio: var(--que-image-aspect, auto);
  border-radius: var(--que-image-radius, 0);
  background: var(--que-color-bg-muted);
  flex-shrink: 0;
}

.que-image__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: var(--que-image-fit, cover);
  object-position: center;
}

/* ── FALLBACK ────────────────────────────────────────────── */

.que-image__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: var(--que-color-text-muted);
  font-size: var(--que-font-size-sm);
}

.que-image--errored .que-image__fallback:empty::before {
  content: '';
  display: block;
  width: 32px;
  height: 32px;
  background: currentColor;
  opacity: 0.25;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-size: contain;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
}

/* ── ZOOM TRIGGER ────────────────────────────────────────── */

.que-image--zoom .que-image__img {
  cursor: zoom-in;
  transition: transform var(--que-duration-fast) var(--que-easing-out);
}

.que-image--zoom .que-image__img:hover {
  transform: scale(1.02);
}

/* ── LIGHTBOX OVERLAY ────────────────────────────────────── */

.que-image-lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--que-z-modal, 400);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  transition: background var(--que-duration-normal, 200ms) var(--que-easing-out, ease-out);
}

.que-image-lightbox--visible {
  background: rgba(0, 0, 0, 0.88);
}

/* ── LIGHTBOX IMAGE ──────────────────────────────────────── */

.que-image-lightbox__img {
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 120px);
  object-fit: contain;
  border-radius: var(--que-radius-sm, 4px);
  cursor: default;
  user-select: none;
  transform: scale(0.92);
  opacity: 0;
  transition:
    transform var(--que-duration-normal, 200ms) var(--que-easing-out, ease-out),
    opacity   var(--que-duration-normal, 200ms) var(--que-easing-out, ease-out);
  will-change: transform;
}

.que-image-lightbox--visible .que-image-lightbox__img {
  transform: scale(1);
  opacity: 1;
}

/* ── TOOLBAR ─────────────────────────────────────────────── */

.que-image-lightbox__toolbar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
  transition:
    opacity  var(--que-duration-normal, 200ms) var(--que-easing-out, ease-out),
    transform var(--que-duration-normal, 200ms) var(--que-easing-out, ease-out);
}

.que-image-lightbox--visible .que-image-lightbox__toolbar {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ── TOOLBAR BUTTON ──────────────────────────────────────── */

.que-image-lightbox__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition:
    background var(--que-duration-fast, 100ms) var(--que-easing-out, ease-out),
    color    var(--que-duration-fast, 100ms) var(--que-easing-out, ease-out);
}

.que-image-lightbox__btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.que-image-lightbox__btn:active {
  background: rgba(255, 255, 255, 0.25);
}

.que-image-lightbox__btn svg {
  display: block;
  width: 18px;
  height: 18px;
}

/* Separator before Close button */
.que-image-lightbox__btn:last-child {
  margin-left: 4px;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0 50% 50% 0;
  padding-left: 8px;
  width: 44px;
}
`
