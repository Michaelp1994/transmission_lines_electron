import styled from "styled-components";
import NavItem from "@/components/NavItem";

interface Props {}

const links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Conductors",
    to: "/conductors",
  },
  {
    name: "Towers",
    to: "/towers",
  },
];

const NavBar: React.FC<Props> = (props) => {
  return (
    <StyledWrapper>
      {links.map((link, index) => (
        <NavItem name={link.name} to={link.to} key={index} />
      ))}
    </StyledWrapper>
  );
};

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
