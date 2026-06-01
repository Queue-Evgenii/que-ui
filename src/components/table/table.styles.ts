export const tableCSS = `
/* ── QUE-TABLE WRAPPER ───────────────────────────────────── */

.que-table {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--que-radius-lg);
  border: 1px solid var(--que-color-border);
  font-family: var(--que-font-sans);
}

.que-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text);
  box-sizing: border-box;
}

/* ── HEADER ──────────────────────────────────────────────── */

.que-table thead {
  background: var(--que-color-bg-subtle);
}

.que-table th {
  padding: var(--que-space-3) var(--que-space-4);
  font-size: var(--que-font-size-xs);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text-muted);
  text-align: left;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid var(--que-color-border);
  box-sizing: border-box;
  vertical-align: middle;
}

/* ── CELLS ───────────────────────────────────────────────── */

.que-table td {
  padding: var(--que-space-3) var(--que-space-4);
  border-bottom: 1px solid var(--que-color-border);
  vertical-align: middle;
  line-height: var(--que-line-height-normal);
  box-sizing: border-box;
}

.que-table tbody tr:last-child td {
  border-bottom: none;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-table--sm th,
.que-table--sm td {
  padding: var(--que-space-2) var(--que-space-3);
}

.que-table--lg th,
.que-table--lg td {
  padding: var(--que-space-4) var(--que-space-5);
}

/* ── MODIFIERS ───────────────────────────────────────────── */

/* Striped rows */
.que-table--striped tbody tr:nth-child(even) {
  background: var(--que-color-bg-subtle);
}

/* Row hover */
.que-table--hoverable tbody tr {
  transition: background var(--que-duration-fast);
}

.que-table--hoverable tbody tr:hover {
  background: var(--que-color-interactive-hover);
}

/* No outer border */
.que-table--borderless {
  border: none;
  border-radius: 0;
}

.que-table--borderless td,
.que-table--borderless th {
  border-bottom-color: var(--que-color-border);
}

/* Compact: no border-radius on wrapper */
.que-table--compact {
  border-radius: var(--que-radius-md);
}

/* Sortable column header */
.que-table th[data-sortable] {
  cursor: pointer;
  user-select: none;
}

.que-table th[data-sortable]:hover {
  color: var(--que-color-text);
}

.que-table th[aria-sort="ascending"]::after  { content: ' ↑'; }
.que-table th[aria-sort="descending"]::after { content: ' ↓'; }
`
