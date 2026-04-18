import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";

export const useGetDashboardStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    const { dashboardSummaries } = useFundedAccountsState();
    return [
      {
        tileValue: "$",
        tileValueColor: "#7bb75d",
        tileTitle: "Withdrawable PnL",
        tileSubtitle: {
          highlighted: "$123",
          content: "tomorrow",
        },
        tileShinePositive: true,
        infoDescription:
          "Total payout available for withdrawal based on your current profits.",
        tileIcon: <CreditCardIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: "5",
        tileValueColor: "#ff7171",
        tileTitle: "Days to Payout",
        tileSubtitle: {
          content: "Min: 10 days",
        },
        tileShinePositive: false,
        infoDescription:
          "Number of days remaining until the next payout is available.",
        tileIcon: <DateRangeIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: "10",
        tileShinePositive: true,
        tileValueColor: "#ffffff",
        tileTitle: "Active PAs",
        tileSubtitle: {
          content: "2 near payout",
        },
        infoDescription: "Number of active funded accounts.",
        tileIcon: <AutoAwesomeMotionIcon style={styles.iconStyle(60)} />,
      },
      {
        tileValue: "75%",
        tileValueColor: "#7bb75d",
        tileTitle: "Win Rate",
        tileSubtitle: {
          content: "Past 20 trades",
        },
        tileShinePositive: true,
        infoDescription:
          "Percentage of winning trades out of the last 20 trades.",
        tileIcon: <CheckCircleOutlineIcon style={styles.iconStyle(60)} />,
      },
    ];
  };

export default useGetDashboardStatsSummaryDetails;
