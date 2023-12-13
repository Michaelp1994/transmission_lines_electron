import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      sendPort: (port: MessagePort) => void;
      getConductors: () => Promise<any>;
    };
  }
}
