import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LockIcon from "@mui/icons-material/Lock";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  DeleteAccountChildWrapper,
  DeleteAccountSection,
  PasswordSection,
  SubsectionHeaderWrapper,
} from "./AccountStyledComponents";
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
          <PasswordSection>
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
            >
              <GlassTileChildrenWrapper>
                <SubsectionHeaderWrapper>
                  <LockIcon style={{ color: "white", marginRight: 5 }} />
                  Password
                </SubsectionHeaderWrapper>
                <AccountSettingsContainer>
                  <AccountDetailsSection>
                    <Input
                      label="Current Password"
                      type="password"
                      defaultValue="johndoe"
                      darkMode
                    />
                    <Gap level={1} />
                    <Input
                      label="New Password"
                      defaultValue="samplenewpassword"
                      type="password"
                      darkMode
                    />
                    <Gap level={1} />
                    <Input
                      label="Confirm Password"
                      defaultValue="samplenewpassword"
                      type="password"
                      darkMode
                    />
                    <Gap level={2} />
                    <Button
                      text={"Update Password"}
                      style={{
                        marginLeft: "auto",
                        maxWidth: `${BUTTON_WIDTH}px`,
                      }}
                    />
                  </AccountDetailsSection>
                </AccountSettingsContainer>
              </GlassTileChildrenWrapper>
            </GlassTile>
          </PasswordSection>
          <DeleteAccountSection>
            <GlassTile
              featureTile
              minHeight={10}
              minWidth={10}
              padding={7}
              noGlow={true}
            >
              <DeleteAccountChildWrapper>
                <SubsectionHeaderWrapper>
                  <DeleteForeverIcon
                    style={{ color: "white", marginRight: 5 }}
                  />
                  Delete Account
                </SubsectionHeaderWrapper>
                <AccountSettingsContainer>
                  <AccountDetailsSection>
                    <SectionText>
                      Would you like to delete your account?
                    </SectionText>
                    <SectionText>
                      This account contains 140 journal entries, 1500 individual
                      trades and 20 account connections. Deleting your account
                      will permanently remove all of this data and cannot be
                      undone.
                    </SectionText>
                    <Button
                      text={"Permanently Delete All Data"}
                      style={{ backgroundColor: color("SystemRed") }}
                    />
                  </AccountDetailsSection>
                </AccountSettingsContainer>
              </DeleteAccountChildWrapper>
            </GlassTile>
          </DeleteAccountSection>
        </AccountSettingsContainer>
      </Container>
    </Page>
  );
};

export default Account;
