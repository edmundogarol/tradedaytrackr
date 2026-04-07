import {
  CONTAINER_PADDING_LARGE,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { Section, SubsectionHeader } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: ${CONTAINER_PADDING_SMALL}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  min-width: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AccountTemplatesSection = styled(Section)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-width: 300px;
  flex: 1;
`;

export const TagsSection = styled(AccountTemplatesSection)``;
export const SubsectionHeaderWrapper = styled(SubsectionHeader)`
  padding: ${CONTAINER_PADDING_SMALL}px;
  display: flex;
  align-items: center;
`;

export const SwitchItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b5b5b5;
  font-weight: 200;
`;

export const CheckDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AddTemplateSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

export const AddTemplateSectionHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 300px;
`;

export const AccountImageSliderContainer = styled.div`
  width: 200px;
  border: 1px solid #ffffff75;
  border-radius: 4px;
  background: #0000003b;
  margin-bottom: 20px;
  position: relative;
`;

export const CarouselSliderTrackerDot = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const CarouselRightChevron = styled.div`
  position: absolute;
  right: 0;
  transform: translateY(50%);
  &:hover {
    cursor: pointer;
  }
  z-index: 1;
`;

export const CarouselLeftChevron = styled.div`
  position: absolute;
  left: 0;
  transform: translateY(50%);
  &:hover {
    cursor: pointer;
  }
  z-index: 1;
`;

export const AddImageContainer = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  transform: translateX(-50%);
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ImagePreviewContainer = styled.div<{ $src: string }>`
  background-image: url(${(props): string => props.$src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
