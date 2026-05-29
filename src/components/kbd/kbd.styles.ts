export const kbdCSS = `
/* Customizable: --que-kbd-padding-x, --que-kbd-padding-y, --que-kbd-font-size,
                 --que-kbd-bg, --que-kbd-color, --que-kbd-radius */

/* ── BASE ────────────────────────────────────────────────── */

.que-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--que-kbd-height, 22px);
  min-width: var(--que-kbd-height, 22px);
  padding: 0 var(--que-kbd-padding-x, 6px);
  border-radius: var(--que-kbd-radius, var(--que-radius-sm));
  border: 1px solid var(--que-kbd-border, var(--que-color-border-strong));
  border-bottom-width: 2px;
  background: var(--que-kbd-bg, var(--que-color-bg));
  color: var(--que-kbd-color, var(--que-color-text));
  font-family: var(--que-font-mono);
  font-size: var(--que-kbd-font-size, var(--que-font-size-xs));
  font-weight: var(--que-font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 1px 0 var(--que-kbd-border, var(--que-color-border-strong));
  box-sizing: border-box;
  vertical-align: middle;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-kbd--sm {
  --que-kbd-height: 18px;
  --que-kbd-padding-x: 4px;
  --que-kbd-font-size: 10px;
}

.que-kbd--lg {
  --que-kbd-height: 28px;
  --que-kbd-padding-x: 9px;
  --que-kbd-font-size: var(--que-font-size-sm);
}
`
