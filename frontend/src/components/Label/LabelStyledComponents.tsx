import styled from "styled-components";
import { Label } from "@styles/globalStyledComponents";
import { color } from "@styles/colors";

export const LabelWrapper = styled(Label)<{
  $error?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  color: ${({ $error, $disabled }): string =>
    $error
      ? color("SystemError2")
      : $disabled
      ? color("SystemLabel3")
      : color("SystemLabel1")};
  margin-bottom: 10px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 100;
`;
