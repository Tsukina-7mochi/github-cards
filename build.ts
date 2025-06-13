import { timeStamp } from "node:console";
import * as readline from "node:readline";
import * as esbuild from "esbuild";

const buildResultPlugin = (): esbuild.Plugin => ({
  name: "build-result",
  setup(build) {
    build.onEnd((result) => {
      const now = new Date();
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      const second = String(now.getSeconds()).padStart(2, "0");
      const timestamp = `${hour}:${minute}:${second}`;

      const numErrors = result.errors.length;
      const numWarnings = result.warnings.length;

      if (numErrors > 0) {
        console.error(
          `[${timeStamp}] Build failed with ${numErrors} error(s) and ${numWarnings} warning(s).`
        );
      } else if (numWarnings > 0) {
        console.warn(
          `[${timeStamp}] Build completed with ${numWarnings} warning(s).`
        );
      } else {
        console.log(`[${timestamp}] Build completed successfully.`);
      }
    });
  },
});

async function main() {
  let watch = false;

  for (const arg of process.argv.slice(2)) {
    if (arg === "-w" || arg === "--watch") {
      watch = true;
    }
  }

  const options = {
    entryPoints: [{ in: "./src/main.ts", out: "main" }],
    bundle: true,
    outdir: "./dist",
    format: "esm",
    platform: "browser",
    minify: true,
    sourcemap: "linked",
    treeShaking: true,
    plugins: [buildResultPlugin()],
  } satisfies esbuild.BuildOptions;

  if (!watch) {
    console.log("Building...");

    // esbuild will throw an error if the build fails
    await esbuild.build(options);

    console.log("Build completed successfully.");

    return;
  }

  const ctx = await esbuild.context(options);
  await ctx.watch();

  console.log("Watching for changes...");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  rl.on("line", (line_) => {
    const line = line_.trim();
    if (line === "r") {
      ctx.rebuild();
    } else if (line === "q") {
      rl.close();
    }
  });

  rl.once("close", async () => {
    await ctx.dispose();
    process.exit(0);
  });
}

main();
