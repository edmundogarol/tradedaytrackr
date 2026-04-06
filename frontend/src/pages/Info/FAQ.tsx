import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { SectionText } from "@styles/globalStyledComponents";
import React from "react";

const FAQ: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <SectionText>
        <div>
          <h1>Frequently Asked Questions</h1>

          <h2>What is TradeDayTrackR?</h2>
          <p>
            TradeDayTrackR is a trading analytics platform designed specifically
            for traders using prop firm accounts. It helps you track, journal,
            and analyze your trades while managing your progress through
            evaluations and funded accounts.
          </p>

          <h2>What makes TradeDayTrackR different?</h2>
          <p>
            TradeDayTrackR focuses heavily on prop firm trading requirements. It
            is built to help you stay compliant with rules while optimizing your
            performance.
          </p>
          <ul>
            <li>Track evaluation progress and pass conditions</li>
            <li>Monitor funded account performance</li>
            <li>Track profitable days and consistency rules</li>
            <li>Measure buffer (drawdown safety) in real time</li>
            <li>Track payouts and withdrawal progress</li>
          </ul>

          <h2>How does TradeDayTrackR help with prop firm rules?</h2>
          <p>
            The platform helps you stay within key prop firm constraints such as
            drawdown limits, consistency requirements, and minimum trading days.
            It gives you a clear view of your current standing so you can avoid
            rule violations.
          </p>
          <h2>What is buffer tracking?</h2>
          <p>
            Buffer tracking shows how much minimum buffer is required before
            your account becomes eligible for payout. It helps you understand
            how much profit you still need to safely qualify for withdrawals
            while staying within prop firm rules and drawdown limits.
          </p>

          <h2>Can I track both evaluations and funded accounts?</h2>
          <p>
            Yes. TradeDayTrackR is designed to support both evaluation accounts
            and funded accounts, allowing you to monitor your progress from
            start to payout.
          </p>

          <h2>How does payout tracking work?</h2>
          <p>
            TradeDayTrackR helps you track your eligibility for payouts by
            monitoring your performance, consistency, and trading days. This
            gives you a clear understanding of when you are ready to withdraw
            profits.
          </p>

          <h2>How does the AI tagging work?</h2>
          <p>
            TradeDayTrackR uses AI to analyze your trade notes and automatically
            generate structured tags (such as strategy, setup, or conditions).
            This helps you quickly categorize and review your trades without
            manual tagging.
          </p>

          <h2>Is my trading data secure?</h2>
          <p>
            Yes. We use secure infrastructure and encrypted connections (HTTPS)
            to protect your data. We do not sell your data, and it is only used
            to provide and improve the platform.
          </p>

          <h2>Do you send marketing emails?</h2>
          <p>
            No. We only send essential transactional emails such as account
            verification, password resets, and important account-related
            notifications.
          </p>

          <h2>Can I delete my account and data?</h2>
          <p>
            Yes. You can request account deletion at any time, and your data
            will be removed from our systems.
          </p>

          <h2>Is TradeDayTrackR a financial advisor?</h2>
          <p>
            No. TradeDayTrackR is not a financial advisor. All insights and
            analytics are provided for informational purposes only. You are
            responsible for your own trading decisions.
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

          <h2>How do I get support?</h2>
          <p>
            If you need help or have any questions, you can contact us at:
            <strong>support@tradedaytrackr.com</strong>
          </p>

          <h2>Is there a cost to use TradeDayTrackR?</h2>
          <p>
            Pricing and plans may vary. Please check the platform or contact
            support for the latest information.
          </p>

          <h2>Will more features be added?</h2>
          <p>
            Yes. TradeDayTrackR is actively being developed, and new features
            and improvements are continuously added based on user feedback.
          </p>
        </div>
      </SectionText>
    </Page>
  );
};

export default FAQ;
