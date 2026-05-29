export const modalCSS = `
/* Customizable: --que-modal-max-width, --que-modal-max-height,
                 --que-modal-bg, --que-modal-radius, --que-modal-padding,
                 --que-modal-offset (gap from viewport edge for positioned variants) */

/* ── SHAKE (persistent rejection) ───────────────────────── */

@keyframes que-modal-shake {
  0%, 100% { translate: 0 0; }
  15%       { translate: -7px 0; }
  30%       { translate:  7px 0; }
  45%       { translate: -5px 0; }
  60%       { translate:  5px 0; }
  75%       { translate: -3px 0; }
  90%       { translate:  2px 0; }
}

/* ── BACKDROP ────────────────────────────────────────────── */

.que-modal__backdrop {
  position: fixed;
  inset: 0;
  background: var(--que-color-overlay);
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms var(--que-easing-out);
}

.que-modal--open > .que-modal__backdrop {
  opacity: 1;
  pointer-events: auto;
}

/* no-backdrop modals never show it */
.que-modal--no-backdrop > .que-modal__backdrop {
  display: none;
}

/* ── PANEL ───────────────────────────────────────────────── */

.que-modal__panel {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: var(--que-z-modal, 400);
  width: calc(100% - 48px);
  max-width: var(--que-modal-max-width, 560px);
  max-height: var(--que-modal-max-height, calc(100vh - 48px));
  display: flex;
  flex-direction: column;
  background: var(--que-modal-bg, var(--que-color-surface-raised));
  border: 1px solid var(--que-color-border);
  border-radius: var(--que-modal-radius, var(--que-radius-2xl));
  box-shadow: var(--que-shadow-2xl);
  overflow: hidden;
  box-sizing: border-box;
  /* closed */
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.96);
  transition:
    opacity 220ms var(--que-easing-out),
    transform 220ms var(--que-easing-out);
}

.que-modal--open > .que-modal__panel {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

/* draggable: header becomes grab handle */
.que-modal--draggable .que-modal__header {
  cursor: grab;
  user-select: none;
}
.que-modal--draggable .que-modal__header:active {
  cursor: grabbing;
}

/* floating: allow clicking through when closed, bring-to-front cursor */
.que-modal--floating .que-modal__panel {
  cursor: default;
}

/* shake class added/removed via JS */
.que-modal__panel--shake {
  animation: que-modal-shake 360ms var(--que-easing-in-out);
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-modal--sm { --que-modal-max-width: 400px; }
.que-modal--lg { --que-modal-max-width: 720px; }
.que-modal--xl { --que-modal-max-width: 900px; }
.que-modal--full {
  --que-modal-max-width:  calc(100vw - 32px);
  --que-modal-max-height: calc(100vh - 32px);
}

/* ── POSITIONS ───────────────────────────────────────────── */

.que-modal--position-top > .que-modal__panel {
  top: var(--que-modal-offset, 24px);
  transform: translate(-50%, 0) scale(0.96);
}
.que-modal--position-top.que-modal--open > .que-modal__panel {
  transform: translate(-50%, 0) scale(1);
}

.que-modal--position-bottom > .que-modal__panel {
  top: auto;
  bottom: var(--que-modal-offset, 24px);
  transform: translate(-50%, 0) scale(0.96);
}
.que-modal--position-bottom.que-modal--open > .que-modal__panel {
  transform: translate(-50%, 0) scale(1);
}

.que-modal--position-top-start > .que-modal__panel {
  top: var(--que-modal-offset, 24px);
  left: var(--que-modal-offset, 24px);
  transform: scale(0.96);
}
.que-modal--position-top-start.que-modal--open > .que-modal__panel {
  transform: scale(1);
}

.que-modal--position-top-end > .que-modal__panel {
  top: var(--que-modal-offset, 24px);
  left: auto;
  right: var(--que-modal-offset, 24px);
  transform: scale(0.96);
}
.que-modal--position-top-end.que-modal--open > .que-modal__panel {
  transform: scale(1);
}

.que-modal--position-bottom-start > .que-modal__panel {
  top: auto;
  bottom: var(--que-modal-offset, 24px);
  left: var(--que-modal-offset, 24px);
  transform: scale(0.96);
}
.que-modal--position-bottom-start.que-modal--open > .que-modal__panel {
  transform: scale(1);
}

.que-modal--position-bottom-end > .que-modal__panel {
  top: auto;
  bottom: var(--que-modal-offset, 24px);
  left: auto;
  right: var(--que-modal-offset, 24px);
  transform: scale(0.96);
}
.que-modal--position-bottom-end.que-modal--open > .que-modal__panel {
  transform: scale(1);
}

/* ── HEADER ──────────────────────────────────────────────── */

.que-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: var(--que-modal-padding, 20px 24px);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--que-color-border);
  flex-shrink: 0;
}

.que-modal__title {
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-base);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text);
  line-height: var(--que-line-height-tight);
  flex: 1;
  min-width: 0;
}

.que-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--que-radius-md);
  background: transparent;
  color: var(--que-color-text-muted);
  cursor: pointer;
  padding: 0;
  transition: background var(--que-duration-fast), color var(--que-duration-fast);
}
.que-modal__close:hover {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-text);
}
.que-modal__close:active {
  background: var(--que-color-interactive-active);
}

/* ── BODY ────────────────────────────────────────────────── */

que-modal-body {
  display: block;
  padding: var(--que-modal-padding, 20px 24px);
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
}

/* CSS-only fallback class */
.que-modal__body {
  display: block;
  padding: var(--que-modal-padding, 20px 24px);
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
}

/* ── FOOTER ──────────────────────────────────────────────── */

que-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid var(--que-color-border);
  flex-shrink: 0;
  box-sizing: border-box;
}

.que-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid var(--que-color-border);
  flex-shrink: 0;
  box-sizing: border-box;
}
`
