export const cardCSS = `
/* Customizable: --que-card-padding, --que-card-radius, --que-card-bg, --que-card-border */

/* ── BASE ────────────────────────────────────────────────── */

.que-card {
  display: flex;
  flex-direction: column;
  background: var(--que-card-bg, var(--que-color-surface));
  border: 1px solid var(--que-card-border, var(--que-color-border));
  border-radius: var(--que-card-radius, var(--que-radius-xl));
  box-sizing: border-box;
  overflow: hidden;
}

/* ── VARIANTS ────────────────────────────────────────────── */

.que-card--elevated {
  border-color: transparent;
  box-shadow: var(--que-shadow-md);
}

.que-card--flat {
  border-color: transparent;
  background: var(--que-card-bg, var(--que-color-bg-subtle));
  box-shadow: none;
}

/* ── HEADER ──────────────────────────────────────────────── */

que-card-header,
.que-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--que-space-3);
  padding: var(--que-card-padding, 20px 24px);
  padding-bottom: 0;
  flex-shrink: 0;
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

/* ── BODY ────────────────────────────────────────────────── */

que-card-body,
.que-card__body {
  display: block;
  padding: var(--que-card-padding, 20px 24px);
  flex: 1 1 auto;
  min-height: 0;
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
}

/* ── FOOTER ──────────────────────────────────────────────── */

que-card-footer,
.que-card__footer {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
  padding: var(--que-card-padding, 20px 24px);
  padding-top: 0;
  flex-shrink: 0;
  font-family: var(--que-font-sans);
  box-sizing: border-box;
}

/* ── DIVIDERS between sections ───────────────────────────── */

que-card-header + que-card-body,
.que-card__header + .que-card__body {
  padding-top: var(--que-space-4);
}

que-card-body + que-card-footer,
.que-card__body + .que-card__footer {
  padding-top: var(--que-space-4);
  border-top: 1px solid var(--que-color-border);
  margin-top: auto;
}

/* ── PADDING SIZES ───────────────────────────────────────── */

.que-card--padding-sm {
  --que-card-padding: 12px 16px;
}

.que-card--padding-lg {
  --que-card-padding: 28px 32px;
}

/* ── MEDIA (full-bleed image at top) ─────────────────────── */

que-card-media,
.que-card__media {
  display: block;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
}

que-card-media img,
.que-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`
