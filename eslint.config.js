import eslintTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray} */
export default [
    {
        files: [
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs",
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts",
        ],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: "./tsconfig.json",
                // typescript-eslint specific options
                warnOnUnsupportedTypeScriptVersion: true,
                EXPERIMENTAL_useProjectService: true,
            },
        },
        plugins: {
            "@typescript-eslint": {
                rules: eslintTypescript.rules,
            },
        },
        settings: {
            "import/resolver": {
                // Load <rootdir>/tsconfig.json
                typescript: {
                    // Always try resolving any corresponding @types/* folders
                    alwaysTryTypes: true,
                },
            },
        },
    },
];
