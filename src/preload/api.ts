/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any */
import ApiEvent from "@shared/ApiEvent";
import { ipcRenderer } from "electron";

export default {
    invoke: (channel: ApiEvent, data: any) => {
        return ipcRenderer.invoke(channel, data);
    },

    onInvalidateCache: (listener: () => void) => {
        return ipcRenderer.on(ApiEvent.InvalidateCache, listener);
    },
};
