import { Link } from "react-router-dom";
import styled from "styled-components";
import Routes from "@/router/RoutePathsEnum";
import { EditTransmissionLineForm } from "@/features/transmissionLines";

interface Props {}

const EditTransmissionLine: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.HOME.path}>Go Back</Link>
        <Heading>Edit Transmission Line</Heading>
        <EditTransmissionLineForm />
    </Wrapper>
);

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditTransmissionLine;
