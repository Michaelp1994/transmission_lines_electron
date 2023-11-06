import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import SourcesList from "@/components/SourcesList";
import TransmissionLinesList from "@/components/TransmissionLinesList";
import { useAppSelector } from "@/store";

function Home() {
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines,
  );
  const sources = useAppSelector((state) => state.sources.sources);
  return (
    <StyledWrapper>
      <StyleSection>
        <Heading>Sources </Heading>
        <FakeButton>
          <AnchorTag to="/sources/new">Add Source</AnchorTag>
        </FakeButton>
        <SourcesList />
      </StyleSection>
      <TransmissionLinesSection>
        <Heading>Transmission Lines</Heading>
        <FakeButton>
          <AnchorTag to="/transmissionLines/new">
            Add Transmission Line
          </AnchorTag>
        </FakeButton>
        <TransmissionLinesList />
      </TransmissionLinesSection>
      <Link to="/script">View Script!</Link>
    </StyledWrapper>
  );
}

export default Home;

const StyledWrapper = styled.div``;

const Heading = styled.h1`
  font-size: 2rem;
`;

const StyleSection = styled.article`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 2rem;
`;

const FakeButton = styled.div`
  text-align: center;
  height: 2.5rem;
  border: 0px;
  background-color: white;
  border-radius: 0.5rem;
  padding-inline: 1rem;
  height: 2.5rem;
  cursor: pointer;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: hsl(204 20% 96%);
  }
`;

const AnchorTag = styled(Link)`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const TransmissionLinesSection = styled.article`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  gap: 24px;
`;
