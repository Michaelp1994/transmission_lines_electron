import styled from "styled-components";
import { Button } from "component-library";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ApiEvent from "@shared/ApiEvent";

import { useAppDispatch } from "@/store";
import { importTransmissionLines } from "@/store/TransmissionLinesSlice";
import { importSources } from "@/store/SourcesSlice";
import ROUTES from "@/router/routes";

interface Props {}

const Home: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation("translation");
    async function handleOpen() {
        const data = await window.api.invoke(ApiEvent.OpenProject);
        if (!data) return;
        dispatch(importTransmissionLines(data.transmissionLines));
        dispatch(importSources(data.sources));
        navigate(ROUTES.PROJECT.path);
    }

    return (
        <Wrapper>
            <Button onClick={handleOpen}>{t("openProject")}</Button>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default Home;
