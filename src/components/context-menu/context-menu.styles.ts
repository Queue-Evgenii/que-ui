export const contextMenuCSS = `
/* ── QUE-CONTEXT-MENU ────────────────────────────────────── */

.que-context-menu {
  display: contents;
}

/* The floating panel is appended to <body> */
.que-context-menu__panel {
  position: fixed;
  z-index: var(--que-z-dropdown);
  min-width: 180px;
  padding: var(--que-space-1);
  background: var(--que-color-surface-raised);
  border: 1px solid var(--que-color-border);
  border-radius: var(--que-radius-lg);
  box-shadow: var(--que-shadow-md);
  box-sizing: border-box;
  outline: none;

  opacity: 0;
  transform: scale(0.96);
  transform-origin: top left;
  transition:
    opacity var(--que-duration-fast) var(--que-ease-out),
    transform var(--que-duration-fast) var(--que-ease-out),
    visibility 0s var(--que-duration-fast);
  visibility: hidden;
  pointer-events: none;
}

.que-context-menu__panel--open {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity var(--que-duration-fast) var(--que-ease-out),
    transform var(--que-duration-fast) var(--que-ease-out);
}
`
