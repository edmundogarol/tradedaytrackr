import React from "react";
import { Title } from "./FundingOverviewStyledComponents";
import FundingOverviewSection from "./FundingOverviewSection";
import useGetFundingOverviewDetails from "./hooks/useGetFundingOverviewDetails";

const FundingOverview: React.FunctionComponent = () => {
  const overviewDetails = useGetFundingOverviewDetails();
  return (
    <>
      <Title>Funding Overview</Title>
      {overviewDetails.map((tileDetails) => (
        <FundingOverviewSection key={tileDetails.title} {...tileDetails} />
      ))}
    </>
  );
};

export default FundingOverview;
