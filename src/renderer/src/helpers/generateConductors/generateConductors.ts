export interface GenerateConductorsInput {
    phases: number;
    circuits: number;
    neutrals: number;
    phaseConductorTypeId: number;
    neutralConductorTypeId: number;
}

export function generateConductors(values: GenerateConductorsInput) {
    const newConductors: ConductorInput[] = [];
    for (let i = 0; i < values.circuits; i += 1) {
        for (let j = 0; j < values.phases; j += 1) {
            newConductors.push({
                name: `${String.fromCharCode(65 + j)}${i + 1}`,
                fromPhase: j + 1,
                toPhase: j + 1,
                bundleNumber: 1,
                bundleSpacing: 0,
                type: values.phaseConductorTypeId,
            });
        }
    }
    for (let i = 0; i < values.neutrals; i += 1) {
        newConductors.push({
            name: `N${i + 1}`,
            fromPhase: 99,
            toPhase: 99,
            bundleNumber: 1,
            bundleSpacing: 0,
            type: values.neutralConductorTypeId,
        });
    }
    return newConductors;
}
