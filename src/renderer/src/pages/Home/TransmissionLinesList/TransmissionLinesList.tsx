import styled from "styled-components";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeTransmissionLine } from "@/store/TransmissionLinesSlice";
import { MdClose, MdInfoOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {}

const TransmissionLinesList: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function removeLine(index: number) {
    dispatch(removeTransmissionLine(index));
  }
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines,
  );
  return (
    <ListWrapper>
      {transmissionLines.map((transmissionLine, index) => (
        <ListItem key={index}>
          <ItemText>{transmissionLine.name}</ItemText>
          <ItemActions>
            <Button onClick={() => navigate("transmissionLines/" + index)}>
              <InfoIcon />
            </Button>
            <Button onClick={() => removeLine(index)}>
              <CloseIcon />
            </Button>
          </ItemActions>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  max-width: 500px;
  border: 1px solid rgb(222, 226, 230);
  border-radius: 6px;
`;
const ListItem = styled.div`
  min-height: 48px;
  padding-inline: 16px;
  padding-block: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
const ItemText = styled.div`
  font-size: 1.5rem;
`;
const ItemActions = styled.div`
  display: flex;
  gap: 4px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: transparent;
  padding: 0px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CloseIcon = styled(MdClose)`
  height: 24px;
  width: 24px;
`;

const InfoIcon = styled(MdInfoOutline)`
  height: 24px;
  width: 24px;
`;

export default TransmissionLinesList;
