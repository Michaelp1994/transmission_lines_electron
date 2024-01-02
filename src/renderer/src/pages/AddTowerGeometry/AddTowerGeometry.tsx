import styled from "styled-components";
import { Link } from "react-router-dom";
import { AddTowerGeometryForm } from "@/features/towerGeometries";
import Routes from "@/router/routes";

interface Props {}

const AddTowerGeometry: React.FC<Props> = () => (
    <Wrapper>
        <Link to={Routes.TOWER_GEOMETRIES.path}>Go Back</Link>
        <Heading>Add Conductor Type</Heading>
        <AddTowerGeometryForm />
    </Wrapper>
);

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default AddTowerGeometry;
