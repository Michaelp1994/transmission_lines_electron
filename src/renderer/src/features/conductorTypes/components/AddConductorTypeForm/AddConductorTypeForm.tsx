import styled from "styled-components";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import Routes from "@/router/routes";
import BaseConductorTypeForm from "../BaseConductorTypeForm";
import { useAddConductorTypeMutation } from "@/services/api";

interface Props {}

const AddConductorTypeForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [addConductorMutation, result] = useAddConductorTypeMutation();
    const initialValues: ConductorTypeInput = {
        name: "",
        surfaceArea: 0,
        stranding: "",
        outerDiameter: 0,
        coreDiameter: 0,
        layers: 0,
        currentCapacity: 0,
        dcResistance25: 0,
        acResistance25: 0,
        acResistance50: 0,
        acResistance75: 0,
        gmr: 0,
    };
    async function handleSubmit(
        values: ConductorTypeInput,
        actions: FormikHelpers<ConductorTypeInput>
    ) {
        await addConductorMutation(values);
        if (result.error) {
            console.log(result.error);
            return;
        }

        actions.resetForm();
        navigate(Routes.CONDUCTORS.path);
    }
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <BaseConductorTypeForm />
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default AddConductorTypeForm;
