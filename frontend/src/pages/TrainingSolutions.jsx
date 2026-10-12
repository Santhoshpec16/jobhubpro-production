import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Award, 
  Building2, 
  Landmark, 
  Truck, 
  HeartPulse, 
  Cpu, 
  GraduationCap, 
  Phone, 
  MessageCircle, 
  Zap, 
  X,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './TrainingSolutions.css';

const TrainingSolutions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    requirements: ''
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

  const industries = [
    {
      name: "Manufacturing",
      desc: "Operational excellence, safety protocols, and technical capability building.",
      icon: <Building2 size={32} />
    },
    {
      name: "Finance and Insurance",
      desc: "Compliance, risk management, customer engagement, and financial technology upskilling.",
      icon: <Landmark size={32} />
    },
    {
      name: "Transportation and Logistics",
      desc: "Supply chain optimization, fleet management etiquette, and process efficiency.",
      icon: <Truck size={32} />
    },
    {
      name: "Healthcare and Medicine",
      desc: "Patient care communication, medical ethics, and specialized hospital staff training.",
      icon: <HeartPulse size={32} />
    },
    {
      name: "Information Technology (IT)",
      desc: "Cutting-edge software development, cloud architecture, AI integration, and Agile practices.",
      icon: <Cpu size={32} />
    },
    {
      name: "Educational Institutions",
      desc: "Faculty development, student employability, TTT certification, and pedagogy enhancement.",
      icon: <GraduationCap size={32} />
    }
  ];

  return (
    <div className="training-solutions-page">
      {/* 1. HERO SECTION */}
      <section className="ts-hero">
        <div className="container ts-hero-container">
          <div className="ts-hero-left">
            <span className="ts-hero-badge">Enterprise Learning Solutions</span>
            <h1 className="ts-hero-title">
              Corporate Training Programs to Elevate <span className="highlight-text">workforce potential</span>
            </h1>
            <ul className="ts-hero-list">
              <li><CheckCircle2 size={18} className="ts-hero-check" /> Employability & Spoken English Training</li>
              <li><CheckCircle2 size={18} className="ts-hero-check" /> Communication & Influence Workshops</li>
              <li><CheckCircle2 size={18} className="ts-hero-check" /> Culture & Behaviour Shifts</li>
              <li><CheckCircle2 size={18} className="ts-hero-check" /> Team Effectiveness Programs</li>
              <li><CheckCircle2 size={18} className="ts-hero-check" /> Professional & Technical Skills Upskilling</li>
            </ul>
            <div className="ts-hero-actions">
              <a href="#our-solutions" className="btn-primary-custom">
                Explore solutions <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR SOLUTIONS SECTION */}
      <section id="our-solutions" className="ts-solutions-section">
        <div className="container">
          <div className="ts-section-header text-center">
            <h2 className="ts-section-title">Our Solutions</h2>
            <p className="ts-section-subtitle">
              Targeted capability-building initiatives designed to solve real business challenges, enhance workplace productivity, and empower workforce readiness.
            </p>
          </div>

          <div className="ts-program-grid">
            {/* CARD 1: Leadership Training */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                  alt="Leadership Training"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Leadership Training</h3>
                <p className="ts-card-desc">
                  Empower frontline supervisors, mid-managers, and senior executives with visionary decision-making and strategic leadership competencies.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Executive presence & visionary decision making</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Performance management & people development</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Leading organizational change & agility</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Strategic thinking & conflict resolution</li>
                </ul>
              </div>
            </div>

            {/* CARD 2: Team Building */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Team Building"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Team Building</h3>
                <p className="ts-card-desc">
                  Foster trust, collaboration, high camaraderie, and cross-functional synergy through experiential team simulations.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> High-impact collaboration & trust dynamics</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Accountability, shared vision & ownership</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Experiential indoor & outdoor team activities</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Alignment with organisational culture</li>
                </ul>
              </div>
            </div>

            {/* CARD 3: Campus to Corporate */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                  alt="Campus to Corporate"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Campus to Corporate</h3>
                <p className="ts-card-desc">
                  Bridge the transition from academic life to enterprise workplaces, equipping young graduates with professional poise and etiquette.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Workplace professionalism & corporate etiquette</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Business communication & email protocols</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Time management, ownership & adaptability</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Collaborative team mindset in corporate settings</li>
                </ul>
              </div>
            </div>

            {/* CARD 4: Interview & Employability Skills */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
                  alt="Interview & Employability Skills"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Interview & Employability Skills</h3>
                <p className="ts-card-desc">
                  Comprehensive employability development covering aptitude, communication fluency, resume building, and proctored interview drills.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Technical & HR interview readiness drills</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Spoken English & Accent Neutralization</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Resume crafting & professional branding</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Group discussions & presentation confidence</li>
                </ul>
              </div>
            </div>

            {/* CARD 5: Communication & Influence */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
                  alt="Communication & Influence"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Communication & Influence</h3>
                <p className="ts-card-desc">
                  Build communication that is clear, credible, and persuasive across cross-functional enterprise setups.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Executive presence & persuasive storytelling</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Cross-functional client communication</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Difficult conversations & constructive feedback</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Influencing without authority</li>
                </ul>
              </div>
            </div>

            {/* CARD 6: Functional & Professional Skills */}
            <div className="ts-program-card">
              <div className="ts-card-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                  alt="Functional & Professional Skills"
                  className="ts-card-img"
                />
              </div>
              <div className="ts-card-body">
                <h3 className="ts-card-title">Functional & Professional Skills</h3>
                <p className="ts-card-desc">
                  Build practical capabilities that improve day-to-day execution and overall operational excellence.
                </p>
                <ul className="ts-card-bullets">
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Technical and domain-specific upskilling</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Problem-solving & structured critical thinking</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Process efficiency & digital productivity tools</li>
                  <li><CheckCircle2 size={16} className="ts-bullet-check" /> Role-based functional mastery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES WE SUPPORT (Creative Blocks without images) */}
      <section className="ts-industries-section">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge text-primary bg-secondary">Domain Specific Expertise</span>
            <h2 className="ts-section-title">Industries we support</h2>
            <p className="ts-section-subtitle">
              Delivering customized learning frameworks and domain-aligned training solutions tailored to specific industry demands.
            </p>
          </div>

          <div className="ts-industries-grid">
            {industries.map((ind, idx) => (
              <div key={idx} className="ts-industry-block">
                <div className="ts-industry-icon">{ind.icon}</div>
                <h3 className="ts-industry-name">{ind.name}</h3>
                <p className="ts-industry-desc">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY ORGANISATIONS CHOOSE BLAZE TECH SOLUTIONS */}
      <section className="ts-why-us-section">
        <div className="container">
          <div className="ts-why-grid">
            <div className="ts-why-content">
              <h2 className="ts-why-title">
                Why organisations choose <br />
                <span className="text-primary">Blaze Tech Solutions</span> as their learning partner
              </h2>
              <p className="ts-why-subtitle">
                We go beyond training delivery. We partner with you to build capability that drives measurable business outcomes. That's why our clients see us not as training providers, but as capability-building partners.
              </p>

              <div className="ts-why-steps">
                <div className="ts-why-step">
                  <div className="ts-step-number">1</div>
                  <div className="ts-step-info">
                    <h4>Customisation at the Core</h4>
                    <p>Every solution is tailored to organisational context, ensuring relevance and adoption.</p>
                  </div>
                </div>

                <div className="ts-why-step">
                  <div className="ts-step-number">2</div>
                  <div className="ts-step-info">
                    <h4>Outcome-Focused Approach</h4>
                    <p>Programs are designed with clear performance objectives, not just learning milestones.</p>
                  </div>
                </div>

                <div className="ts-why-step">
                  <div className="ts-step-number">3</div>
                  <div className="ts-step-info">
                    <h4>Experiential Learning</h4>
                    <p>Experiential methodology of training covering expert concepts.</p>
                  </div>
                </div>

                <div className="ts-why-step">
                  <div className="ts-step-number">4</div>
                  <div className="ts-step-info">
                    <h4>End to End training Service</h4>
                    <p>Training Analysis to Evaluation with Individual performance report.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ts-why-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Corporate Training Partner"
                className="ts-why-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT / ENQUIRIES BANNER */}

      {/* 7. CONTACT / ENQUIRIES BANNER */}
      <section className="ts-enquiry-banner">
        <div className="container text-center">
          <h2 className="ts-enquiry-title">Ready to Transform Your Workplace Learning?</h2>
          <p className="ts-enquiry-subtitle">
            For enquiries, call or WhatsApp us directly at
          </p>
          <div className="ts-enquiry-contact-box">
            <a href="tel:+918870006308" className="ts-enquiry-btn phone-btn">
              <Phone size={20} /> Call +91 8870006308
            </a>
            <a href="https://wa.me/918870006308" target="_blank" rel="noopener noreferrer" className="ts-enquiry-btn whatsapp-btn">
              <MessageCircle size={20} /> WhatsApp +91 8870006308
            </a>
          </div>
        </div>
      </section>

      {/* 8. ASSESSMENT MODAL */}
      {isModalOpen && (
        <div className="ts-modal-overlay">
          <div className="ts-modal-card">
            <button onClick={closeModal} className="ts-modal-close" aria-label="Close modal">
              <X size={24} />
            </button>

            {!formSubmitted ? (
              <>
                <h3 className="ts-modal-title">Assess Your Training Needs</h3>
                <p className="ts-modal-subtitle">Fill in your requirements and our L&D strategy experts will get back to you within 24 hours.</p>

                <form onSubmit={handleFormSubmit} className="ts-modal-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="form-control"
                      placeholder="e.g. Sarah Jenkins"
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
                      placeholder="e.g. sarah@company.com"
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
                    <label>Organization Name *</label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleFormChange}
                      className="form-control"
                      placeholder="e.g. Acme Corporation"
                    />
                  </div>

                  <div className="form-group">
                    <label>Training Requirements & Goals</label>
                    <textarea
                      name="requirements"
                      rows="3"
                      value={formData.requirements}
                      onChange={handleFormChange}
                      className="form-control"
                      placeholder="Briefly describe your team's training goals or workforce needs..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary-action w-full justify-center">
                    Submit Training Assessment Request <ArrowRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="ts-modal-success text-center">
                <div className="ts-success-circle">✓</div>
                <h3>Request Received!</h3>
                <p>Thank you for submitting your training requirements. A Blaze Tech Solutions L&D specialist will connect with you shortly.</p>
                <button onClick={closeModal} className="btn-primary-action mt-6">
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

export default TrainingSolutions;
