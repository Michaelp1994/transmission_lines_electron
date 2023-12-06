import { open } from "node:fs/promises";
import {
  Circuit,
  Fault,
  Isource,
  Line,
  LineGeometry,
  LineSpacing,
  Reactor,
  WireData,
} from "opendss-node-interface";
import towers from "./towers.json";

export async function buildCircuit() {
  const circuit = new Circuit("SE_Rifaina", {
    bus1: "DISCONNECTED", //"B_Rifaina",
    //   phases: 3,
    //   pu: 1,
    //   Isc3: 1820,
    //   x1r1: 2.59,
    //   Isc1: 1070,
    //   x0r0: 3.46,
    //   basekv: 138,
    //   basefreq: 60,
    Model: "Ideal",
  });

  const current_source = new Isource("SE_Rifaina_CC", {
    bus1: "B_Rifaina",
    amps: 1070,
    phases: 1,
    basefreq: 60,
  });

  const reactor = new Reactor("SE_Rifaina_RT", {
    bus1: "B_Rifaina.4",
    bus2: "B_Rifaina.0",
    R: 2,
    X: 0,
    phases: 1,
  });

  const phase = new WireData("Linnet", {
    diam: 18.29,
    radunits: "mm",
    Rac: 0.2081,
    Runits: "km",
    Rdc: 0.1736,
    GMRac: 7.41,
    GMRunits: "mm",
  });

  const neutral1 = new WireData("ehs_5_16th", {
    diam: 7.94,
    radunits: "mm",
    Rac: 5.25,
    Runits: "km",
    GMRac: 2.88222,
    GMRunits: "mm",
  });

  //   const neutral2 = new WireData("OPGW", {
  //     diam: 11.4,
  //     radunits: "mm",
  //     Rac: 0.966,
  //     Runits: "km",
  //     GMRac: 5.18, // FIXME:
  //     GMRunits: "mm",
  //   });

  const spacing = new LineSpacing("K1", {
    nconds: 8,
    nphases: 8, //FIXME:
    x: [-3.15, -3.15, -3.15, 3.15, 3.15, 3.15, -1.225, 1.225],
    h: [14.08, 17.74, 21.4, 14.08, 17.74, 21.4, 23.23, 23.23],
    units: "m",
  });

  const geometry1 = new LineGeometry("line1_K1", {
    nconds: 8,
    nphases: 8, //FIXME:
    spacing: spacing.name,
    reduce: false,
    wires: [
      "Linnet",
      "Linnet",
      "Linnet",
      "Linnet",
      "Linnet",
      "Linnet",
      "ehs_5_16th",
      "ehs_5_16th",
    ],
  });
  circuit.add(current_source);
  circuit.add(reactor);
  circuit.add(phase);
  circuit.add(neutral1);
  circuit.add(spacing);
  circuit.add(geometry1);

  const c = ".1.2.3.4.5.6.7.7";
  towers.reverse().forEach((tower, index) => {
    const name = "line1_" + tower.name;
    const towerNumber = index + 1;
    if (towerNumber === 1) {
      const line = new Line("line1_s" + towerNumber, {
        bus1: "B_Rifaina.1.2.3.1.2.3.4.4",
        bus2: "line1_T" + tower.name + c,
        phases: 8,
        length: tower.distance,
        units: "m",
        geometry: "line1_K1",
      });
      const reactor = new Reactor(name + "_RT", {
        bus1: "line1_T" + tower.name + ".7",
        bus2: "line1_T" + tower.name + ".0",
        R: 15,
        X: 0,
        phases: 1,
      });
      circuit.add(line);
      circuit.add(reactor);
    } else {
      const prevName = towers[index - 1].name;
      const line = new Line("line1_s" + towerNumber, {
        bus1: "line1_T" + prevName + c,
        bus2: "line1_T" + tower.name + c,
        length: tower.distance,
        phases: 8,
        units: "m",
        geometry: "line1_K1",
      });

      const reactor = new Reactor(name + "_RT", {
        bus1: "line1_T" + tower.name + ".7",
        bus2: "line1_T" + tower.name + ".0",
        R: 15,
        X: 0,
        phases: 1,
      });
      circuit.add(line);
      circuit.add(reactor);
    }
  });

  const results: Array<Array<string | number>> = [];

  const fault = new Fault("SHORT_CIRCUIT", {
    bus1: "B_Rifaina.1",
    bus2: "B_Rifaina.4",
    phases: 1,
  });

  circuit.add(fault);
  circuit.saveScript("./script.dss");
  circuit.build();
  circuit.setOptions({
    voltagebases: [230],
    earthModel: "FullCarson",
  });
  circuit.solve();

  // READING RESULTS
  // circuit.showCurrents();
  const current1 = circuit.readCurrent(reactor, 1);
  results.push(["SE_Rifaina", current1]);
  circuit.changeParameter(fault, "phases", "2");

  towers.forEach((tower) => {
    circuit.changeParameter(fault, "bus1", `line1_T${tower.name}.1`);
    circuit.changeParameter(fault, "bus2", `line1_T${tower.name}.7`);
    circuit.solve();

    const current1 = circuit.driver.readCurrent(
      `Reactor.line1_${tower.name}_RT`,
      1
    );
    // const current2 = circuit.driver.readCurrent(
    //   `Reactor.line1_${tower.name}_RT`,
    //   2
    // );
    results.push(["Torre_" + tower.name, current1]);
  });
  return results;
}
