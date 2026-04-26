import { HorizontalSection } from "@styles/globalStyledComponents";
import { formatter } from "@utils/utils";
import ReportStatCard from "./ReportStatCard";
import { Value } from "./ReportsStyledComponents";
import useReportsState from "./hooks/useReportsState";

const ReportsStatsBar = (): React.ReactElement => {
  const { reportData } = useReportsState();
  const data = reportData.overview;
  const wins = Math.round(data.winRate * data.totalTrades);
  const losses = data.totalTrades - wins;

  return (
    <HorizontalSection style={{ overflow: "scroll" }}>
      <ReportStatCard
        title="Total PnL"
        value={`$${data.totalPnl.toLocaleString()}`}
        subValue={
          data.pnlPercentage ? `${data.pnlPercentage.toFixed(2)}%` : undefined
        }
        positive={data.totalPnl >= 0}
        showChart
      />

      <ReportStatCard
        title="Win Rate"
        value={`${Math.round(data.winRate * 100)}%`}
        positive={data.winRate >= 0.5}
        subValue={`${wins}W / ${losses}L`}
      />

      <ReportStatCard
        title="Profit Factor"
        positive={data.profitFactor >= 1}
        value={data.profitFactor.toFixed(2)}
      />

      <ReportStatCard
        title="Expectancy"
        positive={data.expectancy >= 0}
        value={`$${data.expectancy.toFixed(2)}`}
        subValue="Avg per trade"
      />

      <ReportStatCard
        title="Total Trades"
        value={data.totalTrades.toString()}
        subValue="100% of trades"
      />

      <ReportStatCard
        title="Avg Win / Avg Loss"
        value={
          <>
            <Value $positive={data.avgWin >= 0}>
              {formatter.format(data.avgWin)}
            </Value>{" "}
            / {formatter.format(data.avgLoss)}
          </>
        }
      />
    </HorizontalSection>
  );
};

export default ReportsStatsBar;
