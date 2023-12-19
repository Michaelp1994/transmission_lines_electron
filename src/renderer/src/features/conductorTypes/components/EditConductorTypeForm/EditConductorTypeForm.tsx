import styled from "styled-components";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

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
        return <div>Loading...</div>;
    }
    if (error || !data) {
        return <div>Theres an error!</div>;
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
