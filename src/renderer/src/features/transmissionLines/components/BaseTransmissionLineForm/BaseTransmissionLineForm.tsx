import styled from "styled-components";
import { Button } from "component-library";

import { Form } from "formik";

import ConductorConfigurationTable from "../ConductorConfigurationTable";
import TowerConfigurationTable from "../TowerConfigurationTable";

import FormInput from "@/components/FormInput";
import { SourceSelect } from "@/features/sources";

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
        <SourceSelect label="From" name="fromSource" id="from" required />
        <SourceSelect label="To" name="toSource" id="to" required />
        <ConductorConfigurationTable />
        <TowerConfigurationTable />
        <Button type="submit">Add Transmission Line</Button>
    </StyledForm>
);

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export default BaseTransmissionLineForm;
