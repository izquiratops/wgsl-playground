import { build } from "esbuild";
import fs from 'fs'

const result = await build({
  entryPoints: ['./src/main.ts'],
  bundle: true,
  sourcemap: true,
  target: 'es2015',
  format: 'esm',
  minify: true,
  metafile: true,
  outfile: './dist/js/app.js',
  tsconfig: './tsconfig.json',
  loader: {
    '.wgsl': 'text'
  },
}).catch(() => process.exit(1));

fs.writeFileSync('meta.json', JSON.stringify(result.metafile))
