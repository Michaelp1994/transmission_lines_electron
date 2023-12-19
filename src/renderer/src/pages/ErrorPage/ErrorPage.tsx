import styled from "styled-components";
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import ROUTES from "@/router/routes";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Wrapper>
            <span>Oh no, something has gone wrong, </span>
            <Link to={ROUTES.HOME.path}>Go Back</Link>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ErrorPage;
