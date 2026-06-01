export const drawerCSS = `
/* Customizable: --que-drawer-size, --que-drawer-bg, --que-drawer-border-color,
                 --que-drawer-padding, --que-drawer-shadow */

/* ── BACKDROP ────────────────────────────────────────────── */

.que-drawer__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--que-z-overlay, 300);
  background: var(--que-color-overlay);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--que-duration-slow) var(--que-easing-in-out);
}

.que-drawer--open > .que-drawer__backdrop {
  opacity: 1;
  pointer-events: auto;
}

.que-drawer--no-backdrop > .que-drawer__backdrop {
  display: none;
}

/* ── PANEL — overlay mode (default) ─────────────────────── */

.que-drawer__panel {
  position: fixed;
  z-index: var(--que-z-modal, 400);
  display: flex;
  flex-direction: column;
  background: var(--que-drawer-bg, var(--que-color-surface-raised));
  overflow: hidden auto;
  will-change: transform;
  transition: transform var(--que-duration-slow) var(--que-easing-in-out);
}

/* ── PLACEMENTS ──────────────────────────────────────────── */

/* LEFT */
.que-drawer--placement-left > .que-drawer__panel {
  top: 0; bottom: 0; left: 0;
  width: var(--que-drawer-size, 320px);
  max-width: 100vw;
  border-right: 1px solid var(--que-drawer-border-color, var(--que-color-border));
  box-shadow: var(--que-drawer-shadow, var(--que-shadow-xl));
  transform: translateX(-100%);
}
.que-drawer--placement-left.que-drawer--open > .que-drawer__panel {
  transform: translateX(0);
}

/* RIGHT */
.que-drawer--placement-right > .que-drawer__panel {
  top: 0; bottom: 0; right: 0;
  width: var(--que-drawer-size, 320px);
  max-width: 100vw;
  border-left: 1px solid var(--que-drawer-border-color, var(--que-color-border));
  box-shadow: var(--que-drawer-shadow, var(--que-shadow-xl));
  transform: translateX(100%);
}
.que-drawer--placement-right.que-drawer--open > .que-drawer__panel {
  transform: translateX(0);
}

/* TOP */
.que-drawer--placement-top > .que-drawer__panel {
  top: 0; left: 0; right: 0;
  height: var(--que-drawer-size, 320px);
  max-height: 100vh;
  border-bottom: 1px solid var(--que-drawer-border-color, var(--que-color-border));
  box-shadow: var(--que-drawer-shadow, var(--que-shadow-xl));
  transform: translateY(-100%);
}
.que-drawer--placement-top.que-drawer--open > .que-drawer__panel {
  transform: translateY(0);
}

/* BOTTOM */
.que-drawer--placement-bottom > .que-drawer__panel {
  bottom: 0; left: 0; right: 0;
  height: var(--que-drawer-size, 320px);
  max-height: 100vh;
  border-top: 1px solid var(--que-drawer-border-color, var(--que-color-border));
  box-shadow: var(--que-drawer-shadow, var(--que-shadow-xl));
  transform: translateY(100%);
}
.que-drawer--placement-bottom.que-drawer--open > .que-drawer__panel {
  transform: translateY(0);
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-drawer--sm { --que-drawer-size: 240px; }
.que-drawer--lg { --que-drawer-size: 400px; }
.que-drawer--xl { --que-drawer-size: 520px; }
.que-drawer--full {
  --que-drawer-size: 100%;
}
/* full — for left/right: 100vw; for top/bottom: 100vh */
.que-drawer--full.que-drawer--placement-left > .que-drawer__panel,
.que-drawer--full.que-drawer--placement-right > .que-drawer__panel {
  --que-drawer-size: 100vw;
  border: none;
}
.que-drawer--full.que-drawer--placement-top > .que-drawer__panel,
.que-drawer--full.que-drawer--placement-bottom > .que-drawer__panel {
  --que-drawer-size: 100vh;
  border: none;
}

/* ── PUSH MODE ───────────────────────────────────────────── */
/* Requires parent with display:flex (left/right) or flex-col (top/bottom) */

.que-drawer--push > .que-drawer__panel {
  position: relative;
  z-index: auto;       /* reset base z-index to avoid stacking context above backdrop */
  will-change: auto;   /* reset will-change — also creates stacking context */
  flex-shrink: 0;
  transition: width var(--que-duration-slow) var(--que-easing-in-out),
              height var(--que-duration-slow) var(--que-easing-in-out);
  transform: none;
  box-shadow: none;
}

.que-drawer--push.que-drawer--placement-left > .que-drawer__panel,
.que-drawer--push.que-drawer--placement-right > .que-drawer__panel {
  width: 0;
  height: auto;
  top: auto; bottom: auto; left: auto; right: auto;
  overflow: hidden;
}
.que-drawer--push.que-drawer--placement-left.que-drawer--open > .que-drawer__panel,
.que-drawer--push.que-drawer--placement-right.que-drawer--open > .que-drawer__panel {
  width: var(--que-drawer-size, 320px);
}

.que-drawer--push.que-drawer--placement-top > .que-drawer__panel,
.que-drawer--push.que-drawer--placement-bottom > .que-drawer__panel {
  height: 0;
  width: auto;
  overflow: hidden;
}
.que-drawer--push.que-drawer--placement-top.que-drawer--open > .que-drawer__panel,
.que-drawer--push.que-drawer--placement-bottom.que-drawer--open > .que-drawer__panel {
  height: var(--que-drawer-size, 320px);
}
`
