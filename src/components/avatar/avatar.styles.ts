export const avatarCSS = `
/* Customizable: --que-avatar-size, --que-avatar-radius, --que-avatar-bg, --que-avatar-color */

/* ── BASE ────────────────────────────────────────────────── */

.que-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  width: var(--que-avatar-size, 40px);
  height: var(--que-avatar-size, 40px);
  border-radius: var(--que-avatar-radius, var(--que-radius-full));
  background: var(--que-avatar-bg, var(--que-color-bg-muted));
  color: var(--que-avatar-color, var(--que-color-text-muted));
  box-sizing: border-box;
  font-family: var(--que-font-sans);
  user-select: none;
}

/* ── IMAGE ───────────────────────────────────────────────── */

.que-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: inherit;
}

/* ── INITIALS ────────────────────────────────────────────── */

.que-avatar__initials {
  font-weight: var(--que-font-weight-semibold);
  font-size: var(--que-avatar-font-size, 15px);
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* ── SIZES ───────────────────────────────────────────────── */

.que-avatar--sm {
  --que-avatar-size: 28px;
  --que-avatar-font-size: 11px;
}
.que-avatar--lg {
  --que-avatar-size: 52px;
  --que-avatar-font-size: 20px;
}
.que-avatar--xl {
  --que-avatar-size: 72px;
  --que-avatar-font-size: 28px;
}

/* ── SQUARE SHAPE ────────────────────────────────────────── */

.que-avatar--square {
  --que-avatar-radius: var(--que-radius-lg);
}

/* ── INITIALS PALETTE (deterministic from name hash) ─────── */

.que-avatar--color-0 { --que-avatar-bg: #dbeafe; --que-avatar-color: #1d4ed8; }
.que-avatar--color-1 { --que-avatar-bg: #dcfce7; --que-avatar-color: #15803d; }
.que-avatar--color-2 { --que-avatar-bg: #fef9c3; --que-avatar-color: #a16207; }
.que-avatar--color-3 { --que-avatar-bg: #fee2e2; --que-avatar-color: #b91c1c; }
.que-avatar--color-4 { --que-avatar-bg: #f3e8ff; --que-avatar-color: #7e22ce; }
.que-avatar--color-5 { --que-avatar-bg: #ffedd5; --que-avatar-color: #c2410c; }
.que-avatar--color-6 { --que-avatar-bg: #e0f2fe; --que-avatar-color: #0369a1; }
.que-avatar--color-7 { --que-avatar-bg: #fce7f3; --que-avatar-color: #9d174d; }

/* ── STATUS DOT ──────────────────────────────────────────── */

.que-avatar__status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  border-radius: var(--que-radius-full);
  border: 2px solid var(--que-color-bg);
  box-sizing: border-box;
}

.que-avatar--sm .que-avatar__status { width: 9px;  height: 9px;  bottom: 0; right: 0; }
.que-avatar--lg .que-avatar__status { width: 15px; height: 15px; }
.que-avatar--xl .que-avatar__status { width: 18px; height: 18px; }

.que-avatar--status-online  .que-avatar__status { background: var(--que-color-success); }
.que-avatar--status-offline .que-avatar__status { background: var(--que-color-text-disabled); }
.que-avatar--status-busy    .que-avatar__status { background: var(--que-color-danger); }
.que-avatar--status-away    .que-avatar__status { background: var(--que-color-warning); }
`
