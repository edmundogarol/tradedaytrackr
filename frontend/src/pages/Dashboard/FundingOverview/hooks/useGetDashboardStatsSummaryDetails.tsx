import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { color } from "@styles/colors";
import { formatter } from "@utils/utils";

export const useGetDashboardStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    const { dashboardSummaries } = useFundedAccountsState();
    return [
      {
        tileValue: "$",
        tileValueColor: "#7bb75d",
        tileTitle: "Withdrawable PnL",
        tileSubtitle: {
          highlighted: formatter.format(
            dashboardSummaries.currentStats.withdrawablePnl,
          ),
          content: "",
        },
        tileShinePositive: true,
        infoDescription:
          "Total payout available for withdrawal based on your current profits.",
        tileIcon: <CreditCardIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: dashboardSummaries.currentStats.daysToPayout.toString(),
        tileValueColor:
          dashboardSummaries.currentStats.daysToPayout < 3
            ? color("SystemGreen")
            : color("SystemRed"),
        tileTitle: "Days to Payout",
        tileSubtitle: {
          content: `Min: ${dashboardSummaries.upcomingPayout.minDays} days`,
        },
        tileShinePositive: dashboardSummaries.currentStats.daysToPayout < 3,
        infoDescription:
          "Number of days remaining until the next payout is available.",
        tileIcon: <DateRangeIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: dashboardSummaries.currentStats.activePas.toString(),
        tileShinePositive: true,
        tileValueColor: "#ffffff",
        tileTitle: "Active PAs",
        tileSubtitle: {
          content: `${dashboardSummaries.currentStats.nearPayout} near payout`,
        },
        infoDescription:
          "Number of active funded accounts that have met consistency and min trading days requirements.",
        tileIcon: <AutoAwesomeMotionIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: `${dashboardSummaries.currentStats.winRate.toFixed(0)}%`,
        tileValueColor:
          dashboardSummaries.currentStats.winRate >= 50
            ? color("SystemGreen")
            : color("SystemRed"),
        tileTitle: "Win Rate",
        tileSubtitle: {
          content: "Past 50 trades",
        },
        tileShinePositive: dashboardSummaries.currentStats.winRate >= 50,
        infoDescription:
          "Percentage of winning trades out of the last 50 trades.",
        tileIcon: <CheckCircleOutlineIcon style={styles.iconStyle(60)} />,
      },
    ];
  };

export default useGetDashboardStatsSummaryDetails;
