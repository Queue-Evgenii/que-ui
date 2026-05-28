/**
 * Generates positioning + animation CSS for all 12 placements.
 * Used by both Tooltip and Popover — each component stays independent
 * because the helper lives in src/base/, not in another component.
 *
 *   placementCSS('tooltip')
 *   → .que-tooltip--placement-top > .que-tooltip__content { ... }
 *
 * Each component defines its own:
 *   --que-{prefix}-offset   (spacing between trigger and panel)
 *   Open-state selector     (passed as `openSel`)
 *   CSS-only hover selector (passed as `hoverSel`, optional)
 */
export function placementCSS(
  prefix: string,
  opts: {
    /** Selector that means "open". Default: `.que-{prefix}--open > .que-{prefix}__content` */
    openSel?: string
    /** Extra selector for CSS-only mode (e.g. `:hover`, `:focus-within`). Optional. */
    hoverSel?: string
    /** How far the panel moves when hidden (for the slide-in animation). Default: 6px */
    slideOffset?: number
    /** Scale when hidden. Default: 0.95 */
    scale?: number
  } = {},
): string {
  const p    = prefix
  const c    = `que-${p}__content`
  const off  = `var(--que-${p}-offset, 8px)`
  const sl   = opts.slideOffset ?? 6
  const sc   = opts.scale ?? 0.95
  const open = opts.openSel ?? `.que-${p}--open > .${c}`
  const hvr  = opts.hoverSel ?? ''

  const openSels = (extra: string) =>
    [open.replace(`.${c}`, `${extra} > .${c}`), hvr && hvr.replace('CONTENT', `${extra} > .${c}`)].filter(Boolean).join(',\n')

  const rule = (
    placement: string,
    pos: string,
    closedT: string,
    openT: string,
    origin: string,
  ) => `
.que-${p}--placement-${placement} > .${c} {
  ${pos}
  transform-origin: ${origin};
  transform: ${closedT};
}
${openSels(`.que-${p}--placement-${placement}`)} {
  transform: ${openT};
}`

  return [
    /* BOTTOM */
    rule('bottom',
      `top: calc(100% + ${off}); bottom: auto; left: 50%; right: auto;`,
      `translateX(-50%) translateY(-${sl}px) scale(${sc})`,
      `translateX(-50%) translateY(0) scale(1)`,
      'top center'),
    rule('bottom-start',
      `top: calc(100% + ${off}); bottom: auto; left: 0; right: auto;`,
      `translateY(-${sl}px) scale(${sc})`,
      `translateY(0) scale(1)`,
      'top left'),
    rule('bottom-end',
      `top: calc(100% + ${off}); bottom: auto; right: 0; left: auto;`,
      `translateY(-${sl}px) scale(${sc})`,
      `translateY(0) scale(1)`,
      'top right'),

    /* TOP */
    rule('top',
      `bottom: calc(100% + ${off}); top: auto; left: 50%; right: auto;`,
      `translateX(-50%) translateY(${sl}px) scale(${sc})`,
      `translateX(-50%) translateY(0) scale(1)`,
      'bottom center'),
    rule('top-start',
      `bottom: calc(100% + ${off}); top: auto; left: 0; right: auto;`,
      `translateY(${sl}px) scale(${sc})`,
      `translateY(0) scale(1)`,
      'bottom left'),
    rule('top-end',
      `bottom: calc(100% + ${off}); top: auto; right: 0; left: auto;`,
      `translateY(${sl}px) scale(${sc})`,
      `translateY(0) scale(1)`,
      'bottom right'),

    /* RIGHT */
    rule('right',
      `left: calc(100% + ${off}); right: auto; top: 50%; bottom: auto;`,
      `translateX(-${sl}px) translateY(-50%) scale(${sc})`,
      `translateX(0) translateY(-50%) scale(1)`,
      'left center'),
    rule('right-start',
      `left: calc(100% + ${off}); right: auto; top: 0; bottom: auto;`,
      `translateX(-${sl}px) scale(${sc})`,
      `translateX(0) scale(1)`,
      'top left'),
    rule('right-end',
      `left: calc(100% + ${off}); right: auto; bottom: 0; top: auto;`,
      `translateX(-${sl}px) scale(${sc})`,
      `translateX(0) scale(1)`,
      'bottom left'),

    /* LEFT */
    rule('left',
      `right: calc(100% + ${off}); left: auto; top: 50%; bottom: auto;`,
      `translateX(${sl}px) translateY(-50%) scale(${sc})`,
      `translateX(0) translateY(-50%) scale(1)`,
      'right center'),
    rule('left-start',
      `right: calc(100% + ${off}); left: auto; top: 0; bottom: auto;`,
      `translateX(${sl}px) scale(${sc})`,
      `translateX(0) scale(1)`,
      'top right'),
    rule('left-end',
      `right: calc(100% + ${off}); left: auto; bottom: 0; top: auto;`,
      `translateX(${sl}px) scale(${sc})`,
      `translateX(0) scale(1)`,
      'bottom right'),
  ].join('\n')
}
