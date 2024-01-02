import styled from "styled-components";
import { ArrayHelpers, FieldArray, FormikProps } from "formik";
import {
    Button,
    Card,
    CardHeader,
    CardHeaderText,
    CardHeaderActions,
    CardTitle,
    CardContent,
    CardDescription,
} from "component-library";
import { Plus, X } from "lucide-react";

import { ConductorTypeSelect } from "@/features/conductorTypes";
import FormInput from "@/components/FormInput";
import GenerateConductorsModal from "@/features/transmissionLines/components/GenerateConductorsModal";
import {
    GenerateConductorsInput,
    generateConductors,
} from "@/helpers/generateConductors/generateConductors";

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

const ConductorConfigurationTable: React.FC<Props> = () => (
    <FieldArray
        name="conductors"
        render={(arrayHelpers: ArrayHelper) => (
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Conductor Configuration</CardTitle>
                        <CardDescription>
                            Configure the conductors for the Transmission line.
                        </CardDescription>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <GenerateConductorsModal
                            onSubmit={(values) =>
                                arrayHelpers.form.setFieldValue(
                                    "conductors",
                                    generateConductors(values)
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() =>
                                arrayHelpers.form.setFieldValue("conductors", [
                                    newConductor,
                                ])
                            }
                            disabled={
                                arrayHelpers.form.values.conductors.length === 1
                            }
                        >
                            <X />
                        </Button>
                        <Button
                            type="button"
                            size="icon"
                            onClick={() => arrayHelpers.push(newConductor)}
                        >
                            <Plus />
                        </Button>
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
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    disabled={
                                        arrayHelpers.form.values.conductors
                                            .length === 1
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
                                >
                                    <X />
                                </Button>
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
