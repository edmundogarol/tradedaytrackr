import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import {
  CONTAINER_PADDING_LARGE,
  CONTAINER_PADDING_SMALL,
} from "@styles/constants";
import { Section, SubsectionHeader } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const AccountSettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
`;

export const PasswordSection = styled(Section)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  min-width: 300px;
  flex: 1;
`;
export const DeleteAccountSection = styled(PasswordSection)`
  display: flex;
  justify-content: start;
`;

export const DeleteAccountChildWrapper = styled(GlassTileChildrenWrapper)`
  height: 100%;
`;

export const SubsectionHeaderWrapper = styled(SubsectionHeader)`
  padding: ${CONTAINER_PADDING_SMALL}px;
`;

export const AccountDetailsSection = styled(Section)`
  padding: ${CONTAINER_PADDING_SMALL}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  min-width: 300px;
  flex: 1;
`;
export const EmailPreferencesSection = styled(Section)`
  padding: ${CONTAINER_PADDING_SMALL}px;
  flex: 1;
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
