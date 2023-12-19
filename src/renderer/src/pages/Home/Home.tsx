import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ApiEvent from "@shared/ApiEvent";
import BaseButton from "@/components/BaseButton";
import { useAppDispatch } from "@/store";
import { importTransmissionLines } from "@/store/TransmissionLinesSlice";
import { importSources } from "@/store/SourcesSlice";
import ROUTES from "@/router/routes";

interface Props {}

const Home: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleOpen() {
        const data = await window.electron.ipcRenderer.invoke(
            ApiEvent.OpenProject
        );
        if (!data) return;
        dispatch(importTransmissionLines(data.transmissionLines));
        dispatch(importSources(data.sources));
        navigate(ROUTES.PROJECT.path);
    }

    return (
        <Wrapper>
            <BaseButton onClick={handleOpen}>Open Project</BaseButton>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default Home;
