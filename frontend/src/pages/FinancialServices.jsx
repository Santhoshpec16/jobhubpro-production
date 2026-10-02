import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  FileText, 
  Phone, 
  MessageCircle, 
  Mail, 
  Building,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';
import './FinancialServices.css';

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FinancialServices = () => {
  const [activeTab, setActiveTab] = useState('bookkeeping');

  const bookkeepingServices = [
    "Daily / weekly / monthly bookkeeping",
    "Recording sales and purchase transactions",
    "Accounts payable management",
    "Accounts receivable management",
    "Bank & credit card reconciliation",
    "General ledger maintenance",
    "Expense recording and classification",
    "Invoice & payment tracking",
    "Vendor & customer ledger management",
    "Payroll accounting support",
    "Fixed asset records",
    "Intercompany accounting",
    "Inventory management",
    "Monthly book closure",
    "Trial balance preparation",
    "Financial statements preparation",
    "Audit support"
  ];

  const virtualCfoServices = [
    {
      title: "Financial Planning & Analysis",
      icon: <BarChart3 size={24} />,
      items: [
        "Budget preparation",
        "Financial forecasting",
        "Profitability analysis",
        "Variance analysis",
        "Scenario planning",
        "Financial modelling"
      ]
    },
    {
      title: "Cash Flow Management",
      icon: <DollarSign size={24} />,
      items: [
        "Cash-flow forecasting",
        "Working capital management",
        "Receivables & payables monitoring",
        "Cash-flow optimisation",
        "Liquidity planning"
      ]
    },
    {
      title: "Management Reporting & MIS",
      icon: <PieChart size={24} />,
      items: [
        "Monthly management reports",
        "Financial dashboards",
        "KPI reporting",
        "Budget vs Actual analysis",
        "Business performance reviews",
        "Management presentations"
      ]
    },
    {
      title: "Financial Controls",
      icon: <ShieldCheck size={24} />,
      items: [
        "Review of finance processes",
        "Internal financial controls",
        "Approval & payment controls",
        "Process improvement",
        "Risk identification"
      ]
    }
  ];

  const taxationServices = [
    {
      title: "Corporate Tax Filing",
      desc: "Complete filing of corporate income tax returns, tax computations, and annual compliance."
    },
    {
      title: "GST & Indirect Tax",
      desc: "Monthly GST return filings, input tax credit reconciliation, GST registration, and audit assistance."
    },
    {
      title: "TDS & Statutory Withholdings",
      desc: "TDS calculation, quarterly filing, Form 16/16A generation, and vendor withholding management."
    },
    {
      title: "Tax Planning & Advisory",
      desc: "Strategic tax planning to optimize tax liabilities legally while ensuring 100% regulatory compliance."
    }
  ];

  return (
    <div className="financial-services-page">
      {/* 1. HERO SECTION */}
      <section className="fs-hero">
        <div className="container fs-hero-container">
          <div className="fs-hero-content text-center">
            <span className="fs-hero-badge">Blaze Tech Solutions Financial Practice</span>
            <h1 className="fs-hero-title">
              Professional <span className="highlight-text">Financial Services</span> to Drive Business Growth
            </h1>
            <p className="fs-hero-subtitle">
              Reliable bookkeeping, strategic Virtual CFO expertise, and comprehensive tax advisory — designed to optimize profitability, streamline cash flow, and ensure flawless compliance.
            </p>
            
            <div className="fs-hero-stats">
              <div className="fs-stat-box">
                <span className="fs-stat-num">100%</span>
                <span className="fs-stat-text">Accurate Bookkeeping</span>
              </div>
              <div className="fs-stat-box">
                <span className="fs-stat-num">Virtual CFO</span>
                <span className="fs-stat-text">Executive Guidance</span>
              </div>
              <div className="fs-stat-box">
                <span className="fs-stat-num">Full Spectrum</span>
                <span className="fs-stat-text">Tax & Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABBED SERVICES NAVIGATION */}
      <section className="fs-main-section">
        <div className="container">
          <div className="fs-tabs-header text-center mb-12">
            <h2 className="fs-section-title">Our Core Financial Practices</h2>
            <p className="fs-section-subtitle">Select a practice area to explore our structured services and deliverables</p>
            
            <div className="fs-tab-buttons">
              <button 
                className={`fs-tab-btn ${activeTab === 'bookkeeping' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookkeeping')}
              >
                <Calculator size={18} /> Bookkeeping & Accounting
              </button>
              <button 
                className={`fs-tab-btn ${activeTab === 'vcfo' ? 'active' : ''}`}
                onClick={() => setActiveTab('vcfo')}
              >
                <TrendingUp size={18} /> Virtual CFO Services
              </button>
              <button 
                className={`fs-tab-btn ${activeTab === 'taxation' ? 'active' : ''}`}
                onClick={() => setActiveTab('taxation')}
              >
                <FileText size={18} /> Taxation Services
              </button>
            </div>
          </div>

          {/* TAB 1 CONTENT: BOOKKEEPING & ACCOUNTING */}
          {activeTab === 'bookkeeping' && (
            <div className="fs-tab-content animate-fade-in">
              <div className="fs-feature-banner">
                <div className="fs-banner-text">
                  <span className="fs-banner-tag">Category 1</span>
                  <h3>Bookkeeping & Accounting</h3>
                  <p>
                    We provide reliable, professional bookkeeping services that keep your financial records accurate, organised and up to date — so you can focus on running your business.
                  </p>
                </div>
                <div className="fs-banner-img-box">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" 
                    alt="Bookkeeping and Accounting" 
                    className="fs-banner-img" 
                  />
                </div>
              </div>

              <div className="fs-services-heading text-center mt-12 mb-8">
                <h3>Our Bookkeeping Services</h3>
                <p>17 end-to-end accounting services tailored to your operational needs</p>
              </div>

              <div className="fs-bookkeeping-grid">
                {bookkeepingServices.map((service, index) => (
                  <div key={index} className="fs-bk-card">
                    <div className="fs-bk-num">{index + 1}</div>
                    <div className="fs-bk-text">{service}</div>
                    <CheckCircle2 size={18} className="fs-bk-check" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 CONTENT: VIRTUAL CFO SERVICES */}
          {activeTab === 'vcfo' && (
            <div className="fs-tab-content animate-fade-in">
              <div className="fs-feature-banner">
                <div className="fs-banner-text">
                  <span className="fs-banner-tag">Category 2</span>
                  <h3>Virtual CFO Services</h3>
                  <h4 className="fs-subheading-tagline">Strategic Financial Expertise. Without the Cost of a Full-Time CFO.</h4>
                  <p>
                    We provide flexible Virtual CFO services to help business owners gain better control over cash flow, profitability, financial performance and business decisions.
                  </p>
                </div>
                <div className="fs-banner-img-box">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                    alt="Virtual CFO Services" 
                    className="fs-banner-img" 
                  />
                </div>
              </div>

              <div className="fs-services-heading text-center mt-12 mb-8">
                <h3>Our Virtual CFO Core Pillars</h3>
                <p>Strategic financial guidance across 4 critical pillars</p>
              </div>

              <div className="fs-vcfo-grid">
                {virtualCfoServices.map((pillar, pIdx) => (
                  <div key={pIdx} className="fs-vcfo-card">
                    <div className="fs-vcfo-card-header">
                      <div className="fs-vcfo-icon">{pillar.icon}</div>
                      <h4>{pillar.title}</h4>
                    </div>
                    <ul className="fs-vcfo-list">
                      {pillar.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <CheckCircle2 size={16} className="fs-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3 CONTENT: TAXATION SERVICES */}
          {activeTab === 'taxation' && (
            <div className="fs-tab-content animate-fade-in">
              <div className="fs-feature-banner">
                <div className="fs-banner-text">
                  <span className="fs-banner-tag">Category 3</span>
                  <h3>Taxation Services</h3>
                  <p>
                    Comprehensive tax compliance, corporate tax filing, GST processing, tax planning, and audit representation tailored to keep your enterprise 100% compliant while minimizing tax liabilities.
                  </p>
                </div>
                <div className="fs-banner-img-box">
                  <img 
                    src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop" 
                    alt="Taxation Services" 
                    className="fs-banner-img" 
                  />
                </div>
              </div>

              <div className="fs-services-heading text-center mt-12 mb-8">
                <h3>Taxation & Compliance Practice</h3>
                <p>Proactive tax strategy and error-free compliance management</p>
              </div>

              <div className="fs-tax-grid">
                {taxationServices.map((tax, tIdx) => (
                  <div key={tIdx} className="fs-tax-card">
                    <div className="fs-tax-num">0{tIdx + 1}</div>
                    <h4>{tax.title}</h4>
                    <p>{tax.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CONTACT & ENQUIRIES SECTION */}
      <section className="fs-contact-section">
        <div className="container">
          <div className="fs-contact-card text-center">
            <h2 className="fs-contact-title">Need Financial Assistance or Virtual CFO Advisory?</h2>
            <p className="fs-contact-subtitle">
              For queries reach out at <strong>+91 8870006308</strong> or email <strong>support@blazetechsolutions.in</strong>
            </p>

            <div className="fs-contact-buttons">
              <a href="tel:+918870006308" className="fs-c-btn phone">
                <Phone size={20} /> Call 8870006308
              </a>
              <a href="https://wa.me/918870006308" target="_blank" rel="noopener noreferrer" className="fs-c-btn whatsapp">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
              <a href="mailto:support@blazetechsolutions.in" className="fs-c-btn email">
                <Mail size={20} /> Email Support
              </a>
            </div>

            <div className="fs-social-links mt-8">
              <span className="fs-social-label">Follow & Connect with us:</span>
              <div className="fs-social-icons">
                <a 
                  href="https://www.linkedin.com/in/blaze-tech-solutions-6505b140a" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="fs-social-icon linkedin" 
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} /> LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/jobhub.pro?stkn=MW81ZXI5MDRnemhqNQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="fs-social-icon instagram" 
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialServices;
