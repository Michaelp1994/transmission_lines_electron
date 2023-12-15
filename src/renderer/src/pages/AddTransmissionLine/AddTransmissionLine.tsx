import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import FormInput from "@/components/FormInput";
import SourceSelect from "@/components/SourceSelect";
import BaseButton from "@/components/BaseButton";

import { useAppDispatch } from "@/store";
import { addTransmissionLine } from "@/store/TransmissionLinesSlice";
import ConductorConfigurationTable from "@/components/ConductorConfigurationTable";
import TowerConfigurationTable from "@/components/TowerConfigurationTable";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const AddTransmissionLine: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues: TransmissionLineInput = {
        name: "",
        fromSource: 0,
        toSource: 0,
        conductors: [
            {
                name: "",
                fromPhase: 1,
                toPhase: 1,
                bundleNumber: 1,
                bundleSpacing: 0,
                type: 1,
            },
        ],
        towers: [
            {
                name: "",
                resistance: 15,
                distance: 1,
                geometry: 1,
            },
        ],
    };

    function handleSubmit(values: TransmissionLineInput) {
        dispatch(addTransmissionLine(values));
        navigate(Routes.HOME.path);
    }
    return (
        <Wrapper>
            <Link to={Routes.HOME.path}>Back</Link>
            <Heading>Add Transmission Line</Heading>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
            </Formik>
        </Wrapper>
    );
};

export default AddTransmissionLine;

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;
const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Heading = styled.h1`
    font-size: 2rem;
`;
