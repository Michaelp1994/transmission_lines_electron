import { ElectronAPI } from "@electron-toolkit/preload";
//import { Api } from "@api/api";
declare global {
    interface Window {
        electron: ElectronAPI;
        //api: Api;
    }
}
