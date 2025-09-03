export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100">
              Last updated: September 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8">
          <div className="prose max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using ExpatsJobs.cz, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on ExpatsJobs.cz for personal, non-commercial transitory viewing only.
            </p>
            <ul>
              <li>This is the grant of a license, not a transfer of title</li>
              <li>Under this license you may not modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
            </ul>

            <h2>3. Job Postings</h2>
            <p>
              Companies posting jobs on ExpatsJobs.cz agree to:
            </p>
            <ul>
              <li>Provide accurate and truthful job descriptions</li>
              <li>Comply with all applicable employment laws</li>
              <li>Not discriminate based on race, gender, religion, or nationality</li>
              <li>Pay all agreed fees for premium job postings</li>
            </ul>

            <h2>4. User Conduct</h2>
            <p>
              Users of ExpatsJobs.cz agree not to:
            </p>
            <ul>
              <li>Post false or misleading information</li>
              <li>Harass or abuse other users</li>
              <li>Use the service for spam or solicitation</li>
              <li>Attempt to gain unauthorized access to the system</li>
            </ul>

            <h2>5. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service.
            </p>

            <h2>6. Disclaimers</h2>
            <p>
              The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, 
              ExpatsJobs.cz excludes all representations, warranties, conditions and terms.
            </p>

            <h2>7. Limitations</h2>
            <p>
              In no event shall ExpatsJobs.cz or its suppliers be liable for any damages arising out of the use or 
              inability to use the materials on the website.
            </p>

            <h2>8. Revisions</h2>
            <p>
              ExpatsJobs.cz may revise these terms of service at any time without notice. By using this website, 
              you are agreeing to be bound by the current version of these terms of service.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Czech Republic.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              Email: legal@expatsjobs.cz<br />
              Address: Prague, Czech Republic
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}