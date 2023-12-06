import styled from "styled-components";
import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

import { useAppSelector } from "@/store";
import { useMessageChannel } from "@/utils/messageChannelHook";

interface Props {}

const GenerateResults: React.FC<Props> = (props) => {
  const sources = useAppSelector((state) => state.sources.sources);
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines
  );

  useEffect(() => {
    const channel = new MessageChannel();
    const port1 = channel.port1;
    const port2 = channel.port2;
    ipcRenderer.postMessage("port", null, [port1]);
    port2.postMessage({ sources, transmissionLines });
  }, [sources, transmissionLines]);
  //const { port2 } = useMessageChannel();

  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div``;
export default GenerateResults;
