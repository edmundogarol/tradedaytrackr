import type { StatsSummaryTileDetails } from "@components/Stats/StatsSummary/StatsSummary";
import styles from "@components/Stats/StatsSummary/StatsSummaryStyles";
import type { TradingAccount } from "@interfaces/CustomTypes";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HardwareIcon from "@mui/icons-material/Hardware";
import { formatter } from "@utils/utils";
import { useMemo } from "react";
import useFundedAccountsState from "./useFundedAccountsState";

export const useGetFundedAccountsStatsSummaryDetails =
  (): StatsSummaryTileDetails[] => {
    const { tradingAccounts, firmFilter, bufferFilter } =
      useFundedAccountsState();

    const filteredTradingAccounts: TradingAccount[] = useMemo(() => {
      return tradingAccounts
        .filter((account) => !account.accountType.isEval)
        .filter((account) => {
          const firmMatch =
            firmFilter.length === 0 ||
            firmFilter.includes(account.accountType.firm);

          const bufferMatch =
            bufferFilter.length === 0 ||
            bufferFilter.some((filter) => {
              const v = Math.round((account as TradingAccount).bufferPercent);

              if (filter === "<20") return v < 20;
              if (filter === "<50") return v < 50;
              if (filter === ">50") return v > 50;
              if (filter === ">90") return v > 90;
              if (filter === "complete") return v === 100;

              return false;
            });

          return firmMatch && bufferMatch;
        }) as TradingAccount[];
    }, [tradingAccounts, firmFilter, bufferFilter]);

    const totalActiveFunding = useMemo(() => {
      return filteredTradingAccounts.reduce(
        (total, account) => total + Number(account.accountSize),
        0,
      );
    }, [filteredTradingAccounts]);

    const accountsNearPayout = useMemo(() => {
      return filteredTradingAccounts.filter(
        (account) =>
          account.currentDayCount >= 0 &&
          account.currentDayCount <= 5 &&
          account.bufferPercent > 70 &&
          account.bufferPercent < 100,
      ).length;
    }, [filteredTradingAccounts]);

    const accountsWithBuffersBuilt = useMemo(() => {
      return filteredTradingAccounts.filter(
        (account) => account.bufferPercent === 100,
      ).length;
    }, [filteredTradingAccounts]);

    const accountsWithBuffersBuiltAbove80 = useMemo(() => {
      return filteredTradingAccounts.filter(
        (account) => account.bufferPercent > 80,
      ).length;
    }, [filteredTradingAccounts]);

    const withdrawablePnL = useMemo(() => {
      return filteredTradingAccounts.reduce(
        (total, account) => total + Number(account.withdrawableAmount),
        0,
      );
    }, [filteredTradingAccounts]);

    const accountsFirmsCount = useMemo(() => {
      const firmCounts: Record<string, number> = {};
      filteredTradingAccounts.forEach((account) => {
        const firm = account.accountType.firm;
        firmCounts[firm] = (firmCounts[firm] || 0) + 1;
      });
      return firmCounts;
    }, [filteredTradingAccounts]);

    return [
      {
        tileValue: formatter.format(totalActiveFunding),
        tileValueColor: "#b2deb2",
        tileTitle: "Total Active Funding",
        tileSubtitle: {
          content: Object.entries(accountsFirmsCount)
            .map(([firm, count]) => `${count}x ${firm}`)
            .join(", "),
        },
        tileShinePositive: true,
        tileIcon: (
          <AssuredWorkloadIcon style={styles.featureIconStyle(30, "#b2deb2")} />
        ),
      },
      {
        tileValue: accountsNearPayout.toString(),
        tileValueColor: "#b2deb2",
        tileTitle: "Accounts Near Payout",
        tileSubtitle: {
          content: "Within 5 days",
        },
        tileShinePositive: true,
        tileIcon: <DateRangeIcon style={styles.featureIconStyle(40)} />,
      },
      {
        tileValue: accountsWithBuffersBuilt.toString(),
        tileShinePositive: true,
        tileValueColor: "#ffffff",
        tileTitle: "Account Buffers Built",
        tileSubtitle: {
          content: `${accountsWithBuffersBuiltAbove80} above 80%`,
        },
        tileIcon: (
          <HardwareIcon style={styles.featureIconStyle(40, "#b2deb2")} />
        ),
      },
      {
        tileValue: formatter.format(withdrawablePnL),
        tileValueColor: "#b2deb2",
        tileTitle: "Withdrawable PnL",
        tileSubtitle: {
          content: "Ready for withdrawal",
        },
        tileShinePositive: true,
        tileIcon: <CreditCardIcon style={styles.featureIconStyle(40)} />,
      },
    ];
  };

export default useGetFundedAccountsStatsSummaryDetails;
