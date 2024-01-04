import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ROUTES from "@/router/routes";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
    const error = useRouteError();
    const { t } = useTranslation("translation");
    console.error(error);

    return (
        <Wrapper>
            <div>{t("ErrorPageText")} </div>
            <Link to={ROUTES.HOME.path}>{t("goBack")}</Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
`;
export default ErrorPage;
