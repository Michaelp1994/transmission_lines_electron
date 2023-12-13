import styled from "styled-components";
import React from "react";

// interface Props {}

// const BaseButton: React.FC<Props> = () => {
//   return <Wrapper></Wrapper>;
// };

// const Wrapper = styled.div``;

export const BaseButton = styled.button`
  border: 0px;
  background-color: white;
  border-radius: 0.5rem;
  padding-inline: 1rem;
  height: 2.5rem;
  cursor: pointer;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: hsl(204 20% 96%);
  }
`;
export default BaseButton;
