import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page bg-light" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="terms-container bg-white" style={{ padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h1 className="terms-title" style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a' }}>Terms and Conditions</h1>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>Last Updated: May 2026</p>

          <section className="terms-section">
            <h2>1. Scope of Services</h2>
            <p>Job Hub Pro provides intelligent workforce solutions, connecting certified trainers, organizations, and job seekers through our AI-driven platform. Our services include trainer empanelment, enterprise training matchmaking, and the Intervista AI platform for interview assessment.</p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts & Eligibility</h2>
            <p>To access certain features of the platform, you must register for an account. You must be at least 18 years old and provide accurate, current, and complete information during registration. You are responsible for safeguarding your account credentials.</p>
          </section>

          <section className="terms-section">
            <h2>3. Terms for Job Seekers</h2>
            <p>Job seekers may use our platform to take AI-driven assessments and apply for roles. Job Hub Pro does not guarantee employment or specific outcomes from using our tools or assessments.</p>
          </section>

          <section className="terms-section">
            <h2>4. Terms for Organizations</h2>
            <p>Organizations may utilize our platform to hire trainers and conduct AI interviews. Organizations must use the provided data strictly for hiring and training purposes and comply with all applicable data protection laws.</p>
          </section>

          <section className="terms-section">
            <h2>5. Acceptable Use Policy</h2>
            <p>Users agree not to misuse the platform, including but not limited to unauthorized data scraping, distributing malicious software, attempting to breach security, or submitting false information.</p>
          </section>

          <section className="terms-section">
            <h2>6. Intellectual Property Rights</h2>
            <p>All content, branding, trademarks, algorithms, and software on Job Hub Pro are the exclusive property of Job Hub Pro. Users may not copy, modify, or distribute any of our intellectual property without prior written consent.</p>
          </section>

          <section className="terms-section">
            <h2>7. Payments & Refunds</h2>
            <p>Fees for premium services, enterprise solutions, or certification programs will be outlined prior to purchase. Payments are generally non-refundable unless stated otherwise in a specific service agreement.</p>
          </section>

          <section className="terms-section">
            <h2>8. Limitation of Liability</h2>
            <p>Job Hub Pro provides the platform on an "as is" basis. We shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform, training engagements, or hiring decisions.</p>
          </section>

          <section className="terms-section">
            <h2>9. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at any time for violations of these Terms and Conditions or any fraudulent activity.</p>
          </section>

          <section className="terms-section">
            <h2>10. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Job Hub Pro operates, without regard to its conflict of law provisions.</p>
          </section>

          <section className="terms-section">
            <h2>11. Changes to Terms</h2>
            <p>Job Hub Pro reserves the right to update or modify these Terms and Conditions at any time. We will notify users of significant changes, and continued use of the platform implies acceptance of the updated terms.</p>
          </section>

          <section className="terms-section">
            <h2>12. Contact Information</h2>
            <p>If you have any questions regarding these Terms, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> support@jobhubpro.in</li>
              <li><strong>WhatsApp:</strong> +91 8870006308</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
