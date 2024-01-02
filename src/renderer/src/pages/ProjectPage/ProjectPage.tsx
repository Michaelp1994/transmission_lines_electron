import styled from "styled-components";
import { Button } from "component-library";
import { Link } from "react-router-dom";

import ApiEvent from "@shared/ApiEvent";
import SourcesList from "@/features/sources/components/SourcesList";
import TransmissionLinesList from "@/features/transmissionLines/components/TransmissionLinesList";
import ROUTES from "@/router/routes";
import { useAppSelector } from "@/store";

interface Props {}

const ProjectPage: React.FC<Props> = () => {
    const sources = useAppSelector((state) => state.sources);
    const transmissionLines = useAppSelector(
        (state) => state.transmissionLines
    );
    async function handleSave() {
        await window.api.invoke(
            ApiEvent.SaveProject,
            sources,
            transmissionLines
        );
    }

    return (
        <StyledWrapper>
            <SourcesSection>
                <Heading>Sources </Heading>
                <Button asChild>
                    <Link to={ROUTES.ADD_SOURCE.path}>Add Source</Link>
                </Button>
                <SourcesList />
            </SourcesSection>
            <TransmissionLinesSection>
                <Heading>Transmission Lines</Heading>
                <Button asChild>
                    <Link to={ROUTES.ADD_TRANSMISSION_LINE.path}>
                        Add Transmission Line
                    </Link>
                </Button>
                <TransmissionLinesList />
            </TransmissionLinesSection>
            <Button
                disabled={
                    sources.length === 0 || transmissionLines.length === 0
                }
            >
                <Link to={ROUTES.GENERATE_RESULTS.path}> Solve Circuit!</Link>
            </Button>
            <Button
                disabled={
                    sources.length === 0 || transmissionLines.length === 0
                }
                onClick={handleSave}
            >
                Save Project
            </Button>
        </StyledWrapper>
    );
};

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

export default ProjectPage;
