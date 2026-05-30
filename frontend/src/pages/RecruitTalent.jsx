import React, { useState, useEffect } from 'react';
import { Shield, Users, Building, User, Mail, Phone, Briefcase, CheckCircle, MapPin, Check, FileText, Layers } from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import './RecruitTalent.css';

const RecruitTalent = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company_name: '',
    industry_type: '',
    company_location: '',
    contact_person: '',
    email: '',
    phone_number: '',
    job_description: '',
    candidates_required: '',
    confirmed: false
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let interval;
    if (step === 2 && formData.email) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`https://eloise-frizzlier-unradically.ngrok-free.dev/api/check-verification/${formData.email}`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
          });
          const data = await res.json();
          if (data.verified) {
            clearInterval(interval);
            setEmailVerified(true);
            setVerificationSent(false);
            setStep(3);
          }
        } catch (e) {
          console.error("Polling error:", e);
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone_number') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: onlyNums }));
      }
      return;
    }

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (step === 1) {
      if (!formData.company_name || !formData.contact_person || !formData.email || !formData.phone_number) {
        setMessage('Please fill in all basic details.');
        return;
      }
      if (formData.phone_number.length !== 10) {
        setMessage('Please enter a valid 10-digit phone number.');
        return;
      }
      setIsVerifying(true);
      
      try {
        const response = await fetch('https://eloise-frizzlier-unradically.ngrok-free.dev/api/send-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify({ email: formData.email, type: 'verify' })
        });
        const data = await response.json();
        
        setIsVerifying(false);
        if (data.error) {
          setMessage(data.error);
        } else {
          setStep(2);
          setVerificationSent(true);
        }
      } catch (err) {
        setIsVerifying(false);
        setMessage('Failed to send verification email. Is the server running?');
      }
    } else if (step === 3) {
      if (!formData.industry_type || !formData.company_location || !formData.candidates_required) {
        setMessage('Please fill in all sourcing profile details.');
        return;
      }
      setStep(4);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!emailVerified) {
      setMessage('Please verify your email address before submitting.');
      return;
    }

    if (formData.phone_number.length !== 10) {
      setMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!formData.confirmed) {
      setMessage('Please confirm that the provided information is accurate.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Insert into Supabase (recruitment_requirements table)
      const { error: dbError } = await supabase
        .from('recruitment_requirements')
        .insert([{
          company_name: formData.company_name,
          industry_type: formData.industry_type,
          company_location: formData.company_location,
          contact_person: formData.contact_person,
          email: formData.email,
          phone_number: formData.phone_number,
          job_description: formData.job_description,
          candidates_required: formData.candidates_required ? parseInt(formData.candidates_required) : null
        }]);
        
      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      // 2. Google Sheets Webhook
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (googleSheetsUrl) {
        try {
          await fetch(googleSheetsUrl, {
            method: 'POST',
            body: JSON.stringify({ 
              type: 'recruit',
              company_name: formData.company_name,
              industry_type: formData.industry_type,
              company_location: formData.company_location,
              contact_person: formData.contact_person,
              email: formData.email,
              phone_number: formData.phone_number,
              job_description: formData.job_description,
              candidates_required: formData.candidates_required
            })
          });
        } catch (e) {
          console.error('Google Sheets sync failed:', e);
        }
      }

      // 3. Send Confirmation Email
      try {
        await fetch('https://eloise-frizzlier-unradically.ngrok-free.dev/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify({ email: formData.email, name: formData.contact_person, type: 'recruit' })
        });
      } catch (e) {
        console.error('Failed to send confirmation email', e);
      }

      setIsSuccess(true);
      setStep(5);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmailVerified(false);
    setVerificationSent(false);
    setStep(1);
    setFormData({
      company_name: '',
      industry_type: '',
      company_location: '',
      contact_person: '',
      email: '',
      phone_number: '',
      job_description: '',
      candidates_required: '',
      confirmed: false
    });
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Basic Details";
      case 2: return "Verification";
      case 3: return "Sourcing Profile";
      case 4: return "Job Details";
      case 5: return "Complete";
      default: return "";
    }
  };

  return (
    <div className="recruit-talent-page">
      <div className="rt-container">
        
        {/* Left Panel */}
        <div className="rt-left-panel">
          <div className="rt-left-content animate-fade-in">
            <span className="rt-badge text-primary bg-secondary">
              Talent Empowerment & Sourcing
            </span>
            <h1 className="rt-title text-white">
              Bespoke Recruitment Powered by Expert Intelligence
            </h1>
            <p className="rt-hook text-primary font-bold mb-4">
              We don’t just source candidates; we deliver job-ready talent.
            </p>
            <p className="rt-desc mb-10">
              Stop wasting time on unqualified resumes. Our process combines AI-driven screening with deep-dive expert coaching to validate technical capabilities, communication, and organizational fit before candidates reach recruiters.
            </p>
            
            <div className="rt-features">
              <div className="rt-feature">
                <div className="rt-icon-wrapper"><Shield size={20} className="text-primary" /></div>
                <div>
                  <h4 className="rt-feature-title text-white">AI-Driven Screening</h4>
                  <p className="rt-feature-text">Pre-evaluated candidates matching exact job profiles.</p>
                </div>
              </div>
              <div className="rt-feature">
                <div className="rt-icon-wrapper"><Users size={20} className="text-primary" /></div>
                <div>
                  <h4 className="rt-feature-title text-white">Expert Mentoring</h4>
                  <p className="rt-feature-text">Candidates receive deep coaching to align with your team.</p>
                </div>
              </div>
              <div className="rt-feature">
                <div className="rt-icon-wrapper"><Layers size={20} className="text-primary" /></div>
                <div>
                  <h4 className="rt-feature-title text-white">Zero Screening Overhead</h4>
                  <p className="rt-feature-text">Get profiles that are 100% verified and job-ready.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rt-overlay"></div>
        </div>

        {/* Right Panel */}
        <div className="rt-right-panel bg-white">
          <div className="rt-form-wrapper">
            
            {step === 5 ? (
              <div className="rt-success-state">
                <div className="rt-success-icon-wrapper">
                  <div className="rt-success-circle">
                    <CheckCircle size={40} color="#16a34a" />
                  </div>
                </div>
                <h2 className="rt-success-title">Requirement Submitted!</h2>
                <p className="rt-success-desc">
                  Your recruitment details have been submitted successfully. Our sourcing team and domain experts will begin screening immediately and contact you shortly.
                </p>
                <Button variant="primary" onClick={handleReset} size="lg">Submit Another Requirement</Button>
              </div>
            ) : (
              <>
                <div className="form-header" style={{ marginBottom: '2.5rem' }}>
                  <div className="step-indicator" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <span className="step-text text-primary font-bold">STEP {step > 2 ? step - 1 : step} OF 3</span>
                    <span className="step-title" style={{ color: '#64748b' }}>{getStepTitle()}</span>
                  </div>
                  <div className="progress-bar" style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div className="progress-fill bg-primary" style={{ width: `${(step / 4) * 100}%`, transition: 'width 0.3s ease', height: '100%' }}></div>
                  </div>
                </div>

                <div className="form-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                  {message && <div style={{ color: '#b91c1c', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #f87171' }}>{message}</div>}

                  {step === 1 && (
                    <form className="rt-form" onSubmit={handleNext}>
                      <div className="form-group">
                        <label>Company Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Building size={16} className="input-icon" />
                          <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="e.g. Acme Corporation" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Primary Contact Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="e.g. Jane Smith" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Official Email Address <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Mail size={16} className="input-icon" />
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Phone Number <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Phone size={16} className="input-icon" />
                          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="10-digit number" className="form-control" maxLength="10" required />
                        </div>
                      </div>

                      <div className="form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" className="continue-btn" disabled={isVerifying} icon={<span>→</span>} iconPosition="right">
                          {isVerifying ? 'Sending Link...' : 'Verify Email'}
                        </Button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Mail size={40} color="#0284c7" />
                        </div>
                      </div>
                      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#0f172a' }}>Check Your Email</h2>
                      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.6' }}>
                        We've sent a secure login link to <strong>{formData.email}</strong>. 
                        <br />Please click the link in your email to verify and continue.
                      </p>
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>Use a different email</Button>
                    </div>
                  )}

                  {step === 3 && (
                    <form className="rt-form" onSubmit={handleNext}>
                      <div className="form-group">
                        <label>Industry Type <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Briefcase size={16} className="input-icon" />
                          <input type="text" name="industry_type" value={formData.industry_type} onChange={handleChange} placeholder="e.g. Technology, Finance, Health" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Company Location <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <MapPin size={16} className="input-icon" />
                          <input type="text" name="company_location" value={formData.company_location} onChange={handleChange} placeholder="e.g. San Francisco, CA" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Number of Candidates Required <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Users size={16} className="input-icon" />
                          <input type="number" name="candidates_required" value={formData.candidates_required} onChange={handleChange} placeholder="e.g. 5" className="form-control" min="1" required />
                        </div>
                      </div>

                      <div className="form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit" className="continue-btn" icon={<span>→</span>} iconPosition="right">Next Step</Button>
                      </div>
                    </form>
                  )}

                  {step === 4 && (
                    <form className="rt-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Job Description & Requirements <span className="text-primary">*</span></label>
                        <textarea 
                          name="job_description"
                          value={formData.job_description}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Please paste the Job Description, key technical skillsets, minimum experience levels, and any behavioral criteria here..."
                          rows="8"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="form-group checkbox-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontWeight: 'normal' }}>
                          <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} />
                          <span style={{ color: '#475569' }}>I confirm that the provided recruitment details are accurate and I authorize Job Hub Pro to process this request.</span>
                        </label>
                      </div>

                      <div className="form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button type="button" variant="outline" onClick={() => setStep(3)}>Back</Button>
                        <Button type="submit" className="continue-btn" disabled={isSubmitting || !formData.confirmed} icon={<span>✓</span>} iconPosition="right">
                          {isSubmitting ? 'Submitting...' : 'Submit Sourcing Request'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitTalent;
