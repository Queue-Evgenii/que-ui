import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { buildSync } from 'esbuild'
import { unlinkSync } from 'fs'

const __dir = fileURLToPath(new URL('.', import.meta.url))
const PORT  = 3000
const TMP   = join(__dir, '__tokens_tmp.mjs')

// Bundle tokens once at startup, import, clean up
buildSync({ entryPoints: ['src/tokens/index.ts'], bundle: true, format: 'esm', outfile: TMP })
const { defaultTokens, defaultDarkTokens } = await import(pathToFileURL(TMP).href)
unlinkSync(TMP)

function toCSSVars(tokens) {
  return Object.entries(tokens).map(([k, v]) => `  --que-${k}: ${v};`).join('\n')
}

const themeCSS = `<style>
:root, [data-theme="light"] { ${'\n'}${toCSSVars(defaultTokens)} }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { ${'\n'}${toCSSVars({ ...defaultTokens, ...defaultDarkTokens })} }
}
[data-theme="dark"] { ${'\n'}${toCSSVars({ ...defaultTokens, ...defaultDarkTokens })} }
</style>`

createServer(async (req, res) => {
  const html = await readFile(join(__dir, 'preview', 'index.html'), 'utf8')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(html.replace('</head>', `${themeCSS}\n</head>`))
}).on('error', e => {
  if (e.code === 'EADDRINUSE') console.error(`\n  Port ${PORT} is already in use. Kill the process: npx kill-port ${PORT}\n`)
  else throw e
}).listen(PORT, () => console.log(`\n  que-ui preview → http://localhost:${PORT}\n`))
