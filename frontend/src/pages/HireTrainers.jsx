import React, { useState, useEffect } from 'react';
import { Shield, Users, Building, User, Mail, Phone, BookOpen, Clock, DollarSign, ChevronDown, CheckCircle, MapPin, Check } from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import './HireTrainers.css';

const HireTrainers = () => {
  const [formData, setFormData] = useState({
    org_name: '',
    contact_person: '',
    email: '',
    mobile: '',
    domain: '',
    num_trainers: '',
    mode: '',
    duration: '',
    location: '',
    budget: '',
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
    if (verificationSent && !emailVerified) {
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
          }
        } catch (e) {
          console.error("Polling error:", e);
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationSent, emailVerified, formData.email]);

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

  const handleVerifyEmail = async () => {
    if (!formData.email) {
      setMessage('Please enter an email address to verify.');
      return;
    }
    if (!formData.mobile || formData.mobile.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setMessage('');
    setIsVerifying(true);
    
    try {
      const response = await fetch('https://eloise-frizzlier-unradically.ngrok-free.dev/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ email: formData.email, type: 'verify' })
      });
      const data = await response.json();
      
      if (data.error) {
        setMessage(data.error);
      } else {
        setVerificationSent(true);
      }
    } catch (err) {
      setMessage('Failed to send verification email. Is the server running?');
    } finally {
      setIsVerifying(false);
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
          num_trainers: formData.num_trainers,
          training_mode: formData.mode,
          duration: formData.duration,
          location: formData.location,
          budget: formData.budget,
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
              num_trainers: formData.num_trainers,
              training_mode: formData.mode,
              duration: formData.duration,
              location: formData.location,
              budget: formData.budget,
              notes: formData.notes
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
          body: JSON.stringify({ email: formData.email, name: formData.contact_person, type: 'hire' })
        });
      } catch (e) {
        console.error('Failed to send confirmation email', e);
      }

      setIsSuccess(true);
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
    setFormData({
      org_name: '', contact_person: '', email: '', mobile: '', domain: '', num_trainers: '',
      mode: '', duration: '', location: '', budget: '', notes: '', confirmed: false
    });
  };

  const domains = [
    "Software Development", "AI & Data Science", "Cloud Computing", "Cybersecurity", 
    "UI/UX Design", "Digital Marketing", "Finance", "HR & Soft Skills", "Sales", "Leadership", "Other"
  ];
  const durations = ["1 Day", "2–3 Days", "1 Week", "2–4 Weeks", "Custom"];
  const budgets = ["Below ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000+", "Prefer to Discuss"];

  return (
    <div className="hire-trainers-page">
      <div className="ht-container">
        
        {/* Left Panel */}
        <div className="ht-left-panel">
          <div className="ht-left-content animate-fade-in">
            <span className="badge text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Enterprise Training Solutions
            </span>
            <h1 className="ht-title text-white">
              Fuel Your Team's Growth with Expert Guidance
            </h1>
            <p className="ht-desc mb-12">
              Connect with the world's most proficient training professionals to upskill your workforce and stay ahead of the curve.
            </p>
            
            <div className="ht-features">
              <div className="ht-feature">
                <div className="ht-icon-wrapper"><Shield size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Fully Vetted Trainer Network</span>
              </div>
              <div className="ht-feature">
                <div className="ht-icon-wrapper"><Users size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Customized Curriculums</span>
              </div>
            </div>
          </div>
          <div className="ht-overlay"></div>
        </div>

        {/* Right Panel */}
        <div className="ht-right-panel bg-white">
          <div className="ht-form-wrapper">
            
            {isSuccess ? (
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
                <div className="ht-form-header" style={{ marginBottom: '2rem' }}>
                  <h2 className="ht-form-title" style={{ fontSize: '2.5rem' }}>Request a Trainer</h2>
                  <p className="text-muted">Fill out the details below and we'll match you with the perfect expert.</p>
                </div>

                <form className="ht-form" onSubmit={handleSubmit}>
                  {message && <div style={{ color: '#b91c1c', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #f87171' }}>{message}</div>}
                  
                  {/* SECTION 1 */}
                  <div className="form-section">
                    <h3 className="section-heading" style={{ fontSize: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>
                      <Building size={20} className="text-primary" style={{ display: 'inline', marginRight: '8px' }}/> Organization Information
                    </h3>
                    
                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Organization Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Building size={16} className="input-icon" />
                          <input type="text" name="org_name" value={formData.org_name} onChange={handleChange} placeholder="e.g. Acme Tech" className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group flex-1">
                        <label>Contact Person Name <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="e.g. John Doe" className="form-control" required />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Official Email <span className="text-primary">*</span></label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div className="input-with-icon" style={{ flex: 1 }}>
                            <Mail size={16} className="input-icon" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className="form-control" required disabled={emailVerified || verificationSent} />
                          </div>
                          {!emailVerified && (
                            <Button type="button" onClick={handleVerifyEmail} disabled={isVerifying || verificationSent} style={{ whiteSpace: 'nowrap' }}>
                              {isVerifying ? 'Sending...' : verificationSent ? 'Check Inbox' : 'Verify'}
                            </Button>
                          )}
                          {emailVerified && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dcfce7', color: '#16a34a', padding: '0 1rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>
                              <Check size={18} style={{ marginRight: '4px' }}/> Verified
                            </div>
                          )}
                        </div>
                        {verificationSent && !emailVerified && <small style={{ color: '#0284c7', display: 'block', marginTop: '0.5rem' }}>We sent a link to your email. Click it to verify.</small>}
                      </div>
                      
                      <div className="form-group flex-1">
                        <label>Mobile Number <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Phone size={16} className="input-icon" />
                          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit number" className="form-control" maxLength="10" required />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2 */}
                  <div className="form-section" style={{ marginTop: '3rem' }}>
                    <h3 className="section-heading" style={{ fontSize: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>
                      <BookOpen size={20} className="text-primary" style={{ display: 'inline', marginRight: '8px' }}/> Training Requirement
                    </h3>
                    
                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Training Domain Required <span className="text-primary">*</span></label>
                        <div className="select-wrapper">
                          <select name="domain" value={formData.domain} onChange={handleChange} className="form-control" required>
                            <option value="">Select Domain</option>
                            {domains.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <ChevronDown size={16} className="select-icon" />
                        </div>
                      </div>
                      <div className="form-group flex-1">
                        <label>Number of Trainers Needed <span className="text-primary">*</span></label>
                        <div className="input-with-icon">
                          <Users size={16} className="input-icon" />
                          <input type="number" name="num_trainers" value={formData.num_trainers} onChange={handleChange} placeholder="e.g. 2" className="form-control" min="1" required />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Preferred Training Mode <span className="text-primary">*</span></label>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="radio" name="mode" value="Online" onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Online
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="radio" name="mode" value="Offline" onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Offline
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="radio" name="mode" value="Hybrid" onChange={handleChange} required style={{ width: '16px', height: '16px' }}/> Hybrid
                          </label>
                        </div>
                      </div>
                      <div className="form-group flex-1">
                        <label>Expected Duration <span className="text-primary">*</span></label>
                        <div className="select-wrapper">
                          <select name="duration" value={formData.duration} onChange={handleChange} className="form-control" required>
                            <option value="">Select Duration</option>
                            {durations.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <ChevronDown size={16} className="select-icon" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Preferred Location <span className="text-muted">(Optional)</span></label>
                      <div className="input-with-icon">
                        <MapPin size={16} className="input-icon" />
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY (For Offline/Hybrid)" className="form-control" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3 */}
                  <div className="form-section" style={{ marginTop: '3rem' }}>
                    <h3 className="section-heading" style={{ fontSize: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #eee', marginBottom: '1.5rem' }}>
                      <DollarSign size={20} className="text-primary" style={{ display: 'inline', marginRight: '8px' }}/> Additional Details
                    </h3>
                    
                    <div className="form-group">
                      <label>Budget Range <span className="text-muted">(Optional)</span></label>
                      <div className="select-wrapper">
                        <select name="budget" value={formData.budget} onChange={handleChange} className="form-control">
                          <option value="">Select Budget Range</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Additional Notes / Special Requirements <span className="text-muted">(Optional)</span></label>
                      <textarea 
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-control" 
                        placeholder="Provide details about specific technology stacks, participant level, or any other unique requirements..."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group checkbox-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} />
                      <span style={{ color: '#475569' }}>I confirm that the provided requirement details are accurate and I authorize Job Hub Pro to process this request.</span>
                    </label>
                  </div>

                  <div className="ht-form-footer" style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <Button type="submit" className="w-full justify-center" size="lg" disabled={isSubmitting || !emailVerified || !formData.confirmed} icon={<span>→</span>} iconPosition="right">
                      {isSubmitting ? 'Submitting...' : !emailVerified ? 'Verify Email to Submit' : 'Submit Requirement'}
                    </Button>
                    <div className="ht-footer-note" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                      <Shield size={16} className="text-primary" />
                      <span className="text-muted text-sm ml-2">Secure submission process. Your data is protected.</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireTrainers;
