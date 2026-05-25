import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { join } from 'path'

const __dir = fileURLToPath(new URL('.', import.meta.url))
const TMP   = join(__dir, '__tokens_tmp.mjs')

mkdirSync('dist', { recursive: true })

// Bundle CSS-only exports into a temp file to extract values (no DOM/HTMLElement)
await build({ entryPoints: ['src/css.ts'], bundle: true, format: 'esm', outfile: TMP })
const { defaultTokens, defaultDarkTokens, utilitiesCSS, buttonCSS, inputCSS, textareaCSS, checkboxCSS, switchCSS, radioCSS, segmentedCSS, selectCSS } = await import(pathToFileURL(TMP).href)
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

const sharedConfig = { bundle: true, sourcemap: true }

// Full library
await build({ ...sharedConfig, entryPoints: ['src/index.ts'], format: 'esm', outfile: 'dist/index.js' })
console.log('dist/index.js')

await build({ ...sharedConfig, entryPoints: ['src/index.ts'], format: 'cjs', outfile: 'dist/index.cjs' })
console.log('dist/index.cjs')

// Theme-only bundle
await build({ ...sharedConfig, entryPoints: ['src/theme.ts'], format: 'esm', outfile: 'dist/theme.js' })
console.log('dist/theme.js')

// Per-component bundles
await build({ ...sharedConfig, entryPoints: ['src/components/button/button.ts'], format: 'esm', outfile: 'dist/button.js' })
console.log('dist/button.js')

await build({ ...sharedConfig, entryPoints: ['src/components/input/input.ts'], format: 'esm', outfile: 'dist/input.js' })
console.log('dist/input.js')

await build({ ...sharedConfig, entryPoints: ['src/components/textarea/textarea.ts'], format: 'esm', outfile: 'dist/textarea.js' })
console.log('dist/textarea.js')

await build({ ...sharedConfig, entryPoints: ['src/components/checkbox/checkbox.ts'], format: 'esm', outfile: 'dist/checkbox.js' })
console.log('dist/checkbox.js')

await build({ ...sharedConfig, entryPoints: ['src/components/switch/switch.ts'], format: 'esm', outfile: 'dist/switch.js' })
console.log('dist/switch.js')

await build({ ...sharedConfig, entryPoints: ['src/components/radio/radio.ts'], format: 'esm', outfile: 'dist/radio.js' })
console.log('dist/radio.js')

await build({ ...sharedConfig, entryPoints: ['src/components/segmented/segmented.ts'], format: 'esm', outfile: 'dist/segmented.js' })
console.log('dist/segmented.js')

await build({ ...sharedConfig, entryPoints: ['src/components/select/select.ts'], format: 'esm', outfile: 'dist/select.js' })
console.log('dist/select.js')

console.log('\nBuild complete.')
