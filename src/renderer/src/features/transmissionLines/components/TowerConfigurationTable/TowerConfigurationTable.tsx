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

import FormInput from "@/components/FormInput";
import TowerGeometrySelect from "../../../towerGeometries/components/TowerGeometrySelect";
import GenerateTowersModal from "../GenerateTowersModal";

interface GenerateTowersInput {
    name: string;
    numTowers: number;
    resistance: number;
    distance: number;
    geometry: number;
}
type ArrayHelper = ArrayHelpers<GenerateTowersInput[]> & {
    form: FormikProps<TransmissionLineInput>;
    name: string;
};
interface Props {}
function addTower() {
    return {
        name: "",
        resistance: 15,
        distance: 1,
        geometry: 1,
    };
}

const TowerConfigurationTable: React.FC<Props> = () => (
    <FieldArray
        name="towers"
        render={(arrayHelpers: ArrayHelper) => {
            function generateTowers(values: GenerateTowersInput) {
                const avgDistance = values.distance / values.numTowers;
                const newTowers = Array(values.numTowers)
                    .fill(0)
                    .map((_, index) => ({
                        name: values.name + (index + 1),
                        resistance: values.resistance,
                        distance: avgDistance,
                        geometry: values.geometry,
                    }));

                arrayHelpers.form.setFieldValue("towers", newTowers);
            }
            return (
                <Card>
                    <CardHeader>
                        <CardHeaderText>
                            <CardTitle>Tower Configuration</CardTitle>
                            <CardDescription>
                                Configure the towers for the Transmission line.
                            </CardDescription>
                        </CardHeaderText>
                        <CardHeaderActions>
                            <GenerateTowersModal
                                onSubmit={(values) => generateTowers(values)}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                    arrayHelpers.form.setFieldValue("towers", [
                                        addTower(),
                                    ])
                                }
                                disabled={
                                    arrayHelpers.form.values.towers.length === 1
                                }
                            >
                                <X />
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                onClick={() => arrayHelpers.push(addTower())}
                            >
                                <Plus />
                            </Button>
                        </CardHeaderActions>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <Row>
                                <RowHeader>Name</RowHeader>
                                <RowHeader>Resistance</RowHeader>
                                <RowHeader>Distance (km)</RowHeader>
                                <RowHeader>Geometry</RowHeader>
                                <RowHeader>Actions</RowHeader>
                            </Row>
                            {arrayHelpers.form.values.towers.map((_, index) => (
                                <Row key={index}>
                                    <FormInput
                                        name={`towers[${index}].name`}
                                        type="text"
                                        placeholder="Example"
                                        required
                                    />
                                    <FormInput
                                        name={`towers[${index}].resistance`}
                                        type="text"
                                        placeholder="Example"
                                        required
                                    />
                                    <FormInput
                                        name={`towers.${index}.distance`}
                                        type="text"
                                        placeholder="Example"
                                        required
                                    />
                                    <TowerGeometrySelect
                                        name={`towers.${index}.geometry`}
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        disabled={
                                            arrayHelpers.form.values.towers
                                                .length === 1
                                        }
                                        onClick={() =>
                                            arrayHelpers.remove(index)
                                        }
                                    >
                                        <X />
                                    </Button>
                                </Row>
                            ))}
                        </Table>
                    </CardContent>
                </Card>
            );
        }}
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
export default TowerConfigurationTable;
