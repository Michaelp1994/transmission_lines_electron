import { Link } from "react-router-dom";
import styled from "styled-components";
import { EditConductorTypeForm } from "@/features/conductorTypes";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const EditConductorType: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.HOME.path}>Go Back</Link>
        <Heading>Edit Conductor Type</Heading>
        <EditConductorTypeForm />
    </Wrapper>
);

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditConductorType;
