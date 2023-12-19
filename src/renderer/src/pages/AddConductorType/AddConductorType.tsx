import { Link } from "react-router-dom";
import styled from "styled-components";
import { AddConductorTypeForm } from "@/features/conductorTypes";
import Routes from "@/router/routes";

interface Props {}

const AddConductorType: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.CONDUCTORS.path}>Go Back</Link>
        <Heading>Add Conductor Type</Heading>
        <AddConductorTypeForm />
    </Wrapper>
);

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default AddConductorType;
