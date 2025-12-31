import styled from "styled-components";

export const StatsSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff0f;
  border-radius: 5px;
  justify-content: space-around;
`;

export const StatsSummaryTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 100px;
  margin: 10px;
`;

export const StatsSummaryTileTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #dcdcdc;
  z-index: 1;
`;

export const StatsSummaryTileValue = styled.h2`
  margin: 0;
  font-size: 29px;
  color: #ffffff;
  z-index: 1;
`;

export const StatsSummaryTileValuePnL = styled.h2`
  margin: 0;
  font-size: 29px;
  color: #7abb5a;
  z-index: 1;
`;

export const StatsSummaryTileValueDaysToPayout = styled.h2`
  margin: 0;
  font-size: 29px;
  color: #ff7171;
  z-index: 1;
`;

export const StatsSummaryTileValueWinRate = styled.h2`
  margin: 0;
  font-size: 29px;
  color: #7abb5a;
  z-index: 1;
`;
