import conductors from "@/assets/conductors.json";
import geometries from "@/assets/geometries.json";

type Project = {
  sources: Source[];
  transmissionLines: TransmissionLine[];
};

function generateScript(project: Project) {
  let script = "clearAll\n";
  script += "set EarthModel=FullCarson\n";
  script += "set voltagebases=[230]\n";

  project.sources.forEach((source, index) => {
    if (index === 0) {
      script += generateCircuit(source);
    } else {
      script += generateVSource(source);
    }
  });
  script += generateGeometries(project);
  project.transmissionLines.forEach(
    (transmissionLine) =>
      (script += generateTransmissionLine(transmissionLine, project.sources))
  );
  script += `solve\n`;
  script += `Show Currents Elements`;
  return script;
}

function generateCircuit(source: Source) {
  let script = "";
  script += `New Circuit.${source.name} bus1=B_${source.name} basekv=${source.voltage} phases=${source.phases} pu=1.0\n`;
  script += `~ x1r1=${source.x1r1} Isc3 = ${source.isc3}\n`;
  script += `~ x0r0 = ${source.x0r0} Isc1 = ${source.isc1}\n`;
  script += `New Reactor.${source.name}_RT bus1=B_${source.name}.4.5 bus2=B_${source.name}.0.0 phases=2 R=${source.resistance} X=0\n\n`;
  return script;
}

function generateVSource(source: Source) {
  let script = "";
  script += `New Vsource.${source.name} bus1=B_${source.name} basekv=${source.voltage} phases=${source.phases} pu=1.0\n`;
  script += `~ x1r1=${source.x1r1} Isc3 = ${source.isc3}\n`;
  script += `~ x0r0 = ${source.x0r0} Isc1 = ${source.isc1}\n`;
  script += `New Reactor.${source.name}_RT bus1=B_${source.name}.4.5 bus2=B_${source.name}.0.0 phases=2 R=${source.resistance} X=0\n\n`;
  return script;
}

function generateGeometries(project: Project) {
  const geometriesIds = project.transmissionLines.map((tl) => {
    return tl.geometry;
  });
  const uniqueGeometries = [...new Set(geometriesIds)];
  const conductorIds: number[] = [];
  let geometryScript = "";
  uniqueGeometries.forEach((geometryId) => {
    const geometry = geometries.find((geometry) => geometry.id == geometryId);
    if (!geometry) throw Error;
    geometryScript += `New LineGeometry.${geometry.name} nconds=5 nphases=3 units=m reduce=no\n`;
    geometry.conductors.forEach((conductor, index) => {
      const wire = conductors.find(
        (conductorTypes) => conductorTypes.id == conductor.wire
      );
      if (!wire) throw Error;
      const wireName = wire.name;
      conductorIds.push(conductor.wire);
      geometryScript += `~ cond=${index + 1} Wire=${wireName} x=${
        conductor.xcoord
      } h=${conductor.ycoord}\n`;
    });
  });
  let conductorScript = "";
  const uniqueConductors = [...new Set(conductorIds)];
  console.log(uniqueConductors);
  uniqueConductors.forEach((conductorId) => {
    const wire = conductors.find((conductor) => conductor.id == conductorId);
    if (!wire) throw Error;
    // const wire = conductors[conductorId];
    conductorScript += `New Wiredata.${wire.name}\n`;
    conductorScript += `~ diam=${wire.diameter_conductor} radunit=mm\n`;
    conductorScript += `~ RAC = ${wire.ac_resistance_75} Runits=km\n`;
    conductorScript += `~ GMRac = ${wire.gmr} gmrunit=mm\n`;
  });
  return conductorScript + "\n" + geometryScript + "\n";
}

function generateTransmissionLine(tl: TransmissionLine, sources: Source[]) {
  const spanLength = ((tl.distance * 1000) / tl.numTowers).toFixed(0);
  const geometry = geometries.find((geometry) => geometry.id == tl.geometry);
  if (!geometry) throw Error;
  // const geometry = geometries[tl.geometry].name;
  const from = sources[tl.from].name;
  const to = sources[tl.to].name;
  const name = tl.name;
  const resistance = tl.towerResistance;
  const numTowers = tl.numTowers;
  const defaultLineConfig = ` phases=${tl.phases} length=${spanLength} units=m geometry=${geometry.name} Xg=0 Rg=0 rho=100\n`;
  const defaultReactorConfig = ` phases=2 R=${resistance} X=0\n\n`;
  // First Line
  let script =
    `New line.${name}_L1 bus1=B_${from} bus2=${name}_T1` +
    defaultLineConfig +
    "\n";

  for (let i = 1; i < tl.numTowers; i++) {
    script +=
      `New line.${name}_L${i + 1} bus1=${name}_T${i} bus2=${name}_T${i + 1}` +
      defaultLineConfig;
    script +=
      `New Reactor.T${i}_RT bus1=${name}_T${i}.4.5 bus2=${name}_T${i}.0.0` +
      defaultReactorConfig;
  }
  //Last Line
  script +=
    `New line.${name}_L${
      numTowers + 1
    } bus1=${name}_T${numTowers} bus2=B_${to}` + defaultLineConfig;
  script +=
    `New Reactor.T${numTowers}_RT bus1=${name}_T${numTowers}.4.5 bus2=${name}_T${numTowers}.0.0` +
    defaultReactorConfig;

  return script;
}

export { generateTransmissionLine, generateVSource, generateScript };
