import styled from "styled-components";
import { ArrayHelpers, FieldArray, FormikProps } from "formik";

import BaseButton from "@/components/BaseButton";
import { ConductorTypeSelect } from "@/features/conductorTypes";
import FormInput from "@/components/FormInput";
import GenerateConductorsModal from "@/features/transmissionLines/components/GenerateConductorsModal";
import {
    Card,
    CardHeader,
    CardTitle,
    CardHeaderActions,
    CardContent,
} from "@/components/BaseCard";

interface GenerateConductorsInput {
    phases: number;
    circuits: number;
    neutrals: number;
    phaseConductorTypeId: number;
    neutralConductorTypeId: number;
}
type ArrayHelper = ArrayHelpers<GenerateConductorsInput[]> & {
    form: FormikProps<TransmissionLineInput>;
    name: string;
};
interface Props {}

const newConductor = {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    bundleNumber: 1,
    bundleSpacing: 0,
    type: 0,
};

function generateConductors(values: GenerateConductorsInput) {
    const newConductors: ConductorInput[] = [];
    for (let i = 0; i < values.circuits; i++) {
        for (let j = 0; j < values.phases; j++) {
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
    for (let i = 0; i < values.neutrals; i++) {
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

const ConductorConfigurationTable: React.FC<Props> = () => (
    <FieldArray
        name="conductors"
        render={(arrayHelpers: ArrayHelper) => (
            <Card>
                <CardHeader>
                    <CardTitle>Conductor Configuration</CardTitle>
                    <CardHeaderActions>
                        <GenerateConductorsModal
                            onSubmit={(values) =>
                                arrayHelpers.form.setFieldValue(
                                    "conductors",
                                    generateConductors(values)
                                )
                            }
                        />
                        <BaseButton
                            type="button"
                            onClick={() =>
                                arrayHelpers.form.setFieldValue("conductors", [
                                    newConductor,
                                ])
                            }
                            disabled={
                                arrayHelpers.form.values.conductors.length === 1
                            }
                        >
                            Remove All
                        </BaseButton>
                        <BaseButton
                            type="button"
                            onClick={() => arrayHelpers.push(newConductor)}
                        >
                            Add
                        </BaseButton>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <Table>
                        <Row>
                            <RowHeader>Name</RowHeader>
                            <RowHeader>From Phase</RowHeader>
                            <RowHeader>To Phase</RowHeader>
                            <RowHeader>Bundle Number</RowHeader>
                            <RowHeader>Bundle Spacing</RowHeader>
                            <RowHeader>Type</RowHeader>
                            <RowHeader>Actions</RowHeader>
                        </Row>
                        {arrayHelpers.form.values.conductors.map((_, index) => (
                            <Row key={index}>
                                <FormInput
                                    name={`conductors[${index}].name`}
                                    type="text"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`conductors[${index}].fromPhase`}
                                    type="text"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`conductors.${index}.toPhase`}
                                    type="text"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`conductors.${index}.bundleNumber`}
                                    type="number"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`conductors.${index}.bundleSpacing`}
                                    type="number"
                                    placeholder="Example"
                                    required
                                />
                                <ConductorTypeSelect
                                    name={`conductors.${index}.type`}
                                />
                                <BaseButton
                                    onClick={() => arrayHelpers.remove(index)}
                                >
                                    Remove
                                </BaseButton>
                            </Row>
                        ))}
                    </Table>
                </CardContent>
            </Card>
        )}
    />
);

const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const RowHeader = styled.div`
    display: block;
    flex: 1;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    gap: 0.75rem;

    & > * {
        flex: 1;
    }
`;

export default ConductorConfigurationTable;
