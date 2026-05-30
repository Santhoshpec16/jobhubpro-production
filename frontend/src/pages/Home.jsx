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
            <span className="badge text-primary bg-secondary">Enterprise Workforce Solutions</span>
            <h1 className="hero-title">
              Empowering Hiring, Training & <span className="text-primary">Workforce Readiness</span> Through AI.
            </h1>
            <p className="hero-subtitle text-muted">
              Job Hub Pro connects certified trainers, organizations, HR teams, and job seekers through intelligent workforce solutions and AI-driven interview assessment.
            </p>
            <div className="hero-actions">
              <Link to="/intervista-ai"><Button icon={<ArrowRight size={18} />} iconPosition="right">Explore Intervista</Button></Link>
              <Link to="/become-a-trainer"><Button>Join Trainer Network</Button></Link>
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
            <span className="badge text-primary bg-secondary">Business Solutions</span>
            <h2 className="section-title">Enterprise Workforce Solutions for Modern Businesses</h2>
            <p className="section-subtitle text-muted">
              Empowering organizations with AI-driven hiring intelligence, industry-ready talent sourcing, and enterprise training partnerships designed to accelerate workforce growth and operational excellence.
            </p>
          </div>

          <div className="solutions-grid animate-fade-in">
            {/* Card 1 */}
            <div className="solution-card premium-card">
              <div className="card-top">
                <span className="small-tag text-primary">Powered by Intervista AI</span>
                <h3 className="card-title-lg">AI-Driven Hiring Intelligence</h3>
              </div>
              <p className="card-description-text text-muted">
                Modernize your recruitment infrastructure with AI-assisted interview workflows, intelligent candidate assessments, and structured evaluation systems built for scalable hiring operations. Reduce manual screening effort, improve hiring efficiency, and gain deeper candidate insights through technology-enabled recruitment solutions tailored for modern enterprises.
              </p>
              <div className="card-divider"></div>
              <h4 className="list-heading">Highlights</h4>
              <ul className="card-list">
                <li><Zap size={16} className="text-primary icon-list-bullet" /> AI-Assisted Interviews</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Structured Candidate Evaluation</li>
                <li><Shield size={16} className="text-primary icon-list-bullet" /> Scalable Hiring Workflows</li>
                <li><BarChart2 size={16} className="text-primary icon-list-bullet" /> Recruitment Intelligence</li>
              </ul>
              <div className="card-action-wrapper">
                <Link to="/intervista-ai" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Explore Intervista AI
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="solution-card premium-card">
              <div className="card-top">
                <span className="small-tag text-primary">Talent Sourcing</span>
                <h3 className="card-title-lg">Talent Empowerment & Sourcing</h3>
              </div>
              <p className="card-description-text text-muted">
                We don’t just source candidates — we help businesses discover workforce-ready talent. Our talent empowerment model combines AI-enabled screening with expert-driven mentoring and evaluation processes to help organizations identify technically capable and professionally aligned candidates before they reach the final hiring stage.
              </p>
              <div className="card-divider"></div>
              <h4 className="list-heading">Benefits</h4>
              <ul className="card-list">
                <li><Award size={16} className="text-primary icon-list-bullet" /> Better Hiring Quality</li>
                <li><TrendingUp size={16} className="text-primary icon-list-bullet" /> Faster Recruitment Cycles</li>
                <li><Users size={16} className="text-primary icon-list-bullet" /> Industry-Ready Professionals</li>
                <li><Shield size={16} className="text-primary icon-list-bullet" /> Reduced Screening Overhead</li>
              </ul>
              <div className="card-action-wrapper">
                <Link to="/recruit-talent" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Recruit Talent
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="solution-card premium-card">
              <div className="card-top">
                <span className="small-tag text-primary">Trainer Ecosystem</span>
                <h3 className="card-title-lg">On-Demand Trainer Marketplace</h3>
              </div>
              <p className="card-description-text text-muted">
                Access experienced freelance and corporate trainers across technical, management, behavioral, and domain-specific learning areas through our enterprise-ready trainer ecosystem. Whether you need trainers for short-term workshops, corporate upskilling initiatives, or long-term learning programs, our network provides flexible training partnerships aligned to your organizational needs.
              </p>
              <div className="card-divider"></div>
              <h4 className="list-heading">Highlights</h4>
              <ul className="card-list">
                <li><Users size={16} className="text-primary icon-list-bullet" /> Verified Trainer Network</li>
                <li><Briefcase size={16} className="text-primary icon-list-bullet" /> Flexible Engagement Models</li>
                <li><Globe size={16} className="text-primary icon-list-bullet" /> Online & Offline Training</li>
                <li><Award size={16} className="text-primary icon-list-bullet" /> Corporate Upskilling Support</li>
              </ul>
              <div className="card-action-wrapper">
                <Link to="/hire-trainers" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Hire Trainers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — L&D PARTNERSHIPS */}
      <section id="ld-partnership" className="ld-partnerships-section section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge text-primary bg-secondary">Trainer Network Ecosystem</span>
            <h2 className="section-title">Build Stronger Learning & Development Ecosystems</h2>
            <p className="section-subtitle text-muted">
              Collaborate with certified trainers, industry experts, corporate facilitators, and L&D professionals to create impactful learning experiences and scalable workforce development initiatives.
            </p>
          </div>

          <div className="partnerships-grid">
            {/* Card 1 */}
            <div className="partnership-card premium-card">
              <div className="card-icon-header">
                <div className="card-header-icon bg-secondary text-primary">
                  <Users size={28} />
                </div>
              </div>
              <h3 className="card-title-lg">Expert Trainers</h3>
              <p className="card-description-text text-muted">
                Connect with experienced professionals specializing in technical training, leadership development, behavioral learning, workforce upskilling, and domain-specific corporate programs. Deliver engaging and outcome-driven learning experiences through trusted training experts.
              </p>
              <div className="card-divider"></div>
              <h4 className="list-heading">Expertise Areas</h4>
              <ul className="card-list columns-2">
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Technical Training</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Leadership Development</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Behavioral Learning</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Workforce Upskilling</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Corporate Learning Programs</li>
              </ul>
              <div className="card-action-wrapper mt-auto">
                <Link to="/become-a-trainer" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Join Freelance Pool
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="partnership-card premium-card">
              <div className="card-icon-header">
                <div className="card-header-icon bg-secondary text-primary">
                  <Award size={28} />
                </div>
              </div>
              <h3 className="card-title-lg">TTT Certification</h3>
              <p className="card-description-text text-muted">
                Enhance training quality through our structured Train-the-Trainer (TTT) certification initiatives focused on delivery excellence, learner engagement, communication effectiveness, instructional methodologies, and professional facilitation standards. Build trainers who are not only subject matter experts, but impactful learning facilitators.
              </p>
              <div className="card-divider"></div>
              <h4 className="list-heading">Certification Focus</h4>
              <ul className="card-list columns-2">
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Delivery Excellence</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Learner Engagement</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Communication Skills</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Facilitation Methodologies</li>
                <li><CheckCircle2 size={16} className="text-primary icon-list-bullet" /> Professional Training Standards</li>
              </ul>
              <div className="card-action-wrapper mt-auto">
                <Link to="/ttt-certification" className="w-full">
                  <Button className="w-full justify-center group" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />} iconPosition="right">
                    Explore Certification
                  </Button>
                </Link>
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
                <a href="https://chat.whatsapp.com/your-community-link" target="_blank" rel="noopener noreferrer" className="community-btn-link">
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
