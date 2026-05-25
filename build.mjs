import { build } from 'esbuild'
import { argv } from 'process'

const watch = argv.includes('--watch')

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  external: [],
}

await Promise.all([
  build({
    ...shared,
    format: 'esm',
    outfile: 'dist/index.js',
    ...(watch ? { watch: true } : {}),
  }),
  build({
    ...shared,
    format: 'cjs',
    outfile: 'dist/index.cjs',
  }),
])

console.log('Build complete')
