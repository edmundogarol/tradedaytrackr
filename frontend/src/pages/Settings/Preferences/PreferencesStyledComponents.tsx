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
