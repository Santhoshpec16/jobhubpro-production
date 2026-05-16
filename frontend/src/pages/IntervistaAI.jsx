import React from 'react';
import { PlayCircle, CheckCircle2, BarChart, Target, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './IntervistaAI.css';

const IntervistaAI = () => {
  return (
    <div className="intervista-page">
      {/* Hero Section */}
      <section className="intervista-hero section-padding">
        <div className="container int-hero-container">
          <div className="int-hero-content animate-fade-in">
            <span className="badge text-primary bg-secondary" style={{ backgroundColor: '#ffedd5' }}>Next-Gen Interviewing</span>
            <h1 className="int-hero-title">
              Meet Intervista — <br/>
              <span className="text-primary">AI-Powered</span><br/>
              Interview Intelligence
            </h1>
            <p className="int-hero-desc text-muted mb-8">
              Transform your assessment process with deep behavioral analytics, automated screening, and data-driven candidate match-scoring.
            </p>
            <div className="int-hero-actions mb-12">
              <Link to="/intervista-ai"><Button icon={<span style={{fontSize: '18px'}}>✨</span>} iconPosition="right">Launch Intervista</Button></Link>
              <Link to="/intervista-ai"><Button variant="outline" icon={<PlayCircle size={18} />} iconPosition="right">Book Demo</Button></Link>
            </div>
            
            <div className="trusted-by">
              <p className="trusted-text text-muted">TRUSTED BY</p>
              <div className="trusted-logos">
                <div className="logo-placeholder"></div>
                <div className="logo-placeholder"></div>
                <div className="logo-placeholder"></div>
              </div>
            </div>
          </div>
          
          <div className="int-hero-image">
            <img src="/dashboard_mockup.png" alt="Intervista AI Dashboard" className="floating-animation" />
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="who-its-for section-padding bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Who It's For</h2>
            <p className="section-subtitle text-muted">Tailored intelligence solutions for every stage of the talent journey.</p>
          </div>
          
          <div className="target-cards-grid">
            <div className="target-card bg-white" style={{ borderTop: '4px solid var(--primary)' }}>
              <div className="target-icon bg-secondary text-primary"><Users size={24} /></div>
              <h3>For Organizations</h3>
              <ul className="target-features mb-8">
                <li><CheckCircle2 size={18} className="text-primary" /> Automated high-volume screening with AI scoring</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Unbiased behavioral & technical analytics</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Enterprise-wide interview standardisation</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Real-time candidate sentiment analysis</li>
              </ul>
              <Link to="/hire-trainers"><Button className="w-full" icon={<ArrowRight size={18} />} iconPosition="right">Explore Hiring Solutions</Button></Link>
            </div>

            <div className="target-card bg-white" style={{ borderTop: '4px solid #cbd5e1' }}>
              <div className="target-icon bg-light text-muted"><Target size={24} /></div>
              <h3>For Job Seekers</h3>
              <ul className="target-features mb-8">
                <li><CheckCircle2 size={18} className="text-muted" /> Practice with AI-powered mock interviews</li>
                <li><CheckCircle2 size={18} className="text-muted" /> Instant detailed feedback on performance</li>
                <li><CheckCircle2 size={18} className="text-muted" /> Behavioral coaching & score tracking</li>
                <li><CheckCircle2 size={18} className="text-muted" /> Industry-specific interview simulations</li>
              </ul>
              <Link to="/intervista-ai"><Button variant="outline" className="w-full text-muted" style={{ borderColor: '#cbd5e1' }} icon={<ArrowRight size={18} />} iconPosition="right">Practice Mock Interviews</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="int-stats-section section-padding bg-light">
        <div className="container">
          <div className="int-stats-grid">
            <div className="int-stat-item bg-white">
              <div className="stat-icon-small text-primary"><Target size={20} /></div>
              <h3 className="stat-number">1.2M+</h3>
              <p className="stat-label">INTERVIEWS ANALYZED</p>
            </div>
            <div className="int-stat-item bg-white">
              <div className="stat-icon-small text-primary"><BarChart size={20} /></div>
              <h3 className="stat-number">99.8%</h3>
              <p className="stat-label">ACCURACY RATE</p>
            </div>
            <div className="int-stat-item bg-white">
              <div className="stat-icon-small text-primary"><Clock size={20} /></div>
              <h3 className="stat-number">65%</h3>
              <p className="stat-label">TIME SAVED</p>
            </div>
            <div className="int-stat-item bg-white">
              <div className="stat-icon-small text-primary"><Users size={20} /></div>
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">VERIFIED TRAINERS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="int-cta-section section-padding bg-light">
        <div className="container">
          <div className="int-cta-box bg-dark">
            <h2>Ready to Experience AI-Powered<br/>Interview Assessment?</h2>
            <p className="int-cta-desc">
              Join thousands of companies and professionals using Intervista to redefine the standard of modern interviewing.
            </p>
            <div className="int-cta-actions">
              <Link to="/intervista-ai"><Button>Launch Intervista Now</Button></Link>
              <div className="int-cta-socialProof">
                <div className="avatars-small">
                  <div className="avatar-sm bg-muted"></div>
                  <div className="avatar-sm bg-muted"></div>
                  <div className="avatar-sm bg-muted"></div>
                </div>
                <span className="text-muted italic text-sm">Already used by top talent teams</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntervistaAI;
