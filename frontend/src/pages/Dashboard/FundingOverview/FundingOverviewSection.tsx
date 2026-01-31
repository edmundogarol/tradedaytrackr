import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Button from "@mui/material/Button";
import {
  SectionContainer,
  SectionContent,
  ContentValue,
  ContentValueContainer,
  ContentValueHighlighted,
  SectionTitle,
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
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>
        <GlowingIconWrapper $positive $size={30}>
          {icon}
        </GlowingIconWrapper>
        <ContentValueContainer>
          <ContentValueHighlighted>{highlightedValue}</ContentValueHighlighted>
          <ContentValue>{subtext}</ContentValue>
        </ContentValueContainer>
        <Button style={styles.button} onClick={buttonAction}>
          <VisibilityIcon style={styles.viewIcon} />
        </Button>
      </SectionContent>
      {footer}
    </SectionContainer>
  );
};

export default FundingOverviewSection;
