import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import { PageEnum } from "@interfaces/NavigationTypes";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { color } from "@styles/colors";
import { formatter } from "@utils/utils";

export const useGetDashboardStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    const { dashboardSummaries } = useFundedAccountsState();
    const navigation = useReactNavigation();
    const isReadyForPayout = dashboardSummaries.currentStats.daysToPayout <= 0;
    const readyAccountId = dashboardSummaries.upcomingPayout.accountId;
    const readyAccounts = dashboardSummaries.upcomingPayout.readyAccounts || [];

    const goToAccount = (id: number): void =>
      navigation.navigate(PageEnum.FundedAccountDetail, { id });

    const readyAccountDropdownItems = readyAccounts.map((account) => ({
      label: `${account.accountName} (${account.firm})`,
      subLabel: `${formatter.format(account.withdrawableAmount)} available`,
      onClick: (): void => goToAccount(account.id),
    }));

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
        tileValue: isReadyForPayout
          ? "Ready"
          : dashboardSummaries.currentStats.daysToPayout.toString(),
        tileValueColor:
          dashboardSummaries.currentStats.daysToPayout < 3
            ? color("SystemGreen")
            : color("SystemRed"),
        tileTitle: "Trading Days Left",
        tileSubtitle: {
          content: `Min: ${dashboardSummaries.upcomingPayout.minDays} trading days`,
        },
        tileShinePositive: dashboardSummaries.currentStats.daysToPayout < 3,
        infoDescription:
          isReadyForPayout && readyAccountDropdownItems.length > 0
            ? readyAccountDropdownItems.length > 1
              ? "Multiple accounts are payout-eligible now. Click to choose one and record a payout."
              : "This account is payout-eligible now. Click to open it and record a payout."
            : "Number of eligible trading days still needed before the minimum is met (weekends don't count). See \"Upcoming Payout Details\" above for the actual calendar date.",
        tileIcon: <DateRangeIcon style={styles.iconStyle(60)} />,
        tileDropdownItems: isReadyForPayout
          ? readyAccountDropdownItems
          : undefined,
        onTileClick:
          isReadyForPayout &&
          readyAccountDropdownItems.length === 0 &&
          readyAccountId
            ? (): void => goToAccount(readyAccountId)
            : undefined,
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
