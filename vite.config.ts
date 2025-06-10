import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: "./src/main.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    tsconfigPaths(),
  ],
});
