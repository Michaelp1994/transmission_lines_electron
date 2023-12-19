import styled from "styled-components";
import { Link } from "react-router-dom";
import Routes from "@/router/routes";
import { AddSourceForm } from "@/features/sources";

interface Props {}

const AddSource: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.PROJECT.path}>Go Back</Link>
        <Heading>Add Source</Heading>
        <AddSourceForm />
    </Wrapper>
);

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default AddSource;
