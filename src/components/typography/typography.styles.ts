export const typographyCSS = `
/* ── QUE-TEXT ────────────────────────────────────────────── */

.que-text {
  display: block;
  font-family: var(--que-font-sans);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-normal);
  color: var(--que-color-text);
  line-height: var(--que-line-height-normal);
  margin: 0;
  box-sizing: border-box;
}

/* sizes */
.que-text--xs  { font-size: var(--que-font-size-xs); }
.que-text--sm  { font-size: var(--que-font-size-sm); }
.que-text--md  { font-size: var(--que-font-size-base); }
.que-text--lg  { font-size: var(--que-font-size-lg); }
.que-text--xl  { font-size: var(--que-font-size-xl); }

/* weights */
.que-text--medium   { font-weight: var(--que-font-weight-medium); }
.que-text--semibold { font-weight: var(--que-font-weight-semibold); }
.que-text--bold     { font-weight: var(--que-font-weight-bold); }

/* colors */
.que-text--muted  { color: var(--que-color-text-muted); }
.que-text--subtle { color: var(--que-color-text-disabled, var(--que-color-text-muted)); opacity: 0.6; }

/* truncate */
.que-text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── QUE-HEADING ─────────────────────────────────────────── */

.que-heading {
  display: block;
  font-family: var(--que-font-sans);
  font-weight: var(--que-font-weight-bold);
  color: var(--que-color-text);
  line-height: var(--que-line-height-tight);
  letter-spacing: -0.01em;
  margin: 0;
  box-sizing: border-box;
}

.que-heading--1 { font-size: var(--que-font-size-4xl, 36px); letter-spacing: -0.02em; }
.que-heading--2 { font-size: var(--que-font-size-3xl, 30px); letter-spacing: -0.015em; }
.que-heading--3 { font-size: var(--que-font-size-2xl, 24px); }
.que-heading--4 { font-size: var(--que-font-size-xl, 20px); }
.que-heading--5 { font-size: var(--que-font-size-lg); letter-spacing: 0; }
.que-heading--6 { font-size: var(--que-font-size-base); letter-spacing: 0; }

.que-heading--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── QUE-CODE ────────────────────────────────────────────── */

/* Inline code */
.que-code {
  font-family: var(--que-font-mono);
  font-size: 0.875em;
  color: var(--que-color-text);
  background: var(--que-color-bg-muted);
  border: 1px solid var(--que-color-border);
  border-radius: var(--que-radius-sm);
  padding: 1px 5px;
  box-sizing: border-box;
}

/* Block code */
.que-code--block {
  display: block;
  font-size: var(--que-font-size-sm);
  padding: 16px 20px;
  border-radius: var(--que-radius-lg);
  overflow-x: auto;
  white-space: pre;
  line-height: var(--que-line-height-relaxed, 1.75);
}

/* ── QUE-LINK ────────────────────────────────────────────── */

que-link a {
  color: inherit;
  text-decoration: inherit;
  text-decoration-color: inherit;
  cursor: inherit;
}

.que-link {
  font-family: var(--que-font-sans);
  color: var(--que-color-primary);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 2px;
  cursor: pointer;
  transition: color var(--que-duration-fast), text-decoration-color var(--que-duration-fast);
  border-radius: var(--que-radius-sm);
}
.que-link:hover {
  text-decoration-color: currentColor;
}
.que-link:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* underline variants */
.que-link--underline-always { text-decoration-color: currentColor; }
.que-link--underline-none   { text-decoration: none; }

/* intent colors */
.que-link--intent-secondary { color: var(--que-color-secondary); }
.que-link--intent-success   { color: var(--que-color-success-text, var(--que-color-success)); }
.que-link--intent-danger    { color: var(--que-color-danger); }
.que-link--intent-muted     { color: var(--que-color-text-muted); }
`
