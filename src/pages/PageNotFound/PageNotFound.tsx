import styled from "styled-components";
import React from "react";

interface Props {}

const PageNotFound: React.FC<Props> = (props) => {
  return <Wrapper>Sorry, page not found!</Wrapper>;
};

const Wrapper = styled.div``;
export default PageNotFound;
