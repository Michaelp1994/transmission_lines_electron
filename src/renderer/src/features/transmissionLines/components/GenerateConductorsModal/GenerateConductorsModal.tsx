import { Formik, FormikProps } from "formik";
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

import FormInput from "@/components/FormInput";
import { ConductorTypeSelect } from "@/features/conductorTypes";

interface GenerateConfig {
    phases: number;
    circuits: number;
    neutrals: number;
    phaseConductorTypeId: number;
    neutralConductorTypeId: number;
}

interface Props {
    onSubmit(values: GenerateConfig): void;
}

const GenerateConductorsModal: React.FC<Props> = ({ onSubmit }) => {
    const initialValues: GenerateConfig = {
        phases: 3,
        circuits: 2,
        neutrals: 2,
        phaseConductorTypeId: 1,
        neutralConductorTypeId: 1,
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
                    <DialogTitle>Generate Conductors</DialogTitle>
                    <DialogDescription>
                        Generate a configuration for the conductors of the
                        transmission line.
                    </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(props: FormikProps<any>) => (
                        <>
                            <FormInput
                                label="Phases"
                                name="phases"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Number of Circuits"
                                name="circuits"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label="Number of Neutrals"
                                name="neutrals"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <ConductorTypeSelect
                                label="Phase Cable Type"
                                name="phaseConductorTypeId"
                            />
                            <ConductorTypeSelect
                                label="Neutral Cable Type"
                                name="neutralConductorTypeId"
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

export default GenerateConductorsModal;
