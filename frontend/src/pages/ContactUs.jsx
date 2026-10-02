import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './ContactUs.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    sector: '',
    serviceDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Save to Supabase (contact_enquiries table or fallback to recruitment_requirements if table not exists)
      const { error: dbError } = await supabase
        .from('contact_enquiries')
        .insert([{
          name: formData.name,
          organization: formData.organization,
          phone: formData.phone,
          email: formData.email,
          sector: formData.sector,
          service_description: formData.serviceDescription
        }]);

      if (dbError) {
        console.warn('Primary contact_enquiries insert failed, trying fallback:', dbError.message);
        // Fallback to recruitment_requirements table
        await supabase
          .from('recruitment_requirements')
          .insert([{
            company_name: formData.organization,
            industry_type: formData.sector,
            contact_person: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            job_description: formData.serviceDescription
          }]);
      }

      // 2. Send Google Sheets webhook if configured
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (googleSheetsUrl) {
        try {
          await fetch(googleSheetsUrl, {
            method: 'POST',
            body: JSON.stringify({
              type: 'contact',
              name: formData.name,
              organization: formData.organization,
              phone: formData.phone,
              email: formData.email,
              sector: formData.sector,
              service_description: formData.serviceDescription
            })
          });
        } catch (e) {
          console.error('Google Sheets sync failed:', e);
        }
      }

      // 3. Trigger Backend Server Confirmation Email
      try {
        await fetch(`${API_URL}/api/send-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            type: 'contact'
          })
        });
      } catch (e) {
        console.error('Failed to send confirmation email', e);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container text-center">
          <span className="contact-badge">GET IN TOUCH</span>
          <h1 className="contact-hero-title">Contact Blaze Tech Solutions</h1>
          <p className="contact-hero-sub">
            Have a query or requirement? Connect with our enterprise team for customized workforce, training, recruitment, or financial solutions.
          </p>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* LEFT COLUMN: Contact Details */}
            <div className="contact-info-card">
              <h2 className="info-card-title">Contact Information</h2>
              <p className="info-card-desc">
                We are here to assist your enterprise with scalable solutions. Reach out directly via call, WhatsApp, email, or visit our office.
              </p>

              <div className="info-items-list">
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="info-label">Call / Phone</span>
                    <a href="tel:+918870006308" className="info-value">+91 8870006308</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper whatsapp">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <span className="info-label">WhatsApp Support</span>
                    <a href="https://wa.me/918870006308" target="_blank" rel="noopener noreferrer" className="info-value">+91 8870006308</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="info-label">Official Email</span>
                    <a href="mailto:support@blazetechsolutions.in" className="info-value">support@blazetechsolutions.in</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Clock size={22} />
                  </div>
                  <div>
                    <span className="info-label">Working Hours</span>
                    <span className="info-value-text">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="info-label">Corporate Office</span>
                    <span className="info-value-text">Blaze Tech Solutions Hub, India</span>
                  </div>
                </div>
              </div>

              <div className="info-highlights">
                <h3>Why Partner With Us?</h3>
                <ul>
                  <li><CheckCircle2 size={16} /> Dedicated Account Manager for every client</li>
                  <li><CheckCircle2 size={16} /> 24-hour turnaround time on enquiries</li>
                  <li><CheckCircle2 size={16} /> Tailored solutions across IT, BFSI, Healthcare & BPO</li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: Enquiry Form */}
            <div className="contact-form-card">
              {!submitted ? (
                <>
                  <h2 className="form-card-title">Send Us a Message</h2>
                  <p className="form-card-sub">Fill out the details below and our solution specialist will get in touch with you promptly.</p>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Anish Kumar"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="organization">Organization / Company Name *</label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          required
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="e.g. Acme Tech Solutions"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 8870006308"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="anish@company.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="sector">Industry Sector *</label>
                      <select
                        id="sector"
                        name="sector"
                        required
                        value={formData.sector}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Select your sector...</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="BPO / ITES">BPO / ITES</option>
                        <option value="Financial Services & BFSI">Financial Services & BFSI</option>
                        <option value="Healthcare & Medicine">Healthcare & Medicine</option>
                        <option value="Educational Institutions">Educational Institutions</option>
                        <option value="Manufacturing & Engineering">Manufacturing & Engineering</option>
                        <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                        <option value="Other">Other Sector</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="serviceDescription">Description of Service Required *</label>
                      <textarea
                        id="serviceDescription"
                        name="serviceDescription"
                        required
                        rows="4"
                        value={formData.serviceDescription}
                        onChange={handleChange}
                        placeholder="Please describe your requirements (e.g. IT bulk hiring for 50 freshers, Bookkeeping services, Campus training drive...)"
                        className="form-input"
                      ></textarea>
                    </div>

                    {errorMessage && (
                      <div className="form-error-alert" style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
                        {errorMessage}
                      </div>
                    )}

                    <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'} <Send size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="contact-success-state">
                  <div className="success-icon-badge">✓</div>
                  <h2>Message Sent Successfully!</h2>
                  <p>Thank you <strong>{formData.name}</strong> for reaching out to Blaze Tech Solutions. Our representative will call or email you back within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="contact-reset-btn">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
