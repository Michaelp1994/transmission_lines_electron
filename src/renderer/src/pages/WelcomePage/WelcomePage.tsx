import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {}

const WelcomePage: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
    return <Wrapper>{t("welcome")}</Wrapper>;
};

const Wrapper = styled.div``;
export default WelcomePage;
