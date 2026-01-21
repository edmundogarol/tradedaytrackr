import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components";

export const DashboardContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 300px;
  width: 100%;
`;

export const DashboardContentCalendarContainer = styled.div`
  min-height: 200px;
`;
export const DashboardContentHeader = styled.h1`
  padding-left: 10px;
  font-size: 15px;
  font-weight: 100;
  margin: 0;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
`;

export const DashboardContentJournalEntryContainer = styled.div``;

export const DashboardContentOtherContainer = styled.div``;

export const DashboardTopSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const DashboardTopSectionLeftContainer = styled.div`
  flex: 2 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DashboardTopSectionRightContainer = styled.div`
  width: 300px;
  min-width: 300px;
  background: #ac4242;
  flex: 1;
  background: #ffffff0f;
  border-radius: 5px;
  padding: ${CONTAINER_PADDING_DEFAULT}px;
`;
