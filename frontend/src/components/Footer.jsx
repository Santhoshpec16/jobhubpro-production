import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Share2, Camera } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-light">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.svg" alt="Job Hub Pro Logo" style={{ height: '80px', objectFit: 'contain' }} />
            </Link>
            <p className="footer-desc text-muted">
              Empowering organizations with AI-driven intelligence and certified training ecosystems.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-heading">Platform</h4>
              <ul>
                <li><Link to="/intervista-ai">Intervista AI</Link></li>
                <li><Link to="/become-a-trainer">Trainer Portal</Link></li>
                <li><Link to="/hire-trainers">Enterprise Solutions</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-heading">Support</h4>
              <ul>
                <li><Link to="#">Help Center</Link></li>
                <li><Link to="#">Terms of Service</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <div className="social-links">
                <a href="#" aria-label="Twitter"><MessageCircle size={20} /></a>
                <a href="#" aria-label="LinkedIn"><Share2 size={20} /></a>
                <a href="#" aria-label="Instagram"><Camera size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright text-muted">
            &copy; 2026 Job Hub Pro. All rights reserved.
          </p>
          <div className="footer-bottom-links text-muted">
            <Link to="#">Privacy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
