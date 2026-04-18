import { color } from "@styles/colors";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff0f;
  border-radius: 5px;
  justify-content: space-around;
  padding: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const Feature = styled.div`
  width: 100%;
`;

export const FeatureTitle = styled.h2`
  margin: unset;
  padding: 10px;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  color: #d2d2d2;
  font-size: 16px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
  white-space: nowrap;
  flex-wrap: wrap;
`;

export const FeatureContentContainer = styled.div`
  z-index: 11;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const FeatureContentValue = styled.h1`
  color: ${color("SystemLightGreen")};
  margin: 0;
  margin-bottom: -10px;
  display: flex;
  align-items: center;
  text-shadow: 1px 1px 2px black;
`;

export const FeatureContentSubtext = styled.span`
  color: #ffff;
  font-size: 13px;
  font-weight: 100;
  margin-left: 5px;
`;

export const FeatureContentSubtitle = styled.span`
  color: #ffff;
  font-size: 13px;
`;

export const FeatureContentSubtitleContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const FeatureContentProgressBarDrilldownContainer = styled.div``;

export const FeatureContentProgressBarDrilldown = styled.div``;

export const FeatureContentProgressBarDrilldownSubtext = styled.div`
  color: ${color("SystemLabel1")};
  display: flex;
  justify-content: end;
  font-size: 13px;
`;

export const FeatureContentProgressBarDrilldownSubtextHighlighted = styled.div`
  color: ${color("SystemWhite")};
  margin-left: 5px;
  text-transform: uppercase;
  display: flex;
  font-size: 13px;
  pointer-events: auto;
  &:hover {
    cursor: pointer;
  }
`;

export const FeatureContentProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #414d63;
  border-radius: 17px;
  padding: 5px;
  height: 21px;
  width: 210px;
  margin-left: 10px;
  min-width: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FeatureContentProgressBarLabel = styled.h3`
  color: #d2d2d2;
  position: absolute;
  margin: 0;
  z-index: 1;
  text-shadow: 4px 0px 12px #81b668;
  transform: translateX(-13px);
`;

export const HeaderNoteContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

export const HeaderNoteSlash = styled.span`
  margin-right: 6px;
  font-weight: 100;
  text-shadow: 0 0 BLACK;
  font-size: 28px;
  color: #505d72;
`;

export const HeaderNote = styled.span`
  width: min-content;
  display: flex;
  white-space: nowrap;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 11px;
  border: 1px solid #4a5568;
  background: #a1a1a112;
`;

export const HeaderNoteText = styled.p`
  font-weight: 200;
  font-size: 13px;
  margin: 0;
  z-index: 1;
`;

export const HeaderNoteTextHighlighted = styled.span<{
  $closeToPayout?: boolean;
}>`
  margin: 5px;
  font-size: large;
  color: ${({ $closeToPayout }): string =>
    $closeToPayout ? color("SystemGreen") : color("SystemRed")};
  font-weight: 600;
`;
