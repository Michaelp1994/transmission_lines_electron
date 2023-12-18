// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    root: true,
    ignorePatterns: ["node_modules", "dist", "build", "coverage", "out"],
    //extends: ["@electron-toolkit/eslint-config-ts/recommended"],
    env: {
        es2023: true,
    },
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        EXPERIMENTAL_useProjectService: true,
    },

    overrides: [
        {
            files: ["src/main/**/*.ts", "src/database/**/*.ts"],
            env: {
                node: true,
                es2023: true,
            },

            extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
        },
        {
            files: ["src/preload/**/*.ts"],
            extends: ["@electron-toolkit/eslint-config-ts/recommended"],
        },
        {
            files: ["src/renderer/**/*.ts", "src/renderer/**/*.tsx"],
            env: {
                browser: true,
                es2023: true,
            },
            extends: [
                "airbnb",
                "airbnb-typescript",
                "airbnb/hooks",
                "plugin:react/jsx-runtime",
                "prettier",
            ],
            rules: {
                "react/prop-types": 0,
                "react/no-array-index-key": 0,
                "react/jsx-no-bind": 0,
                // LEGIT BELOW
                "@typescript-eslint/no-use-before-define": 0,
                "react/function-component-definition": [
                    2,
                    { namedComponents: "arrow-function" },
                ],
                "import/extensions": [
                    "error",
                    {
                        ignorePatterns: true,
                        pattern: {
                            js: "never",
                            jsx: "never",
                            ts: "never",
                            tsx: "never",
                        },
                    },
                ],
            },
        },
    ],
});
