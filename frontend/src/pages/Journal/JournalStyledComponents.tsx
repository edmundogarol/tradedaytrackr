import { color } from "@styles/colors";
import styled from "styled-components";

export const JournalEntries = styled.div`
  height: 100%;
`;

export const Entry = styled.div``;

export const FiltersSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Description = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  flex: 1;
`;

export const TileTradeCount = styled.span`
  font-size: 10px;
  color: #c9c9c9;
  z-index: 12;
  background: #344764;
  padding: 5px;
  width: max-content;
`;

export const TileTradeCountContainer = styled.div`
  position: absolute;
  width: 200px;
  left: 0;
  top: 0;
  margin: 7px;
  z-index: 12;
  margin-top: 6px;
  pointer-events: none;
`;

export const EditContainer = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
  margin-right: 10px;
`;
