import AlertPopout from "@components/Alert/AlertPopout";
import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import Page from "@components/Page/Page";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import { Pagination } from "@mui/material";
import { PnL } from "@pages/FundedAccounts/FundedAccountDetail/FundedAccountDetailStyledComponents";
import {
  HorizontalSection,
  PageContainer,
  Section,
  SectionTitle,
  SubsectionHeaderWrapper,
  Table,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import AddBudgetPurchaseModal from "./AddBudgetPurchaseModal/AddBudgetPurchaseModal";
import styles from "./BudgetTrackingStyles";
import DeleteBudgetPurchaseModal from "./DeleteBudgetPurchaseModal/DeleteBudgetPurchaseModal";
import useBudgetTrackingDispatch from "./hooks/useBudgetTrackingDispatch";
import useBudgetTrackingState from "./hooks/useBudgetTrackingState";
import useGetBudgetPurchasesHandler from "./hooks/useGetBudgetPurchasesHandler";
import useGetMonthlyBudgetSummariesHandler from "./hooks/useGetMonthlyBudgetSummariesHandler";

// purchase_date / summary.month are calendar dates (stored at UTC midnight),
// not moments in time — format them in UTC so they don't roll back a day/month
// for users in a timezone behind UTC (the shared m() converts to local tz).
const formatPurchaseDate = (date: string): string =>
  moment.utc(date).format("MMM D, YYYY");
const formatSummaryMonth = (month: string): string =>
  moment.utc(month, "YYYY-MM").format("MMM");

const BudgetTracking: React.FunctionComponent = () => {
  const { purchases, itemsCount, currentPage, monthlySummaries, purchasesErrors } =
    useBudgetTrackingState();
  const {
    updateCurrentPage,
    updatePurchasesErrors,
    updateAddPurchaseModalOpen,
    updateDeletingPurchaseModalOpen,
    updateDeletingPurchase,
  } = useBudgetTrackingDispatch();
  const { getBudgetPurchases } = useGetBudgetPurchasesHandler();
  const { getMonthlyBudgetSummaries } = useGetMonthlyBudgetSummariesHandler();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getBudgetPurchases(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getMonthlyBudgetSummaries();
  }, []);

  useEffect(() => {
    if (scrollRef.current && monthlySummaries.length > 0) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [monthlySummaries]);

  const totalSpend = monthlySummaries.reduce((sum, s) => sum + s.totalSpend, 0);
  const totalPulled = monthlySummaries.reduce((sum, s) => sum + s.totalPayout, 0);
  const totalNet = totalPulled - totalSpend;

  return (
    <Page topBarShowMenu={true}>
      <AlertPopout
        hideDuration={3000}
        open={!!purchasesErrors?.detail || !!purchasesErrors?.error}
        message={(purchasesErrors?.detail || purchasesErrors?.error) as string}
        setPopoutOpen={() => updatePurchasesErrors({})}
      />
      <PageContainer>
        <HorizontalSection>
          <SectionTitle>Budget Tracking</SectionTitle>
          <Button
            text={"Add Purchase"}
            iconType={IconTypeEnum.MaterialIcons}
            iconLeft={"add"}
            textStyle={styles.addButton.text}
            style={styles.addButton.button}
            onClick={(): void => updateAddPurchaseModalOpen(true)}
          />
        </HorizontalSection>
        <Gap level={1} />
        <Section>
          <HorizontalSection>
            <GlassTile featureTile minHeight={10} minWidth={30} padding={7}>
              <GlassTileChildrenWrapper>
                <SectionTitle style={{ fontSize: 12 }}>
                  Total Spent (12mo)
                </SectionTitle>
                <PnL $positive={false} $neutral={false} style={{ fontSize: 20 }}>
                  {formatter.format(totalSpend)}
                </PnL>
              </GlassTileChildrenWrapper>
            </GlassTile>
            <Gap level={1} isVertical={false} />
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={30}
              padding={7}
              positive={totalNet > 0}
              neutral={totalNet === 0}
            >
              <GlassTileChildrenWrapper>
                <SectionTitle style={{ fontSize: 12 }}>
                  Net (Pulled - Spent)
                </SectionTitle>
                <PnL
                  $positive={totalNet > 0}
                  $neutral={totalNet === 0}
                  style={{ fontSize: 20 }}
                >
                  {formatter.format(totalNet)}
                </PnL>
              </GlassTileChildrenWrapper>
            </GlassTile>
          </HorizontalSection>
        </Section>
        <Gap level={1} />
        <Section>
          <HorizontalSection $scrollable={true} ref={scrollRef}>
            {[...monthlySummaries].reverse().map((summary, idx) => (
              <div style={styles.monthTile} key={idx}>
                <GlassTile
                  featureTile
                  minHeight={10}
                  minWidth={10}
                  padding={7}
                  neutral={summary.net === 0}
                  positive={summary.net > 0}
                >
                  <GlassTileChildrenWrapper>
                    <SectionTitle>
                      {formatSummaryMonth(summary.month)}
                      <PnL
                        $positive={summary.totalPayout > 0}
                        $neutral={!summary.totalPayout}
                        style={{ fontSize: 13, fontWeight: 400 }}
                      >
                        {!summary.totalPayout
                          ? "-"
                          : `+${formatter.format(summary.totalPayout)}`}
                      </PnL>
                      <PnL
                        $positive={false}
                        $neutral={!summary.totalSpend}
                        style={{ fontSize: 13, fontWeight: 400 }}
                      >
                        {!summary.totalSpend
                          ? "-"
                          : `-${formatter.format(summary.totalSpend)}`}
                      </PnL>
                      <PnL
                        $neutral={summary.net === 0}
                        $positive={summary.net > 0}
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          ...styles.monthTileNet,
                        }}
                      >
                        {formatter.format(summary.net)}
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
                <HistoryIcon style={styles.sectionIcon} />
                Purchase History
              </SubsectionHeaderWrapper>
              <Gap level={1} />
              <Table>
                <TableItem $header>
                  <TableField $flexSize={0.6}>Date</TableField>
                  <TableField $flexSize={0.8}>Firm</TableField>
                  <TableField $flexSize={0.6}>Account Size</TableField>
                  <TableField $flexSize={0.5}>Cost</TableField>
                  <TableField $flexSize={1}>Notes</TableField>
                  <TableField $flexSize={0.3}> </TableField>
                </TableItem>
                {purchases.map((purchase, idx) => (
                  <TableItem key={purchase.id} $idx={idx}>
                    <TableField $flexSize={0.6}>
                      {formatPurchaseDate(purchase.purchaseDate)}
                    </TableField>
                    <TableField
                      $flexSize={0.8}
                      style={{ textTransform: "capitalize" }}
                    >
                      {purchase.firm || "-"}
                    </TableField>
                    <TableField $flexSize={0.6}>
                      {purchase.accountSize
                        ? formatter.format(purchase.accountSize)
                        : "-"}
                    </TableField>
                    <TableField $flexSize={0.5}>
                      {formatter.format(purchase.cost)}
                    </TableField>
                    <TableField $flexSize={1}>{purchase.notes || "-"}</TableField>
                    <TableField $flexSize={0.3}>
                      <DeleteIcon
                        style={styles.deleteIcon}
                        onClick={() => {
                          updateDeletingPurchase(purchase);
                          updateDeletingPurchaseModalOpen(true);
                        }}
                      />
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
      <AddBudgetPurchaseModal />
      <DeleteBudgetPurchaseModal />
    </Page>
  );
};

export default BudgetTracking;
