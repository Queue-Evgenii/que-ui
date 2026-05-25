import { build } from 'esbuild'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { join } from 'path'

const __dir = fileURLToPath(new URL('.', import.meta.url))
const TMP   = join(__dir, '__tokens_tmp.mjs')

mkdirSync('dist', { recursive: true })

// Bundle tokens + utilities into a temp file to extract values
await build({ entryPoints: ['src/index.ts'], bundle: true, format: 'esm', outfile: TMP })
const { defaultTokens, defaultDarkTokens, utilitiesCSS } = await import(pathToFileURL(TMP).href)
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

// Build ESM bundle
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/index.js',
  sourcemap: true,
})

console.log('dist/index.js')

// Build CJS bundle
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'cjs',
  outfile: 'dist/index.cjs',
  sourcemap: true,
})

console.log('dist/index.cjs')
console.log('\nBuild complete.')
