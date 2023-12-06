import project from "./src/assets/project.json";
import { runScript } from "./electron/runScript";
// @ts-ignore
import winax from "winax";

const dss = winax.Object("OpenDSSengine.DSS");
const dssText = dss.Text;
const dssCircuit = dss.ActiveCircuit;

runScript(dssText, project);
