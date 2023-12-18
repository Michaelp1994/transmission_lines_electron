import styled from "styled-components";

import { Form } from "formik";

import ConductorConfigurationTable from "../ConductorConfigurationTable";
import TowerConfigurationTable from "../TowerConfigurationTable";

import FormInput from "@/components/FormInput";
import { SourceSelect } from "@/features/sources";
import BaseButton from "@/components/BaseButton";

interface Props {}

const BaseTransmissionLineForm: React.FC<Props> = () => (
    <StyledForm>
        <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Example"
            required
        />
        <SourceSelect label="From" name="fromSource" id="from" />
        <SourceSelect label="To" name="toSource" id="to" />
        <ConductorConfigurationTable />
        <TowerConfigurationTable />
        <BaseButton type="submit">Add Transmission Line</BaseButton>
    </StyledForm>
);

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export default BaseTransmissionLineForm;
