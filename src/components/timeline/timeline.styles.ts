export const timelineCSS = `
/* ── QUE-TIMELINE ────────────────────────────────────────── */

.que-timeline {
  display: flex;
  flex-direction: column;
  font-family: var(--que-font-sans);
}

/* ── QUE-TIMELINE-ITEM ───────────────────────────────────── */

.que-timeline-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0 var(--que-space-4);
  position: relative;
}

/* left column: dot + connector line */
.que-timeline-item__indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.que-timeline-item__dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--que-color-bg-muted);
  border: 2px solid var(--que-color-border-strong);
  color: var(--que-color-text-muted);
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-semibold);
  box-sizing: border-box;
  transition: background var(--que-duration-fast), border-color var(--que-duration-fast);
}

.que-timeline-item__line {
  flex: 1;
  width: 2px;
  background: var(--que-color-border);
  min-height: var(--que-space-8);
  margin: var(--que-space-1) 0;
}

/* last item: hide the connector line */
.que-timeline-item:last-child .que-timeline-item__line {
  display: none;
}

/* right column: content */
.que-timeline-item__body {
  padding-bottom: var(--que-space-6);
}

.que-timeline-item:last-child .que-timeline-item__body {
  padding-bottom: 0;
}

.que-timeline-item__header {
  display: flex;
  align-items: baseline;
  gap: var(--que-space-3);
  min-height: 32px;
  padding-top: 4px;
}

.que-timeline-item__label {
  font-size: var(--que-font-size-sm);
  font-weight: var(--que-font-weight-semibold);
  color: var(--que-color-text);
  line-height: var(--que-line-height-tight);
}

.que-timeline-item__date {
  font-size: var(--que-font-size-xs);
  color: var(--que-color-text-muted);
  white-space: nowrap;
}

.que-timeline-item__content {
  margin-top: var(--que-space-2);
  font-size: var(--que-font-size-sm);
  color: var(--que-color-text-muted);
  line-height: var(--que-line-height-normal);
}

.que-timeline-item__content:empty { display: none; }

/* ── STATUS VARIANTS ─────────────────────────────────────── */

.que-timeline-item--done .que-timeline-item__dot {
  background: var(--que-color-success-subtle);
  border-color: var(--que-color-success-text, var(--que-color-success));
  color: var(--que-color-success-text, var(--que-color-success));
}

.que-timeline-item--done .que-timeline-item__line {
  background: var(--que-color-success-text, var(--que-color-success));
  opacity: 0.3;
}

.que-timeline-item--active .que-timeline-item__dot {
  background: var(--que-color-primary);
  border-color: var(--que-color-primary);
  color: var(--que-color-primary-on-solid, #fff);
}

.que-timeline-item--error .que-timeline-item__dot {
  background: var(--que-color-danger-subtle, var(--que-color-danger));
  border-color: var(--que-color-danger);
  color: var(--que-color-danger);
}
`
