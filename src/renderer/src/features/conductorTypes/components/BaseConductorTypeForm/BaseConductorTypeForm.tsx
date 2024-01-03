import styled from "styled-components";
import { Form } from "formik";
import { Button } from "component-library";
import FormInput from "@/components/FormInput";

interface Props {}

const BaseConductorTypeForm: React.FC<Props> = () => (
    <StyledForm>
        <FormInput label="Name" name="name" required />
        <FormInput
            label={
                <span>
                    Surface Area (mm<Sup>2</Sup>)
                </span>
            }
            type="number"
            name="surfaceArea"
        />
        <FormInput
            label="Outer Diameter (mm)"
            type="number"
            name="outerDiameter"
            required
        />
        <FormInput
            label="Core Diameter (mm)"
            type="number"
            name="coreDiameter"
        />
        <FormInput label="Layers" type="number" name="layers" />
        <FormInput
            label="Current Capacity (A)"
            name="currentCapacity"
            type="number"
        />
        <FormInput
            label="DC Resistance 25 (Ω/km)"
            type="number"
            name="dcResistance25"
        />
        <FormInput
            label="AC Resistance 25 (Ω/km)"
            type="number"
            name="acResistance25"
        />
        <FormInput
            label="AC Resistance 50 (Ω/km)"
            type="number"
            name="acResistance50"
        />
        <FormInput
            label="AC Resistance 75 (Ω/km)"
            type="number"
            name="acResistance75"
            required
        />
        <FormInput
            label="Geometric Mean Radius (mm)"
            type="number"
            name="gmr"
        />
        <Button type="submit">Submit</Button>
    </StyledForm>
);

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Sup = styled.sup`
    vertical-align: super;
    font-size: smaller;
`;

export default BaseConductorTypeForm;
