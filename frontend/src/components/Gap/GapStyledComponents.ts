import styled, { css, type RuleSet } from "styled-components";

export const GapContainer = styled.div<{
  $isVertical: boolean;
  $baseValue: number;
  $level: number;
}>`
  ${({ $isVertical, $baseValue, $level }): RuleSet<object> => {
    if ($isVertical) {
      return css`
        height: ${$baseValue * $level}px;
        width: 0;
      `;
    } else {
      return css`
        height: 0;
        width: ${$baseValue * $level}px;
      `;
    }
  }}
`;
