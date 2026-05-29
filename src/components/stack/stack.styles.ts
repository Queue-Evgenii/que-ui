export const stackCSS = `
/* Customizable: --que-stack-gap */

/* ── BASE ────────────────────────────────────────────────── */

.que-stack {
  display: flex;
  flex-direction: column;
  gap: var(--que-stack-gap, 0);
}

.que-stack--inline { display: inline-flex; }
.que-stack--row    { flex-direction: row; }
.que-stack--wrap   { flex-wrap: wrap; }

/* ── GAP (named tokens) ──────────────────────────────────── */

.que-stack--gap-xs  { --que-stack-gap: var(--que-space-1);  }
.que-stack--gap-sm  { --que-stack-gap: var(--que-space-2);  }
.que-stack--gap-md  { --que-stack-gap: var(--que-space-4);  }
.que-stack--gap-lg  { --que-stack-gap: var(--que-space-6);  }
.que-stack--gap-xl  { --que-stack-gap: var(--que-space-8);  }
.que-stack--gap-2xl { --que-stack-gap: var(--que-space-12); }

/* ── ALIGN (cross axis) ──────────────────────────────────── */

.que-stack--align-start    { align-items: flex-start; }
.que-stack--align-center   { align-items: center; }
.que-stack--align-end      { align-items: flex-end; }
.que-stack--align-stretch  { align-items: stretch; }
.que-stack--align-baseline { align-items: baseline; }

/* ── JUSTIFY (main axis) ─────────────────────────────────── */

.que-stack--justify-start   { justify-content: flex-start; }
.que-stack--justify-center  { justify-content: center; }
.que-stack--justify-end     { justify-content: flex-end; }
.que-stack--justify-between { justify-content: space-between; }
.que-stack--justify-around  { justify-content: space-around; }
.que-stack--justify-evenly  { justify-content: space-evenly; }
`
