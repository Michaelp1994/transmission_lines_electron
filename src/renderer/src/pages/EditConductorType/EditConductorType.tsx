import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { useTranslation } from "react-i18next";

import { EditConductorTypeForm } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const EditConductorType: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.EDIT_CONDUCTOR_TYPE);
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Link to={ROUTES.CONDUCTORS.path}>{t("goBack")}</Link>
            <Heading>{t("editConductorType")}</Heading>
            <EditConductorTypeForm id={id} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditConductorType;
