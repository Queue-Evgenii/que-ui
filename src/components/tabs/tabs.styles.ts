export const tabsCSS = `
/* Customizable: --que-tabs-gap, --que-tab-padding-x, --que-tab-padding-y,
                 --que-tab-radius, --que-tab-font-size */

/* ── TABS CONTAINER ──────────────────────────────────────── */

.que-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

.que-tabs--vertical {
  flex-direction: row;
}

/* ── TAB LIST ────────────────────────────────────────────── */

.que-tabs__list {
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.que-tabs--vertical .que-tabs__list {
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid var(--que-color-border);
  border-bottom: none;
}

/* ── LINE VARIANT (default) ──────────────────────────────── */

.que-tabs--line .que-tabs__list {
  border-bottom: 1px solid var(--que-color-border);
  gap: 2px;
}

.que-tabs--line .que-tabs__tab {
  position: relative;
  padding: var(--que-tab-padding-y, 10px) var(--que-tab-padding-x, 16px);
  font-size: var(--que-tab-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--que-duration-fast);
  border-radius: var(--que-radius-md) var(--que-radius-md) 0 0;
}
.que-tabs--line .que-tabs__tab:hover:not([aria-selected="true"]):not([disabled]) {
  color: var(--que-color-text);
  background: var(--que-color-interactive-hover);
}
.que-tabs--line .que-tabs__tab[aria-selected="true"] {
  color: var(--que-color-primary);
}
.que-tabs--line .que-tabs__tab[aria-selected="true"]::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--que-color-primary);
  border-radius: 2px 2px 0 0;
}
.que-tabs--line.que-tabs--vertical .que-tabs__tab[aria-selected="true"]::after {
  bottom: 0;
  top: 0;
  left: auto;
  right: -1px;
  width: 2px;
  height: auto;
  border-radius: 0 2px 2px 0;
}

/* ── PILLS VARIANT ───────────────────────────────────────── */

.que-tabs--pills .que-tabs__list {
  gap: 4px;
  padding: 4px;
  background: var(--que-color-bg-muted);
  border-radius: var(--que-tab-radius, var(--que-radius-lg));
  border-bottom: none;
}

.que-tabs--pills .que-tabs__tab {
  padding: var(--que-tab-padding-y, 7px) var(--que-tab-padding-x, 14px);
  font-size: var(--que-tab-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  background: transparent;
  border: none;
  border-radius: calc(var(--que-tab-radius, var(--que-radius-lg)) - 4px);
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--que-duration-fast), background var(--que-duration-fast), box-shadow var(--que-duration-fast);
}
.que-tabs--pills .que-tabs__tab:hover:not([aria-selected="true"]):not([disabled]) {
  color: var(--que-color-text);
}
.que-tabs--pills .que-tabs__tab[aria-selected="true"] {
  color: var(--que-color-text);
  background: var(--que-color-bg);
  box-shadow: var(--que-shadow-xs);
}

/* ── ENCLOSED VARIANT ────────────────────────────────────── */

.que-tabs--enclosed .que-tabs__list {
  gap: 0;
  border-bottom: 1px solid var(--que-color-border);
}

.que-tabs--enclosed .que-tabs__tab {
  padding: var(--que-tab-padding-y, 9px) var(--que-tab-padding-x, 16px);
  font-size: var(--que-tab-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-medium);
  color: var(--que-color-text-muted);
  background: var(--que-color-bg-subtle);
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: var(--que-radius-md) var(--que-radius-md) 0 0;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--que-duration-fast), background var(--que-duration-fast);
  margin-bottom: -1px;
}
.que-tabs--enclosed .que-tabs__tab:hover:not([aria-selected="true"]):not([disabled]) {
  color: var(--que-color-text);
  background: var(--que-color-bg);
}
.que-tabs--enclosed .que-tabs__tab[aria-selected="true"] {
  color: var(--que-color-text);
  background: var(--que-color-bg);
  border-color: var(--que-color-border);
}

/* ── SHARED TAB STATES ───────────────────────────────────── */

.que-tabs__tab:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: -2px;
}

.que-tabs__tab[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-tabs--sm .que-tabs__tab {
  --que-tab-padding-x: 10px;
  --que-tab-padding-y: 7px;
  --que-tab-font-size: var(--que-font-size-xs);
}
.que-tabs--lg .que-tabs__tab {
  --que-tab-padding-x: 20px;
  --que-tab-padding-y: 13px;
  --que-tab-font-size: var(--que-font-size-base);
}

/* ── TAB PANELS ──────────────────────────────────────────── */

.que-tabs__panels {
  flex: 1;
  min-width: 0;
}

.que-tabs--line    .que-tabs__panels,
.que-tabs--enclosed .que-tabs__panels { padding-top: 16px; }
.que-tabs--pills   .que-tabs__panels { padding-top: 16px; }
.que-tabs--vertical .que-tabs__panels { padding-top: 0; padding-left: 20px; }

que-tab-panel,
.que-tabs__panel {
  display: none;
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
}

que-tab-panel[aria-hidden="false"],
.que-tabs__panel--active {
  display: block;
}
`
