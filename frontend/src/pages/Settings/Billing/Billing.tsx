import GlassTile from "@components/GlassTile/GlassTile";
import Page from "@components/Page/Page";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DoneOutlineIcon from "@mui/icons-material/Done";

import { If } from "@components/If/If";
import useLoginState from "@pages/Login/hooks/useLoginState";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";
import {
  PlanDetails,
  PlanDetailsItem,
  PlanHeader,
  PlanLeftContainer,
  PlanRightContainer,
  PlansContainer,
  PlanTile,
  SectionContainer,
  SubscriptionChildWrapper,
  SubscriptionSection,
  SubsectionHeaderWrapper,
} from "./BillingStyledComponents";

interface BillingProps {}
const Billing: React.FunctionComponent<BillingProps> = () => {
  const { user } = useLoginState();
  const activeMembership = user.membership_active;

  return (
    <Page topBarShowMenu={true}>
      <Container>
        <SectionTitle>Billing</SectionTitle>
        <SubscriptionSection>
          <GlassTile
            featureTile
            minHeight={10}
            minWidth={10}
            padding={7}
            noGlow={true}
          >
            <SubscriptionChildWrapper>
              <SubsectionHeaderWrapper>
                <CurrencyExchangeIcon
                  style={{ color: "white", marginRight: 5 }}
                />
                Manage Subscription
              </SubsectionHeaderWrapper>
              <SectionContainer>
                <SectionText style={{ marginBottom: 0 }}>
                  Activate your membership by subscribing through Whop with the
                  email associated with your account. You can manage your
                  subscription, view invoices and access support through the
                  Whop dashboard.
                </SectionText>
                <PlansContainer>
                  <PlanTile $currentPlan={!activeMembership}>
                    <PlanHeader>
                      <PlanLeftContainer>Free</PlanLeftContainer>
                      <PlanRightContainer>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          $ <span>0</span> / month
                        </div>
                      </PlanRightContainer>
                    </PlanHeader>
                    <PlanDetails>
                      <PlanLeftContainer>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          View Dashboard Preview
                        </PlanDetailsItem>

                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Explore UI & Features
                        </PlanDetailsItem>

                        <PlanDetailsItem>
                          <CloseIcon
                            style={{ color: "#ff5252", fontSize: 18 }}
                          />
                          No Trade Tracking
                        </PlanDetailsItem>

                        <PlanDetailsItem>
                          <CloseIcon
                            style={{ color: "#ff5252", fontSize: 18 }}
                          />
                          No Payout Tracking
                        </PlanDetailsItem>

                        <PlanDetailsItem>
                          <CloseIcon
                            style={{ color: "#ff5252", fontSize: 18 }}
                          />
                          No Journal Entries
                        </PlanDetailsItem>

                        <PlanDetailsItem>
                          <CloseIcon
                            style={{ color: "#ff5252", fontSize: 18 }}
                          />
                          No Data Saved
                        </PlanDetailsItem>
                      </PlanLeftContainer>
                      <If condition={!activeMembership}>
                        <PlanRightContainer>
                          <span>Current Plan</span>
                        </PlanRightContainer>
                      </If>
                    </PlanDetails>
                  </PlanTile>
                  <PlanTile
                    $backgroundColor="#385c48"
                    $currentPlan={activeMembership}
                  >
                    <PlanHeader>
                      <PlanLeftContainer>Funded</PlanLeftContainer>
                      {/* <PlanRightContainer>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          $ <span>0</span> / month
                        </div>
                      </PlanRightContainer> */}
                    </PlanHeader>
                    <PlanDetails>
                      <PlanLeftContainer>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Advanced journal entries
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Tag history management
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Increased data storage
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Priority support
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Advanced analytics
                        </PlanDetailsItem>
                      </PlanLeftContainer>
                      <If condition={activeMembership}>
                        <PlanRightContainer>
                          <span>Current Plan</span>
                        </PlanRightContainer>
                      </If>
                    </PlanDetails>
                  </PlanTile>
                  {/* <PlanTile $backgroundColor="#366283">
                    <PlanHeader>
                      <PlanLeftContainer>Elite</PlanLeftContainer>
                    </PlanHeader>
                    <PlanDetails>
                      <PlanLeftContainer>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          All Advanced features
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Unlimited data storage
                        </PlanDetailsItem>
                        <PlanDetailsItem>
                          <DoneOutlineIcon
                            style={{ color: "#4caf50", fontSize: 18 }}
                          />
                          Priority support with dedicated agent
                        </PlanDetailsItem>
                      </PlanLeftContainer>
                    </PlanDetails>
                  </PlanTile> */}
                </PlansContainer>
                <SectionText>
                  Manage your account subscription through Whop.
                  <a
                    target="__blank"
                    href="https://whop.com/joined/tradedaytrackr/"
                    style={{
                      color: "#bfbfbf",
                      textDecoration: "underline",
                      cursor: "pointer",
                      marginLeft: 5,
                    }}
                  >
                    Click here to manage your subscription.
                  </a>
                </SectionText>
              </SectionContainer>
            </SubscriptionChildWrapper>
          </GlassTile>
        </SubscriptionSection>
      </Container>
    </Page>
  );
};

export default Billing;
