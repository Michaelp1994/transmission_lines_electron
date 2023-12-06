import {
  Circuit,
  Fault,
  Isource,
  Line,
  LineGeometry,
  LineSpacing,
  Reactor,
  Vsource,
  WireData,
} from "opendss-node-interface";
import conductors from "./conductors.json";
import geometries from "./geometries.json";

export default function buildScript(sources, transmissionLines) {
  const source = sources[0];

  const circuit = new Circuit(source.name, {
    bus1: `B_${source.name}`,
    phases: source.phases,
    pu: 1,
    Isc3: source.isc3,
    x1r1: source.x1r1,
    Isc1: source.isc1,
    x0r0: source.x0r0,
    basekv: source.voltage,
    basefreq: 60,
    // Model: "Ideal",
  });

  const reactor = new Reactor(source.name + "_RT", {
    bus1: `B_${source.name}.4`,
    bus2: `B_${source.name}.0`,
    R: source.resistance,
    X: 0,
    phases: 1,
  });
  circuit.add(reactor);

  sources.forEach((sourceData) => {
    const source = new Vsource(sourceData.name, {
      bus1: `B_${sourceData.name}`,
      phases: sourceData.phases,
      pu: 1,
      Isc3: sourceData.isc3,
      x1r1: sourceData.x1r1,
      Isc1: sourceData.isc1,
      x0r0: sourceData.x0r0,
      basekv: sourceData.voltage,
      basefreq: 60,
    });
    circuit.add(source);

    const reactor = new Reactor(sourceData.name + "_RT", {
      bus1: `B_${sourceData.name}.4`,
      bus2: `B_${sourceData.name}.0`,
      R: sourceData.resistance,
      X: 0,
      phases: 1,
    });
    circuit.add(reactor);
  });

  const linnet = new WireData({
    name: "Linnet",
    diam: 18.29,
    radunits: "mm",
    Rac: 0.2081,
    Runits: "km",
    Rdc: 0.1736,
    GMRac: 7.41,
    GMRunits: "mm",
  });

  const ehs = new WireData({
    name: "ehs_5_16ths",
    diam: 7.94,
    radunits: "mm",
    Rac: 5.25,
    Runits: "km",
    GMRac: 4.6073483,
    GMRunits: "mm",
  });
  circuit.add(linnet);
  circuit.add(ehs);

  const allGeometries = transmissionLines.map(
    (transmissionLine) => transmissionLine.geometry
  );
  allGeometries.forEach((geometryId: number) => {
    const geometryData = geometries.find(
      (geometry) => geometry.id == geometryId
    );
    if (!geometryData) throw Error("Can't find geometry.");
    const spacing = new LineSpacing(geometryData.name, {
      nconds: geometryData.locations.length,
      nphases: geometryData.locations.length,
      x: geometryData.locations.map((conductor) => conductor.x),
      h: geometryData.locations.map((conductor) => conductor.y),
      units: "m",
    });
    circuit.add(spacing);
  });
  // START HERE.

  transmissionLines.forEach((transmissionLine: TransmissionLine) => {
    const towers = [];
    const spanLength = transmissionLine.distance / transmissionLine.numTowers;
    for (let i = 0; i < transmissionLine.numTowers; i++) {
      towers.push({
        name: `${transmissionLine.name}_T${i}`,
        resistance: transmissionLine.towerResistance,
        distance: spanLength,
        geometry: transmissionLine.geometry,
      });
    }

    const geometryData = geometries.find(
      (geometry) => geometry.id == transmissionLine.geometry
    );
    if 
      geometry = new LineGeometry({
        name: `${transmissionLine.name}_${geometry.name}`,
        nconds: 8,
        reduce: false,
        spacing: geometryData.name,
        wires: this.conductors.map((conductor) => conductor.type.name),
      });
      circuit.add(geometry)
    });

    const numConductors = 8;
    const phases = "1.2.3.1.2.3.4.4";
    fromSource = sources.find(source => source.id =)
    const neutralBus1Phases = "0.0.0.0.0.0.0.0";
    const neutralBus2Phases = new Array(this.numNeutrals).fill(0).join(".");
    towers.forEach((tower, index) => {
      const towerNumber = index + 1;
      if (towerNumber === 1) {
          const line = new Line({
            name: `${transmissionLine.name}_s${index}`,
            bus1: `B_${sources[transmissionLine.from].name}.${phases}`,
            bus2: tower.name,
            phases: transmissionLine.phases,
            length: tower.distance,
            units: "m",
            geometry: `${transmissionLine.name}_${tower.geometry.name}`,
          })
          circuit.add(line)
          const reactor = new Reactor(tower.name + "_RT", {
            bus1: `${tower.name}.${neutralBus1Phases}`,
            bus2: `${tower.name}.${neutralBus2Phases}`,
            R: tower.resistance,
            X: 0,
            phases: 2,
          })
          circuit.add(reactor)
      } else {
        const prevName = towers[index - 1].name;
        components.push(
          new Line(`${this.name}_s${index}`, {
            bus1: prevName,
            bus2: tower.name,
            length: tower.distance,
            phases: this.distance,
            units: "m",
            geometry: `${this.name}_${tower.geometry.name}`,
          })
        );
        components.push(
          new Reactor(`${tower.name}_RT`, {
            bus1: `${tower.name}.${neutralBus1Phases}`,
            bus2: `${tower.name}.${neutralBus2Phases}`,
            R: tower.resistance,
            X: 0,
            phases: this.numNeutrals,
          })
        );
        if (towerNumber === this.towers.length) {
          components.push(
            new Line(`${this.name}_s${index + 1}`, {
              bus1: tower.name,
              bus2: `${this.toSource.name}.${finalPhases}`,
              length: tower.distance,
              phases: this.distance,
              units: "m",
              geometry: `${this.name}_${tower.geometry.name}`,
            })
          );
        }
      }
    });
    return components;
  });
}
