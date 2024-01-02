import { shell, BrowserWindow } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";
import appIcon from "../../resources/favicon.ico?asset";
import createMenu from "./createMenu";

export default function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        icon: appIcon,
        // ...(process.platform === "linux" ? { icon: "favicon.ico" } : {}),
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            // sandbox: true,
            // nodeIntegration: false,
            // contextIsolation: true,
        },
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
        mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
    createMenu();
    return mainWindow;
}
