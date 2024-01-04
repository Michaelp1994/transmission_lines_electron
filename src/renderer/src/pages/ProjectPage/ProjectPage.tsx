import styled from "styled-components";
import { Button } from "component-library";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ApiEvent from "@shared/ApiEvent";
import SourcesList from "@/features/sources/components/SourcesList";
import TransmissionLinesList from "@/features/transmissionLines/components/TransmissionLinesList";
import ROUTES from "@/router/routes";
import { useAppSelector } from "@/store";

interface Props {}

const ProjectPage: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
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
                <Heading>{t("sources")} </Heading>
                <Button asChild>
                    <Link to={ROUTES.ADD_SOURCE.path}>{t("addSource")}</Link>
                </Button>
                <SourcesList />
            </SourcesSection>
            <TransmissionLinesSection>
                <Heading>{t("transmissionLines")}</Heading>
                <Button asChild>
                    <Link to={ROUTES.ADD_TRANSMISSION_LINE.path}>
                        {t("addTransmissionLine")}
                    </Link>
                </Button>
                <TransmissionLinesList />
            </TransmissionLinesSection>
            <ButtonWrapper>
                <Button
                    disabled={
                        sources.length === 0 || transmissionLines.length === 0
                    }
                >
                    <Link to={ROUTES.GENERATE_RESULTS.path}>
                        {t("solveCircuit")}
                    </Link>
                </Button>
                <Button
                    disabled={
                        sources.length === 0 || transmissionLines.length === 0
                    }
                    onClick={handleSave}
                >
                    {t("saveProject")}
                </Button>
            </ButtonWrapper>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div``;
const ButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

const Heading = styled.h1`
    font-size: 2rem;
`;

const SourcesSection = styled.article`
    display: flex;
    width: 500px;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 2rem;
`;

const TransmissionLinesSection = styled.article`
    display: flex;
    width: 500px;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
`;

export default ProjectPage;
