import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Section, SectionText } from "@styles/globalStyledComponents";
import React from "react";

const TermsOfService: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <Section style={{ width: "95%" }}>
        <SectionText>
          <div>
            <h1>Terms of Service</h1>
            <p>
              <strong>Last updated:</strong> April 2026
            </p>

            <p>
              Welcome to TradeDayTrackR ("we", "our", or "us"). These Terms of
              Service ("Terms") govern your access to and use of our platform,
              tools, and services (collectively, the "Service").
            </p>

            <p>
              By accessing or using TradeDayTrackR, you agree to be bound by
              these Terms. If you do not agree, you must not use the Service.
            </p>

            <h2>1. Description of Service</h2>
            <p>
              TradeDayTrackR provides tools for tracking, journaling, analyzing,
              and monitoring trading activity, including but not limited to:
            </p>
            <ul>
              <li>Trade journaling and performance analytics</li>
              <li>Payout tracking and eligibility calculations</li>
              <li>Trading day validation and rule tracking</li>
              <li>AI-generated insights, summaries, and tagging</li>
            </ul>

            <p>
              The Service is provided for informational and organizational
              purposes only.
            </p>

            <h2>2. No Financial Advice</h2>
            <p>
              TradeDayTrackR is not a broker, financial advisor, or investment
              manager.
            </p>
            <p>
              All data, calculations, analytics, and AI-generated outputs are
              for informational and educational purposes only and do not
              constitute financial advice.
            </p>
            <p>
              You are solely responsible for your trading decisions, risk
              management, and financial outcomes.
            </p>

            <h2>3. Accuracy of Calculations</h2>
            <p>
              The Service may provide calculations related to trading
              performance, payout eligibility, drawdown limits, and trading
              rules.
            </p>
            <p>
              While we strive for accuracy, we do not guarantee that any
              calculations, metrics, or outputs are correct, complete, or
              up-to-date.
            </p>
            <p>
              You acknowledge that different prop firms or brokers may have
              varying rules, and it is your responsibility to verify all
              requirements independently.
            </p>

            <h2>4. Account Registration</h2>
            <p>To access certain features, you must create an account.</p>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h2>5. User Data</h2>
            <p>
              You retain ownership of all data you submit, including trade data,
              journal entries, images, and notes.
            </p>
            <p>
              By using the Service, you grant us a limited license to process,
              store, and analyze your data solely for the purpose of operating
              and improving the Service.
            </p>

            <h2>6. AI Features</h2>
            <p>
              The Service may use third-party AI providers to generate insights,
              summaries, or classifications.
            </p>
            <p>
              AI-generated outputs may be inaccurate, incomplete, or misleading
              and should not be relied upon for financial decision-making.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>
              The Service may reference or integrate with third-party platforms
              (e.g., prop trading firms, brokers, or data providers).
            </p>
            <p>
              We are not affiliated with, endorsed by, or responsible for any
              third-party services, rules, or policies.
            </p>

            <h2>8. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for unlawful or fraudulent purposes</li>
              <li>
                Attempt to gain unauthorized access to any part of the system
              </li>
              <li>
                Interfere with or disrupt the Service or its infrastructure
              </li>
              <li>Exploit or misuse calculation systems or vulnerabilities</li>
            </ul>

            <h2>9. Account Suspension and Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our
              discretion, including for violations of these Terms.
            </p>
            <p>
              You may request account deletion at any time by contacting
              support.
            </p>

            <h2>10. Intellectual Property</h2>
            <p>
              All content, software, features, and functionality of the Service
              are owned by TradeDayTrackR and are protected by applicable
              intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, or distribute any part of the Service
              without our prior written consent.
            </p>

            <h2>11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, TradeDayTrackR shall not
              be liable for any losses, including but not limited to trading
              losses, missed payouts, incorrect calculations, or reliance on the
              Service.
            </p>
            <p>
              This includes direct, indirect, incidental, or consequential
              damages.
            </p>

            <h2>12. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without
              warranties of any kind, express or implied.
            </p>
            <p>
              We do not guarantee that the Service will be uninterrupted,
              error-free, or fully accurate.
            </p>

            <h2>13. Changes to the Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the
              Service after changes are posted constitutes acceptance of the
              updated Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of your operating jurisdiction, without regard to
              conflict of law principles.
            </p>

            <h2>15. Contact</h2>
            <p>For questions regarding these Terms, please contact:</p>
            <p>
              <strong>support@tradedaytrackr.com</strong>
            </p>
          </div>
        </SectionText>
      </Section>
    </Page>
  );
};

export default TermsOfService;
