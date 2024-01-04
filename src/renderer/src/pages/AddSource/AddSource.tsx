import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Routes from "@/router/routes";
import { AddSourceForm } from "@/features/sources";

interface Props {}

const AddSource: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <Link to={Routes.PROJECT.path}>{t("goBack")}</Link>
            <Heading>{t("addSource")}</Heading>
            <AddSourceForm />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Heading = styled.h1`
    font-size: 2rem;
`;

export default AddSource;
