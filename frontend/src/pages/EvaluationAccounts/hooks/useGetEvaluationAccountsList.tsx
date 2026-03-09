import type { EvaluationAccountsListItemDetails } from "../EvaluationAccountsListItem";

export const useGetEvaluationAccountsList =
  (): EvaluationAccountsListItemDetails[] => {
    return [
      {
        id: 1,
        accountName: "MFFUSFCR71",
        accountSize: 50000,
        accountType: {
          id: 1,
          name: "Standard",
        },
        profitTarget: 3000,
        accountBalance: 51010,
        firm: "mffu",
        firmMinDays: 5,
        currentDayCount: 5,
        currentConsistencyScore: 50,
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
            value: -210,
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
      },
      {
        id: 2,
        accountName: "MFFUSFCR72",
        accountSize: 50000,
        accountType: {
          id: 1,
          name: "Standard",
        },
        profitTarget: 3000,
        accountBalance: 52020,
        firm: "mffu",
        firmMinDays: 5,
        currentDayCount: 5,
        currentConsistencyScore: 50,

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
      },
      {
        id: 3,
        accountName: "PAAPEX022",
        accountSize: 50000,
        accountBalance: 51120,
        accountType: {
          id: 1,
          name: "Standard",
        },
        profitTarget: 3000,
        firm: "apex",
        firmMinDays: 8,
        currentDayCount: 5,
        currentConsistencyScore: 60,

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
      },
      {
        id: 4,
        accountName: "BULENOX023",
        accountSize: 50000,
        accountBalance: 51530,
        accountType: {
          id: 1,
          name: "Standard",
        },
        profitTarget: 3000,
        firm: "bulenox",
        firmMinDays: 10,
        currentDayCount: 5,
        currentConsistencyScore: 80,

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
      },
      {
        id: 5,
        accountName: "ALPHAFU002",
        accountSize: 50000,
        accountType: {
          id: 1,
          name: "Standard",
        },
        profitTarget: 3000,
        accountBalance: 50040,
        firm: "alpha",
        firmMinDays: 5,
        currentDayCount: 5,
        currentConsistencyScore: 40,
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
      },
    ];
  };

export default useGetEvaluationAccountsList;
