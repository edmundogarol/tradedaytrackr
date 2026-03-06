import type { FundedAccountsListItemDetails } from "../FundedAccountsListItem";

export const useGetFundedAccountsList = (): FundedAccountsListItemDetails[] => {
  return [
    {
      id: 1,
      accountName: "MFFUSFCR72334300-232323231",
      accountSize: 50000,
      accountBalance: 51010,
      accountType: {
        id: 1,
        name: "MFFU 50k Flex",
      },
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
      id: 2,
      accountName: "MFFUSFCR72",
      accountSize: 50000,

      accountBalance: 52020,
      accountType: {
        id: 1,
        name: "MFFU 50k Flex",
      },
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
      id: 3,
      accountName: "PAAPEX022",
      accountSize: 50000,
      accountBalance: 51120,
      accountType: {
        id: 2,
        name: "APEX 50k Flex",
      },
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
      id: 4,
      accountName: "BULENOX023",
      accountSize: 50000,
      accountBalance: 51530,
      firm: "bulenox",
      firmMinDays: 10,
      currentDayCount: 5,
      accountType: {
        id: 3,
        name: "BULENOX 50k Flex",
      },
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
      id: 5,
      accountName: "ALPHAFU002",
      accountSize: 50000,
      accountType: {
        id: 4,
        name: "ALPHA 50k Flex",
      },
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
