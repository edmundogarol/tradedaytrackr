import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import type { EvaluationAccount } from "@interfaces/CustomTypes";
import DateRangeIcon from "@mui/icons-material/DateRange";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import useFundedAccountsState from "@pages/FundedAccounts/hooks/useFundedAccountsState";
import { color } from "@styles/colors";
import { formatter } from "@utils/utils";
import { EvalProgressStatus } from "./useGetEvalProgressStatus";

export const useGetEvaluationAccountsStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    const { tradingAccounts, evalFirmFilter, evalStatusFilter } =
      useFundedAccountsState();

    const filteredTradingAccounts: EvaluationAccount[] = tradingAccounts.filter(
      (account): account is EvaluationAccount => {
        const isEval = account.accountType.isEval;

        const firmMatch =
          evalFirmFilter.length === 0 ||
          evalFirmFilter.includes(account.accountType.firm);

        const progress =
          account.profitTarget && account.profitTarget > 0
            ? (Number(account.accountBalance) / Number(account.profitTarget)) *
              100
            : 0;

        const statusMatch =
          evalStatusFilter.length === 0 ||
          evalStatusFilter.some((filter) => {
            const v = Math.round(progress);

            if (filter === EvalProgressStatus.Started) return v >= 0 && v < 25;
            if (filter === EvalProgressStatus.InProgress)
              return v >= 25 && v < 30;
            if (filter === EvalProgressStatus.OnTrack) return v >= 30 && v < 60;
            if (filter === EvalProgressStatus.NearPass)
              return v >= 60 && v < 100;
            if (filter === EvalProgressStatus.Complete) return v >= 100;

            return false;
          });

        return isEval && firmMatch && statusMatch;
      },
    );

    // Total Eval Funding
    const totalEvalFunding = filteredTradingAccounts.reduce(
      (total, account) => total + Number(account.accountSize),
      0,
    );

    // Active Evaluations Count
    const activeEvaluations = filteredTradingAccounts.length;

    // Firm breakdown
    const firmCounts: Record<string, number> = {};
    filteredTradingAccounts.forEach((account) => {
      const firm = account.accountType.firm;
      firmCounts[firm] = (firmCounts[firm] || 0) + 1;
    });

    // Near Pass (75–100%)
    const nearPassCount = filteredTradingAccounts.filter((account) => {
      const progress =
        account.profitTarget && account.profitTarget > 0
          ? (Number(account.accountBalance) / Number(account.profitTarget)) *
            100
          : 0;

      return progress >= 75 && progress < 100;
    }).length;

    // Average Progress
    const avgProgress =
      filteredTradingAccounts.length === 0
        ? 0
        : filteredTradingAccounts.reduce((total, account) => {
            const getProgress = (account: EvaluationAccount): number => {
              const profit =
                Number(account.accountBalance) - Number(account.accountSize);

              if (!account.profitTarget) return 0;

              return (profit / Number(account.profitTarget)) * 100;
            };
            return total + getProgress(account);
          }, 0) / filteredTradingAccounts.length;

    return [
      {
        tileValue: formatter.format(totalEvalFunding),
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
        tileValue: activeEvaluations.toString(),
        tileValueColor: "#ffffff",
        tileTitle: "Active Evaluations",
        tileSubtitle: {
          content: Object.entries(firmCounts)
            .map(([firm, count]) => `${count}x ${firm}`)
            .join(", "),
        },
        tileIcon: (
          <StickyNote2Icon
            style={styles.featureIconStyle(30, color("SystemBlue5"))}
          />
        ),
      },
      {
        tileValue: nearPassCount.toString(),
        tileValueColor: "#ffffff",
        tileTitle: "Near Pass",
        tileSubtitle: {
          content: "75%+ progress",
        },
        tileIcon: (
          <DateRangeIcon
            style={styles.featureIconStyle(40, color("SystemBlue5"))}
          />
        ),
      },
      {
        tileValue: `${Math.round(avgProgress)}%`,
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
