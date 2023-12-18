import styled from "styled-components";
import React from "react";
import { ArrayHelpers, FieldArray, FormikProps } from "formik";
import {
    Card,
    CardHeader,
    CardTitle,
    CardHeaderActions,
    CardContent,
} from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";

interface Props {}

type ArrayHelper = ArrayHelpers<ConductorLocationsInput[]> & {
    form: FormikProps<TowerGeometryInput>;
    name: string;
};

const newLocation: ConductorLocationsInput = Object.freeze({
    x: 0,
    y: 0,
});

const ConductorLocationTable: React.FC<Props> = () => (
    <FieldArray
        name="locations"
        render={({ form, push, remove }: ArrayHelper) => (
            <Card>
                <CardHeader>
                    <CardTitle>Conductor Configuration</CardTitle>
                    <CardHeaderActions>
                        <BaseButton
                            type="button"
                            onClick={() => push(newLocation)}
                        >
                            Add
                        </BaseButton>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <Table>
                        <Row>
                            <RowHeader>Number</RowHeader>
                            <RowHeader>X</RowHeader>
                            <RowHeader>Y</RowHeader>
                        </Row>
                        {form.values.conductors.map((_, index) => (
                            <Row key={index}>
                                <div>{index + 1}</div>
                                <FormInput
                                    name={`locations[${index}].x`}
                                    type="number"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`locations[${index}].y`}
                                    type="number"
                                    placeholder="Example"
                                    required
                                />
                                <BaseButton onClick={() => remove(index)}>
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
export default ConductorLocationTable;
