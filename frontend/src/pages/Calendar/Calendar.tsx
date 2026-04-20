import AlertPopout from "@components/Alert/AlertPopout";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Page from "@components/Page/Page";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionText,
  SectionTitle,
  SubsectionHeaderWrapper,
} from "@styles/globalStyledComponents";
import { formatter, m } from "@utils/utils";
import React, { useEffect } from "react";
import styles from "./CalendarStyles";
import CalendarRenderer from "./CalndarRenderer";
import useCalendarDispatch from "./hooks/useCalendarDispatch";
import useCalendarState from "./hooks/useCalendarState";
import useGetCalendarSummaryHandler from "./hooks/useGetCalendarSummaryHandler";

const Calendar: React.FunctionComponent = () => {
  const { calendarSummaryErrors, calendarSummary } = useCalendarState();
  const { updateCalendarSummaryErrors } = useCalendarDispatch();
  const { getCalendarSummary, loading } = useGetCalendarSummaryHandler();

  useEffect(() => {
    getCalendarSummary();
  }, []);

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={!!calendarSummaryErrors?.detail || !!calendarSummaryErrors?.error}
        message={
          (calendarSummaryErrors?.detail ||
            calendarSummaryErrors?.error) as string
        }
        setPopoutOpen={() => updateCalendarSummaryErrors({})}
      />
      <PageContainer>
        <HorizontalSection>
          <SectionTitle>Trade Calendar</SectionTitle>
        </HorizontalSection>
        <Section>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <HorizontalSection style={{ flex: 10 }}>
                  <CalendarMonthIcon style={styles.sectionIcon} />
                  Monthly Summary
                </HorizontalSection>
                <SectionTitle
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: 20,
                  }}
                >
                  {m(calendarSummary?.daily[0]?.date).format("MMMM")}
                </SectionTitle>
              </SubsectionHeaderWrapper>
              <Gap level={1} />
              <CalendarRenderer />
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
        <HorizontalSection
          style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
        >
          <SectionTitle
            style={{ textAlign: "right", fontSize: 18, marginTop: 10 }}
          >
            <SectionText>Monthly Total PnL: </SectionText>
            {formatter.format(calendarSummary?.monthlyTotal)}
          </SectionTitle>
        </HorizontalSection>
      </PageContainer>
    </Page>
  );
};

export default Calendar;
