export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Last updated: September 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8">
          <div className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, apply for jobs, or contact us.
            </p>
            <ul>
              <li>Personal information (name, email address, phone number)</li>
              <li>Professional information (resume, work experience, skills)</li>
              <li>Usage information (how you interact with our service)</li>
              <li>Device information (IP address, browser type, operating system)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Match job seekers with relevant opportunities</li>
              <li>Communicate with you about jobs and updates</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal requirements</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>With employers when you apply for jobs (with your consent)</li>
              <li>With service providers who help us operate our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transaction (merger, acquisition)</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required by law.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), you have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your personal data</li>
              <li>Restrict processing of your data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2>8. Third-Party Services</h2>
            <p>
              Our service may contain links to third-party websites or services. We are not responsible for the privacy 
              practices of these third parties.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting 
              the new Privacy Policy on our website.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p>
              Email: privacy@expatsjobs.cz<br />
              Address: Prague, Czech Republic<br />
              Data Protection Officer: dpo@expatsjobs.cz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}