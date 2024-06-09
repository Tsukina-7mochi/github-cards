import * as babel from '@babel/core';
import '@babel/plugin-proposal-decorators';
import * as esbuild from 'esbuild';
import * as fs from 'std/fs/mod.ts';
import * as path from 'std/path/mod.ts';

type BabelPluginOotions = {
  filter: RegExp;
  verbose?: boolean;
};

const sourceMapRegExp = /\.map$/;

export const babelPlugin = (options: BabelPluginOotions): esbuild.Plugin => ({
  name: 'babel-plugin',
  setup(build) {
    if (build.initialOptions.write === false) {
      throw Error('BuildOptions.write is already set to false. Babel plugin cannot work with this configuration.');
    }
    build.initialOptions.write = false;

    build.onEnd(async (result) => {
      const outputFiles = result.outputFiles ?? [];
      const sourceMaps = outputFiles.filter((file) => sourceMapRegExp.test(file.path));

      await Promise.all(sourceMaps.map(async (file) => {
        await fs.ensureDir(path.dirname(file.path));
        await Deno.writeFile(file.path, file.contents);
      }));

      await Promise.all(
        (result.outputFiles ?? []).map(async (file) => {
          if (sourceMapRegExp.test(file.path)) {
            return;
          }
          if (!options.filter.test(file.path)) {
            await fs.ensureDir(path.dirname(file.path));
            await Deno.writeFile(file.path, file.contents);
            return;
          }

          const babelResult = await babel.transformAsync(file.text, {
            inputSourceMap: true,
            plugins: [
              ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
            ],
          });

          await fs.ensureDir(path.dirname(file.path));
          await Deno.writeTextFile(file.path, babelResult.code);
          if (babelResult.map) {
            await Deno.writeTextFile(`${file.path}.map`, JSON.stringify(babelResult.map));
          }

          if (options.verbose) {
            console.log(`Transformed with babel: ${file.path}`);
          }
        }),
      );
    });
  },
});
