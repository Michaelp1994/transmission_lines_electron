import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { AddConductorTypeForm } from "@/features/conductorTypes";
import Routes from "@/router/routes";

interface Props {}

const AddConductorType: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Link to={Routes.CONDUCTORS.path}>{t("goBack")}</Link>
            <Heading>{t("addConductorType")}</Heading>
            <AddConductorTypeForm />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const Heading = styled.h1`
    font-size: 2rem;
`;
export default AddConductorType;
