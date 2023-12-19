import { Link } from "react-router-dom";
import styled from "styled-components";

import Routes from "@/router/routes";
import { AddTransmissionLineForm } from "@/features/transmissionLines";

interface Props {}

const AddTransmissionLine: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.PROJECT.path}>Back</Link>
        <Heading>Add Transmission Line</Heading>
        <AddTransmissionLineForm />
    </Wrapper>
);

export default AddTransmissionLine;

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;

const Heading = styled.h1`
    font-size: 2rem;
`;
