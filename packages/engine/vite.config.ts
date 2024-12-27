import { defineConfig } from "vite";
import deletePlugin from "rollup-plugin-delete";
import typescript from "vite-plugin-typescript";
import copy from "rollup-plugin-copy";

export default defineConfig({
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
    minify: false,
    rollupOptions: {
      plugins: [
        deletePlugin({ targets: "dist/*", runOnce: true }),
        copy({
          targets: [
            {
              src: "src/generated/*.wasm.d.ts",
              dest: "dist/generated",
            },
          ],
          hook: "writeBundle",
        }),
      ],
      preserveEntrySignatures: "exports-only",
      input: ["./src/index.ts", "./src/runtime/node.ts"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        dir: "dist",
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: (info) => {
          if (info.names[0] === "core_bg.wasm") {
            return info.originalFileNames[0].replace(/^src\//, "");
          }
          return "[name][extname]";
        },
      },
      external: ["node:fs", "node:path", "node:url"],
    },
  },
});
