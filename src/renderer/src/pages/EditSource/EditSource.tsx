import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import Routes from "@/router/routes";
import { EditSourceForm } from "@/features/sources";

interface Props {}

const EditSource: React.FC<Props> = () => {
    const { id } = useTypedParams(Routes.EDIT_SOURCE);

    return (
        <Wrapper>
            <Link to={Routes.PROJECT.path}>Go Back</Link>
            <Heading>Edit Source</Heading>
            <EditSourceForm id={id} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default EditSource;
