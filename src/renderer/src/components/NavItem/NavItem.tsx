import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  to: string;
}

const NavItem: React.FC<Props> = (props) => {
  return <Wrapper to={props.to}>{props.name}</Wrapper>;
};

const Wrapper = styled(Link)`
  color: #4a5568;
  font-size: 16px;
  text-decoration: none;
  padding-inline: 0.5rem;
  padding-block: 0.25rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: #e2e8f0;
  }
`;
export default NavItem;
