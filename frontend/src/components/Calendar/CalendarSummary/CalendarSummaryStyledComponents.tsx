import { devSrc } from "@utils/utils";
import styled from "styled-components";

export const CalendarSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  max-height: 265px;
  overflow: scroll;
  background: #ffffff0f;
  border-radius: 5px;
  height: 400px;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(200, 200, 200, 0.5);
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const CalendarSummaryTile = styled.div`
  height: 100px;
  margin: 10px;
`;

export const CalendarSummaryTradePreview = styled.div<{ $idx: number }>`
  background-image: ${(props): string =>
    `url('${devSrc(`trade${props.$idx + 1}.png`)}')`};
  height: 100%;
  width: 100%;
  background-size: cover;
  z-index: 1;
  opacity: 0.65;
  border-radius: 2px;

  mask-image: linear-gradient(
    to right,
    transparent -11%,
    black 20%,
    black 74%,
    transparent 115%
  );

  -webkit-mask-image: linear-gradient(
    to right,
    transparent -11%,
    black 20%,
    black 74%,
    transparent 115%
  );
`;

export const CalendarSummaryTradePreviewOverlay = styled.div`
  height: 100%;
  width: 100%;
  mask-image: linear-gradient(
    to top,
    transparent -14%,
    black 36%,
    black 67%,
    transparent 108%
  );

  -webkit-mask-image: linear-gradient(
    to top,
    transparent -14%,
    black 36%,
    black 67%,
    transparent 108%
  );
`;

export const CalendarSummaryTileBoxGlow = styled.div<{ $positive?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    ${(props): string =>
      props.$positive
        ? `       background-image:
    /* TOP EDGE */ radial-gradient(
        60% 100% at 50% 0%,
        rgba(80, 255, 121, 0) 0%,
        rgba(80, 255, 121, 0) 35%,
        rgba(80, 255, 121, 0) 55%,
        transparent 75%
      ),
      /* BOTTOM EDGE */
        radial-gradient(
          60% 100% at 50% 100%,
          rgba(80, 255, 120, 0.85) 0%,
          rgba(80, 255, 120, 0.5) 35%,
          rgba(80, 255, 120, 0.2) 55%,
          transparent 75%
        );
          `
        : `       background-image:
        /* TOP EDGE */ radial-gradient(
        60% 100% at 50% 0%,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 100, 100, 0) 35%,
        rgba(255, 100, 100, 0) 55%,
        transparent 75%
      ),
      /* BOTTOM EDGE */
        radial-gradient(
          60% 100% at 50% 100%,
          rgba(255, 100, 100, 0.85) 0%,
          rgba(255, 100, 100, 0.5) 35%,
          rgba(255, 100, 100, 0.2) 55%,
          transparent 75%
        );
          `}

    background-repeat: no-repeat;
    background-size: 100% 4%;
    background-position: top center, bottom center;

    filter: blur(0.5px);
    opacity: 0.95;
    pointer-events: none;
    transform: translateX(-10px);
  }
`;

export const CalendarSummaryGlassShine = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  box-shadow: inset 4px 5px 7px -1px rgba(255, 255, 255, 0.1),
    inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  background: #6060601c;
`;

export const CalendarSummaryGlassEffect = styled.div`
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(2px);
  overflow: hidden;
  isolation: isolate;
`;

export const CalendarSummaryTileDate = styled.span`
  width: 100%;
  height: 100%;
  padding: 10px;
  align-items: start;
  justify-content: start;
  position: absolute;
  z-index: 1;
`;

export const CalendarSummaryTileDateText = styled.p`
  font-size: 14px;
  color: white;
  text-shadow: 1px 1px 5px black;
  margin: 0;
  position: absolute;
  background: #0000003d;
  border-top-left-radius: 2px;
  padding: 3px;
  margin: 2px;
`;

export const CalendarSummaryTileInfo = styled.div`
  position: absolute;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  bottom: 7px;
`;

export const CalendarSummaryTileResult = styled.span`
  font-size: 16px;
`;

export const CalendarSummaryTileDay = styled.span`
  font-size: 16px;
`;

export const CalendarSummaryTilePnL = styled.span<{ $positive?: boolean }>`
  font-size: 16px;

  ${(props): string =>
    props.$positive ? ` color: #a8ffa8;` : `color: #ffa7a7;`}
  ${(props): string =>
    props.$positive
      ? `   text-shadow: 1px 1px 1px black;`
      : `  text-shadow: 1px 1px 1px black;`}
`;

export const CalendarSummaryTileTradeCount = styled.span`
  font-size: 12px;
  color: #c9c9c9;
`;
