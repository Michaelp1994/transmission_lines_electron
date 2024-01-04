import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { useTranslation } from "react-i18next";

import Routes from "@/router/routes";
import { EditTransmissionLineForm } from "@/features/transmissionLines";

interface Props {}

const EditTransmissionLine: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
    const { id } = useTypedParams(Routes.EDIT_TRANSMISSION_LINE);
    return (
        <Wrapper>
            <Link to={Routes.PROJECT.path}>{t("goBack")}</Link>
            <Heading>{t("editTransmissionLine")}</Heading>
            <EditTransmissionLineForm id={id} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default EditTransmissionLine;
