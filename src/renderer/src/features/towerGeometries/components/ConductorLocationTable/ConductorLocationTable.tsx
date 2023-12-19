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

interface ConductorLocationArrayHelper
    extends ArrayHelpers<ConductorLocationsInput[]> {
    // eslint-disable-next-line react/no-unused-prop-types
    form: FormikProps<TowerGeometryInput>;
    // eslint-disable-next-line react/no-unused-prop-types
    name: string;
}

interface Props {}

const newLocation: ConductorLocationsInput = Object.freeze({
    x: 0,
    y: 0,
});

function addLocation() {
    return {
        ...newLocation,
    };
}

const ConductorLocationTable: React.FC<Props> = () => (
    <FieldArray
        name="conductors"
        render={({ form, push, remove }: ConductorLocationArrayHelper) => (
            <Card>
                <CardHeader>
                    <CardTitle>Conductor Configuration</CardTitle>
                    <CardHeaderActions>
                        <BaseButton
                            type="button"
                            onClick={() => push(addLocation())}
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
                                    name={`conductors[${index}].x`}
                                    type="number"
                                    placeholder="Example"
                                    required
                                />
                                <FormInput
                                    name={`conductors[${index}].y`}
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
