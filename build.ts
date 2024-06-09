import { Command } from 'cliffy';
import * as esbuild from 'esbuild';
import esbuildCachePlugin from 'esbuild-plugin-cache';
import * as path from 'std/path/mod.ts';

import { babelPlugin } from './plugins/babelPlugin.ts';

const srcPath = path.resolve('./src');
const destPath = path.resolve('./dist');
const examplePath = path.resolve('./example');

const lockMap = JSON.parse(await Deno.readTextFile('./deno.lock'));
const importMap = JSON.parse(await Deno.readTextFile('./import_map.json'));
const denoCacheDirectory = await esbuildCachePlugin.util.getDenoDir();

const { options } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode')
  .option('-s, --serve', 'serve mode')
  .parse(Deno.args);

const buildOptions = (dev = false, watch = false): esbuild.BuildOptions => ({
  entryPoints: [
    { in: path.join(srcPath, 'mod.ts'), out: 'ghCards' },
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  plugins: [
    esbuildCachePlugin({
      denoCacheDirectory,
      lockMap,
      importMap,
    }),
    babelPlugin({
      filter: /\.js$/,
      verbose: true,
    }),
  ],
  sourcemap: dev ? 'inline' : 'linked',
  minify: !dev,
});

const config = buildOptions(options.dev, options.watch || options.serve);

if (!(options.watch || options.serve)) {
  await esbuild.build(config);
  Deno.exit();
}

const ctx = await esbuild.context(config);
await ctx.watch();
console.log('Watching...');

if (options.serve) {
  const { host, port } = await ctx.serve({
    servedir: config.outdir,
  });
  console.log(`Serving on ${host}:${port}`);
}

const decoder = new TextDecoder();
for await (const chunk of Deno.stdin.readable) {
  const text = decoder.decode(chunk).trim();

  if (text === 'r') {
    await ctx.rebuild().catch(() => {});
  } else if (text === 'q') {
    await ctx.dispose();
    break;
  }
}

await esbuild.stop();
