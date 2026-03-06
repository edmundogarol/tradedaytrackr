import React from "react";
import Page from "@components/Page/Page";
import { useSearchParams } from "react-router";
import GlassTile from "@components/GlassTile/GlassTile";
import { firmLogoSrc, imageSrc } from "@utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import { AccountTradingDaysComplete } from "@pages/EvaluationAccounts/EvaluationAccountsStyledComponents";
import InfoPopout from "@components/InfoPopout/InfoPopout";
import Input from "@components/Input/Input";
import { Else, If } from "@components/If/If";
import { color } from "@styles/colors";
import Button from "@components/Button/Button";
import {
  AccountImage,
  Container,
  Title,
} from "../FundedAccountsStyledComponents";
import useGetFundedAccountsList from "../hooks/useGetFundedAccountsList";
import {
  AccountDetailContainer,
  AccountName,
  AccountNameContainer,
  AccountType,
  HeaderContainer,
} from "./FundedAccountDetailStyledComponents";
import styles from "./FundedAccountDetailStyles";
interface FundedAccountDetailProps {}

const FundedAccountDetail: React.FunctionComponent<
  FundedAccountDetailProps
> = () => {
  const [accountNameTemp, setAccountNameTemp] = React.useState<string>(
    "MFFUSFCR72334300-232323231",
  );
  const [editingAccountName, setEditingAccountName] =
    React.useState<boolean>(false);
  let [searchParams] = useSearchParams();
  const {
    id,
    accountName,
    accountSize,
    accountBalance,
    accountType: { name: accountTypeName },
    firm,
    firmMinDays,
    firmMinDayPnL,
    currentDayCount,
    dayValues,
    noGlow,
    noShine,
    minBuffer,
    bufferPercent,
  } = useGetFundedAccountsList()[0];
  return (
    <Page topBarShowMenu={true}>
      <Container>
        <Title>Funded Account Details</Title>
        <GlassTile featureTile minHeight={70} noGlow={true} noShine={false}>
          <HeaderContainer>
            <AccountNameContainer>
              <AccountImage src={imageSrc(firmLogoSrc(firm))} />
              <AccountDetailContainer>
                <If condition={!editingAccountName}>
                  <AccountName>
                    {accountNameTemp}
                    <EditIcon
                      style={styles.editIcon}
                      onClick={() => setEditingAccountName(true)}
                    />
                  </AccountName>
                  <Else>
                    <AccountName>
                      <Input
                        autoFocus
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        style={styles.inputStyle}
                        onKeyDown={(ev) => {
                          if (ev.key === "Enter") {
                            setEditingAccountName(false);
                          }
                          if (ev.key === "Escape") {
                            setAccountNameTemp(accountName);
                            setEditingAccountName(false);
                          }
                        }}
                        value={accountNameTemp}
                        onChange={(e) => setAccountNameTemp(e.target.value)}
                      />
                      <Button
                        style={styles.saveButton}
                        text={"Save"}
                        onClick={() => setEditingAccountName(false)}
                      />
                    </AccountName>
                  </Else>
                </If>
                <AccountType>
                  {`Account Type: ${accountTypeName}`}{" "}
                  <EditIcon style={styles.subtitleEditIcon} />
                </AccountType>
                <AccountTradingDaysComplete>
                  {`Eligible Days: ${currentDayCount ?? "N/A"}/${
                    firmMinDays ?? "N/A"
                  }`}
                  <InfoPopout
                    infoDescription={`This account requires a minimum of ${firmMinDays} eligible trading days.`}
                  />
                </AccountTradingDaysComplete>
              </AccountDetailContainer>
            </AccountNameContainer>
          </HeaderContainer>
        </GlassTile>
      </Container>
    </Page>
  );
};

export default FundedAccountDetail;
