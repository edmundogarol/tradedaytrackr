import styled from "styled-components";

export const Container = styled.div`
  z-index: 20;
  opacity: 0.7;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
