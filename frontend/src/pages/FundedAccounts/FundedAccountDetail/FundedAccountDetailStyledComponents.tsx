import { color } from "@styles/colors";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  z-index: 10;
  width: 100%;
`;

export const AccountNameContainer = styled.div`
  color: ${color("SystemTitleWhite")};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
`;

export const AccountName = styled.p`
  margin: unset;
  font-weight: 400;
  align-items: center;
  display: flex;
`;

export const AccountDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const AccountType = styled.div`
  color: ${color("SystemLabel1")};
  font-size: 14px;
  border-top: 1px solid #787878;
  margin-top: 3px;
  padding-top: 4px;
`;
