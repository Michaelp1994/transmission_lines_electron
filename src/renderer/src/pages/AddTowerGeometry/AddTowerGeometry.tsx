import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { AddTowerGeometryForm } from "@/features/towerGeometries";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const AddTowerGeometry: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.HOME.path}>Go Back</Link>
        <Heading>Edit Conductor Type</Heading>
        <AddTowerGeometryForm />
    </Wrapper>
);

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default AddTowerGeometry;
