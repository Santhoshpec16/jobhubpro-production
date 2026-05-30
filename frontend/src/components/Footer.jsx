import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle } from 'lucide-react';
import './Footer.css';

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

const Footer = () => {
  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img src="/logo.svg" alt="Job Hub Pro Logo" style={{ height: '100px', objectFit: 'contain' }} />
            </Link>
            <p className="footer-desc text-muted">
              Empowering organizations with AI-driven intelligence and certified training ecosystems.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-heading">Partner</h4>
              <ul>
                <li><Link to="/intervista-ai">Intervista</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-heading">Support</h4>
              <ul>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/terms">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <ul className="contact-info" style={{ marginBottom: '1rem', listStyle: 'none', padding: 0 }}>
                <li>Email: <a href="mailto:support@jobhubpro.in">support@jobhubpro.in</a></li>
                <li>WhatsApp: <a href="https://wa.me/918870006308">+91 8870006308</a></li>
              </ul>
              <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.linkedin.com/in/job-hub-pro-ai-6505b140a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
                <a href="https://www.instagram.com/jobhub.pro/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright text-muted">
            &copy; 2026 Job Hub Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
