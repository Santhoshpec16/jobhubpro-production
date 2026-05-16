import React, { useState, useEffect } from 'react';
import { Globe, Award, Shield, CheckCircle, MailCheck, UploadCloud, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import './BecomeATrainer.css';

const BecomeATrainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    domain: '',
    experience: '',
    training_mode: '',
    audience: [],
    summary: '',
    resume: null,
    certifications: [],
    linkedin_url: '',
    confirmed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    } else if (name === 'certifications') {
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, ...Array.from(files)] }));
    }
  };

  const removeCertification = (index) => {
    setFormData(prev => {
      const newCerts = [...prev.certifications];
      newCerts.splice(index, 1);
      return { ...prev, certifications: newCerts };
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.mobile || !formData.location) {
        setMessage('Please fill in all basic details.');
        return;
      }
      if (formData.mobile.length !== 10) {
        setMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      setIsLoading(true);
      
      try {
        const response = await fetch('https://eloise-frizzlier-unradically.ngrok-free.dev/api/send-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
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
      if (!formData.domain || !formData.experience || !formData.training_mode || !formData.audience) {
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
        // 1. Upload files
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

        let certifications_urls = [];
        for (const file of formData.certifications) {
          const fileExt = file.name.split('.').pop();
          const fileName = `certifications/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('documents').upload(fileName, file);
          
          if (!uploadError && uploadData) {
            const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
            certifications_urls.push(data.publicUrl);
          }
        }

        // 2. Insert into DB
        const { error: dbError } = await supabase
          .from('trainer_applications')
          .insert([{
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            location: formData.location,
            domain: formData.domain,
            experience: formData.experience,
            training_mode: formData.training_mode,
            audience: formData.audience.join(', '),
            summary: formData.summary,
            resume_url: resume_url,
            certifications_urls: certifications_urls,
            linkedin_url: formData.linkedin_url
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
                location: formData.location,
                domain: formData.domain,
                experience: formData.experience,
                training_mode: formData.training_mode,
                audience: formData.audience.join(', '),
                summary: formData.summary,
                resume_url: resume_url,
                linkedin_url: formData.linkedin_url
              })
            });
          } catch (e) {
            console.error('Google Sheets sync failed:', e);
          }
        }

        // 4. Send Confirmation Email
        try {
          await fetch('https://eloise-frizzlier-unradically.ngrok-free.dev/api/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
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
      name: '', email: '', mobile: '', location: '', domain: '', experience: '',
      training_mode: '', audience: '', summary: '', resume: null, certifications: [],
      linkedin_url: '', confirmed: false
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

  const domains = [
    "Software Development", "AI & Data Science", "Cloud Computing", "Cybersecurity", 
    "UI/UX Design", "Digital Marketing", "Finance", "HR & Soft Skills", "Sales", "Leadership", "Other"
  ];
  
  const experiences = ["0–2 Years", "3–5 Years", "6–10 Years", "10+ Years"];

  return (
    <div className="registration-page bg-light">
      <div className="container reg-container">
        <div className="reg-card">
          {/* Left Panel */}
          <div className="reg-info">
            <span className="badge text-primary bg-secondary" style={{ backgroundColor: '#ffedd5' }}>Now Recruiting for Q3</span>
            <h1 className="reg-title">
              Start Your Journey as a <span className="text-primary">JobHubPro Trainer</span>
            </h1>
            <p className="reg-desc text-muted mb-8">
              Join the elite group of trainers shaping the future of AI-powered workforce intelligence.
            </p>

            <div className="reg-features mb-8">
              <div className="reg-feature">
                <div className="feature-icon text-primary"><Globe size={20} /></div>
                <p>Join our global certified trainer ecosystem</p>
              </div>
              <div className="reg-feature">
                <div className="feature-icon text-primary"><Award size={20} /></div>
                <p>Access exclusive high-value freelance opportunities</p>
              </div>
              <div className="reg-feature">
                <div className="feature-icon text-primary"><Shield size={20} /></div>
                <p>Verified credentials and secure payments</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="reg-form-panel">
            {step < 5 && (
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

            <div className="form-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: step === 5 ? 'center' : 'flex-start' }}>
              
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
                    <div className="form-group">
                      <label>Current Location</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" className="form-control" required />
                    </div>

                    <div className="form-footer">
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
                      <label>Primary Expertise Domain</label>
                      <select name="domain" value={formData.domain} onChange={handleChange} className="form-control" required>
                        <option value="">Select Domain</option>
                        {domains.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Years of Experience</label>
                      <select name="experience" value={formData.experience} onChange={handleChange} className="form-control" required>
                        <option value="">Select Experience</option>
                        {experiences.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Preferred Training Mode</label>
                      <div className="radio-group">
                        <label><input type="radio" name="training_mode" value="Online" onChange={handleChange} required /> Online</label>
                        <label><input type="radio" name="training_mode" value="Offline" onChange={handleChange} required /> Offline</label>
                        <label><input type="radio" name="training_mode" value="Hybrid" onChange={handleChange} required /> Hybrid</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Preferred Audience</label>
                      <div className="radio-group">
                        <label><input type="checkbox" name="audience" value="Corporate" checked={formData.audience.includes('Corporate')} onChange={handleChange} /> Corporate</label>
                        <label><input type="checkbox" name="audience" value="Colleges" checked={formData.audience.includes('Colleges')} onChange={handleChange} /> Colleges</label>
                        <label><input type="checkbox" name="audience" value="Students" checked={formData.audience.includes('Students')} onChange={handleChange} /> Students</label>
                        <label><input type="checkbox" name="audience" value="Mixed" checked={formData.audience.includes('Mixed')} onChange={handleChange} /> Mixed</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Short Professional Summary</label>
                      <textarea name="summary" value={formData.summary} onChange={handleChange} className="form-control" rows="3" placeholder="Briefly describe your training style and key achievements..."></textarea>
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

                    <div className="form-group">
                      <label>Upload Certifications <span className="text-muted">(Multiple PDFs/JPGs)</span></label>
                      <div className="file-upload-wrapper">
                        <input type="file" name="certifications" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple onChange={handleFileChange} id="certs-upload" className="file-input" />
                        <label htmlFor="certs-upload" className="file-label">
                          <UploadCloud size={24} className="text-primary mb-2" />
                          <span>Click to upload certificates</span>
                        </label>
                      </div>
                      {formData.certifications.length > 0 && (
                        <div className="selected-files">
                          {formData.certifications.map((file, i) => (
                            <div key={i} className="file-chip">
                              <span className="truncate">{file.name}</span>
                              <button type="button" onClick={() => removeCertification(i)}><X size={14} /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>LinkedIn Profile URL (Optional)</label>
                      <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="form-control" />
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
    </div>
  );
};

export default BecomeATrainer;
