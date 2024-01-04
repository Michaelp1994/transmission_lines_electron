import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { useTranslation } from "react-i18next";

import { EditTowerGeometryForm } from "@/features/towerGeometries";
import Routes from "@/router/routes";

interface Props {}

const EditTowerGeometry: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
    const { id } = useTypedParams(Routes.EDIT_TOWER_GEOMETRY);
    return (
        <Wrapper>
            <Link to={Routes.TOWER_GEOMETRIES.path}>{t("goBack")}</Link>
            <Heading>{t("editTowerGeometry")}</Heading>
            <EditTowerGeometryForm id={id} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditTowerGeometry;
