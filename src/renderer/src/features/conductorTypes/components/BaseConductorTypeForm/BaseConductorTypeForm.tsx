import styled from "styled-components";
import React from "react";
import { Form } from "formik";
import FormInput from "@/components/FormInput";
import BaseButton from "@/components/BaseButton";

interface Props {}

const BaseConductorTypeForm: React.FC<Props> = () => (
    <StyledForm>
        <FormInput label="Name" name="name" required />
        <FormInput label="Surface Area" type="number" name="surfaceArea" />
        <FormInput label="Stranding" name="stranding" />
        <FormInput
            label="Outer Diameter"
            type="number"
            name="outerDiameter"
            required
        />
        <FormInput label="Core Diameter" type="number" name="coreDiameter" />
        <FormInput label="Layers" type="number" name="layers" />
        <FormInput
            label="Current Capacity"
            name="currentCapacity"
            type="number"
        />
        <FormInput
            label="DC Resistance 25"
            type="number"
            name="dcResistance25"
        />
        <FormInput
            label="AC Resistance 25"
            type="number"
            name="acResistance25"
        />
        <FormInput
            label="AC Resistance 50"
            type="number"
            name="acResistance50"
        />
        <FormInput
            label="AC Resistance 75"
            type="number"
            name="acResistance75"
            required
        />
        <FormInput label="GMR" type="number" name="gmr" />
        <BaseButton type="submit">Submit</BaseButton>
    </StyledForm>
);

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
export default BaseConductorTypeForm;
