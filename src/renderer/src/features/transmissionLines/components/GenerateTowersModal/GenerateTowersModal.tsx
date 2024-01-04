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
    const { t } = useTranslation("translation");

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
                <Button>{t("generate")}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("generateTowers")}</DialogTitle>
                    <DialogDescription>
                        {t("generateTowersDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(props: FormikProps<any>) => (
                        <>
                            <FormInput
                                label={t("namePrefix")}
                                name="name"
                                type="text"
                                placeholder="Example"
                                required
                            />
                            <TowerGeometrySelect
                                label={t("towerGeometry")}
                                name="geometry"
                            />
                            <FormInput
                                label={t("numberOfTowers")}
                                name="numTowers"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label={t("averageTowerResistance")}
                                name="resistance"
                                type="number"
                                placeholder="Example"
                                required
                            />
                            <FormInput
                                label={t("totalDistance")}
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

export default GenerateTowersModal;
