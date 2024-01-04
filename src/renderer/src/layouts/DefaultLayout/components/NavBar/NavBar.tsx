import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "component-library";
import NavItem from "@/layouts/DefaultLayout/components/NavItem";
import Routes from "@/router/routes";

interface Props {}

const NavBar: React.FC<Props> = () => {
    const { t, i18n } = useTranslation("translation");
    function changeLanguage() {
        if (i18n.language === "pt-BR") {
            i18n.changeLanguage("en-AU");
        } else {
            i18n.changeLanguage("pt-BR");
        }
    }
    const links = [
        {
            id: 1,
            name: t("home"),
            to: Routes.HOME.path,
        },
        {
            id: 2,
            name: t("project"),
            to: Routes.PROJECT.path,
        },
        {
            id: 3,
            name: t("conductorTypes"),
            to: Routes.CONDUCTORS.path,
        },
        {
            id: 4,
            name: t("towerGeometries"),
            to: Routes.TOWER_GEOMETRIES.path,
        },
    ];
    return (
        <StyledWrapper>
            <LeftSide>
                {links.map((link) => (
                    <NavItem name={link.name} to={link.to} key={link.id} />
                ))}
            </LeftSide>
            <RightSide>
                <Button onClick={() => changeLanguage()}>
                    {t("changeLanguage")}
                </Button>
            </RightSide>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    width: 100%;
    height: 60px;
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0;
`;

const LeftSide = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const RightSide = styled.div``;

export default NavBar;
