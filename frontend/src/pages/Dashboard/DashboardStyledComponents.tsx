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
  height: max-content;
  flex: 2 1 auto;
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

export const FundingOverviewTitle = styled.h2`
  margin: 10px;
  color: #d2d2d2;
  font-size: 16px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
  white-space: nowrap;
  flex-wrap: wrap;
`;

export const FundingOverviewSection = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 11px;
  border: 1px solid #4a5568;
  background: #a1a1a112;
  margin-bottom: 10px;
`;

export const FundingOverviewSectionTitle = styled.h3`
  margin: 10px;
  margin-left: 0;
  margin-bottom: 5px;
  color: #d2d2d2;
  font-size: 14px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
  white-space: nowrap;
  flex-wrap: wrap;
`;

export const FundingOverviewSectionContent = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const FundingOverviewSectionContentValueContainer = styled.div`
  margin-left: 7px;
`;

export const FundingOverviewSectionContentValue = styled.span`
  color: #c6c6c6;
  font-weight: 100;
  margin-left: 10px;
  white-space: normal;
  font-size: 14px;
`;

export const FundingOverviewSectionContentValueHighlighted = styled.span`
  color: #95d395;
  font-size: 20px;
`;
