import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import { If } from "@components/If/If";
import Page from "@components/Page/Page";
import HistoryIcon from "@mui/icons-material/History";
import { Pagination } from "@mui/material";
import {
  PageContainer,
  Section,
  SectionTitle,
  SubsectionHeaderWrapper,
  Table,
  TableField,
  TableItem,
} from "@styles/globalStyledComponents";
import { formatter, m } from "@utils/utils";
import React, { useEffect } from "react";
import useGetPayoutsHandler from "./hooks/useGetPayoutsHandler";
import usePayoutsDispatch from "./hooks/usePayoutsDispatch";
import usePayoutsState from "./hooks/usePayoutsState";

const Payouts: React.FunctionComponent = () => {
  const { payouts, itemsCount, currentPage } = usePayoutsState();
  const { updateCurrentPage } = usePayoutsDispatch();
  const { getPayouts } = useGetPayoutsHandler();

  useEffect(() => {
    getPayouts(currentPage);
  }, [currentPage]);

  return (
    <Page topBarShowMenu={true}>
      <PageContainer>
        <SectionTitle>Payout Tracking</SectionTitle>
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
                      {formatter.format(payout.amount)}
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
