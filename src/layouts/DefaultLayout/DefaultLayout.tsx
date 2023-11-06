import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import styled from "styled-components";

const DefaultLayout = () => {
  return (
    <>
      <NavBar />
      <StyledWrapper>
        <Outlet />
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.main`
  max-width: 1440px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
  margin-left: auto;
  margin-right: auto;
`;
export default DefaultLayout;
