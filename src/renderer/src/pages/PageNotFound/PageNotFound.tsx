import { Link } from "react-router-dom";
import styled from "styled-components";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const PageNotFound: React.FC<Props> = () => (
    <Wrapper>
        <div>Sorry, page not found!</div>
        <Link to={Routes.HOME.path}>Go Home</Link>
    </Wrapper>
);

const Wrapper = styled.div``;
export default PageNotFound;
