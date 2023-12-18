import styled from "styled-components";
import SourcesList from "@/features/sources/components/SourcesList";
import TransmissionLinesList from "@/features/transmissionLines/components/TransmissionLinesList";
import BaseButton from "@/components/BaseButton";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const Home: React.FC<Props> = () => (
    <StyledWrapper>
        <SourcesSection>
            <Heading>Sources </Heading>
            <BaseButton to={Routes.ADD_SOURCE.path}>Add Source</BaseButton>
            <SourcesList />
        </SourcesSection>
        <TransmissionLinesSection>
            <Heading>Transmission Lines</Heading>
            <BaseButton to={Routes.ADD_TRANSMISSION_LINE.path}>
                Add Transmission Line
            </BaseButton>
            <TransmissionLinesList />
        </TransmissionLinesSection>
        <BaseButton to={Routes.GENERATE_RESULTS.path}>
            Solve Circuit!
        </BaseButton>
    </StyledWrapper>
);

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

const TransmissionLinesSection = styled.article`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
`;

export default Home;
