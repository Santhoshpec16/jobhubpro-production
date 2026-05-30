import React, { useState, useEffect } from 'react';
import { Globe, Award, Shield, CheckCircle, MailCheck, UploadCloud, X, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import './BecomeATrainer.css';
import { API_URL } from '../config';

const BecomeATrainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    industry: '',
    domain: '',
    training_mode: '',
    resume: null,
    confirmed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

    if (name === 'audience') {
      setFormData(prev => {
        const newAudience = checked 
          ? [...prev.audience, value] 
          : prev.audience.filter(a => a !== value);
        return { ...prev, audience: newAudience };
      });
      return;
    }

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.mobile) {
        setMessage('Please fill in all basic details.');
        return;
      }
      if (formData.mobile.length !== 10) {
        setMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      setIsLoading(true);
      
      // change made in render api for email verification
      try {
        const response = await fetch(`${API_URL}/api/send-verification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ email: formData.email, type: 'verify' })
        });
        const data = await response.json();
        
        setIsLoading(false);
        if (data.error) {
          setMessage(data.error);
        } else {
          setStep(2);
        }
      } catch (err) {
        setIsLoading(false);
        setMessage('Failed to send verification email. Is the server running?');
      }
    } else if (step === 3) {
      if (!formData.industry || !formData.domain || !formData.training_mode) {
        setMessage('Please fill in all professional details.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.resume) {
        setMessage('Please upload your Resume/CV.');
        return;
      }
      if (!formData.confirmed) {
        setMessage('Please confirm that the provided information is accurate.');
        return;
      }

      setIsLoading(true);
      
      try {
        let resume_url = '';
        if (formData.resume) {
          const fileExt = formData.resume.name.split('.').pop();
          const fileName = `resumes/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('documents').upload(fileName, formData.resume);
          if (uploadError) throw new Error(`Resume upload failed: ${uploadError.message}`);
          if (uploadData) {
            const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
            resume_url = data.publicUrl;
          }
        }
        const { error: dbError } = await supabase
          .from('trainer_applications')
          .insert([{
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            industry: formData.industry,
            domain: formData.domain,
            training_mode: formData.training_mode,
            resume_url: resume_url
          }]);
        if (dbError) throw new Error(`Database error: ${dbError.message}`);

        // 3. Google Sheets Webhook
        const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
        if (googleSheetsUrl) {
          try {
            await fetch(googleSheetsUrl, {
              method: 'POST',
              body: JSON.stringify({ 
                type: 'trainer', 
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                industry: formData.industry,
                domain: formData.domain,
                training_mode: formData.training_mode,
                resume_url: resume_url
              })
            });
          } catch (e) {
            console.error('Google Sheets sync failed:', e);
          }
        }

        // 4. Send Confirmation Email
        try {
          // change made in render api for email verification
          await fetch(`${API_URL}/api/send-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email: formData.email, name: formData.name, type: 'trainer' })
          });
        } catch (e) {
          console.error('Failed to send confirmation email', e);
        }

        setStep(5);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: '', email: '', mobile: '', industry: '', domain: '',
      training_mode: '', resume: null, confirmed: false
    });
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Basic Details";
      case 2: return "Verification";
      case 3: return "Professional Profile";
      case 4: return "Documents";
      case 5: return "Complete";
      default: return "";
    }
  };



  return (
    <div className="registration-page">
      <div className="reg-container">
        {/* Left Panel */}
        <div className="reg-info">
          <div className="reg-left-content animate-fade-in">
            <span className="badge text-primary bg-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Now Recruiting for Q3
            </span>
            <h1 className="reg-title text-white">
              Start Your Journey as a <span className="text-primary">JobHubPro Trainer</span>
            </h1>
            <p className="reg-desc mb-8">
              Join the elite group of trainers shaping the future of AI-powered workforce intelligence.
            </p>

            <div className="reg-features mb-8">
              <div className="reg-feature">
                <div className="reg-icon-wrapper"><Globe size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Join our global certified trainer ecosystem</span>
              </div>
              <div className="reg-feature">
                <div className="reg-icon-wrapper"><Award size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Access exclusive high-value freelance opportunities</span>
              </div>
              <div className="reg-feature">
                <div className="reg-icon-wrapper"><Shield size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Verified credentials and secure payments</span>
              </div>
            </div>
          </div>
          <div className="reg-overlay"></div>
        </div>

        <div className="reg-form-panel bg-white">
            {step > 0 && step < 5 && (
              <div className="form-header">
                <div className="step-indicator">
                  <span className="step-text text-primary font-bold">STEP {step > 2 ? step - 1 : step} OF 3</span>
                  <span className="step-title">{getStepTitle()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill bg-primary" style={{ width: `${(step / 4) * 100}%`, transition: 'width 0.3s ease' }}></div>
                </div>
              </div>
            )}

            <div className="form-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: (step === 5 || step === 0) ? 'center' : 'flex-start' }}>
              
              {/* STEP 0: Registration Options */}
              {step === 0 && (
                <div className="registration-options" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.5rem' }}>Choose Your Path</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Select the option that best describes your current expertise and goals.</p>
                  </div>
                  
                  <div 
                    className="option-card stylish-card" 
                    onClick={() => setStep(1)}
                    style={{ padding: '2rem', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#38bdf8'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = '#bae6fd'; }}
                  >
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1, transform: 'scale(1.5)' }}><Globe size={100} /></div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                      <div style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={28} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 'bold' }}>Tie Up as a Skilled Trainer</h3>
                        <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1rem' }}>If you are already a skilled trainer with proven experience, join our elite ecosystem to access premium freelance opportunities.</p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#0ea5e9', fontWeight: 'bold' }}>
                          Start Application <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="option-card stylish-card"
                    style={{ padding: '2rem', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '1px solid #fde68a', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)' }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#fbbf24'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = '#fde68a'; }}
                  >
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1, transform: 'scale(1.5)' }}><Award size={100} /></div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                      <div style={{ backgroundColor: '#f59e0b', color: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={28} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 'bold' }}>Enroll in TTT Certification</h3>
                        <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1rem' }}>If you are an expert in any domain/technology, join our TTT certification program to become an internationally certified trainer and join our freelance pool.</p>
                        <Link to="/ttt-certification" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontWeight: 'bold', textDecoration: 'none' }}>
                          Click here to enroll <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2>Basic Information</h2>
                  <p className="text-muted mb-6">Let's start with your contact details.</p>

                  <form className="reg-form" onSubmit={handleNext}>
                    {message && <div className="error-alert">{message}</div>}
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Jonathan Doe" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jonathan@example.com" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit number" className="form-control" maxLength="10" required />
                    </div>

                    <div className="form-footer">
                      <Button type="button" variant="outline" onClick={() => setStep(0)} style={{ marginRight: '1rem' }}>Back</Button>
                      <Button type="submit" className="continue-btn" disabled={isLoading} icon={<span>→</span>} iconPosition="right">
                        {isLoading ? 'Sending Link...' : 'Verify Email'}
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MailCheck size={40} color="#0284c7" />
                    </div>
                  </div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Check Your Email</h2>
                  <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
                    We've sent a secure login link to <strong>{formData.email}</strong>. 
                    <br />Please click the link in your email to verify and continue.
                  </p>
                  <Button type="button" variant="outline" onClick={() => setStep(1)} style={{ marginTop: '1rem' }}>Use a different email</Button>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2>Professional Profile</h2>
                  <p className="text-muted mb-6">Tell us about your expertise and training preferences.</p>

                  <form className="reg-form" onSubmit={handleNext}>
                    {message && <div className="error-alert">{message}</div>}
                    <div className="form-group">
                      <label>Industry</label>
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="form-control" placeholder="e.g. IT, Healthcare" required />
                    </div>
                    <div className="form-group">
                      <label>Topic or Domain</label>
                      <input type="text" name="domain" value={formData.domain} onChange={handleChange} className="form-control" placeholder="e.g. React, Leadership" required />
                    </div>
                    <div className="form-group">
                      <label>Preferred Training Mode</label>
                      <div className="radio-group">
                        <label><input type="radio" name="training_mode" value="Online" onChange={handleChange} required /> Online</label>
                        <label><input type="radio" name="training_mode" value="Offline" onChange={handleChange} required /> Offline</label>
                        <label><input type="radio" name="training_mode" value="Hybrid" onChange={handleChange} required /> Hybrid</label>
                      </div>
                    </div>

                    <div className="form-footer">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} style={{ marginRight: '1rem' }}>Back</Button>
                      <Button type="submit" className="continue-btn" icon={<span>→</span>} iconPosition="right">Next Step</Button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <>
                  <h2>Documents & Credentials</h2>
                  <p className="text-muted mb-6">Upload your resume and any relevant certifications.</p>

                  <form className="reg-form" onSubmit={handleNext}>
                    {message && <div className="error-alert">{message}</div>}
                    
                    <div className="form-group">
                      <label>Upload Resume/CV <span className="text-muted">(PDF/DOC, Max 10MB)</span></label>
                      <div className="file-upload-wrapper">
                        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} id="resume-upload" className="file-input" />
                        <label htmlFor="resume-upload" className="file-label">
                          <UploadCloud size={24} className="text-primary mb-2" />
                          <span>{formData.resume ? formData.resume.name : 'Click to browse or drag file here'}</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group checkbox-group" style={{ marginTop: '2rem' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontWeight: 'normal' }}>
                        <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} />
                        <span>I confirm that the provided information is accurate and I agree to the terms and conditions.</span>
                      </label>
                    </div>

                    <div className="form-footer">
                      <Button type="button" variant="outline" onClick={() => setStep(3)} style={{ marginRight: '1rem' }} disabled={isLoading}>Back</Button>
                      <Button type="submit" className="continue-btn" disabled={isLoading || !formData.confirmed} icon={<span>✓</span>} iconPosition="right">
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={40} color="#16a34a" />
                    </div>
                  </div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Application Submitted!</h2>
                  <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
                    Your details have been successfully received. We will review your application and contact you soon.
                  </p>
                  <Button variant="primary" onClick={handleReset}>Submit Another Application</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default BecomeATrainer;
