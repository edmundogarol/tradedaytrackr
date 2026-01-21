import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Button from "@mui/material/Button";
import {
  FundingOverviewSectionContainer,
  FundingOverviewSectionContent,
  FundingOverviewSectionContentValue,
  FundingOverviewSectionContentValueContainer,
  FundingOverviewSectionContentValueHighlighted,
  FundingOverviewSectionTitle,
} from "./FundingOverviewStyledComponents";
import styles from "./FundingOverviewStyles";

export interface FundingOverviewSectionProps {
  title: string;
  icon: React.ReactNode;
  highlightedValue: string;
  subtext: string;
  buttonAction?: () => void;
  footer?: React.ReactNode;
}

const FundingOverviewSection: React.FunctionComponent<
  FundingOverviewSectionProps
> = ({ title, icon, highlightedValue, subtext, buttonAction, footer }) => {
  return (
    <FundingOverviewSectionContainer>
      <FundingOverviewSectionTitle>{title}</FundingOverviewSectionTitle>
      <FundingOverviewSectionContent>
        <GlowingIconWrapper $positive $size={30}>
          {icon}
        </GlowingIconWrapper>
        <FundingOverviewSectionContentValueContainer>
          <FundingOverviewSectionContentValueHighlighted>
            {highlightedValue}
          </FundingOverviewSectionContentValueHighlighted>
          <FundingOverviewSectionContentValue>
            {subtext}
          </FundingOverviewSectionContentValue>
        </FundingOverviewSectionContentValueContainer>
        <Button style={styles.button} onClick={buttonAction}>
          <VisibilityIcon style={styles.viewIcon} />
        </Button>
      </FundingOverviewSectionContent>
      {footer}
    </FundingOverviewSectionContainer>
  );
};

export default FundingOverviewSection;
