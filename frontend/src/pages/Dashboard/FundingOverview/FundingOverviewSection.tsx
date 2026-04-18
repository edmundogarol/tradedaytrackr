import { GlowingIconWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import React from "react";
import {
  ContentValue,
  ContentValueContainer,
  ContentValueHighlighted,
  SectionContainer,
  SectionContent,
  SectionTitle,
} from "./FundingOverviewStyledComponents";
import styles from "./FundingOverviewStyles";

export interface FundingOverviewSectionProps {
  title: string;
  icon: React.ReactNode;
  highlightedValue: string;
  highlightedValuePositive?: boolean;
  subtext: string;
  buttonAction?: () => void;
  footer?: React.ReactNode;
}

const FundingOverviewSection: React.FunctionComponent<
  FundingOverviewSectionProps
> = ({
  title,
  icon,
  highlightedValue,
  highlightedValuePositive = true,
  subtext,
  buttonAction,
  footer,
}) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>
        <GlowingIconWrapper $positive={highlightedValuePositive} $size={30}>
          {icon}
        </GlowingIconWrapper>
        <ContentValueContainer>
          <ContentValueHighlighted $positive={highlightedValuePositive}>
            {highlightedValue}
          </ContentValueHighlighted>
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
