import React from 'react';
import { ArrowRight, CheckCircle2, BarChart2, Shield, Users, Briefcase, PlayCircle, Star, Zap, Award } from 'lucide-react';
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
            <span className="badge text-primary bg-secondary">Enterprise Workforce Solutions</span>
            <h1 className="hero-title">
              Empowering Hiring, Training & <span className="text-primary">Workforce Readiness</span> Through AI.
            </h1>
            <p className="hero-subtitle text-muted">
              Job Hub Pro connects certified trainers, organizations, HR teams, and job seekers through intelligent workforce solutions and AI-driven interview assessment.
            </p>
            <div className="hero-actions">
              <Link to="/intervista-ai"><Button icon={<ArrowRight size={18} />} iconPosition="right">Explore Intervista</Button></Link>
              <Link to="/become-a-trainer"><Button variant="outline">Join Trainer Network</Button></Link>
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

      {/* Unified Workforce Ecosystem */}
      <section className="ecosystem-section bg-white section-padding text-center">
        <div className="container">
          <h2 className="section-title">One Unified Workforce Ecosystem</h2>
          <p className="section-subtitle text-muted">
            From trainer onboarding and corporate learning solutions to AI-powered interview intelligence, Job Hub Pro creates a connected ecosystem for workforce readiness and hiring transformation.
          </p>
          <div className="ecosystem-icons">
            <div className="eco-item">
              <div className="eco-icon-wrapper bg-secondary text-primary"><Award size={28} /></div>
              <p>Certified Trainers</p>
            </div>
            <div className="eco-item">
              <div className="eco-icon-wrapper bg-secondary text-primary"><Briefcase size={28} /></div>
              <p>Organizations</p>
            </div>
            <div className="eco-item">
              <div className="eco-icon-wrapper bg-secondary text-primary"><Zap size={28} /></div>
              <p>Intervista AI</p>
            </div>
            <div className="eco-item">
              <div className="eco-icon-wrapper bg-secondary text-primary"><Shield size={28} /></div>
              <p>Workforce Readiness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-cards-section section-padding">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card bg-white">
              <div className="stat-icon text-primary bg-secondary"><Award size={24} /></div>
              <h3>15+ Years Expertise</h3>
              <p className="text-muted">Of industry & L&D excellence across diverse domains.</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-icon text-primary bg-secondary"><Zap size={24} /></div>
              <h3>AI Interview</h3>
              <p className="text-muted">Intelligent candidate assessment and deep analytics.</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-icon text-primary bg-secondary"><Users size={24} /></div>
              <h3>2k+ Global Trainers</h3>
              <p className="text-muted">A vetted ecosystem of certified subject matter experts.</p>
            </div>
            <div className="stat-card bg-white">
              <div className="stat-icon text-primary bg-secondary"><Zap size={24} /></div>
              <h3>Hiring Solutions</h3>
              <p className="text-muted">Accelerated workflows for modern workforce agility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redefining Workforce Readiness */}
      <section className="redefining-section bg-white section-padding">
        <div className="container redefining-container">
          <div className="redefining-image">
            <img src="/interview_image.png" alt="Interview process" />
          </div>
          <div className="redefining-content">
            <h2 className="section-title">Redefining Workforce Readiness</h2>
            <p className="text-muted mb-6">
              Job Hub Pro bridges the gap between talent and industry expectations through a people-first, tech-forward ecosystem. Combining AI innovation with learning and workforce expertise, we help organizations, trainers, and job seekers accelerate growth and hiring readiness.
            </p>
            <div className="redefining-stats">
              <div>
                <h3 className="text-primary text-3xl">98%</h3>
                <p className="text-muted">Satisfaction Rate</p>
              </div>
              <div>
                <h3 className="text-primary text-3xl">40%</h3>
                <p className="text-muted">Hiring Acceleration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="pillars-section section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Strategic Pillars</h2>
            <p className="section-subtitle text-muted">A two-pronged approach to human capital management, blending expert training with AI-driven intelligence.</p>
          </div>
          <div className="pillars-grid">
            <div className="pillar-card bg-white">
              <span className="badge text-primary bg-secondary">Network Ecosystem</span>
              <h3 className="pillar-title">Trainer Network Ecosystem</h3>
              <p className="text-muted mb-6">A professional ecosystem connecting certified trainers with organizations seeking industry-ready workforce training solutions.</p>
              <ul className="feature-list mb-8">
                <li><CheckCircle2 size={18} className="text-primary" /> Trainer onboarding & empanelment</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Certification verification workflows</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Corporate trainer sourcing</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Freelance training opportunities</li>
              </ul>
              <div className="pillar-image-container">
                <img src="/dashboard_mockup.png" alt="Trainer Network" />
              </div>
              <div className="pillar-actions">
                <Link to="/become-a-trainer"><Button className="w-full">Join as Trainer</Button></Link>
                <Link to="/hire-trainers"><Button variant="outline" className="w-full">Request a Trainer</Button></Link>
              </div>
            </div>
            
            <div className="pillar-card bg-white">
              <span className="badge text-primary bg-secondary">AI Platform</span>
              <h3 className="pillar-title">Intervista AI Platform</h3>
              <p className="text-muted mb-6">An AI-powered interview intelligence platform designed to accelerate hiring, improve candidate evaluation, and enhance interview readiness.</p>
              <ul className="feature-list mb-8">
                <li><CheckCircle2 size={18} className="text-primary" /> AI interview assessment</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Candidate analytics & scoring</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Mock interview simulation</li>
                <li><CheckCircle2 size={18} className="text-primary" /> Hiring acceleration workflows</li>
              </ul>
              <div className="pillar-image-container">
                <img src="/dashboard_mockup.png" alt="Intervista AI Platform" />
              </div>
              <div className="pillar-actions">
                <Link to="/intervista-ai"><Button className="w-full">Launch Intervista</Button></Link>
                <Link to="/intervista-ai"><Button variant="outline" className="w-full">Book Demo</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta section-padding">
        <div className="container">
          <div className="cta-box">
            <h2>Start Building a Smarter Workforce Ecosystem Today.</h2>
            <div className="cta-actions">
              <Link to="/become-a-trainer"><Button variant="secondary">Become a Trainer</Button></Link>
              <Link to="/hire-trainers"><Button variant="secondary">Partner With Us</Button></Link>
              <Link to="/intervista-ai"><Button style={{backgroundColor: '#0f172a'}}>Explore Intervista</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
