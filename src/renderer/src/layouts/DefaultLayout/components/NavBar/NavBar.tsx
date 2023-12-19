import styled from "styled-components";
import NavItem from "@/layouts/DefaultLayout/components/NavItem";
import Routes from "@/router/routes";

interface Props {}

const links = [
    {
        id: 1,
        name: "Home",
        to: Routes.HOME.path,
    },
    {
        id: 2,
        name: "Project",
        to: Routes.PROJECT.path,
    },
    {
        id: 3,
        name: "Conductor Types",
        to: Routes.CONDUCTORS.path,
    },
    {
        id: 4,
        name: "Tower Geometries",
        to: Routes.TOWER_GEOMETRIES.path,
    },
] as const;

const NavBar: React.FC<Props> = () => (
    <StyledWrapper>
        {links.map((link) => (
            <NavItem name={link.name} to={link.to} key={link.id} />
        ))}
    </StyledWrapper>
);

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    width: 100%;
    height: 60px;
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0;
`;

export default NavBar;
