import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import {
  PageContainer as Container,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";
import { AccountSettingsContainer } from "./AccountStyledComponents";
import Delete from "./Delete/Delete";
import Password from "./Password/Password";
import UserDetails from "./UserDetails/UserDetails";

interface AccountProps {}
const Account: React.FunctionComponent<AccountProps> = () => {
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Account</SectionTitle>
        <AccountSettingsContainer>
          <UserDetails />
        </AccountSettingsContainer>
        <Gap level={2} />
        <AccountSettingsContainer>
          <Password />
          <Delete />
        </AccountSettingsContainer>
      </Container>
    </Page>
  );
};

export default Account;
