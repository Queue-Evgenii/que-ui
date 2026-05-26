export const toastCSS = `
/* ── ANIMATIONS ──────────────────────────────────────────── */

@keyframes que-toast-in {
  from { opacity: 0; transform: translateY(-10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)     scale(1); }
}

@keyframes que-toast-out {
  from { opacity: 1; transform: scale(1); max-height: 200px; margin-bottom: 0; }
  to   { opacity: 0; transform: scale(0.9); max-height: 0;   margin-bottom: -8px; }
}

/* ── TOASTER CONTAINER ───────────────────────────────────── */

.que-toaster {
  position: fixed;
  z-index: var(--que-z-toast);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  pointer-events: none;
  box-sizing: border-box;
}

.que-toaster--top-right     { top: 0; right: 0; align-items: flex-end; }
.que-toaster--top-left      { top: 0; left: 0;  align-items: flex-start; }
.que-toaster--top-center    { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.que-toaster--bottom-right  { bottom: 0; right: 0;  align-items: flex-end;   flex-direction: column-reverse; }
.que-toaster--bottom-left   { bottom: 0; left: 0;   align-items: flex-start; flex-direction: column-reverse; }
.que-toaster--bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; flex-direction: column-reverse; }

/* ── TOAST ───────────────────────────────────────────────── */

.que-toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  min-width: 280px;
  max-width: 400px;
  border-radius: var(--que-radius-lg);
  border: 1px solid var(--que-color-border);
  background: var(--que-color-surface);
  box-shadow: var(--que-shadow-lg);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  line-height: var(--que-line-height-normal);
  color: var(--que-color-text);
  pointer-events: auto;
  box-sizing: border-box;
  animation: que-toast-in 0.2s var(--que-easing-out);
  overflow: hidden;
}

.que-toast--exiting {
  animation: que-toast-out 0.2s var(--que-easing-in) forwards;
  pointer-events: none;
}

.que-toast__icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 1px;
}

.que-toast__body {
  flex: 1;
  min-width: 0;
}

.que-toast__title {
  display: block;
  font-weight: var(--que-font-weight-semibold);
}

.que-toast__title + .que-toast__desc {
  margin-top: 2px;
}

.que-toast__desc {
  display: block;
  color: var(--que-color-text-muted);
}

.que-toast__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-top: -1px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--que-color-text-muted);
  border-radius: var(--que-radius-sm);
  padding: 0;
  font-size: 16px;
  line-height: 1;
  transition: color var(--que-duration-fast) var(--que-easing-out),
              background var(--que-duration-fast) var(--que-easing-out);
}
.que-toast__close:hover {
  color: var(--que-color-text);
  background: var(--que-color-bg-muted);
}

/* ── INTENTS ─────────────────────────────────────────────── */

.que-toast--intent-info    .que-toast__icon { color: var(--que-color-primary); }
.que-toast--intent-success .que-toast__icon { color: var(--que-color-success); }
.que-toast--intent-warning .que-toast__icon { color: var(--que-color-warning-hover); }
.que-toast--intent-danger  .que-toast__icon { color: var(--que-color-danger); }
`
