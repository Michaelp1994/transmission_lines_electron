import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Routes from "@/router/routes";

interface Props {}

const PageNotFound: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <Wrapper>
            <div>{t("PageNotFound")}</div>
            <Link to={Routes.HOME.path}>{t("goHome")}</Link>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default PageNotFound;
