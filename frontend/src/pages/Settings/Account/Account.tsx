import Button from "@components/Button/Button";
import Gap from "@components/Gap/Gap";
import GlassTile from "@components/GlassTile/GlassTile";
import { GlassTileChildrenWrapper } from "@components/GlassTile/GlassTileStyledComponents";
import Input from "@components/Input/Input";
import Page from "@components/Page/Page";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneOutlineIcon from "@mui/icons-material/Done";
import LockIcon from "@mui/icons-material/Lock";
import Switch from "@mui/material/Switch";
import { color } from "@styles/colors";
import { BUTTON_WIDTH } from "@styles/constants";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
  SubsectionHeader,
} from "@styles/globalStyledComponents";
import React from "react";
import {
  AccountDetailsSection,
  AccountSettingsContainer,
  CheckDescriptionContainer,
  DeleteAccountChildWrapper,
  DeleteAccountSection,
  EmailPreferencesSection,
  PasswordSection,
  SubsectionHeaderWrapper,
  SwitchItemRow,
} from "./AccountStyledComponents";

interface AccountProps {}
const Account: React.FunctionComponent<AccountProps> = () => {
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Account</SectionTitle>
        <AccountSettingsContainer>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <GlassTileChildrenWrapper>
              <SubsectionHeaderWrapper>
                <AccountBoxIcon style={{ color: "white", marginRight: 5 }} />
                Account Details
              </SubsectionHeaderWrapper>
              <AccountSettingsContainer>
                <AccountDetailsSection>
                  <Input label="Username" value="johndoe" darkMode />
                  <Gap level={1} />
                  <Input label="Email" value="johndoe@example.com" darkMode />
                  <Gap level={1} />
                  <Input label="Full Name" value="John Doe" darkMode />
                  <Gap level={2} />
                  <Button
                    text={"Save Changes"}
                    style={{
                      marginLeft: "auto",
                      maxWidth: `${BUTTON_WIDTH}px`,
                    }}
                  />
                </AccountDetailsSection>
                <EmailPreferencesSection>
                  <SubsectionHeader>Email Preferences</SubsectionHeader>
                  <SwitchItemRow>
                    <CheckDescriptionContainer>
                      <DoneOutlineIcon
                        style={{ color: "#4caf50", fontSize: 18 }}
                      />
                      <span>Payout Reports</span>
                    </CheckDescriptionContainer>
                    <Switch defaultChecked />
                  </SwitchItemRow>
                  <SwitchItemRow>
                    <CheckDescriptionContainer>
                      <DoneOutlineIcon
                        style={{ color: "#4caf50", fontSize: 18 }}
                      />
                      <span>System Notifications</span>
                    </CheckDescriptionContainer>
                    <Switch defaultChecked />
                  </SwitchItemRow>
                  <SwitchItemRow>
                    <CheckDescriptionContainer>
                      <DoneOutlineIcon
                        style={{ color: "#4caf50", fontSize: 18 }}
                      />
                      <span>Exclusive Offers and Promotions</span>
                    </CheckDescriptionContainer>
                    <Switch defaultChecked />
                  </SwitchItemRow>
                  <SwitchItemRow>
                    <CheckDescriptionContainer>
                      <DoneOutlineIcon
                        style={{ color: "#4caf50", fontSize: 18 }}
                      />
                      <span>Unsubscribe from all emails</span>
                    </CheckDescriptionContainer>
                    <Switch defaultChecked={false} />
                  </SwitchItemRow>
                </EmailPreferencesSection>
              </AccountSettingsContainer>
            </GlassTileChildrenWrapper>
          </GlassTile>
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
