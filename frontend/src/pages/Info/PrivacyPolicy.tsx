import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { SectionText } from "@styles/globalStyledComponents";
import React from "react";

const PrivacyPolicy: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <SectionText>
        <div>
          <h1>Privacy Policy</h1>
          <p>
            <strong>Last updated:</strong> April 2026
          </p>

          <p>
            TradeDayTrackR ("we", "our", or "us") operates the TradeDayTrackR
            platform (the "Service"). This Privacy Policy explains how we
            collect, use, and protect your information.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Account Information</h3>
          <ul>
            <li>Email address</li>
            <li>Name (if provided)</li>
            <li>Login credentials</li>
          </ul>

          <h3>Usage Data</h3>
          <ul>
            <li>Trade journal entries and notes</li>
            <li>Platform usage data (features used, interactions)</li>
          </ul>

          <h3>Technical Data</h3>
          <ul>
            <li>
              IP address (used for security, analytics, and system
              functionality)
            </li>{" "}
            <li>Browser type</li>
            <li>Device information</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain the Service</li>
            <li>Enable trade tracking, journaling, and analytics features</li>
            <li>Improve product functionality and user experience</li>
            <li>
              Send essential transactional emails (e.g. account verification,
              password reset)
            </li>
          </ul>

          <p>
            <strong>We do not send unsolicited marketing emails.</strong>
          </p>

          <h2>3. AI Processing</h2>
          <p>
            Some user-provided data (such as trade descriptions) may be
            processed using AI services (e.g. OpenAI) to generate tags or
            summaries.
          </p>
          <p>
            This processing is used solely to enhance product functionality and
            is not used for advertising.
          </p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell or rent your personal data.</p>
          <p>
            We may share data with trusted third-party services strictly for:
          </p>
          <ul>
            <li>Infrastructure (e.g. hosting, databases)</li>
            <li>Email delivery (e.g. transactional emails)</li>
            <li>AI processing (e.g. OpenAI)</li>
          </ul>
          <p>These providers are obligated to protect your data.</p>

          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures to protect your data, including secure
            infrastructure (AWS) and encrypted communication (HTTPS).
          </p>
          <p>However, no system is completely secure.</p>

          <h2>6. Data Retention</h2>
          <p>
            Your data is retained for as long as your account is active. You may
            request deletion of your account and associated data at any time.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your data</li>
            <li>Update your information</li>
            <li>Request account deletion</li>
          </ul>
          <p>
            To do so, contact us at: <strong>support@tradedaytrackr.com</strong>
          </p>

          <h2>8. Cookies</h2>
          <p>
            We use cookies to maintain login sessions and improve user
            experience. You can control cookies through your browser settings.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated date.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions, please contact us at:</p>
          <p>
            <strong>support@tradedaytrackr.com</strong>
          </p>
        </div>
      </SectionText>
    </Page>
  );
};

export default PrivacyPolicy;
