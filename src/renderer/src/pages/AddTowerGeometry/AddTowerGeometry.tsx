import styled from "styled-components";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import FormInput from "@/components/FormInput";
import BaseButton from "@/components/BaseButton";
import ConductorLocationTable from "./ConductorLocationTable";
import { useNavigate } from "react-router-dom";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const AddTowerGeometry: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const initialValues: TowerGeometryInput = {
        name: "",
        locations: [{ x: 0, y: 0 }],
    };
    function handleSubmit(
        values: TowerGeometryInput,
        actions: FormikHelpers<TowerGeometryInput>
    ) {
        window.api.addTowerGeometry(values);
        actions.resetForm();
        navigate(Routes.HOME.path);
    }
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <StyledForm>
                    <FormInput label="Name" name="name" required />
                    <ConductorLocationTable />
                    <BaseButton type="submit">Submit</BaseButton>
                </StyledForm>
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
export default AddTowerGeometry;
