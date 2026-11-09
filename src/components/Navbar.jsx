import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './Navbar.css';

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const active = cinematicAudio.toggle();
    setIsAudioPlaying(active);
  };

  const navLinks = [
    { label: 'WORKS', href: '#works' },
    { label: 'SHOWREEL', href: '#showreel' },
    { label: 'ABOUT & STACK', href: '#about' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    cinematicAudio.playTactileTick(900);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo / Studio Mark */}
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="logo-glitch">SYNTH</span>
            <span className="logo-accent">.FILMS</span>
            <div className="status-pill">
              <span className="status-dot"></span>
              <span className="status-text">AI DIR</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-item"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="nav-item-num">0{navLinks.indexOf(link) + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="nav-actions">
            {/* Audio Ambiance Toggle */}
            <button 
              className={`audio-toggle-btn ${isAudioPlaying ? 'active' : ''}`}
              onClick={toggleAudio}
              title={isAudioPlaying ? "Mute Atmospheric Drone" : "Enable Cinematic Drone Ambiance"}
              aria-label="Toggle cinematic audio"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 size={16} className="audio-icon" />
                  <span className="audio-waves">
                    <span className="wave-bar b1"></span>
                    <span className="wave-bar b2"></span>
                    <span className="wave-bar b3"></span>
                  </span>
                  <span className="audio-label">ATMOSPHERE ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={16} className="audio-icon muted" />
                  <span className="audio-label">SOUND FX</span>
                </>
              )}
            </button>

            {/* CTA Button */}
            <button 
              className="nav-cta-btn"
              onClick={() => {
                cinematicAudio.playTactileTick(1200);
                onOpenContact();
              }}
            >
              <span>INITIATE PROJECT</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-links">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="mobile-num">/0{i + 1}</span>
                <span className="mobile-text">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="mobile-drawer-bottom">
            <button 
              className="btn-neon full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
            >
              <span>START COLLABORATION</span>
              <ArrowUpRight size={18} />
            </button>
            <div className="mobile-footer-meta">
              <span>AVAILABLE FOR WORLDWIDE COMMISSIONS</span>
              <span>GEN-AI // VIRTUAL PRODUCTION // EDITORIAL</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

