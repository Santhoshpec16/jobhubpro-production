import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Intervista AI', path: '/intervista-ai' },
    { name: 'L&D Partnership', path: '/#ld-partnership' },
    { 
      name: 'For Enterprises', 
      path: '#',
      dropdown: [
        { name: 'Talent Empowerment & Sourcing', path: '/recruit-talent' },
        { name: 'On-Demand Trainer Marketplace', path: '/hire-trainers' }
      ]
    },
    { name: 'Trainer Ecosystem', path: '/#trainer-community' }
  ];

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.nav-dropdown-wrapper')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.svg" alt="Job Hub Pro Logo" style={{ height: '60px', objectFit: 'contain', transform: 'scale(1.6)', transformOrigin: 'left center' }} />
          </Link>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.name} className="nav-dropdown-wrapper">
                  <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`nav-link dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
                    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
                  >
                    {link.name} <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>
                  <div className={`nav-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                    {link.dropdown.map((subLink) => (
                      <Link 
                        key={subLink.name} 
                        to={subLink.path} 
                        className="dropdown-item"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            if (link.external) {
              return (
                <a 
                  key={link.name} 
                  href={link.path} 
                  className="nav-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
