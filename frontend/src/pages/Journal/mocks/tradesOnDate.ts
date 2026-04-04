import type { Trade } from "@interfaces/CustomTypes";
import moment from "moment";

export const availableAccountTradesOnDateMock: Trade[] = [
  {
    id: 1,
    accountName: "MFFUSFCR71",
    accountId: 1,
    date: moment().add(1, "hour").toISOString(),
    pnl: 310,
  },
  {
    id: 2,
    accountName: "MFFUSFCR72",
    accountId: 2,
    date: moment().add(2, "hour").toISOString(),
    pnl: 310,
  },
  {
    id: 3,
    accountName: "MFFUSFCR73",
    accountId: 3,
    date: moment().add(3, "hour").toISOString(),
    pnl: 310,
  },

  {
    id: 4,
    accountName: "APEXPA21",
    accountId: 4,
    date: moment().add(4, "hour").toISOString(),
    pnl: -150,
  },
  {
    id: 5,
    accountName: "APEXPA23",
    accountId: 5,
    date: moment().add(5, "hour").toISOString(),
    pnl: -150,
  },
];
