import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { EditTowerGeometryForm } from "@/features/towerGeometries";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const EditTowerGeometry: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.HOME.path}>Go Back</Link>
        <Heading>Edit Tower Geometry</Heading>
        <EditTowerGeometryForm />
    </Wrapper>
);

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditTowerGeometry;
