import styled from "styled-components";
import { Button } from "component-library";
import { Link } from "react-router-dom";

import { TowerGeometriesTable } from "@/features/towerGeometries";
import Routes from "@/router/routes";

interface Props {}

const TowerGeometries: React.FC<Props> = () => (
    <Wrapper>
        <Button asChild>
            <Link to={Routes.ADD_TOWER_GEOMETRY.path}>Add Tower Geometry</Link>
        </Button>
        <TowerGeometriesTable />
    </Wrapper>
);

const Wrapper = styled.div``;
export default TowerGeometries;
