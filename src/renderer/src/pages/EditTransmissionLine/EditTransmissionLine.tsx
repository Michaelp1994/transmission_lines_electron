import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateTransmissionLine } from "@/store/TransmissionLinesSlice";
import SourceSelect from "@/components/SourceSelect";
import TowerSelect from "@/components/TowerSelect";
import BaseButton from "@/components/BaseButton";
import FormInput from "@/components/FormInput";
import TowerConfigurationTable from "@/components/TowerConfigurationTable";
import ConductorConfigurationTable from "@/components/ConductorConfigurationTable";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const EditTransmissionLine: React.FC<Props> = (props) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (!id) return null;
    const sourceId = parseInt(id);
    const transmissionLine = useAppSelector(
        (state) => state.transmissionLines.transmissionLines[sourceId]
    );
    function onSubmit(values: TransmissionLineInput) {
        dispatch(
            updateTransmissionLine({ id: sourceId, transmissionLine: values })
        );
        navigate(Routes.HOME.path);
    }
    return (
        <Wrapper>
            <Link to={Routes.HOME.path}>Go Back</Link>
            <Heading>Edit Transmission Line</Heading>
            <Formik initialValues={transmissionLine} onSubmit={onSubmit}>
                <StyledForm>
                    <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Example"
                        required
                    />
                    <SourceSelect label="From" name="from" id="from" />
                    <SourceSelect label="To" name="to" id="to" />
                    <ConductorConfigurationTable />
                    <TowerConfigurationTable />
                    <BaseButton type="submit">Save Changes</BaseButton>
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

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditTransmissionLine;
