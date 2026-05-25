export const buttonCSS = `
/* Customizable: --que-button-padding-x, --que-button-padding-y,
                 --que-button-font-size, --que-button-radius, --que-button-gap */
.que-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--que-button-gap, var(--que-space-2));
  padding: var(--que-button-padding-y, var(--que-space-2)) var(--que-button-padding-x, var(--que-space-4));
  border: 1px solid transparent;
  border-radius: var(--que-button-radius, var(--que-radius-md));
  font-family: var(--que-font-sans);
  font-size: var(--que-button-font-size, var(--que-font-size-sm));
  font-weight: var(--que-font-weight-medium);
  line-height: var(--que-line-height-tight);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  transition: background var(--que-duration-fast) var(--que-easing-out),
              border-color var(--que-duration-fast) var(--que-easing-out),
              color var(--que-duration-fast) var(--que-easing-out),
              box-shadow var(--que-duration-fast) var(--que-easing-out),
              opacity var(--que-duration-fast) var(--que-easing-out);
}

.que-button:focus-visible {
  outline: 2px solid var(--que-color-border-focus);
  outline-offset: 2px;
}

/* ── SOLID (default = primary) ──────────────────────────────── */

.que-button,
.que-button--solid,
.que-button--intent-primary,
.que-button--solid.que-button--intent-primary {
  background: var(--que-color-primary);
  color: white;
}
.que-button:hover,
.que-button--solid:hover,
.que-button--intent-primary:hover,
.que-button--solid.que-button--intent-primary:hover {
  background: var(--que-color-primary-hover);
  color: white;
}
.que-button:active,
.que-button--solid:active,
.que-button--intent-primary:active,
.que-button--solid.que-button--intent-primary:active {
  background: var(--que-color-primary-active);
  color: white;
}

.que-button--intent-secondary,
.que-button--solid.que-button--intent-secondary {
  background: var(--que-color-secondary);
  color: white;
}
.que-button--intent-secondary:hover,
.que-button--solid.que-button--intent-secondary:hover {
  background: var(--que-color-secondary-hover);
  color: white;
}
.que-button--intent-secondary:active,
.que-button--solid.que-button--intent-secondary:active {
  background: var(--que-color-secondary-active);
  color: white;
}

.que-button--intent-danger,
.que-button--solid.que-button--intent-danger {
  background: var(--que-color-danger);
  color: white;
}
.que-button--intent-danger:hover,
.que-button--solid.que-button--intent-danger:hover {
  background: var(--que-color-danger-hover);
  color: white;
}
.que-button--intent-danger:active,
.que-button--solid.que-button--intent-danger:active {
  background: var(--que-color-danger-hover);
  color: white;
  filter: brightness(0.9);
}

.que-button--intent-success,
.que-button--solid.que-button--intent-success {
  background: var(--que-color-success);
  color: white;
}
.que-button--intent-success:hover,
.que-button--solid.que-button--intent-success:hover {
  background: var(--que-color-success-hover);
  color: white;
}
.que-button--intent-success:active,
.que-button--solid.que-button--intent-success:active {
  background: var(--que-color-success-hover);
  color: white;
  filter: brightness(0.9);
}

.que-button--intent-warning,
.que-button--solid.que-button--intent-warning {
  background: var(--que-color-warning);
  color: white;
}
.que-button--intent-warning:hover,
.que-button--solid.que-button--intent-warning:hover {
  background: var(--que-color-warning-hover);
  color: white;
}
.que-button--intent-warning:active,
.que-button--solid.que-button--intent-warning:active {
  background: var(--que-color-warning-hover);
  color: white;
  filter: brightness(0.9);
}

/* ── OUTLINE ────────────────────────────────────────────────── */

.que-button--outline {
  background: transparent;
  border-color: var(--que-color-border-strong);
  color: var(--que-color-text);
}
.que-button--outline:hover {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-text);
}
.que-button--outline:active {
  background: var(--que-color-interactive-active);
  color: var(--que-color-text);
}

.que-button--outline.que-button--intent-primary {
  border-color: var(--que-color-primary);
  color: var(--que-color-primary);
}
.que-button--outline.que-button--intent-primary:hover,
.que-button--outline.que-button--intent-primary:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-primary);
}

.que-button--outline.que-button--intent-secondary {
  border-color: var(--que-color-secondary);
  color: var(--que-color-secondary);
}
.que-button--outline.que-button--intent-secondary:hover,
.que-button--outline.que-button--intent-secondary:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-secondary);
}

.que-button--outline.que-button--intent-danger {
  border-color: var(--que-color-danger);
  color: var(--que-color-danger);
}
.que-button--outline.que-button--intent-danger:hover,
.que-button--outline.que-button--intent-danger:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-danger);
}

.que-button--outline.que-button--intent-success {
  border-color: var(--que-color-success);
  color: var(--que-color-success);
}
.que-button--outline.que-button--intent-success:hover,
.que-button--outline.que-button--intent-success:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-success);
}

.que-button--outline.que-button--intent-warning {
  border-color: var(--que-color-warning);
  color: var(--que-color-warning);
}
.que-button--outline.que-button--intent-warning:hover,
.que-button--outline.que-button--intent-warning:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-warning);
}

/* ── GHOST ──────────────────────────────────────────────────── */

.que-button--ghost {
  background: transparent;
  color: var(--que-color-text);
}
.que-button--ghost:hover {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-text);
}
.que-button--ghost:active {
  background: var(--que-color-interactive-active);
  color: var(--que-color-text);
}

.que-button--ghost.que-button--intent-primary {
  color: var(--que-color-primary);
}
.que-button--ghost.que-button--intent-primary:hover,
.que-button--ghost.que-button--intent-primary:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-primary);
}

.que-button--ghost.que-button--intent-secondary {
  color: var(--que-color-secondary);
}
.que-button--ghost.que-button--intent-secondary:hover,
.que-button--ghost.que-button--intent-secondary:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-secondary);
}

.que-button--ghost.que-button--intent-danger {
  color: var(--que-color-danger);
}
.que-button--ghost.que-button--intent-danger:hover,
.que-button--ghost.que-button--intent-danger:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-danger);
}

.que-button--ghost.que-button--intent-success {
  color: var(--que-color-success);
}
.que-button--ghost.que-button--intent-success:hover,
.que-button--ghost.que-button--intent-success:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-success);
}

.que-button--ghost.que-button--intent-warning {
  color: var(--que-color-warning);
}
.que-button--ghost.que-button--intent-warning:hover,
.que-button--ghost.que-button--intent-warning:active {
  background: var(--que-color-interactive-hover);
  color: var(--que-color-warning);
}

/* ── SIZES ──────────────────────────────────────────────────── */

.que-button--sm {
  padding: var(--que-space-1) var(--que-space-3);
  font-size: var(--que-font-size-xs);
  gap: var(--que-space-1);
}

.que-button--lg {
  padding: var(--que-space-3) var(--que-space-6);
  font-size: var(--que-font-size-md);
  gap: var(--que-space-2);
}

/* ── STATES ─────────────────────────────────────────────────── */

.que-button:disabled,
.que-button[aria-disabled="true"],
.que-button--disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.que-button--full {
  width: 100%;
}
`
