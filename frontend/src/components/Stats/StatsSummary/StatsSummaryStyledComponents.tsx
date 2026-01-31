import styled from "styled-components";

export const StatsSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff0f;
  border-radius: 5px;
`;

export const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  margin: 10px;
  flex: 1;
`;

export const StatsSummaryTileTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #dcdcdc;
  z-index: 1;
  white-space: nowrap;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #dcdcdc;
  z-index: 1;
  font-weight: 400;
  white-space: nowrap;
`;

export const Subtitle = styled.span`
  margin: 0;
  font-size: 14px;
  color: #a2a2a2;
  font-weight: 400;
  z-index: 1;
  display: flex;
  flex-direction: row;
  pointer-events: auto;
  position: relative;
  align-items: center;
  white-space: nowrap;
  min-height: 18px;
`;

export const ActivityDot = styled.span<{ $color?: string }>`
  margin-right: 5px;
  transform: translateY(-4px);
  color: #ffffff;
  ${(props): string =>
    props.$color ? ` color: ${props.$color};` : ` color: #ffffff;`}
`;

export const SubtitlePrice = styled.h4<{ $color?: string }>`
  margin-right: 5px;
  font-size: 16px;
  color: ${(props): string => (props.$color ? props.$color : "#ffffff")};
  z-index: 1;
  margin-top: 0;
  margin-bottom: 0;
`;

export const MainValue = styled.h2<{ $color?: string }>`
  margin: 0;
  font-size: 29px;
  color: ${(props): string => (props.$color ? props.$color : "#ffffff")};
  z-index: 1;
  display: flex;
  align-items: center;
  font-weight: 400;
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
