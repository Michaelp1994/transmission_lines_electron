import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin, swcPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    main: {
        build: {
            sourcemap: true,
        },
        plugins: [swcPlugin(), externalizeDepsPlugin()],
        resolve: {
            alias: {
                "@shared": resolve("src/shared"),
                "@models": resolve("src/main/database/models"),
                "@database": resolve("src/main/database"),
                "@api": resolve("src/main/api"),
            },
        },
    },
    preload: {
        build: {
            sourcemap: true,
        },
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                "@shared": resolve("src/shared"),
                "@models": resolve("src/database/models"),
                "@database": resolve("src/database"),
            },
        },
    },
    renderer: {
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                "@": resolve("src/renderer/src"),
                "@shared": resolve("src/shared"),
            },
        },
        plugins: [react()],
    },
});
