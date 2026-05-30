import React, { useState } from 'react';
import { Award, CheckCircle, Mail, User, Phone, ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './TTTCertification.css';

const TTTCertification = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    confirmed: false
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      setMessage('Please fill in all details.');
      return;
    }
    if (formData.mobile.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', mobile: '', confirmed: false });
    setMessage('');
  };

  return (
    <div className="ttt-page">
      <div className="ttt-container">
        {/* Left Panel */}
        <div className="ttt-left-panel">
          <div className="ttt-left-content animate-fade-in">
            <span className="badge text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              TTT Certification
            </span>
            <h1 className="ttt-title text-white">
              Become an Impactful Learning Facilitator
            </h1>
            <p className="ttt-desc mb-12">
              Transform your domain expertise into outstanding training capabilities. Our internationally recognized Train-the-Trainer program focuses on facilitation excellence and delivery mastery.
            </p>
            
            <div className="ttt-features">
              <div className="ttt-feature">
                <div className="ttt-icon-wrapper"><Award size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Global Delivery Standards</span>
              </div>
              <div className="ttt-feature">
                <div className="ttt-icon-wrapper"><CheckCircle size={20} className="text-primary" /></div>
                <span className="text-white font-bold">Practical Interactive Labs</span>
              </div>
            </div>
          </div>
          <div className="ttt-overlay"></div>
        </div>

        {/* Right Panel */}
        <div className="ttt-right-panel bg-white">
          <div className="ttt-form-wrapper">
            <Link to="/" className="back-link mb-6">
              <ArrowLeft size={16} /> Back to Home
            </Link>

            {isSuccess ? (
              <div className="ttt-success-state">
                <div className="ttt-success-icon-wrapper">
                  <div className="ttt-success-circle">
                    <CheckCircle size={40} color="#16a34a" />
                  </div>
                </div>
                <h2 className="ttt-success-title">Enrollment Initiated!</h2>
                <p className="ttt-success-desc">
                  Thank you for enrolling in our Train-the-Trainer (TTT) Certification program, <strong>{formData.name}</strong>. Our L&D team will contact you shortly at <strong>{formData.email}</strong> with details on the upcoming cohort schedule and certification steps.
                </p>
                <Button onClick={handleReset} size="lg">Enroll in another course</Button>
              </div>
            ) : (
              <>
                <div className="ttt-form-header" style={{ marginBottom: '2.5rem' }}>
                  <h2 className="ttt-form-title">TTT Certification Enrollment</h2>
                  <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                    Enter your contact information to enroll in the certification program.
                  </p>
                </div>

                <form className="ttt-form" onSubmit={handleSubmit}>
                  {message && (
                    <div style={{ color: '#b91c1c', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #f87171' }}>
                      {message}
                    </div>
                  )}

                  <div className="form-group">
                    <label>Full Name <span className="text-primary">*</span></label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Jonathan Doe" className="form-control" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address <span className="text-primary">*</span></label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jonathan@example.com" className="form-control" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contact Number <span className="text-primary">*</span></label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon" />
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className="form-control" maxLength="10" required />
                    </div>
                  </div>

                  <div className="form-group checkbox-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} required />
                      <span style={{ color: '#475569' }}>I agree to enroll in the TTT Certification and authorize Job Hub Pro to contact me with session details.</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full justify-center" size="lg" disabled={!formData.confirmed}>
                    Enroll Now
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTTCertification;
