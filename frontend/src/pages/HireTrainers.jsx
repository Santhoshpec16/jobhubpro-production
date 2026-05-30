import React, { useState, useEffect } from 'react';
import { Shield, Users, Building, User, Mail, Phone, BookOpen, Clock, ChevronDown, CheckCircle, MapPin, Check } from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import './HireTrainers.css';
import { API_URL } from '../config';

const HireTrainers = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    org_name: '',
    contact_person: '',
    email: '',
    mobile: '',
    domain: '',
    industry: '',
    num_trainers: '',
    mode: '',
    duration: '',
    location: '',
    notes: '',
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
                // change made in render api for email verification
        try {
          const res = await fetch(`${API_URL}/api/check-verification/${formData.email}`, {
  
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
    
    if (name === 'mobile') {
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
      if (!formData.org_name || !formData.contact_person || !formData.email || !formData.mobile) {
        setMessage('Please fill in all organization details.');
        return;
      }
      if (formData.mobile.length !== 10) {
        setMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      setIsVerifying(true);
      
              // change made in render api for email verification
      try {
        const response = await fetch(`${API_URL}/api/send-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      if (!formData.industry || !formData.domain || !formData.num_trainers || !formData.mode || !formData.duration) {
        setMessage('Please fill in all training requirement details.');
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

    if (formData.mobile.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.confirmed) {
      setMessage('Please confirm that the provided information is accurate.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Insert into DB
      const { error: dbError } = await supabase
        .from('company_requirements')
        .insert([{
          org_name: formData.org_name,
          contact_person: formData.contact_person,
          email: formData.email,
          mobile: formData.mobile,
          domain: formData.domain,
          industry: formData.industry,
          num_trainers: formData.num_trainers,
          training_mode: formData.mode,
          duration: formData.duration,
          location: formData.location,
          notes: formData.notes
        }]);
        
      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      // 2. Google Sheets Webhook
      const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (googleSheetsUrl) {
        try {
          await fetch(googleSheetsUrl, {
            method: 'POST',
            body: JSON.stringify({ 
              type: 'hire',
              org_name: formData.org_name,
              contact_person: formData.contact_person,
              email: formData.email,
              mobile: formData.mobile,
              domain: formData.domain,
              industry: formData.industry,
              num_trainers: formData.num_trainers,
              training_mode: formData.mode,
              duration: formData.duration,
              location: formData.location,
              notes: formData.notes
            })
          });
        } catch (e) {
          console.error('Google Sheets sync failed:', e);
        }
      }

      // 3. Send Confirmation Email
      try {
                // change made in render api for email verification
        await fetch(`${API_URL}/api/send-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, name: formData.contact_person, type: 'hire' })
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
      org_name: '', contact_person: '', email: '', mobile: '', domain: '', industry: '', num_trainers: '',
      mode: '', duration: '', location: '', notes: '', confirmed: false
    });
  };

  const durations = ["1 Day", "2–3 Days", "1 Week", "2–4 Weeks", "Custom"];

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Organization Information";
      case 2: return "Verification";
      case 3: return "Training Requirement";
      case 4: return "Additional Details";
      case 5: return "Complete";
      default: return "";
    }
  };

  return (
    <div className="hire-trainers-page">
      <div className="ht-container">
        
        {/* Left Panel */}
        <div className="ht-left-panel">
          <div className="ht-left-content animate-fade-in">
            <span className="badge text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              For Enterprises
            </span>
            <h1 className="ht-title text-white">
              Elevate Your Enterprise with World-Class Talent
            </h1>
            <p className="ht-desc mb-12">
              Accelerate your workforce readiness by partnering with industry-leading, certified trainers tailored exactly to your organizational needs.
            </p>
            
            <div className="ht-features">
              <div className="ht-feature">
                <div className="ht-icon-wrapper"><Shield size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Curated & Certified Network</span>
              </div>
              <div className="ht-feature">
                <div className="ht-icon-wrapper"><Users size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Bespoke Training Solutions</span>
              </div>
            </div>
          </div>
          <div className="ht-overlay"></div>
        </div>

        {/* Right Panel */}
        <div className="ht-right-panel bg-white">
          <div className="ht-form-wrapper">
            
            {step === 5 ? (
              <div className="ht-success-state">
                <div className="ht-success-icon-wrapper">
                  <div className="ht-success-circle">
                    <CheckCircle size={40} color="#16a34a" />
                  </div>
                </div>
                <h2 className="ht-success-title">Requirement Submitted!</h2>
                <p className="ht-success-desc">
                  Your details have been submitted successfully. Our team will review your request and contact you shortly with the best trainer profiles.
                </p>
                <Button variant="primary" onClick={handleReset} size="lg">Submit Another Request</Button>
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
                    <form className="ht-form" onSubmit={handleNext}>
                      <div className="form-group">
                        <label>Organization Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Building size={16} className="input-icon" />
                          <input type="text" name="org_name" value={formData.org_name} onChange={handleChange} placeholder="e.g. Acme Tech" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Contact Person Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="e.g. John Doe" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Official Email <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Mail size={16} className="input-icon" />
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Mobile Number <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Phone size={16} className="input-icon" />
                          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit number" className="form-control" maxLength="10" required />
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
                    <form className="ht-form" onSubmit={handleNext}>
                      <div className="form-group">
                        <label>Industry <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Building size={16} className="input-icon" />
                          <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="e.g. IT, Healthcare, Finance" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Topic or Domain <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <BookOpen size={16} className="input-icon" />
                          <input type="text" name="domain" value={formData.domain} onChange={handleChange} placeholder="e.g. React.js, Sales Training" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Number of Trainers Needed <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Users size={16} className="input-icon" />
                          <input type="number" name="num_trainers" value={formData.num_trainers} onChange={handleChange} placeholder="e.g. 2" className="form-control" min="1" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Preferred Training Mode <span className="text-primary">*</span></label>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                            <input type="radio" name="mode" value="Online" checked={formData.mode === 'Online'} onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Online
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                            <input type="radio" name="mode" value="Offline" checked={formData.mode === 'Offline'} onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Offline
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
                            <input type="radio" name="mode" value="Hybrid" checked={formData.mode === 'Hybrid'} onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Hybrid
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Expected Duration <span className="text-primary">*</span></label>
                        <div className="select-wrapper">
                          <select name="duration" value={formData.duration} onChange={handleChange} className="form-control" required>
                            <option value="">Select Duration</option>
                            {durations.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <ChevronDown size={16} className="select-icon" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Preferred Location <span className="text-muted">(Optional)</span></label>
                        <div className="input-with-icon">
                          <MapPin size={16} className="input-icon" />
                          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY (For Offline/Hybrid)" className="form-control" />
                        </div>
                      </div>

                      <div className="form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit" className="continue-btn" icon={<span>→</span>} iconPosition="right">Next Step</Button>
                      </div>
                    </form>
                  )}

                  {step === 4 && (
                    <form className="ht-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Additional Notes / Special Requirements <span className="text-muted">(Optional)</span></label>
                        <textarea 
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          className="form-control" 
                          placeholder="Provide details about specific technology stacks, participant level, or any other unique requirements..."
                          rows="6"
                        ></textarea>
                      </div>
                      
                      <div className="form-group checkbox-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontWeight: 'normal' }}>
                          <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} />
                          <span style={{ color: '#475569' }}>I confirm that the provided requirement details are accurate and I authorize Job Hub Pro to process this request.</span>
                        </label>
                      </div>

                      <div className="form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button type="button" variant="outline" onClick={() => setStep(3)}>Back</Button>
                        <Button type="submit" className="continue-btn" disabled={isSubmitting || !formData.confirmed} icon={<span>✓</span>} iconPosition="right">
                          {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
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

export default HireTrainers;
