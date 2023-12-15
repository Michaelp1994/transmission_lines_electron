import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";
import { Form, Formik, FormikHelpers } from "formik";
import styled from "styled-components";
import Routes from "@/router/RoutePathsEnum";
import { useNavigate } from "react-router-dom";

interface Props {}

const AddConductor: React.FC<Props> = (props) => {
    const navigate = useNavigate();
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
    function handleSubmit(
        values: ConductorTypeInput,
        actions: FormikHelpers<ConductorTypeInput>
    ) {
        window.api.addConductorType(values);
        actions.resetForm();
        navigate(Routes.HOME.path);
    }
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <StyledForm>
                    <FormInput label="Name" name="name" required />
                    <FormInput
                        label="Surface Area"
                        type="number"
                        name="surfaceArea"
                    />
                    <FormInput label="Stranding" name="stranding" />
                    <FormInput
                        label="Outer Diameter"
                        type="number"
                        name="outerDiameter"
                        required
                    />
                    <FormInput
                        label="Core Diameter"
                        type="number"
                        name="coreDiameter"
                    />
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
export default AddConductor;
