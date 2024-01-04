import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Routes from "@/router/routes";
import { AddTransmissionLineForm } from "@/features/transmissionLines";

interface Props {}

const AddTransmissionLine: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Link to={Routes.PROJECT.path}>{t("goBack")}</Link>
            <Heading>{t("addTransmissionLine")}</Heading>
            <AddTransmissionLineForm />
        </Wrapper>
    );
};

export default AddTransmissionLine;

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;

const Heading = styled.h1`
    font-size: 2rem;
`;
