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
`;
