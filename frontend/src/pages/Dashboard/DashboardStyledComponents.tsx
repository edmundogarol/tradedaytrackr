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

export const UpcomingPayoutDetailsContainer = styled.div`
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

export const UpcomingPayoutDetailsFeature = styled.div`
  width: 100%;
`;

export const UpcomingPayoutDetailsFeatureTitle = styled.h2`
  margin: unset;
  padding: 10px;
  padding-top: 0;
  padding-left: 0;
  color: #d2d2d2;
  font-size: 16px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
`;

export const UpcomingPayoutDetailsFeatureContentContainer = styled.div`
  z-index: 1;
  display: flex;
  width: 100%;
`;

export const UpcomingPayoutDetailsFeatureContentValue = styled.h1`
  color: #44b040;
  margin: 0;
  margin-bottom: -10px;
  display: flex;
  align-items: center;
`;

export const UpcomingPayoutDetailsFeatureContentSubtext = styled.span`
  color: #ffff;
  font-size: 13px;
  font-weight: 100;
  margin-left: 5px;
`;

export const UpcomingPayoutDetailsFeatureContentSubtitle = styled.span`
  color: #ffff;
  font-size: 13px;
`;
