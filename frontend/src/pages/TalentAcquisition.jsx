import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Users, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Target, 
  Send, 
  Phone, 
  MessageCircle, 
  Mail, 
  X,
  Sparkles,
  Award
} from 'lucide-react';
import './TalentAcquisition.css';

const TalentAcquisition = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    roleDetails: ''
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
  };

  const industriesList = [
    {
      title: "AEROSPACE & DEFENCE",
      items: ["Aerospace", "Defence", "Aviation Services"]
    },
    {
      title: "AGRICULTURE & AGRIBUSINESS",
      items: ["Crop Production", "Agritech", "Agribusiness"]
    },
    {
      title: "AUTOMOTIVE INDUSTRIES",
      items: ["Manufacturing", "Components", "Services"]
    },
    {
      title: "BFSI SECTOR",
      items: ["Banking", "Finance", "Insurance"]
    },
    {
      title: "EDUCATION & TRAINING",
      items: ["Education", "Training", "EdTech"]
    },
    {
      title: "ENERGY SECTOR",
      items: ["Renewable", "Non-renewable Energy"]
    },
    {
      title: "ENVIRONMENTAL SERVICES",
      items: ["Waste Management", "Consulting"]
    },
    {
      title: "FMCG SECTOR",
      items: ["Food and Beverages", "Personal Care"]
    },
    {
      title: "GCC SECTOR",
      items: ["Shared Services", "IT & ITES", "KPO"]
    },
    {
      title: "HEALTHCARE & PHARMACEUTICALS",
      items: ["Pharmaceuticals", "Services", "Devices"]
    },
    {
      title: "HOSPITALITY & TOURISM",
      items: ["Hotels & Resorts", "Travel & Tourism"]
    },
    {
      title: "INFRASTRUCTURE SECTOR",
      items: ["Construction", "Real Estate"]
    },
    {
      title: "ITES / BPO",
      items: ["Customer Support", "BPO"]
    },
    {
      title: "LEGAL & PROFESSIONAL",
      items: ["Legal Services", "Consulting"]
    },
    {
      title: "LOGISTICS & SUPPLY CHAIN",
      items: ["Warehousing", "Transportation"]
    }
  ];

  return (
    <div className="ta-page">
      {/* 1. HERO SECTION */}
      <section className="ta-hero">
        <div className="container ta-hero-container">
          <div className="ta-hero-left">
            <span className="ta-hero-badge">AI-POWERED RECRUITMENT & BULK HIRING</span>
            <h1 className="ta-hero-title">
              TALENT ACQUISITION & <span className="highlight-text">RECRUITMENT</span>
            </h1>
            <p className="ta-hero-subtitle">
              Blaze Tech Solutions focuses on bulk hiring and recruitment processes, mainly targeting the <strong>IT sector for both freshers and experienced candidates</strong>. We also handle college and institution-based recruitment drives, as well as high-volume recruitment for the <strong>BPO sector, Healthcare sector, and Financial sector</strong>.
            </p>
            <div className="ta-hero-actions">
              <a href="#what-we-offer" className="btn-ta-secondary">
                Explore Offerings <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="ta-hero-right text-center">
            <div className="ta-hero-graphic">
              <div className="ta-search-icon-badge">
                <Sparkles size={44} className="text-white" />
              </div>
              <div className="ta-stats-bar">
                <div className="ta-stat">
                  <span className="ta-stat-num">AI-Driven</span>
                  <span className="ta-stat-label">Candidate Assessment & Matching</span>
                </div>
                <div className="ta-stat">
                  <span className="ta-stat-num">Bulk Hiring</span>
                  <span className="ta-stat-label">IT, BPO, Healthcare & Finance</span>
                </div>
                <div className="ta-stat">
                  <span className="ta-stat-num">Campus & Lateral</span>
                  <span className="ta-stat-label">Freshers & Experienced Pool</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE OFFER — RECRUITMENT SERVICES */}
      <section id="what-we-offer" className="ta-offer-section">
        <div className="container">
          <div className="ta-offer-header">
            <div className="ta-offer-header-left">
              <span className="ta-small-tag">AI-BASED TALENT ACQUISITION</span>
              <h2 className="ta-section-title">OUR RECRUITMENT CAPABILITIES</h2>
            </div>
            <div className="ta-offer-header-right">
              <p>
                At Blaze Tech Solutions, we leverage an <strong>AI-based recruitment process</strong> to thoroughly assess candidates and identify the exact talent suited for your organization. From mass campus drives to specialized lateral IT hiring, we deliver talent fast and at scale.
              </p>
            </div>
          </div>

          <div className="ta-offer-body">
            <div className="ta-offer-img-card">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                alt="AI Recruitment & Bulk Hiring" 
                className="ta-offer-img" 
              />
            </div>

            <div className="ta-offer-services-list">
              <div className="ta-offer-item">
                <div className="ta-item-num">1</div>
                <div className="ta-item-content">
                  <h3>IT SECTOR RECRUITMENT (FRESHERS & EXPERIENCED)</h3>
                  <p>
                    Specialized sourcing for software engineering, cloud, cybersecurity, data science, and IT infrastructure. We cater to entry-level freshers right out of top campuses as well as seasoned tech leaders.
                  </p>
                </div>
              </div>

              <div className="ta-offer-item">
                <div className="ta-item-num">2</div>
                <div className="ta-item-content">
                  <h3>BULK HIRING & MASS RECRUITMENT</h3>
                  <p>
                    Rapid high-volume candidate evaluation and onboarding tailored for BPO/ITES companies, customer support, healthcare facilities, and financial service centers needing scalable manpower.
                  </p>
                </div>
              </div>

              <div className="ta-offer-item">
                <div className="ta-item-num">3</div>
                <div className="ta-item-content">
                  <h3>COLLEGE & INSTITUTION BASED RECRUITMENT</h3>
                  <p>
                    End-to-end campus recruitment drives, student assessment, skill mapping, and institutional talent partnerships to seamlessly connect graduating cohorts directly with top enterprise employers.
                  </p>
                </div>
              </div>

              <div className="ta-offer-item">
                <div className="ta-item-num">4</div>
                <div className="ta-item-content">
                  <h3>AI-POWERED CANDIDATE ASSESSMENT</h3>
                  <p>
                    We deploy cutting-edge AI screening tools to evaluate domain competency, communication agility, and culture fit — drastically reducing time-to-hire while elevating candidate quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECRUITMENT SERVICES & AI ADVANTAGE */}
      <section className="ta-details-section">
        <div className="container">
          <div className="ta-details-grid">
            <div className="ta-details-left">
              <h2 className="ta-large-title">AI-DRIVEN HIRING SOLUTIONS IN INDIA</h2>
              <p className="ta-paragraph">
                Blaze Tech Solutions revolutionizes how companies build teams. By combining industry expertise with AI-powered assessment models, we eliminate screening bottlenecks and match top talent to your precise business culture.
              </p>

              <h3 className="ta-sub-heading mt-8">KEY SECTORIAL FOCUS</h3>
              <ul className="ta-types-list">
                <li><strong>✦ IT Sector:</strong> Niche tech talent acquisition covering fresh graduates, full-stack developers, system architects, and senior tech managers.</li>
                <li><strong>✦ College & Institutional Drives:</strong> Campus recruitment management, online proctored tests, and streamlined onboarding for freshers.</li>
                <li><strong>✦ BPO & ITES Sector:</strong> High-speed bulk hiring for voice, non-voice, chat support, and operational processes.</li>
                <li><strong>✦ Healthcare Sector:</strong> Healthcare professionals, clinical support, medical coding, administrative, and allied medical talent.</li>
                <li><strong>✦ Financial Sector (BFSI):</strong> Wealth managers, accounting associates, risk analysts, banking advisors, and audit professionals.</li>
              </ul>
            </div>

            <div className="ta-details-right">
              <div className="ta-benefits-card">
                <h3 className="ta-benefits-title">WHY CHOOSE BLAZE TECH SOLUTIONS</h3>
                <p className="ta-benefits-sub">
                  Our recruitment framework combines high-capacity bulk hiring with AI assessment precision to ensure seamless talent fit.
                </p>

                <div className="ta-benefits-list">
                  <div className="ta-benefit-item">
                    <h4>AI CANDIDATE ASSESSMENT</h4>
                    <p>Automated skill evaluation and behavioral matching ensure high accuracy.</p>
                  </div>

                  <div className="ta-benefit-item">
                    <h4>BULK HIRING CAPABILITY</h4>
                    <p>Capacity to source, screen, and onboard hundreds of candidates quickly.</p>
                  </div>

                  <div className="ta-benefit-item">
                    <h4>FRESHER & EXPERIENCED POOLS</h4>
                    <p>Extensive talent pipelines spanning university campuses and lateral professionals.</p>
                  </div>

                  <div className="ta-benefit-item">
                    <h4>DOMAIN SPECIALIZATION</h4>
                    <p>Focused recruitment teams dedicated to IT, BPO, Healthcare, and Finance.</p>
                  </div>

                  <div className="ta-benefit-item">
                    <h4>FAST TIME-TO-FILL</h4>
                    <p>AI workflows dramatically shorten interview cycles and placement times.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECRUITMENT SERVICES & AI ADVANTAGE */}

      {/* 5. CONTACT / ENQUIRY SECTION */}
      <section className="ta-contact-section text-center">
        <div className="container">
          <div className="ta-contact-box">
            <h2>Ready to Build Your Next High-Performing Team?</h2>
            <p>For recruitment queries, reach out at <strong>+91 8870006308</strong> or email <strong>support@blazetechsolutions.in</strong></p>
            
            <div className="ta-contact-btns mt-6">
              <a href="tel:+918870006308" className="btn-ta-contact phone">
                <Phone size={18} /> Call +91 8870006308
              </a>
              <a href="https://wa.me/918870006308" target="_blank" rel="noopener noreferrer" className="btn-ta-contact whatsapp">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
              <a href="mailto:support@blazetechsolutions.in" className="btn-ta-contact email">
                <Mail size={18} /> Email Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="ta-modal-overlay">
          <div className="ta-modal-card">
            <button onClick={closeModal} className="ta-modal-close" aria-label="Close modal">
              <X size={24} />
            </button>

            {!formSubmitted ? (
              <>
                <h3 className="ta-modal-title">Schedule a Recruitment Consultation</h3>
                <p className="ta-modal-subtitle">Share your hiring requirements and our recruitment specialists will get back to you within 24 hours.</p>

                <form onSubmit={handleFormSubmit} className="ta-modal-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleFormChange} 
                      className="form-control" 
                      placeholder="e.g. Rahul Sharma" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleFormChange} 
                      className="form-control" 
                      placeholder="e.g. rahul@company.com" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleFormChange} 
                      className="form-control" 
                      placeholder="+91 8870006308" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Company Name *</label>
                    <input 
                      type="text" 
                      name="company" 
                      required 
                      value={formData.company} 
                      onChange={handleFormChange} 
                      className="form-control" 
                      placeholder="e.g. Enterprise Ltd" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Roles & Hiring Needs</label>
                    <textarea 
                      name="roleDetails" 
                      rows="3" 
                      value={formData.roleDetails} 
                      onChange={handleFormChange} 
                      className="form-control" 
                      placeholder="Describe target roles, experience level, domain, and headcounts..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-ta-primary w-full justify-center">
                    Submit Hiring Requirement <Send size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="ta-modal-success text-center">
                <div className="ta-success-circle">✓</div>
                <h3>Requirement Received!</h3>
                <p>Thank you for submitting your recruitment needs. A Blaze Tech Solutions Talent Specialist will contact you shortly.</p>
                <button onClick={closeModal} className="btn-ta-primary mt-6">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentAcquisition;
