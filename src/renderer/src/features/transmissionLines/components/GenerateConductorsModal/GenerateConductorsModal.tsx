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
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("translation");

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
                <Button>{t("generate")}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("generateConductors")}</DialogTitle>
                    <DialogDescription>
                        {t("generateConductorsDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(props: FormikProps<any>) => (
                        <>
                            <FormInput
                                label={t("phases")}
                                name="phases"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label={t("numberOfCircuits")}
                                name="circuits"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label={t("numberOfNeutrals")}
                                name="neutrals"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <ConductorTypeSelect
                                label={t("phaseCableType")}
                                name="phaseConductorTypeId"
                            />
                            <ConductorTypeSelect
                                label={t("neutralCableType")}
                                name="neutralConductorTypeId"
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={() => props.handleSubmit()}
                                    >
                                        {t("generate")}
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
