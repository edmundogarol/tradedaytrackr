import Gap from "@components/Gap/Gap";
import Page from "@components/Page/Page";
import { PageEnum } from "@interfaces/NavigationTypes";
import BookIcon from "@mui/icons-material/Book";
import PaidIcon from "@mui/icons-material/Paid";
import ViewListIcon from "@mui/icons-material/ViewList";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { color } from "@styles/colors";
import { PageContainer } from "@styles/globalStyledComponents";
import { imageSrc } from "@utils/utils";
import React from "react";
import {
  FooterHeader,
  FooterText,
  FooterTile,
  GetAccessButton,
  HeroDimmedText,
  HeroFooterSection,
  HeroHeader,
  HeroHeader2,
  HeroHighlightedText,
  HeroImage,
  HeroLeftSection,
  HeroOtherHighlightedText,
  HeroRightSection,
  HeroSection,
  HeroSubHeader,
  HeroSubHeader2,
  ImageFeature,
  ImageSection,
  LoginButton,
} from "./LandingStyledComponents";

const Landing: React.FunctionComponent = () => {
  const navigation = useReactNavigation();

  const handleGetAccessClick = (): void => {
    window.open(
      "https://whop.com/tradedaytrackr/funded-subscription/",
      "_blank",
    );
  };

  return (
    <Page
      sideDrawer={false}
      backgroundColor={{
        light: color("SystemBackground3"),
        dark: color("SystemBackground"),
      }}
    >
      <LoginButton
        text="Log in"
        onClick={() => navigation.navigate(PageEnum.Login)}
      />
      <Gap level={2} />
      <PageContainer>
        <HeroSection>
          <HeroLeftSection>
            <HeroHeader>
              Know exactly where you stand &mdash; from{" "}
              <HeroDimmedText>eval</HeroDimmedText> to{" "}
              <HeroHighlightedText>payout</HeroHighlightedText>
            </HeroHeader>
            <Gap level={2} />
            <HeroSubHeader>
              A simple, affordable journaling system built for prop traders.
              Track eval progress, payout eligibility, and performance &mdash;
              without spreadsheets or noise.
            </HeroSubHeader>
            <Gap level={3} />
            <GetAccessButton
              text="Get Early Access →"
              onClick={handleGetAccessClick}
            />
            <Gap level={2} />
            <HeroSubHeader>
              Built by traders, for traders. No fluff, just the tools you need
              to succeed.
            </HeroSubHeader>
          </HeroLeftSection>
          <HeroRightSection>
            <HeroImage src={imageSrc("upcoming-payout-details.png")} />
          </HeroRightSection>
        </HeroSection>
        <Gap level={4} />
        <HeroSection>
          <HeroLeftSection>
            <HeroHeader2>
              The problem isn’t your strategy &mdash;{" "}
              <HeroOtherHighlightedText>
                it’s your system
              </HeroOtherHighlightedText>
            </HeroHeader2>
            <Gap level={2} />
            <HeroSubHeader2>
              No clear view of your actual performance
            </HeroSubHeader2>
            <Gap level={1} />
            <HeroSubHeader2>
              No structure behind your trading decisions
            </HeroSubHeader2>
            <Gap level={1} />
            <HeroSubHeader2>
              No feedback loop to improve execution
            </HeroSubHeader2>
            <Gap level={1} />
            <HeroSubHeader2>
              No way to track consistency over time
            </HeroSubHeader2>
            <Gap level={1} />
          </HeroLeftSection>
        </HeroSection>
        <Gap level={4} />
        <HeroSection>
          <HeroLeftSection>
            <HeroHeader2>
              This is your trading{" "}
              <HeroOtherHighlightedText>
                control center
              </HeroOtherHighlightedText>
            </HeroHeader2>
            <Gap level={2} />
            <HeroSubHeader>
              TradeDayTrackR connects your trades, journal entries, accounts,
              and payouts &mdash; so you always know exactly where you stand.
            </HeroSubHeader>
            <Gap level={3} />
            <ImageSection>
              <ImageFeature
                src={imageSrc("funding-overview-recent-activity.png")}
              />
              <ImageFeature src={imageSrc("funded-accounts.png")} />
              <ImageFeature src={imageSrc("account-templates-tags.png")} />
            </ImageSection>
          </HeroLeftSection>
        </HeroSection>
        <Gap level={6} />
        <HeroFooterSection>
          <FooterTile>
            <FooterHeader>
              <PaidIcon
                style={{ height: 50, width: 50, color: color("SystemGreen") }}
              />
              Payout Tracking
            </FooterHeader>
            <Gap level={1} />
            <FooterText>
              See withdrawable PnL, days to payout, bufter progress, and
              projected payout dates in real time.
            </FooterText>
          </FooterTile>
          <FooterTile>
            <FooterHeader>
              <ViewListIcon
                style={{ height: 50, width: 50, color: color("SystemGreen") }}
              />
              Multi-Account Tracking
            </FooterHeader>
            <Gap level={1} />
            <FooterText>
              Track multiple prop firm accounts across different rules - all in
              one place.
            </FooterText>
          </FooterTile>
          <FooterTile>
            <FooterHeader>
              <BookIcon
                style={{ height: 50, width: 50, color: color("SystemGreen") }}
              />
              True Journal
            </FooterHeader>
            <Gap level={1} />
            <FooterText>
              Log meaningful trades with context - not noisy broker data.
            </FooterText>
          </FooterTile>
        </HeroFooterSection>
        <Gap level={4} />
      </PageContainer>
    </Page>
  );
};

export default Landing;
