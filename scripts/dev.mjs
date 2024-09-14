import { context } from "esbuild";

const ctx = await context({
  entryPoints: ['./src/main.ts'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  minify: false,
  outfile: './dist/js/app.js',
  tsconfig: './tsconfig.json',
  loader: {
    '.wgsl': 'text'
  }
}).catch(() => process.exit(1));

let { host, port } = await ctx.serve({
  servedir: 'dist',
});

console.log(`Server started: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
