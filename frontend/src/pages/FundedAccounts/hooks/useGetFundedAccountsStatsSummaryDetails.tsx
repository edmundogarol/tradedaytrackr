import DateRangeIcon from "@mui/icons-material/DateRange";
import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import HardwareIcon from "@mui/icons-material/Hardware";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const useGetFundedAccountsStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    return [
      {
        tileValue: "$350,000",
        tileValueColor: "#b2deb2",
        tileTitle: "Total Active Funding",
        tileSubtitle: {
          content: "2 x Apex, 2 x MFFU, 2 x Bulenox",
        },
        tileShinePositive: true,
        tileIcon: (
          <AssuredWorkloadIcon style={styles.featureIconStyle(30, "#b2deb2")} />
        ),
      },
      {
        tileValue: "2",
        tileValueColor: "#b2deb2",
        tileTitle: "Accounts Near Payout",
        tileSubtitle: {
          content: "Within 5 days",
        },
        tileShinePositive: true,
        tileIcon: <DateRangeIcon style={styles.featureIconStyle(40)} />,
      },
      {
        tileValue: "3",
        tileShinePositive: true,
        tileValueColor: "#ffffff",
        tileTitle: "Account Buffers Built",
        tileSubtitle: {
          content: "4 above 80%",
        },
        tileIcon: (
          <HardwareIcon style={styles.featureIconStyle(40, "#b2deb2")} />
        ),
      },
      {
        tileValue: "$1,240",
        tileValueColor: "#b2deb2",
        tileTitle: "Withdrawable PnL",
        tileSubtitle: {
          content: "",
        },
        tileShinePositive: true,
        tileIcon: <CreditCardIcon style={styles.featureIconStyle(40)} />,
      },
    ];
  };

export default useGetFundedAccountsStatsSummaryDetails;
