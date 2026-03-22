import GlassTile from "@components/GlassTile/GlassTile";
import Page from "@components/Page/Page";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  PageContainer as Container,
  SectionText,
  SectionTitle,
} from "@styles/globalStyledComponents";
import React from "react";
import {
  SectionContainer,
  SubscriptionChildWrapper,
  SubscriptionSection,
  SubsectionHeaderWrapper,
} from "./BillingStyledComponents";

interface BillingProps {}
const Billing: React.FunctionComponent<BillingProps> = () => {
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
                <SectionText>
                  Manage billing, subscription plans, and payment information.
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
