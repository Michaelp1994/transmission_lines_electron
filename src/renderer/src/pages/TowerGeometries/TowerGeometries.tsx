import styled from "styled-components";
import { Button } from "component-library";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { TowerGeometriesTable } from "@/features/towerGeometries";
import Routes from "@/router/routes";

interface Props {}

const TowerGeometries: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Button asChild>
                <Link to={Routes.ADD_TOWER_GEOMETRY.path}>
                    {t("addTowerGeometry")}
                </Link>
            </Button>
            <TowerGeometriesTable />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default TowerGeometries;
