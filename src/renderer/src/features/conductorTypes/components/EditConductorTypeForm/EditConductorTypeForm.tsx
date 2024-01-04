import styled from "styled-components";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ROUTES from "@/router/routes";
import BaseConductorTypeForm from "../BaseConductorTypeForm";
import {
    useConductorTypeQuery,
    useEditConductorTypeMutation,
} from "@/services/api";

interface Props {
    id: number;
}

const EditConductorTypeForm: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("translation");
    const { data, error, isLoading } = useConductorTypeQuery(id);
    const [editConductor, result] = useEditConductorTypeMutation();
    async function handleSubmit(
        values: ConductorType,
        actions: FormikHelpers<ConductorType>
    ) {
        await editConductor({ id, conductorType: values });
        if (result.error) {
            console.log(result.error);
            return;
        }
        actions.resetForm();
        navigate(ROUTES.CONDUCTORS.path);
    }
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("errorMessage")}</div>;
    }
    return (
        <Wrapper>
            <Formik initialValues={data} onSubmit={handleSubmit}>
                <BaseConductorTypeForm />
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default EditConductorTypeForm;
