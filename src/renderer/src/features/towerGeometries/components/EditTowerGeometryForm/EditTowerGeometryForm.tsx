import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BaseTowerGeometryForm from "../BaseTowerGeometryForm";
import Routes from "@/router/routes";
import {
    useEditTowerGeometryMutation,
    useTowerGeometryQuery,
} from "@/services/api";

interface Props {
    id: number;
}

const EditTowerGeometryForm: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("translation");

    const { data, error, isLoading } = useTowerGeometryQuery(id);
    const [editTowerGeometry, result] = useEditTowerGeometryMutation();
    async function handleSubmit(
        values: TowerGeometry,
        actions: FormikHelpers<TowerGeometry>
    ) {
        await editTowerGeometry({ id, towerGeometry: values });
        if (result.error) {
            console.log(result.error);
            return;
        }
        actions.resetForm();
        navigate(Routes.TOWER_GEOMETRIES.path);
    }
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("errorMessage")}</div>;
    }
    return (
        <Formik initialValues={data} onSubmit={handleSubmit}>
            <BaseTowerGeometryForm />
        </Formik>
    );
};

export default EditTowerGeometryForm;
