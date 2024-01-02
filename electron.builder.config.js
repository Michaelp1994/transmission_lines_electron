// @ts-check

/** @type import("electron-builder").Configuration
 * @see https://github.com/mighdoll/config-file-ts/pull/20
 * @see https://github.com/electron-userland/electron-builder/issues/7775
 * @see https://github.com/electron-userland/electron-builder/issues/7572
 */
module.exports = {
    appId: "com.electron.app",
    productName: "transmission-lines",
    directories: { buildResources: "build" },
    fileAssociations: [
        {
            ext: "study",
            name: "Transmission Line Study",
        },
    ],
    files: [
        "!**/.vscode/*",
        "!src/*",
        "!electron.vite.config.{js,ts,mjs,cjs}",
        "!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}",
        "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
        "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}",
    ],
    asarUnpack: ["resources/**"],
    win: { executableName: "Transmission Lines" },
    nsis: {
        artifactName: "${name} ${version} setup.${ext}",
        shortcutName: "${productName}",
        uninstallDisplayName: "${productName}",
        createDesktopShortcut: "always",
        perMachine: true,
    },
    mac: {
        entitlementsInherit: "build/entitlements.mac.plist",
        extendInfo: [
            {
                NSCameraUsageDescription:
                    "Application requests access to the device's camera.",
            },
            {
                NSMicrophoneUsageDescription:
                    "Application requests access to the device's microphone.",
            },
            {
                NSDocumentsFolderUsageDescription:
                    "Application requests access to the user's Documents folder.",
            },
            {
                NSDownloadsFolderUsageDescription:
                    "Application requests access to the user's Downloads folder.",
            },
        ],
        notarize: false,
    },
    dmg: { artifactName: "${name}-${version}.${ext}" },
    linux: {
        target: ["AppImage", "snap", "deb"],
        maintainer: "electronjs.org",
        category: "Utility",
    },
    appImage: { artifactName: "${name}-${version}.${ext}" },
    npmRebuild: true,
    publish: { provider: "generic", url: "https://example.com/auto-updates" },
};
