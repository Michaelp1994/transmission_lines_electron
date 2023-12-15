import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin, swcPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  main: {
    plugins: [swcPlugin(), externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@shared": resolve("src/shared"),
        "@models": resolve("src/database/models"),
        "@database": resolve("src/database"),
        "@api": resolve("src/api"),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@shared": resolve("src/shared"),
        "@api": resolve("src/api"),
        "@models": resolve("src/database/models"),
        "@database": resolve("src/database"),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "@shared": resolve("src/shared"),
        "@api": resolve("src/api"),
      },
    },
    plugins: [react()],
  },
});
