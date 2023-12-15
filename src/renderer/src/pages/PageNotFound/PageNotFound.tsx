import Routes from "@/router/RoutePathsEnum";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const PageNotFound: React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <div>Sorry, page not found!</div>
            <Link to={Routes.HOME.path}>Go Home</Link>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default PageNotFound;
