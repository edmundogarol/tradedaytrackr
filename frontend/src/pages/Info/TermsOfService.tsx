import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { SectionText } from "@styles/globalStyledComponents";
import React from "react";

const TermsOfService: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <SectionText>
        <div>
          <h1>Terms of Service</h1>
          <p>
            <strong>Last updated:</strong> April 2026
          </p>

          <p>
            Welcome to TradeDayTrackR ("we", "our", or "us"). These Terms of
            Service ("Terms") govern your use of our platform and services (the
            "Service").
          </p>

          <p>
            By accessing or using TradeDayTrackR, you agree to be bound by these
            Terms.
          </p>

          <h2>1. Use of the Service</h2>
          <p>
            TradeDayTrackR provides tools for tracking, journaling, and
            analyzing trading activity.
          </p>
          <p>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms.
          </p>

          <h2>2. Account Registration</h2>
          <p>To use certain features, you must create an account.</p>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Be responsible for all activities under your account</li>
          </ul>

          <h2>3. User Data</h2>
          <p>
            You retain ownership of any data you submit, including trade
            information and notes.
          </p>
          <p>
            By using the Service, you grant us the right to process your data to
            provide and improve the Service.
          </p>

          <h2>4. AI Features</h2>
          <p>
            TradeDayTrackR may use AI services (e.g. OpenAI) to generate tags,
            summaries, or insights.
          </p>
          <p>
            These outputs are provided for informational purposes only and
            should not be considered financial advice.
          </p>

          <h2>5. No Financial Advice</h2>
          <p>TradeDayTrackR is not a financial advisor.</p>
          <p>
            All information and analysis provided by the platform are for
            informational and educational purposes only. You are solely
            responsible for your trading decisions.
          </p>

          <h2>6. Prohibited Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for unlawful or harmful activities</li>
            <li>Attempt to gain unauthorized access to the system</li>
            <li>Interfere with or disrupt the Service</li>
          </ul>

          <h2>7. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these Terms.
          </p>
          <p>You may request deletion of your account at any time.</p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Service are owned by
            TradeDayTrackR and are protected by applicable laws.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, TradeDayTrackR shall not be
            liable for any indirect, incidental, or consequential damages
            arising from your use of the Service.
          </p>

          <h2>10. Disclaimer</h2>
          <p>
            The Service is provided "as is" and "as available" without
            warranties of any kind.
          </p>
          <p>
            We do not guarantee that the Service will be uninterrupted or
            error-free.
          </p>

          <h2>11. Changes to the Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service constitutes acceptance of the updated Terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            <strong>support@tradedaytrackr.com</strong>
          </p>
        </div>
      </SectionText>
    </Page>
  );
};

export default TermsOfService;
