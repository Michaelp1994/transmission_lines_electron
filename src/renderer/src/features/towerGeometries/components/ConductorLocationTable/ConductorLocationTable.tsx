import { Plus, X } from "lucide-react";

import { ArrayHelpers, FieldArray, FormikProps } from "formik";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "component-library";

import FormInput from "@/components/FormInput";
import { Table, TableBody, TableHead } from "@/components/SimpleTable";

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
                    <CardHeaderText>
                        <CardTitle>Conductor Configuration</CardTitle>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button
                            size="icon"
                            variant="secondary"
                            type="button"
                            onClick={() => push(addLocation())}
                        >
                            <Plus />
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <tr>
                                <th id="number">Number</th>
                                <th id="xcoord">X (m)</th>
                                <th id="ycoord">Y (m)</th>
                                <th id="actions">Actions</th>
                            </tr>
                        </TableHead>
                        <TableBody>
                            {form.values.conductors.map((_, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <FormInput
                                            aria-labelledby="xcoord"
                                            name={`conductors[${index}].x`}
                                            type="number"
                                            placeholder="Example"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <FormInput
                                            aria-labelledby="ycoord"
                                            name={`conductors[${index}].y`}
                                            type="number"
                                            placeholder="Example"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            aria-labelledby="actions"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            disabled={
                                                form.values.conductors.length <=
                                                1
                                            }
                                        >
                                            <X />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}
    />
);

export default ConductorLocationTable;
