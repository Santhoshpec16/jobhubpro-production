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

          <div className="solutions-grid animate-fade-in" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {/* Card 1: Training Solutions */}
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

            {/* Card 2: Financial Services */}
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

            {/* Card 3: Talent Acquisition & Recruitment */}
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

            {/* Card 4: Trainer Ecosystem */}
            <div className="solution-card premium-card text-center" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="small-tag text-primary">Trainer Network</span>
                <h3 className="card-title-lg mb-3" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Trainer Ecosystem</h3>
                <p className="card-description-text text-muted mb-6" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Connect with verified corporate trainers, domain experts, and learning facilitators for enterprise upskilling.
                </p>
              </div>
              <div className="card-action-wrapper">
                <a href="#trainer-community" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Join Trainer Community
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 3 — TRAINER COMMUNITY CTA */}
      <section id="trainer-community" className="trainer-community-section section-padding">
        <div className="container">
          <div className="community-banner animate-fade-in">
            <div className="banner-content">
              <span className="badge text-white bg-glass-badge">Trainer Ecosystem</span>
              <h2 className="banner-title text-white">Join Our Global Trainer Community</h2>
              <p className="banner-description text-light">
                Become part of a growing ecosystem of trainers, facilitators, industry professionals, and learning leaders. Participate in networking opportunities, industry discussions, collaborative learning initiatives, trainer development programs, and enterprise training opportunities. Stay connected with the latest updates in corporate training, workforce transformation, and learning innovation.
              </p>
              <div className="banner-divider"></div>
              <div className="banner-features-grid">
                <div className="banner-feature-item">
                  <Users size={20} className="feature-icon" />
                  <span>Networking Opportunities</span>
                </div>
                <div className="banner-feature-item">
                  <Handshake size={20} className="feature-icon" />
                  <span>Training Collaborations</span>
                </div>
                <div className="banner-feature-item">
                  <MessageCircle size={20} className="feature-icon" />
                  <span>Industry Discussions</span>
                </div>
                <div className="banner-feature-item">
                  <Eye size={20} className="feature-icon" />
                  <span>Professional Visibility</span>
                </div>
                <div className="banner-feature-item">
                  <BookOpen size={20} className="feature-icon" />
                  <span>Learning Initiatives</span>
                </div>
              </div>
              <div className="banner-actions">
                {/* Added the original community link */}
                <a href="https://chat.whatsapp.com/IJU8PHmtyxwKrRixnFD95S" target="_blank" rel="noopener noreferrer" className="community-btn-link">
                  <Button size="lg" className="community-btn group" icon={<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Join WhatsApp Community
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
