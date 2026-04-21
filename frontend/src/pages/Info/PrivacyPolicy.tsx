import Page from "@components/Page/Page";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Section, SectionText } from "@styles/globalStyledComponents";
import React from "react";

const PrivacyPolicy: React.FunctionComponent = () => {
  const { user } = useLoginState();
  return (
    <Page sideDrawer={user.logged_in} topBarShowMenu={user.logged_in}>
      <Section style={{ width: "95%" }}>
        <SectionText>
          <div>
            <h1>Privacy Policy</h1>
            <p>
              <strong>Last updated:</strong> April 2026
            </p>

            <p>
              TradeDayTrackR ("we", "our", or "us") operates the TradeDayTrackR
              platform (the "Service"). This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use the Service.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>Account Information</h3>
            <ul>
              <li>Email address</li>
              <li>Name or username (if provided)</li>
              <li>Authentication data (securely stored credentials)</li>
            </ul>

            <h3>Trading & Journal Data</h3>
            <ul>
              <li>Trade entries, profit/loss data, and trading metrics</li>
              <li>Journal notes, tags, and descriptions</li>
              <li>Uploaded images (e.g. trade screenshots)</li>
              <li>
                Account configurations (e.g. prop firm rules, payout tracking)
              </li>
            </ul>

            <h3>Usage Data</h3>
            <ul>
              <li>Features used and interactions within the app</li>
              <li>Session activity and navigation behavior</li>
            </ul>

            <h3>Technical Data</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, operate, and maintain the Service</li>
              <li>
                Process and display your trading data, analytics, and payout
                tracking
              </li>
              <li>
                Generate insights and summaries (including AI-assisted features)
              </li>
              <li>
                Improve product performance, reliability, and user experience
              </li>
              <li>
                Send essential transactional communications (e.g. login,
                password reset, system notifications)
              </li>
            </ul>

            <p>
              <strong>
                We do not sell your personal data or send unsolicited marketing
                emails.
              </strong>
            </p>

            <h2>3. AI Processing</h2>
            <p>
              Certain features may use third-party AI providers to process user
              content (such as journal entries) to generate summaries, tags, or
              insights.
            </p>
            <p>
              By using these features, you acknowledge that your content may be
              transmitted to external AI services for processing.
            </p>
            <p>
              AI outputs may be inaccurate or incomplete and are used solely to
              enhance the Service.
            </p>

            <h2>4. Data Sharing</h2>
            <p>We do not sell or rent your personal data.</p>
            <p>
              We may share your data with trusted third-party service providers
              strictly as necessary to operate the Service, including:
            </p>
            <ul>
              <li>Cloud infrastructure and hosting providers (e.g. AWS)</li>
              <li>Email delivery services</li>
              <li>AI processing providers</li>
              <li>Analytics and monitoring tools</li>
            </ul>
            <p>
              These providers are contractually obligated to protect your data
              and use it only for the services they provide.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data, including encrypted communication (HTTPS) and
              secure infrastructure.
            </p>
            <p>
              However, no method of transmission or storage is completely
              secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as
              necessary to provide the Service.
            </p>
            <p>
              You may request deletion of your account and associated data at
              any time.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
            </ul>

            <p>
              To exercise these rights, contact us at:{" "}
              <strong>support@tradedaytrackr.com</strong>
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use cookies and similar technologies to maintain sessions,
              authenticate users, and improve user experience.
            </p>
            <p>
              You can control cookie behavior through your browser settings.
            </p>

            <h2>9. International Users</h2>
            <p>
              By using the Service, you understand that your data may be
              processed and stored in servers located outside your country of
              residence.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be reflected by the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions, please contact:</p>
            <p>
              <strong>support@tradedaytrackr.com</strong>
            </p>
          </div>
        </SectionText>
      </Section>
    </Page>
  );
};

export default PrivacyPolicy;
