const colsRules = Array.from({ length: 12 }, (_, i) =>
  `.que-grid--cols-${i + 1} { --que-grid-cols: ${i + 1}; }`
).join('\n')

export const gridCSS = `
/* Customizable: --que-grid-cols, --que-grid-gap, --que-grid-gap-x, --que-grid-gap-y,
                 --que-grid-min-col-width */

/* ── BASE ────────────────────────────────────────────────── */

.que-grid {
  display: grid;
  grid-template-columns: repeat(var(--que-grid-cols, 1), 1fr);
  column-gap: var(--que-grid-gap-x, var(--que-grid-gap, 0));
  row-gap:    var(--que-grid-gap-y, var(--que-grid-gap, 0));
}

/* ── COLUMNS 1–12 ────────────────────────────────────────── */

${colsRules}

/* ── AUTO COLUMNS ────────────────────────────────────────── */

.que-grid--auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(var(--que-grid-min-col-width, 200px), 1fr));
}

.que-grid--auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(var(--que-grid-min-col-width, 200px), 1fr));
}

/* ── GAP ─────────────────────────────────────────────────── */

.que-grid--gap-xs  { --que-grid-gap: var(--que-space-1);  }
.que-grid--gap-sm  { --que-grid-gap: var(--que-space-2);  }
.que-grid--gap-md  { --que-grid-gap: var(--que-space-4);  }
.que-grid--gap-lg  { --que-grid-gap: var(--que-space-6);  }
.que-grid--gap-xl  { --que-grid-gap: var(--que-space-8);  }
.que-grid--gap-2xl { --que-grid-gap: var(--que-space-12); }

/* ── ALIGNMENT ───────────────────────────────────────────── */

.que-grid--align-start   { align-items: start; }
.que-grid--align-center  { align-items: center; }
.que-grid--align-end     { align-items: end; }
.que-grid--align-stretch { align-items: stretch; }

.que-grid--justify-start   { justify-items: start; }
.que-grid--justify-center  { justify-items: center; }
.que-grid--justify-end     { justify-items: end; }
.que-grid--justify-stretch { justify-items: stretch; }
`
