import AlertPopout from "@components/Alert/AlertPopout";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Loading from "@components/Loading/Loading";
import Page from "@components/Page/Page";
import SelectWrapper from "@components/Select/SelectWrapper";
import HistoryIcon from "@mui/icons-material/History";
import { Pagination } from "@mui/material";
import { PnL } from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import useLoginState from "@pages/Login/hooks/useLoginState";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionText,
  SectionTitle,
  SubsectionHeaderWrapper,
  Table,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";
import { currencyOptions } from "@utils/constants";
import { formatter, m, useFormatterWithCurrency } from "@utils/utils";
import React, { useEffect, useRef } from "react";
import useGetMonthlyPayoutSummariesHandler from "./hooks/useGetMonthlyPayoutSummariesHandler";
import useGetPayoutsHandler from "./hooks/useGetPayoutsHandler";
import usePayoutsDispatch from "./hooks/usePayoutsDispatch";
import usePayoutsState from "./hooks/usePayoutsState";
import useUpdateCurrencyHandler from "./hooks/useUpdateCurrencyHandler";

const Payouts: React.FunctionComponent = () => {
  const {
    user: { preferred_currency, conversion_last_updated },
  } = useLoginState();
  const {
    payouts,
    itemsCount,
    currentPage,
    monthlySummariesCurrentPage,
    monthlySummaries,
    payoutsErrors,
  } = usePayoutsState();
  const { updateCurrentPage, updatePayoutsErrors } = usePayoutsDispatch();
  const { getPayouts } = useGetPayoutsHandler();
  const { getMonthlyPayoutSummaries } = useGetMonthlyPayoutSummariesHandler();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { format: localCurrencyFormatter } = useFormatterWithCurrency();
  const { updateCurrency, loading } = useUpdateCurrencyHandler();

  useEffect(() => {
    getPayouts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getMonthlyPayoutSummaries(monthlySummariesCurrentPage);
  }, [monthlySummariesCurrentPage]);

  useEffect(() => {
    if (scrollRef.current && monthlySummaries.length > 0) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [monthlySummaries]);

  const sortedCurrencies = [...currencyOptions].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={!!payoutsErrors?.detail || !!payoutsErrors?.error}
        message={(payoutsErrors?.detail || payoutsErrors?.error) as string}
        setPopoutOpen={() => updatePayoutsErrors({})}
      />
      <PageContainer>
        <HorizontalSection>
          <SectionTitle>Payout Tracking</SectionTitle>
          <HorizontalSection>
            <SectionText
              style={{
                width: 200,
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              {loading ? <Loading size={20} /> : `Local Currency: `}
              <If
                condition={m(conversion_last_updated).isBefore(
                  m().subtract(7, "days"),
                )}
              >
                <InfoPopout
                  warning
                  infoDescription="Conversion rate last updated more than 7 days ago."
                />
              </If>
            </SectionText>
            <SelectWrapper
              style={{ maxWidth: 200 }}
              items={sortedCurrencies}
              onSelect={(selected) => updateCurrency(selected)}
              selectedValue={preferred_currency}
              disabled={loading}
            />
          </HorizontalSection>
        </HorizontalSection>
        <Gap level={1} />
        <Section>
          <HorizontalSection $scrollable={true} ref={scrollRef}>
            {[...monthlySummaries].reverse().map((summary, idx) => (
              <div style={{ minWidth: 100, height: 100 }} key={idx}>
                <GlassTile
                  featureTile
                  minHeight={10}
                  minWidth={10}
                  padding={7}
                  neutral={summary.totalPayout === 0}
                  positive={summary.totalPayout > 0}
                >
                  <GlassTileChildrenWrapper>
                    <SectionTitle>
                      {m(summary.month).format("MMM")}
                      <PnL
                        $neutral={summary.totalPayout === 0}
                        $positive={summary.totalPayout > 0}
                        style={{ fontSize: 14, fontWeight: 400 }}
                      >
                        {!summary.totalPayout
                          ? "-"
                          : formatter.format(summary.totalPayout)}
                      </PnL>
                      <PnL
                        $positive
                        $neutral={true}
                        style={{ fontSize: 10, fontWeight: 400 }}
                      >
                        {!summary.totalPayout
                          ? "-"
                          : localCurrencyFormatter(summary.totalPayout)}
                      </PnL>
                    </SectionTitle>
                  </GlassTileChildrenWrapper>
                </GlassTile>
              </div>
            ))}
          </HorizontalSection>
        </Section>
        <Gap level={1} />
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
                <HistoryIcon style={{ color: "white", marginRight: 5 }} />
                Payout History
              </SubsectionHeaderWrapper>
              <Gap level={1} />
              <Table>
                <TableItem $header>
                  <TableField $flexSize={0.8}>Request Date</TableField>
                  <TableField $flexSize={1.3}>Funded Account</TableField>
                  <TableField $flexSize={0.5}>Start Date</TableField>
                  <TableField $flexSize={0.5}>End Date</TableField>
                  <TableField $flexSize={0.6}>Days traded</TableField>
                  <TableField $flexSize={0.5}>Amount</TableField>
                  <TableField $flexSize={0.5}>Local Currency</TableField>
                </TableItem>
                {payouts.map((payout, idx) => (
                  <TableItem key={payout.id} $idx={idx}>
                    <TableField $flexSize={0.8}>
                      {m(payout.payoutDate).format("MMM D, YYYY")}
                    </TableField>
                    <TableField $flexSize={1.3}>
                      {payout.account.name}
                    </TableField>
                    <TableField $flexSize={0.5}>
                      {m(payout.cycleStart).format("MMM D")}
                    </TableField>
                    <TableField $flexSize={0.5}>
                      {m(payout.cycleEnd).format("MMM D")}
                    </TableField>
                    <TableField $flexSize={0.6}>
                      {payout.tradingDaysInCycle}
                    </TableField>
                    <TableField $flexSize={0.5}>
                      {formatter.format(payout.amount)}
                    </TableField>
                    <TableField $flexSize={0.5}>
                      {localCurrencyFormatter(payout.amount)}
                    </TableField>
                  </TableItem>
                ))}
              </Table>
              <If condition={itemsCount > 10}>
                <Gap level={1} />
                <Pagination
                  color={"primary"}
                  page={currentPage}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "white" },
                  }}
                  count={!!itemsCount ? Math.ceil(itemsCount / 10) : 1}
                  onChange={(e, page) => {
                    updateCurrentPage(page);
                  }}
                />
                <Gap level={1} />
              </If>
            </GlassTileChildrenWrapper>
          </GlassTile>
        </Section>
      </PageContainer>
    </Page>
  );
};

export default Payouts;
