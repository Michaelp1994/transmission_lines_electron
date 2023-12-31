import { Plus, X } from "lucide-react";

import { ArrayHelpers, FieldArray, FormikProps } from "formik";
import { useTranslation } from "react-i18next";

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

const ConductorLocationTable: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <FieldArray
            name="conductors"
            render={({ form, push, remove }: ConductorLocationArrayHelper) => (
                <Card>
                    <CardHeader>
                        <CardHeaderText>
                            <CardTitle>{t("conductorConfiguration")}</CardTitle>
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
                                    <th id="number">{t("number")}</th>
                                    <th id="xcoord">{t("xCoord")}</th>
                                    <th id="ycoord">{t("yCoord")}</th>
                                    <th id="actions">{t("actions")}</th>
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
                                                    form.values.conductors
                                                        .length <= 1
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
};

export default ConductorLocationTable;
