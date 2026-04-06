import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { SectionText } from "@styles/globalStyledComponents";
import React from "react";

const ContactUs: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <SectionText>
        <div className="contact-page">
          <h1>Contact Us</h1>

          <p>
            Have questions, feedback, or need help with your account? We're here
            to help.
          </p>

          <h2>Support</h2>
          <p>
            For general inquiries, account issues, or support requests, please
            email us at:
          </p>
          <p>
            <strong>support@tradedaytrackr.com</strong>
          </p>

          <h2>What to include in your message</h2>
          <ul>
            <li>Your account email (if applicable)</li>
            <li>A brief description of your issue or question</li>
            <li>Any relevant screenshots or details</li>
          </ul>

          <h2>Response Time</h2>
          <p>We aim to respond to all inquiries within 24–48 hours.</p>

          <h2>Feedback & Suggestions</h2>
          <p>
            TradeDayTrackR is actively being developed, and we welcome feedback
            from traders. If you have ideas for new features or improvements,
            feel free to reach out.
          </p>

          <h2>About TradeDayTrackR</h2>
          <p>
            TradeDayTrackR is a trading analytics platform focused on helping
            traders manage prop firm evaluations, funded accounts, and payout
            readiness through structured tracking and insights.
          </p>
        </div>
      </SectionText>
    </Page>
  );
};

export default ContactUs;
