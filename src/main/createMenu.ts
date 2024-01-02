import migrationMenu from "@database/migrationMenu";
import { Menu } from "electron";

export default function createMenu() {
    const template: Electron.MenuItemConstructorOptions[] = [migrationMenu];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}
