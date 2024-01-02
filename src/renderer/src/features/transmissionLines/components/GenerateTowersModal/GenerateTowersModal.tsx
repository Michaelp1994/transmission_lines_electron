import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "component-library";

import { Formik, FormikProps } from "formik";
import FormInput from "@/components/FormInput";
import { TowerGeometrySelect } from "@/features/towerGeometries";

interface GenerateConfig {
    name: string;
    numTowers: number;
    resistance: number;
    distance: number;
    geometry: number;
}
interface Props {
    onSubmit(values: GenerateConfig): void;
}

const GenerateTowersModal: React.FC<Props> = ({ onSubmit }) => {
    const initialValues: GenerateConfig = {
        name: "T",
        numTowers: 10,
        resistance: 15,
        distance: 10,
        geometry: 1,
    };
    function handleSubmit(values: GenerateConfig) {
        onSubmit(values);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Generate</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Towers</DialogTitle>
                    <DialogDescription>
                        Generate a configuration for the towers of the
                        transmission line.
                    </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(props: FormikProps<any>) => (
                        <>
                            <FormInput
                                label="Name Prefix"
                                name="name"
                                type="text"
                                placeholder="Example"
                                required
                            />
                            <TowerGeometrySelect
                                label="Tower Type"
                                name="geometry"
                            />
                            <FormInput
                                label="Number of Towers"
                                name="numTowers"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Average Tower Resistance"
                                name="resistance"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Total Distance (km)"
                                name="distance"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={() => props.handleSubmit()}
                                    >
                                        Generate
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default GenerateTowersModal;
