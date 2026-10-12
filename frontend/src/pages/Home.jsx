import React from 'react';
import { ArrowRight, CheckCircle2, BarChart2, Shield, Users, Briefcase, PlayCircle, Star, Zap, Award, Globe, TrendingUp, Handshake, MessageCircle, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <span className="badge text-primary bg-secondary">Enterprise Workforce & Financial Solutions</span>
            <h1 className="hero-title">
              Empowering Talent Acquisition, Training & <span className="text-primary">Financial Excellence</span>.
            </h1>
            <p className="hero-subtitle text-muted">
              Blaze Tech Solutions provides end-to-end corporate solutions — spanning AI-driven recruitment, customized training programs, bookkeeping & financial services, and an elite trainer ecosystem.
            </p>
            <div className="hero-actions">
              <Link to="/talent-acquisition"><Button icon={<ArrowRight size={18} />} iconPosition="right">Explore Talent Acquisition</Button></Link>
              <Link to="/training-solutions"><Button>Explore Training Solutions</Button></Link>
            </div>
            <div className="hero-stats">
              <div className="avatars">
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
              </div>
              <p className="stats-text text-muted">
                <strong>500+</strong> Enterprise Partners & <strong>2k+</strong> Certified Trainers
              </p>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src="/hero_image.png" alt="Professional using dashboard" className="hero-image" />
            <div className="floating-card top-right">
              <BarChart2 size={24} className="text-primary" />
              <div>
                <p className="card-title">Hiring Accuracy</p>
                <p className="card-value">98.5%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — BUSINESS SOLUTIONS */}
      <section className="business-solutions-section section-padding">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <span className="badge text-primary bg-secondary">Our Core Solutions</span>
            <h2 className="section-title">Comprehensive Enterprise Services & Solutions</h2>
            <p className="section-subtitle text-muted">
              Discover our core service pillars designed to power high-growth organizations — from high-volume recruitment and training programs to full-suite financial management and trainer partnerships.
            </p>
          </div>

          <div className="solutions-grid animate-fade-in" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Card 1: Talent Acquisition */}
            <div className="solution-card premium-card text-center" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="small-tag text-primary">Bulk & AI Sourcing</span>
                <h3 className="card-title-lg mb-3" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Talent Acquisition</h3>
                <p className="card-description-text text-muted mb-6" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  AI-powered candidate assessment, IT recruitment (freshers & experienced), and bulk hiring for BPO, Healthcare & Finance.
                </p>
              </div>
              <div className="card-action-wrapper">
                <Link to="/talent-acquisition" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    View Talent Acquisition
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2: Training Solutions */}
            <div className="solution-card premium-card text-center" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="small-tag text-primary">Workforce Development</span>
                <h3 className="card-title-lg mb-3" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Training Solutions</h3>
                <p className="card-description-text text-muted mb-6" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Tailored corporate training, Campus to Corporate programs, Employability, and sector-specific skill development.
                </p>
              </div>
              <div className="card-action-wrapper">
                <Link to="/training-solutions" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    View Training Solutions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3: Financial Services */}
            <div className="solution-card premium-card text-center" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="small-tag text-primary">Financial Advisory</span>
                <h3 className="card-title-lg mb-3" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Financial Services</h3>
                <p className="card-description-text text-muted mb-6" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  End-to-end Bookkeeping & Accounting, Virtual CFO strategic advisory, and Tax & Audit compliance.
                </p>
              </div>
              <div className="card-action-wrapper">
                <Link to="/financial-services" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    View Financial Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
