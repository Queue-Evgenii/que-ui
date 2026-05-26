export const emptyCSS = `
/* Customizable: --que-empty-padding, --que-empty-icon-size */

/* ── BASE ────────────────────────────────────────────────── */

.que-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--que-empty-padding, 48px 24px);
  gap: 10px;
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

.que-empty__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--que-empty-icon-size, 56px);
  height: var(--que-empty-icon-size, 56px);
  color: var(--que-color-text-subtle);
  margin-bottom: 4px;
}

.que-empty__icon svg {
  width: 100%;
  height: 100%;
}

.que-empty__title {
  display: block;
  font-size: var(--que-font-size-md);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text);
  line-height: var(--que-line-height-tight);
}

.que-empty__desc {
  display: block;
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text-muted);
  max-width: 360px;
  line-height: var(--que-line-height-normal);
}

.que-empty__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6px;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-empty--sm {
  --que-empty-padding: 24px 16px;
  --que-empty-icon-size: 36px;
}
.que-empty--sm .que-empty__title { font-size: var(--que-font-size-sm); }
.que-empty--sm .que-empty__desc  { font-size: var(--que-font-size-xs); }

.que-empty--lg {
  --que-empty-padding: 72px 32px;
  --que-empty-icon-size: 80px;
}
.que-empty--lg .que-empty__title { font-size: var(--que-font-size-lg); }
`
