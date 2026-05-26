export const skeletonCSS = `
/* Customizable: --que-skeleton-width, --que-skeleton-height, --que-skeleton-radius */

@keyframes que-skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── BASE ────────────────────────────────────────────────── */

.que-skeleton {
  display: block;
  width: var(--que-skeleton-width, 100%);
  height: var(--que-skeleton-height, 1em);
  border-radius: var(--que-skeleton-radius, var(--que-radius-sm));
  background: linear-gradient(
    90deg,
    var(--que-color-bg-muted) 25%,
    var(--que-color-border)   50%,
    var(--que-color-bg-muted) 75%
  );
  background-size: 200% 100%;
  animation: que-skeleton-shimmer 1.6s ease-in-out infinite;
  flex-shrink: 0;
}

/* ── VARIANTS ────────────────────────────────────────────── */

.que-skeleton--text {
  --que-skeleton-height: 0.875em;
  --que-skeleton-radius: var(--que-radius-full);
}

.que-skeleton--rect {
  --que-skeleton-height: 120px;
  --que-skeleton-radius: var(--que-radius-md);
}

.que-skeleton--circle {
  --que-skeleton-width: 40px;
  --que-skeleton-height: 40px;
  --que-skeleton-radius: var(--que-radius-full);
}
`
