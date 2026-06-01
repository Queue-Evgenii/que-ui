export const sidebarCSS = `
/* Customizable: --que-sidebar-width, --que-sidebar-collapsed-width,
                 --que-sidebar-bg, --que-sidebar-border */

/* ── QUE-SIDEBAR ─────────────────────────────────────────── */

.que-sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: var(--que-sidebar-width, 240px);
  min-height: 0;
  overflow: hidden;
  background: var(--que-sidebar-bg, var(--que-color-surface));
  border-right: 1px solid var(--que-sidebar-border, var(--que-color-border));
  box-sizing: border-box;
  transition: width var(--que-duration-normal) var(--que-ease-in-out);
}

.que-sidebar--right {
  border-right: none;
  border-left: 1px solid var(--que-sidebar-border, var(--que-color-border));
}

.que-sidebar--collapsed {
  width: var(--que-sidebar-collapsed-width, 56px);
}

/* ── QUE-SIDEBAR-HEADER ──────────────────────────────────── */

.que-sidebar__header {
  display: flex;
  align-items: center;
  gap: var(--que-space-3);
  padding: var(--que-space-4) var(--que-space-3);
  flex-shrink: 0;
  border-bottom: 1px solid var(--que-color-border);
  min-height: 56px;
  box-sizing: border-box;
  overflow: hidden;
}

/* ── QUE-SIDEBAR-SECTION ─────────────────────────────────── */

.que-sidebar__section {
  display: flex;
  flex-direction: column;
  gap: var(--que-space-1);
  padding: var(--que-space-3) var(--que-space-2);
}

.que-sidebar__section-label {
  display: flex;
  align-items: center;
  padding: var(--que-space-1) var(--que-space-2);
  font-size: var(--que-font-size-xs);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
}

/* ── QUE-SIDEBAR-ITEM ────────────────────────────────────── */

.que-sidebar__item {
  display: flex;
  align-items: center;
  gap: var(--que-space-3);
  padding: var(--que-space-2) var(--que-space-3);
  border-radius: var(--que-radius-md);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  transition: background var(--que-duration-fast), color var(--que-duration-fast);
  box-sizing: border-box;
}

.que-sidebar__item:hover {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-text);
}

.que-sidebar__item--active {
  background: var(--que-color-primary-subtle);
  color: var(--que-color-primary-text);
  font-weight: var(--que-font-weight-semibold);
}

.que-sidebar__item--active:hover {
  background: var(--que-color-primary-subtle);
}

.que-sidebar__item:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: -2px;
}

.que-sidebar__item--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.que-sidebar__item__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.que-sidebar__item__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── QUE-SIDEBAR-FOOTER ──────────────────────────────────── */

.que-sidebar__footer {
  display: flex;
  align-items: center;
  gap: var(--que-space-3);
  padding: var(--que-space-3) var(--que-space-3);
  flex-shrink: 0;
  margin-top: auto;
  border-top: 1px solid var(--que-color-border);
  min-height: 56px;
  box-sizing: border-box;
  overflow: hidden;
}
`
