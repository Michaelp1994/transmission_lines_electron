import { Link } from "react-router-dom";
import styled from "styled-components";

import SourcesList from "@/components/SourcesList";
import TransmissionLinesList from "@/components/TransmissionLinesList";
import { useAppSelector } from "@/store";

export default function Home() {
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines
  );
  const sources = useAppSelector((state) => state.sources.sources);
  return (
    <StyledWrapper>
      <SourcesSection>
        <Heading>Sources </Heading>
        <AnchorTag to="/sources/new">Add Source</AnchorTag>
        <SourcesList />
      </SourcesSection>
      <TransmissionLinesSection>
        <Heading>Transmission Lines</Heading>
        <AnchorTag to="/transmissionLines/new">Add Transmission Line</AnchorTag>
        <TransmissionLinesList />
      </TransmissionLinesSection>
      <Link to="/generate">Solve Circuit!</Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div``;

const Heading = styled.h1`
  font-size: 2rem;
`;

const SourcesSection = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 2rem;
`;

const AnchorTag = styled(Link)`
  display: block;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const TransmissionLinesSection = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
