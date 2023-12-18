import styled from "styled-components";
import React from "react";
import { Form } from "formik";
import FormInput from "@/components/FormInput";
import BaseButton from "@/components/BaseButton";
import ConductorLocationTable from "@/features/towerGeometries/components/ConductorLocationTable";
import TowerGeometryDiagram from "@/features/towerGeometries/components/TowerGeometryDiagram";

interface Props {}

const BaseTowerGeometryForm: React.FC<Props> = () => (
    <StyledForm>
        <LeftSide>
            <FormInput label="Name" name="name" required />
            <ConductorLocationTable />
            <BaseButton type="submit">Submit</BaseButton>
        </LeftSide>
        <RightSide>
            <TowerGeometryDiagram />
        </RightSide>
    </StyledForm>
);

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const RightSide = styled.div`
    flex: 1;
    border: 1px black solid;
`;
const StyledForm = styled(Form)`
    display: flex;
    gap: 12px;
`;
export default BaseTowerGeometryForm;
