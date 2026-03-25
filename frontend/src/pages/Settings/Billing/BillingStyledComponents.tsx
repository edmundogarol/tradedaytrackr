import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import {
  CONTAINER_PADDING_LARGE,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { Section, SubsectionHeader } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
export const SubscriptionSection = styled(AccountTemplatesSection)``;

export const SubscriptionChildWrapper = styled(GlassTileChildrenWrapper)``;

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

export const PlansContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const PlanTile = styled.div<{
  $backgroundColor?: string;
  $currentPlan?: boolean;
}>`
  flex: 1;
  background: ${({ $backgroundColor }): string =>
    $backgroundColor || "#ffffff0a"};
  border-radius: 4px;
  padding: 10px;
  border: 1px solid #ffffff24;
  ${({ $currentPlan }): string =>
    $currentPlan ? "border-color: #c1fec3;" : ""}

  &:hover {
    box-shadow: 0px 0px 10px -2px white;
    cursor: pointer;
  }
`;
export const PlanHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ffffff3d;
  color: #ffffffc9;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
export const PlanDetails = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: #ffffff9c;
  font-size: 13px;
  text-align: center;
`;

export const PlanDetailsItem = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 5px;
`;

export const PlanLeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const PlanRightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
