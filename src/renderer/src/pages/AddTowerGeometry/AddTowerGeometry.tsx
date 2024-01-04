import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AddTowerGeometryForm } from "@/features/towerGeometries";
import Routes from "@/router/routes";

interface Props {}

const AddTowerGeometry: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Link to={Routes.TOWER_GEOMETRIES.path}>{t("goBack")}</Link>
            <Heading>{t("addTowerGeometry")}</Heading>
            <AddTowerGeometryForm />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default AddTowerGeometry;
