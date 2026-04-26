import { color } from "@styles/colors";
import { SectionText } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const LocalCurrencyLabel = styled(SectionText)`
  width: 200px;
  justify-content: flex-end;
  display: flex;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
`;

export const DayHeaderCell = styled.div`
  text-align: center;
  font-size: 12px;
  opacity: 0.6;
  color: ${color("SystemWhite")};
`;

export const DayCell = styled.div<{ $bg?: string }>`
  border-radius: 8px;
  padding: 6px;
  min-height: 60px;
  background: ${(props: { $bg?: string }): string =>
    props.$bg || "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${color("SystemWhite")};
  position: relative;

  svg {
    position: absolute;
    right: 7px;
    height: 20px;
    z-index: 20;
    &:hover {
      cursor: pointer;
      filter: brightness(1.2);
    }
  }
`;

export const MonthlySelectorContainer = styled(SectionText)`
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
  align-items: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const ReportStatCardContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
  flex: 1;
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
  margin: 5px;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 150px;
  // 👇 subtle hover like pro dashboards
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    /* box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6); */
  }
`;

export const ReportTileTitle = styled(SectionText)`
  font-size: 12px;
  color: ${color("SystemLabel1")};
  display: flex;
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Value = styled(SectionText)<{ $positive?: boolean }>(
  ({ $positive }) => ({
    fontSize: 22,
    color:
      $positive === undefined
        ? "#FFFFFF"
        : $positive
          ? color("SystemLightGreen")
          : color("SystemRed"),
  }),
);

export const SubValue = styled(SectionText)({
  fontSize: 12,
  fontWeight: 400,
  color: "#9CA3AF",
  marginTop: 4,
});
