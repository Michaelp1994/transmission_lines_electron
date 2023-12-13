import { ConductorType } from "@models/ConductorType.model";
import buildScript from "./buildScript";
import { ipcMain } from "electron";

export default function setupPorts() {
  ipcMain.on("send-port", (event) => {
    const port = event.ports[0];

    port.on("message", async (event) => {
      try {
        const results = await buildScript(
          event.data.sources,
          event.data.transmissionLines
        );
        port.postMessage(results);
      } catch (e) {
        throw e;
      }
    });
    port.start();
  });

  ipcMain.handle("get-conductors", async () => {
    console.log("get-conductors");
    const allConductorTypes = await ConductorType.find();
    console.log(allConductorTypes);
    return allConductorTypes;
  });
}
