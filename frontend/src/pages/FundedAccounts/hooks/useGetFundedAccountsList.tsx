import type { FundedAccountsListItemDetails } from "../FundedAccountsListItem";

export const useGetFundedAccountsList = (): FundedAccountsListItemDetails[] => {
  return [
    {
      accountName: "MFFUSFCR71",
      accountSize: 50000,
      accountBalance: 51010,
      firm: "mffu",
      firmMinDays: 5,
      currentDayCount: 5,
      dayValues: [
        {
          value: 200,
          day: "D1",
        },
        {
          value: 250,
          day: "D2",
        },
        {
          value: 210,
          day: "D3",
        },
        {
          value: 200,
          day: "D4",
        },
        {
          value: 150,
          day: "D5",
        },
      ],
      noGlow: true,
      noShine: true,
      minBuffer: 250,
      bufferPercent: 100,
    },
    {
      accountName: "MFFUSFCR72",
      accountSize: 50000,

      accountBalance: 52020,
      firm: "mffu",
      firmMinDays: 5,
      currentDayCount: 5,
      dayValues: [
        {
          value: 220,
          day: "D1",
        },
        {
          value: 230,
          day: "D2",
        },
        {
          value: -200,
          day: "D3",
        },
        {
          value: 210,
          day: "D4",
        },
        {
          value: 180,
          day: "D5",
        },
      ],
      noGlow: true,
      noShine: true,
      minBuffer: 250,
      bufferPercent: 100,
    },
    {
      accountName: "PAAPEX022",
      accountSize: 50000,
      accountBalance: 51120,
      firm: "apex",
      firmMinDays: 8,
      currentDayCount: 5,
      dayValues: [
        {
          value: 180,
          day: "D1",
        },
        {
          value: 220,
          day: "D2",
        },
        {
          value: 200,
          day: "D3",
        },
        {
          value: 190,
          day: "D4",
        },
        {
          value: 160,
          day: "D5",
        },
      ],
      noGlow: true,
      noShine: true,
      minBuffer: 2600,
      bufferPercent: 55,
    },
    {
      accountName: "BULENOX023",
      accountSize: 50000,
      accountBalance: 51530,
      firm: "bulenox",
      firmMinDays: 10,
      currentDayCount: 5,
      dayValues: [
        {
          value: 210,
          day: "D1",
        },
        {
          value: 240,
          day: "D2",
        },
        {
          value: 230,
          day: "D3",
        },
        {
          value: 220,
          day: "D4",
        },
        {
          value: 190,
          day: "D5",
        },
      ],
      noGlow: true,
      noShine: true,
      minBuffer: 2500,
      bufferPercent: 75,
    },
    {
      accountName: "ALPHAFU002",
      accountSize: 50000,

      accountBalance: 50040,
      firm: "alpha",
      firmMinDays: 5,
      currentDayCount: 5,
      dayValues: [
        {
          value: 230,
          day: "D1",
        },
        {
          value: -260,
          day: "D2",
        },
        {
          value: 240,
          day: "D3",
        },
        {
          value: -230,
          day: "D4",
        },
        {
          value: 200,
          day: "D5",
        },
      ],
      noGlow: true,
      noShine: true,
      minBuffer: 2000,
      bufferPercent: 5,
    },
  ];
};

export default useGetFundedAccountsList;
