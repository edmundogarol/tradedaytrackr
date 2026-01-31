import { Box, Collapse } from "@mui/material";
import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  width: max-content;
  margin-bottom: 5px;
`;

export const CollapseStyled = styled(Collapse)`
  position: absolute;
  right: 50px;
  width: max-content;
  left: 0px;
  z-index: 11;
  top: 100%;
`;

export const TitleContainer = styled.div`
  z-index: 10;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleText = styled.span`
  color: #c0c0c0;
  margin-right: 5px;
  font-size: 12px;
`;

export const BoxContainer = styled(Box)`
  height: auto;
  max-height: 240px;
  overflow: scroll;
  border-radius: 5px;
`;

export const ListContainer = styled.div`
  height: auto;
  max-height: 240px;
  overflow: scroll;
  background-color: #626a7aa6;
  border-radius: 5px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(155, 155, 155, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
