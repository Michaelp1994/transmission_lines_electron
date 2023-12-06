import { generateScript } from "@/utils/generateOpenDssScript";
import { useAppSelector } from "@/store";
import styled from "styled-components";
import { Link } from "react-router-dom";

function OpenDssScript() {
  const sources = useAppSelector((state) => state.sources.sources);
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines
  );

  return (
    <Wrapper>
      <Heading>OpenDSS Script</Heading>
      <Link to="/">Go Back!</Link>
      <Pre>
        <code>{generateScript({ sources, transmissionLines })}</code>
      </Pre>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Pre = styled.pre`
  height: 500px;
  overflow-y: scroll;
`;
const Heading = styled.h1`
  font-size: 2rem;
`;
export default OpenDssScript;
