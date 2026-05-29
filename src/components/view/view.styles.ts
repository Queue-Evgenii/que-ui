export const viewCSS = `
/* Customizable: --que-view-max-width, --que-view-padding-x, --que-view-padding-y */

/* ── BASE ────────────────────────────────────────────────── */

.que-view {
  display: block;
  width: 100%;
  max-width: var(--que-view-max-width, 1280px);
  margin-left: auto;
  margin-right: auto;
  padding-left:  var(--que-view-padding-x, var(--que-space-4));
  padding-right: var(--que-view-padding-x, var(--que-space-4));
  box-sizing: border-box;
}

/* ── MAX-WIDTH SIZES ─────────────────────────────────────── */

.que-view--sm   { --que-view-max-width: 640px;  }
.que-view--md   { --que-view-max-width: 768px;  }
.que-view--lg   { --que-view-max-width: 1024px; }
.que-view--xl   { --que-view-max-width: 1280px; }
.que-view--2xl  { --que-view-max-width: 1536px; }
.que-view--full { --que-view-max-width: 100%;   }

/* ── MODIFIERS ───────────────────────────────────────────── */

/* Remove side padding (e.g. when View is already inside a padded container) */
.que-view--no-padding {
  padding-left: 0;
  padding-right: 0;
}

/* Vertical padding — useful for page sections */
.que-view--pad-y {
  padding-top:    var(--que-view-padding-y, var(--que-space-8));
  padding-bottom: var(--que-view-padding-y, var(--que-space-8));
}

/* Full-height — for app shell layouts */
.que-view--full-height {
  min-height: 100vh;
}
`
