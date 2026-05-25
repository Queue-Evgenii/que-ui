export const segmentedCSS = `
/* Customizable: --que-segmented-radius */

/* ── TRACK ──────────────────────────────────────────────────── */

.que-segmented {
  display: inline-flex;
  align-items: stretch;
  gap: 2px;
  padding: 3px;
  background: var(--que-color-bg-muted);
  border-radius: var(--que-segmented-radius, var(--que-radius-full));
}

/* ── SHAPES ─────────────────────────────────────────────────── */

.que-segmented--pill    { border-radius: var(--que-radius-full); }
.que-segmented--rounded { border-radius: var(--que-radius-lg); }
.que-segmented--square  { border-radius: var(--que-radius-sm); }

.que-segmented--pill    .que-segmented__label { border-radius: calc(var(--que-radius-full) - 3px); }
.que-segmented--rounded .que-segmented__label { border-radius: calc(var(--que-radius-lg) - 3px); }
.que-segmented--square  .que-segmented__label { border-radius: calc(var(--que-radius-sm) - 3px); }

/* ── HIDDEN INPUT ───────────────────────────────────────────── */

.que-segmented__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

/* ── ITEM (label wraps input + span) ────────────────────────── */

.que-segmented__item {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
}

.que-segmented__item--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── VISIBLE LABEL ──────────────────────────────────────────── */

.que-segmented__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--que-space-1) var(--que-space-3);
  border-radius: calc(var(--que-segmented-radius, var(--que-radius-full)) - 3px);
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-medium);
  line-height: var(--que-line-height-tight);
  color: var(--que-color-text-muted);
  white-space: nowrap;
  transition: color var(--que-duration-fast) var(--que-easing-out),
              background var(--que-duration-fast) var(--que-easing-out),
              box-shadow var(--que-duration-fast) var(--que-easing-out);
}

.que-segmented__item:hover .que-segmented__label {
  color: var(--que-color-text);
}

/* active */
.que-segmented__input:checked + .que-segmented__label {
  background: var(--que-color-bg);
  box-shadow: var(--que-shadow-sm);
  color: var(--que-color-text);
}

/* focus ring */
.que-segmented__input:focus-visible + .que-segmented__label {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 1px;
}
`
