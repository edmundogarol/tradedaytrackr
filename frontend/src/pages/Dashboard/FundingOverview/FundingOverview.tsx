import React from "react";
import { FundingOverviewTitle } from "./FundingOverviewStyledComponents";
import FundingOverviewSection from "./FundingOverviewSection";
import useGetFundingOverviewDetails from "./hooks/useGetFundingOverviewDetails";

const FundingOverview: React.FunctionComponent = () => {
  const overviewDetails = useGetFundingOverviewDetails();
  return (
    <>
      <FundingOverviewTitle>Funding Overview</FundingOverviewTitle>
      {overviewDetails.map((tileDetails) => (
        <FundingOverviewSection key={tileDetails.title} {...tileDetails} />
      ))}
    </>
  );
};

export default FundingOverview;
