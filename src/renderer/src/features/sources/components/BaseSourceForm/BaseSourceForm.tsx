import styled from "styled-components";
import React from "react";
import { Form } from "formik";

import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";

interface Props {}

const BaseSourceForm: React.FC<Props> = () => (
    <StyledForm>
        <FormInput
            label="Name"
            name="name"
            autoComplete="off"
            type="text"
            placeholder="Example"
            required
        />
        <FormInput
            label="Phases"
            name="phases"
            type="text"
            placeholder="3"
            required
        />
        <FormInput
            label="Voltage (kv)"
            name="voltage"
            type="number"
            placeholder="138"
        />
        <FormInput label="X1/R1" name="x1r1" type="number" placeholder="4" />
        <FormInput label="X0/R0" name="x0r0" type="number" placeholder="3" />
        <FormInput
            label="Short Circuit Current 3 Phase"
            name="isc3"
            type="number"
            placeholder="4000"
        />
        <FormInput
            label="Short Circuit Current 1 Phase"
            name="isc1"
            type="number"
            placeholder="3000"
        />
        <FormInput
            label="Resistance"
            name="resistance"
            type="number"
            placeholder="15"
        />
        <ButtonsWrapper>
            <BaseButton type="reset">Cancel</BaseButton>
            <BaseButton type="submit">Save Changes</BaseButton>
        </ButtonsWrapper>
    </StyledForm>
);

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: end;
`;
export default BaseSourceForm;
