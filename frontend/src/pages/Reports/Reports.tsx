import AlertPopout from "@components/Alert/AlertPopout";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { Else, If } from "@components/If/If";
import CalendarPicker from "@components/Input/CalendarPicker/CalendarPicker";
import Loading from "@components/Loading/Loading";
import Page from "@components/Page/Page";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FormControlLabel, Switch } from "@mui/material";
import useJournalDispatch from "@pages/Journal/hooks/useJournalDispatch";
import useJournalState from "@pages/Journal/hooks/useJournalState";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionText,
  SectionTitle,
  SubsectionHeaderWrapper,
} from "@styles/globalStyledComponents";
import { m } from "@utils/utils";
import moment from "moment";
import React, { useState } from "react";
import CalendarRenderer from "./ReportRenderer";
import { MonthlySelectorContainer } from "./ReportsStyledComponents";
import styles from "./ReportsStyles";
import useCalendarDispatch from "./hooks/useReportsDispatch";
import useCalendarState from "./hooks/useReportsState";

const Calendar: React.FunctionComponent = () => {
  const { fundedView } = useJournalState();
  const { updateFundedView } = useJournalDispatch();
  const { reportDataErrors } = useCalendarState();
  const { updateReportDataErrors } = useCalendarDispatch();
  const [calendarPickerOpen, setCalendarPickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment(moment.now()));

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={!!reportDataErrors?.detail || !!reportDataErrors?.error}
        message={
          (reportDataErrors?.detail || reportDataErrors?.error) as string
        }
        setPopoutOpen={() => updateReportDataErrors({})}
      />
      <PageContainer>
        <HorizontalSection>
          <HorizontalSection>
            <SectionTitle>Trade Calendar</SectionTitle>
            <FormControlLabel
              control={<Switch color="primary" checked={fundedView} />}
              value={fundedView}
              label={
                <SectionText>
                  {fundedView ? "Funded Stats" : "Eval Stats"}
                </SectionText>
              }
              labelPlacement="end"
              onChange={() => updateFundedView(!fundedView)}
            />
          </HorizontalSection>
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
                <HorizontalSection>
                  <SectionTitle
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      fontSize: 20,
                    }}
                  >
                    <CalendarPicker
                      value={currentDate}
                      showPicker={calendarPickerOpen}
                      hideTimePicker
                      views={["year", "month"]}
                      onSaveCallback={(selected) => {
                        setCurrentDate(moment(selected));
                        setCalendarPickerOpen(false);
                      }}
                    />
                    <If condition={false}>
                      <Loading size={20} />
                      <Else>
                        <MonthlySelectorContainer
                          onClick={() => setCalendarPickerOpen(true)}
                          style={{
                            marginRight: 15,
                            border: "1px solid #ffffff1f",
                            alignContent: "center",
                            padding: "2px 6px",
                            fontSize: 10,
                          }}
                        >
                          Select Month:
                        </MonthlySelectorContainer>
                      </Else>
                    </If>
                    <MonthlySelectorContainer>
                      <ChevronLeftIcon
                        onClick={() =>
                          setCurrentDate((prev) =>
                            moment(prev).subtract(1, "month"),
                          )
                        }
                      />
                    </MonthlySelectorContainer>
                    {m(currentDate).format("MMMM YYYY")}
                    <If condition={currentDate.isBefore(moment(), "month")}>
                      <MonthlySelectorContainer>
                        <ChevronRightIcon
                          onClick={() =>
                            setCurrentDate((prev) =>
                              moment(prev).add(1, "month"),
                            )
                          }
                        />
                      </MonthlySelectorContainer>
                    </If>
                  </SectionTitle>
                </HorizontalSection>
              </SubsectionHeaderWrapper>
              <Gap level={1} />
              <CalendarRenderer date={currentDate} />
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
          </SectionTitle>
        </HorizontalSection>
      </PageContainer>
    </Page>
  );
};

export default Calendar;
