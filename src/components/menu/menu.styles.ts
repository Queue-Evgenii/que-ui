export const menuCSS = `
/* ── QUE-MENU ────────────────────────────────────────────── */

.que-menu {
  position: relative;
  display: inline-block;
}

/* ── DROPDOWN PANEL ──────────────────────────────────────── */

.que-menu__panel {
  position: absolute;
  z-index: var(--que-z-dropdown);
  min-width: 180px;
  padding: var(--que-space-1);
  background: var(--que-color-surface-raised);
  border: 1px solid var(--que-color-border);
  border-radius: var(--que-radius-lg);
  box-shadow: var(--que-shadow-md);
  box-sizing: border-box;
  outline: none;

  /* animation */
  opacity: 0;
  transform: scale(0.96) translateY(-4px);
  transform-origin: top left;
  transition:
    opacity var(--que-duration-fast) var(--que-ease-out),
    transform var(--que-duration-fast) var(--que-ease-out),
    visibility 0s var(--que-duration-fast);
  visibility: hidden;
  pointer-events: none;
}

.que-menu__panel--open {
  opacity: 1;
  transform: scale(1) translateY(0);
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity var(--que-duration-fast) var(--que-ease-out),
    transform var(--que-duration-fast) var(--que-ease-out);
}

/* Placement */
.que-menu__panel--bottom-start { top: calc(100% + 6px); left: 0; }
.que-menu__panel--bottom-end   { top: calc(100% + 6px); right: 0; transform-origin: top right; }
.que-menu__panel--top-start    { bottom: calc(100% + 6px); left: 0; transform-origin: bottom left; }
.que-menu__panel--top-end      { bottom: calc(100% + 6px); right: 0; transform-origin: bottom right; }

.que-menu__panel--top-start.que-menu__panel--open,
.que-menu__panel--top-end.que-menu__panel--open {
  transform: scale(1) translateY(0);
}

/* ── MENU ITEM ───────────────────────────────────────────── */

.que-menu-item {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
  width: 100%;
  padding: var(--que-space-2) var(--que-space-3);
  border-radius: var(--que-radius-md);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-normal);
  color: var(--que-color-text);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  white-space: nowrap;
  transition: background var(--que-duration-fast);
  line-height: var(--que-line-height-tight);
  outline: none;
}

.que-menu-item:hover,
.que-menu-item--focused {
  background: var(--que-color-interactive-hover);
}

.que-menu-item:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: -2px;
}

.que-menu-item--intent-danger {
  color: var(--que-color-danger);
}

.que-menu-item--intent-danger:hover,
.que-menu-item--intent-danger.que-menu-item--focused {
  background: var(--que-color-danger-subtle);
}

.que-menu-item--disabled {
  color: var(--que-color-text-disabled, var(--que-color-text-muted));
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

.que-menu-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--que-color-text-muted);
}

.que-menu-item--intent-danger .que-menu-item__icon {
  color: inherit;
}

.que-menu-item__label { flex: 1; }

.que-menu-item__shortcut {
  margin-left: auto;
  padding-left: var(--que-space-4);
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  font-family: var(--que-font-mono);
}

/* ── DIVIDER ─────────────────────────────────────────────── */

.que-menu-divider {
  display: block;
  height: 1px;
  background: var(--que-color-border);
  margin: var(--que-space-1) calc(-1 * var(--que-space-1));
}

/* ── GROUP LABEL ─────────────────────────────────────────── */

.que-menu-group {
  display: block;
  padding: var(--que-space-2) var(--que-space-3) var(--que-space-1);
  font-size: var(--que-font-size-xs);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
`
