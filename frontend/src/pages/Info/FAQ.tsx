import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Section, SectionText } from "@styles/globalStyledComponents";
import React from "react";

const FAQ: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <Section style={{ width: "95%" }}>
        <SectionText>
          <div>
            <h1>Frequently Asked Questions</h1>

            <h2>What is TradeDayTrackR?</h2>
            <p>
              TradeDayTrackR is a trading analytics platform designed for
              traders using prop firm accounts. It helps you track, journal, and
              analyze your trades while monitoring your progress through
              evaluations and funded accounts.
            </p>

            <h2>What makes TradeDayTrackR different?</h2>
            <p>
              TradeDayTrackR is built specifically around prop firm trading
              rules and constraints, helping you stay compliant while optimizing
              your performance.
            </p>
            <ul>
              <li>Track evaluation progress and pass conditions</li>
              <li>Monitor funded account performance</li>
              <li>Track profitable days and consistency rules</li>
              <li>Measure buffer (drawdown safety) in real time</li>
              <li>Track payouts and withdrawal progress</li>
            </ul>
            <div
              style={{
                color: "#facc15",
                fontSize: "12px",
                marginBottom: "12px",
              }}
            >
              TradeDayTrackR provides estimates. Always verify with your prop
              firm.
            </div>
            <h2>How accurate are the calculations?</h2>
            <p>
              TradeDayTrackR provides estimates based on the data you input and
              configured rules. While we aim for accuracy, calculations may not
              always reflect exact prop firm logic or real-time account status.
            </p>
            <p>
              You should always verify your status directly with your prop firm
              or broker before making decisions.
            </p>

            <h2>How does TradeDayTrackR help with prop firm rules?</h2>
            <p>
              The platform helps you monitor key constraints such as drawdown
              limits, consistency requirements, and minimum trading days so you
              can better understand your current standing.
            </p>

            <h2>What is buffer tracking?</h2>
            <p>
              Buffer tracking shows how much margin you have before violating
              drawdown rules and how much profit may be required before payout
              eligibility.
            </p>
            <p>
              This is an estimate and should not be treated as a guarantee of
              eligibility.
            </p>

            <h2>How does payout tracking work?</h2>
            <p>
              TradeDayTrackR helps you track potential payout eligibility based
              on your performance and configured rules.
            </p>
            <p>
              However, actual payout eligibility is determined solely by your
              prop firm. We do not guarantee that you will qualify for a payout.
            </p>

            <h2>Can I track both evaluations and funded accounts?</h2>
            <p>
              Yes. TradeDayTrackR supports both evaluation and funded accounts,
              allowing you to monitor your progress from start to payout.
            </p>

            <h2>How does the AI tagging work?</h2>
            <p>
              TradeDayTrackR uses AI to analyze your trade notes and generate
              tags such as strategy or setup.
            </p>
            <p>
              AI-generated outputs may be inaccurate or incomplete and are meant
              to assist, not replace, your own judgment.
            </p>

            <h2>Is my trading data secure?</h2>
            <p>
              Yes. We use secure infrastructure and encrypted connections
              (HTTPS) to protect your data.
            </p>
            <p>
              Your data is never sold and is only used to operate and improve
              the platform.
            </p>

            <h2>Do you send marketing emails?</h2>
            <p>
              No. We only send essential emails such as account verification,
              password resets, and important system notifications.
            </p>

            <h2>Can I delete my account and data?</h2>
            <p>
              Yes. You can request account deletion at any time, and your data
              will be removed from our systems.
            </p>

            <h2>Is TradeDayTrackR a financial advisor?</h2>
            <p>
              No. TradeDayTrackR is not a financial advisor. All information is
              provided for informational purposes only, and you are responsible
              for your own trading decisions.
            </p>

            <h2>What features does TradeDayTrackR offer?</h2>
            <ul>
              <li>Trade journaling and tracking</li>
              <li>AI-powered tagging and summaries</li>
              <li>Evaluation and funded account tracking</li>
              <li>Profitable day and consistency tracking</li>
              <li>Buffer and drawdown monitoring</li>
              <li>Payout tracking and decision support tools</li>
            </ul>

            <h2>Is TradeDayTrackR always up to date with prop firm rules?</h2>
            <p>
              We do our best to keep rules and logic updated, but prop firm
              rules can change at any time.
            </p>
            <p>
              It is your responsibility to verify current rules directly with
              your provider.
            </p>

            <h2>How do I get support?</h2>
            <p>
              If you need help or have questions, contact us at:
              <strong> support@tradedaytrackr.com</strong>
            </p>

            <h2>Is there a cost to use TradeDayTrackR?</h2>
            <p>
              Pricing and plans may vary. Please check within the platform or
              contact support for the latest information.
            </p>

            <h2>Will more features be added?</h2>
            <p>
              Yes. TradeDayTrackR is actively being developed, and new features
              are continuously added based on user feedback.
            </p>
          </div>
        </SectionText>
      </Section>
    </Page>
  );
};

export default FAQ;
