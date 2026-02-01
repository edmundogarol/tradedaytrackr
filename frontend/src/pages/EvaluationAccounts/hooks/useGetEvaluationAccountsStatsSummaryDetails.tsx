import DateRangeIcon from "@mui/icons-material/DateRange";
import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { color } from "@styles/colors";

export const useGetEvaluationAccountsStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    return [
      {
        tileValue: "$250,000",
        tileValueColor: "#ffffff",
        tileTitle: "Total Eval Funding",
        tileSubtitle: {
          content: "Funding across all evals",
        },
        tileIcon: (
          <RequestQuoteIcon
            style={styles.featureIconStyle(40, color("SystemBlue5"))}
          />
        ),
      },
      {
        tileValue: "5",
        tileValueColor: "#ffffff",
        tileTitle: "Active Evaluations",
        tileSubtitle: {
          content: "2 x Apex, 2 x MFFU, 2 x Bulenox",
        },
        tileIcon: (
          <StickyNote2Icon
            style={styles.featureIconStyle(30, color("SystemBlue5"))}
          />
        ),
      },
      {
        tileValue: "2",
        tileValueColor: "#ffffff",
        tileTitle: "Near Pass",
        tileSubtitle: {
          content: "Within 5 days",
        },
        tileIcon: (
          <DateRangeIcon
            style={styles.featureIconStyle(40, color("SystemBlue5"))}
          />
        ),
      },
      {
        tileValue: "67%",
        tileValueColor: "#ffffff",
        tileTitle: "Profit Target Progress",
        tileSubtitle: {
          content: "Avg across all evals",
        },
        tileIcon: (
          <SportsScoreIcon
            style={styles.featureIconStyle(40, color("SystemBlue5"))}
          />
        ),
      },
    ];
  };

export default useGetEvaluationAccountsStatsSummaryDetails;
