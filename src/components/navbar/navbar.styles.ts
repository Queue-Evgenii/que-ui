export const navbarCSS = `
/* Customizable: --que-navbar-height, --que-navbar-bg, --que-navbar-border */

/* ── QUE-NAVBAR ──────────────────────────────────────────── */

.que-navbar {
  display: flex;
  align-items: center;
  gap: var(--que-space-4);
  padding: 0 var(--que-space-6);
  height: var(--que-navbar-height, 56px);
  background: var(--que-navbar-bg, var(--que-color-surface));
  border-bottom: 1px solid var(--que-navbar-border, var(--que-color-border));
  box-sizing: border-box;
  flex-shrink: 0;
}

.que-navbar--sticky {
  position: sticky;
  top: 0;
  z-index: var(--que-z-sticky);
}

.que-navbar--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--que-z-sticky);
}

.que-navbar--transparent {
  --que-navbar-bg: transparent;
  --que-navbar-border: transparent;
}

.que-navbar--blur {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  --que-navbar-bg: color-mix(in srgb, var(--que-color-surface) 75%, transparent);
}

/* ── QUE-NAVBAR-BRAND ────────────────────────────────────── */

.que-navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
  flex-shrink: 0;
  font-family: var(--que-font-sans);
  font-weight: var(--que-font-weight-semibold);
  font-size: var(--que-font-size-base);
  color: var(--que-color-text);
  text-decoration: none;
  white-space: nowrap;
}

.que-navbar__brand:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
  border-radius: var(--que-radius-sm);
}

/* ── QUE-NAVBAR-SECTION ──────────────────────────────────── */

.que-navbar__section {
  display: flex;
  align-items: center;
  gap: var(--que-space-2);
  flex: 1;
}

.que-navbar__section--end   { justify-content: flex-end; }
.que-navbar__section--center { justify-content: center; }
`
