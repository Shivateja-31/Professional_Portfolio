import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Sparkles, ArrowUp } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './Contact.css';

// Crisp bespoke SVG icons for social channels
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

export default function Contact({ isModalOpen, onCloseModal }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Cinematic Video',
    budget: '$5k - $15k',
    timeline: 'Within 1 Month',
    message: ''
  });

  const emailAddress = 'hello@aivideostoryteller.film';

  // Live Studio Timecode
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    cinematicAudio.playTactileTick(1200);
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    cinematicAudio.playTactileTick(1300);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      if (onCloseModal) onCloseModal();
    }, 3000);
  };

  const scrollToTop = () => {
    cinematicAudio.playTactileTick(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'INSTAGRAM', handle: '@aivideostoryteller', href: 'https://instagram.com', icon: InstagramIcon },
    { name: 'LINKEDIN', handle: '/in/aivideodirector', href: 'https://linkedin.com', icon: LinkedinIcon },
    { name: 'YOUTUBE', handle: '@aifilmstudio', href: 'https://youtube.com', icon: YoutubeIcon },
    { name: 'X / TWITTER', handle: '@aivideocraft', href: 'https://x.com', icon: TwitterIcon }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {/* Section Head */}
        <div className="contact-head">
          <div className="editorial-label">START A CONVERSATION</div>
          <h2 className="contact-headline">
            HAVE AN IDEA? <br />
            <span className="text-neon">LET&apos;S MAKE IT VISUAL.</span>
          </h2>
          <p className="contact-sub">
            Available for generative AI commercial direction, cinematic trailers, vertical fashion films, and creative editorial commissions worldwide.
          </p>
        </div>

        {/* Main Contact Card Grid */}
        <div className="contact-grid">
          {/* Direct Email Card */}
          <div className="contact-card email-card">
            <div className="card-micro-label">DIRECT INQUIRIES &amp; COMMISSIONS</div>
            <div className="email-display-row">
              <a href={`mailto:${emailAddress}`} className="email-link">
                {emailAddress}
              </a>
              <button 
                className={`copy-btn ${copiedEmail ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="card-separator" />

            {/* Status Box */}
            <div className="availability-box">
              <div className="avail-pulse" />
              <div className="avail-text-group">
                <span className="avail-title">CURRENT STATUS: ACCEPTING SELECT CLIENTS</span>
                <span className="avail-sub">Average project turnaround: 7 – 21 business days</span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Project Inquiry Form */}
          <div className="contact-card form-card">
            <div className="card-micro-label">PROJECT BRIEF &amp; COLLABORATION</div>

            {formSubmitted ? (
              <div className="form-success-state">
                <Sparkles size={32} className="success-icon" />
                <h3 className="success-title">TRANSMISSION RECEIVED</h3>
                <p className="success-desc">
                  Your project brief has been logged. I will review the narrative scope and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>YOUR NAME / BRAND</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alex Morgan / Acme Studios"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-field">
                    <label>DIRECT EMAIL</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="alex@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>PROJECT FORMAT</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    >
                      <option>AI Cinematic Video</option>
                      <option>Commercial Advertisement</option>
                      <option>Social Media Reel (9:16)</option>
                      <option>AI Narrative Short Film</option>
                      <option>Experimental Audiovisual</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>ESTIMATED BUDGET</label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option>$3,000 - $7,000</option>
                      <option>$7,000 - $15,000</option>
                      <option>$15,000 - $35,000</option>
                      <option>$35,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>TELL ME ABOUT YOUR STORY / VISION</label>
                  <textarea 
                    rows={3} 
                    required 
                    placeholder="Outline the concept, visual tone, deliverables, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-neon submit-btn">
                  <span>SEND COLLABORATION INQUIRY</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Social Channels Row */}
        <div className="socials-row">
          {socialLinks.map((item, i) => (
            <a 
              key={i} 
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-tile"
            >
              <div className="social-left">
                <item.icon size={18} className="social-icon" />
                <span className="social-name">{item.name}</span>
              </div>
              <div className="social-right">
                <span className="social-handle">{item.handle}</span>
                <ArrowUpRight size={15} className="social-arrow" />
              </div>
            </a>
          ))}
        </div>

        {/* Cinematic Editorial Footer */}
        <footer className="cinematic-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-title">SYNTH.FILMS</span>
              <span className="footer-caption">AI VIDEO EDITOR &amp; VISUAL STORYTELLER</span>
            </div>

            <div className="footer-clock">
              <span className="clock-label">STUDIO TIMECODE:</span>
              <span className="clock-value">{currentTime || '00:00:00 UTC'}</span>
            </div>

            <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
              <span>TOP OF REEL</span>
              <ArrowUp size={16} />
            </button>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED. CRAFTED FOR CINEMATIC EXCELLENCE.
            </div>
            <div className="footer-tech-stack">
              POWERED BY REACT • GSAP • WEB AUDIO • NEURAL RENDERING
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
