import styled from "styled-components";
import ApiEvent from "@shared/ApiEvent";
import SourcesList from "@/features/sources/components/SourcesList";
import TransmissionLinesList from "@/features/transmissionLines/components/TransmissionLinesList";
import BaseButton from "@/components/BaseButton";
import ROUTES from "@/router/routes";
import { useAppSelector } from "@/store";

interface Props {}

const ProjectPage: React.FC<Props> = () => {
    const sources = useAppSelector((state) => state.sources);
    const transmissionLines = useAppSelector(
        (state) => state.transmissionLines
    );
    async function handleSave() {
        await window.electron.ipcRenderer.invoke(
            ApiEvent.SaveProject,
            sources,
            transmissionLines
        );
    }

    return (
        <StyledWrapper>
            <SourcesSection>
                <Heading>Sources </Heading>
                <BaseButton to={ROUTES.ADD_SOURCE.path}>Add Source</BaseButton>
                <SourcesList />
            </SourcesSection>
            <TransmissionLinesSection>
                <Heading>Transmission Lines</Heading>
                <BaseButton to={ROUTES.ADD_TRANSMISSION_LINE.path}>
                    Add Transmission Line
                </BaseButton>
                <TransmissionLinesList />
            </TransmissionLinesSection>
            <BaseButton to={ROUTES.GENERATE_RESULTS.path}>
                Solve Circuit!
            </BaseButton>
            <BaseButton onClick={handleSave}>Save Project</BaseButton>
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
