import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { join } from 'path'

const __dir = fileURLToPath(new URL('.', import.meta.url))
const TMP   = join(__dir, '__tokens_tmp.mjs')

mkdirSync('dist', { recursive: true })

// Bundle CSS-only exports into a temp file to extract values (no DOM/HTMLElement)
await build({ entryPoints: ['src/css.ts'], bundle: true, format: 'esm', outfile: TMP })
const { defaultTokens, defaultDarkTokens, utilitiesCSS, buttonCSS, inputCSS, textareaCSS, checkboxCSS, switchCSS, radioCSS, segmentedCSS, selectCSS, sliderCSS, badgeCSS, spinnerCSS, alertCSS, progressCSS, skeletonCSS, toastCSS, emptyCSS, popoverCSS, tooltipCSS, drawerCSS, modalCSS, dividerCSS, spacerCSS, stackCSS, gridCSS, viewCSS, avatarCSS, cardCSS, kbdCSS, statCSS, tabsCSS, breadcrumbCSS, paginationCSS, stepperCSS } = await import(pathToFileURL(TMP).href)
import('fs').then(fs => fs.unlinkSync(TMP))

function toCSSVars(tokens) {
  return Object.entries(tokens).map(([k, v]) => `  --que-${k}: ${v};`).join('\n')
}

writeFileSync('dist/tokens.css', `
:root, [data-theme="light"] {
${toCSSVars(defaultTokens)}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${toCSSVars({ ...defaultTokens, ...defaultDarkTokens })}
  }
}
[data-theme="dark"] {
${toCSSVars({ ...defaultTokens, ...defaultDarkTokens })}
}
`.trim())

console.log('dist/tokens.css')

writeFileSync('dist/utilities.css', utilitiesCSS)
console.log('dist/utilities.css')

writeFileSync('dist/button.css', buttonCSS.trim())
console.log('dist/button.css')

writeFileSync('dist/input.css', inputCSS.trim())
console.log('dist/input.css')

writeFileSync('dist/textarea.css', textareaCSS.trim())
console.log('dist/textarea.css')

writeFileSync('dist/checkbox.css', checkboxCSS.trim())
console.log('dist/checkbox.css')

writeFileSync('dist/switch.css', switchCSS.trim())
console.log('dist/switch.css')

writeFileSync('dist/radio.css', radioCSS.trim())
console.log('dist/radio.css')

writeFileSync('dist/segmented.css', segmentedCSS.trim())
console.log('dist/segmented.css')

writeFileSync('dist/select.css', selectCSS.trim())
console.log('dist/select.css')

writeFileSync('dist/slider.css', sliderCSS.trim())
console.log('dist/slider.css')

writeFileSync('dist/badge.css', badgeCSS.trim())
console.log('dist/badge.css')

writeFileSync('dist/spinner.css', spinnerCSS.trim())
console.log('dist/spinner.css')

writeFileSync('dist/alert.css', alertCSS.trim())
console.log('dist/alert.css')

writeFileSync('dist/progress.css', progressCSS.trim())
console.log('dist/progress.css')

writeFileSync('dist/skeleton.css', skeletonCSS.trim())
console.log('dist/skeleton.css')

writeFileSync('dist/toast.css', toastCSS.trim())
console.log('dist/toast.css')

writeFileSync('dist/empty.css', emptyCSS.trim())
console.log('dist/empty.css')

writeFileSync('dist/popover.css', popoverCSS.trim())
console.log('dist/popover.css')

writeFileSync('dist/tooltip.css', tooltipCSS.trim())
console.log('dist/tooltip.css')

writeFileSync('dist/drawer.css', drawerCSS.trim())
console.log('dist/drawer.css')

writeFileSync('dist/modal.css', modalCSS.trim())
console.log('dist/modal.css')

writeFileSync('dist/divider.css', dividerCSS.trim())
console.log('dist/divider.css')

writeFileSync('dist/spacer.css', spacerCSS.trim())
console.log('dist/spacer.css')

writeFileSync('dist/stack.css', stackCSS.trim())
console.log('dist/stack.css')

writeFileSync('dist/grid.css', gridCSS.trim())
console.log('dist/grid.css')

writeFileSync('dist/view.css', viewCSS.trim())
console.log('dist/view.css')

writeFileSync('dist/avatar.css', avatarCSS.trim())
console.log('dist/avatar.css')

writeFileSync('dist/card.css', cardCSS.trim())
console.log('dist/card.css')

writeFileSync('dist/kbd.css', kbdCSS.trim())
console.log('dist/kbd.css')

writeFileSync('dist/stat.css', statCSS.trim())
console.log('dist/stat.css')

writeFileSync('dist/tabs.css', tabsCSS.trim())
console.log('dist/tabs.css')

writeFileSync('dist/breadcrumb.css', breadcrumbCSS.trim())
console.log('dist/breadcrumb.css')

writeFileSync('dist/pagination.css', paginationCSS.trim())
console.log('dist/pagination.css')

writeFileSync('dist/stepper.css', stepperCSS.trim())
console.log('dist/stepper.css')


const sharedConfig = { bundle: true, sourcemap: true }

// Full library
await build({ ...sharedConfig, entryPoints: ['src/index.ts'], format: 'esm', outfile: 'dist/index.js' })
console.log('dist/index.js')

await build({ ...sharedConfig, entryPoints: ['src/index.ts'], format: 'cjs', outfile: 'dist/index.cjs' })
console.log('dist/index.cjs')

// Theme-only bundle (standalone — no shared chunk needed)
await build({ ...sharedConfig, entryPoints: ['src/theme.ts'], format: 'esm', outfile: 'dist/theme.js' })
console.log('dist/theme.js')

// Per-component bundles — all built in one pass with code splitting.
// esbuild extracts shared code (BaseElement, utils, base helpers) into
// dist/chunks/ so the browser downloads it once and caches it.
const componentEntries = {
  button:    'src/components/button/button.ts',
  input:     'src/components/input/input.ts',
  textarea:  'src/components/textarea/textarea.ts',
  checkbox:  'src/components/checkbox/checkbox.ts',
  switch:    'src/components/switch/switch.ts',
  radio:     'src/components/radio/radio.ts',
  segmented: 'src/components/segmented/segmented.ts',
  select:    'src/components/select/select.ts',
  slider:    'src/components/slider/slider.ts',
  badge:     'src/components/badge/badge.ts',
  spinner:   'src/components/spinner/spinner.ts',
  alert:     'src/components/alert/alert.ts',
  progress:  'src/components/progress/progress.ts',
  skeleton:  'src/components/skeleton/skeleton.ts',
  toast:     'src/components/toast/toast.ts',
  empty:     'src/components/empty/empty.ts',
  popover:   'src/components/popover/popover.ts',
  tooltip:   'src/components/tooltip/tooltip.ts',
  drawer:    'src/components/drawer/drawer.ts',
  modal:     'src/components/modal/modal.ts',
  divider:   'src/components/divider/divider.ts',
  spacer:    'src/components/spacer/spacer.ts',
  stack:     'src/components/stack/stack.ts',
  grid:      'src/components/grid/grid.ts',
  view:      'src/components/view/view.ts',
  avatar:    'src/components/avatar/avatar.ts',
  card:      'src/components/card/card.ts',
  kbd:       'src/components/kbd/kbd.ts',
  stat:      'src/components/stat/stat.ts',
  tabs:       'src/components/tabs/tabs.ts',
  breadcrumb:  'src/components/breadcrumb/breadcrumb.ts',
  pagination:  'src/components/pagination/pagination.ts',
  stepper:     'src/components/stepper/stepper.ts',
}

await build({
  entryPoints: componentEntries,
  bundle: true,
  splitting: true,
  format: 'esm',
  outdir: 'dist',
  chunkNames: 'chunks/[name]-[hash]',
  sourcemap: true,
})
Object.keys(componentEntries).forEach(name => console.log(`dist/${name}.js`))

console.log('\nBuild complete.')
