import styled from "styled-components";
import { Link } from "react-router-dom";
import Routes from "@/router/RoutePathsEnum";
import { EditSourceForm } from "@/features/sources";

interface Props {}

const EditSource: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.HOME.path}>Go Back</Link>
        <Heading>Edit Source</Heading>
        <EditSourceForm />
    </Wrapper>
);

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default EditSource;
