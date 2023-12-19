import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { EditConductorTypeForm } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const EditConductorType: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.EDIT_CONDUCTOR_TYPE);

    return (
        <Wrapper>
            <Link to={ROUTES.CONDUCTORS.path}>Go Back</Link>
            <Heading>Edit Conductor Type</Heading>
            <EditConductorTypeForm id={id} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditConductorType;
