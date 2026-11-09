import React, { useState, useRef, useEffect } from 'react';
import { Play, Sparkles, ArrowUpRight, Mail, Upload, Check } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import { INITIAL_LONG_FORM_WORKS } from '../data/userVideos';
import './LongFormSection.css';

// Automatically sanitize public directory paths if entered with 'public/'
const cleanMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('public/')) return '/' + url.replace(/^public\//, '');
  if (url.startsWith('/public/')) return '/' + url.replace(/^\/public\//, '');
  return url;
};

// Instagram Icon component
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function LongFormSection({ onSelectProject }) {
  const [works, setWorks] = useState(INITIAL_LONG_FORM_WORKS);
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [targetReplaceId, setTargetReplaceId] = useState(null);
  const [uploadNotice, setUploadNotice] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleHover = (id) => {
    setActiveId(id);
    cinematicAudio.playTactileTick(900);
  };

  const handlePlayCard = (e, work) => {
    e.stopPropagation();
    if (onSelectProject) {
      onSelectProject(work);
      cinematicAudio.playTactileTick(1200);
    }
  };

  const triggerUpload = (e, workId) => {
    e.stopPropagation();
    setTargetReplaceId(workId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '');

    setWorks((prev) =>
      prev.map((item) =>
        item.id === targetReplaceId
          ? {
              ...item,
              title: fileName || item.title,
              video: localUrl,
              poster: ''
            }
          : item
      )
    );

    setUploadNotice(`Loaded "${file.name}" live!`);
    cinematicAudio.playTactileTick(1400);
    setTimeout(() => setUploadNotice(null), 4000);
  };

  return (
    <section className="exact-longform-section" id="long-form" ref={sectionRef}>
      {/* Hidden file input for uploading user's own film */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/mp4,video/quicktime,video/webm" 
        style={{ display: 'none' }} 
      />

      {/* Upload Notification Toast */}
      {uploadNotice && (
        <div className="upload-toast">
          <Check size={16} />
          <span>{uploadNotice}</span>
        </div>
      )}

      <div className="exact-longform-container">
        
        {/* Section Head matching the dark landing page atmosphere */}
        <div className={`exact-section-head ${isVisible ? 'fade-in-up' : 'pre-fade'}`}>
          <div className="section-eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">SCENE 03 // 16:9 WIDESCREEN CINEMA</span>
          </div>

          <div className="section-title-row">
            <h2 className="exact-section-title">Long-form Content edit</h2>
            
            <div className="title-action-pill" title="Click SWAP FILM to load your own video cut!">
              <Sparkles size={14} className="neon-icon" />
              <span>16:9 EDITORIAL WORKS</span>
            </div>
          </div>
        </div>

        {/* 2x2 Widescreen 16:9 Grid with staggered entrance animation */}
        <div className="exact-widescreen-grid">
          {works.map((work, index) => {
            const isHovered = activeId === work.id;

            return (
              <div 
                key={work.id}
                className={`exact-widescreen-card ${isVisible ? 'card-enter' : 'card-pre-enter'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => handleHover(work.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => onSelectProject && onSelectProject(work)}
                title="Click to play in Full Cinematic Theater"
              >
                {/* 16:9 Media Container */}
                <div className="exact-widescreen-media">
                  {work.poster && (
                    <img 
                      src={cleanMediaUrl(work.poster)} 
                      alt={work.title} 
                      className={`exact-widescreen-img ${isHovered ? 'hover-zoom' : ''}`}
                      loading="lazy"
                    />
                  )}
                  <video 
                    src={cleanMediaUrl(work.video)} 
                    muted 
                    loop 
                    playsInline 
                    autoPlay 
                    className={`exact-widescreen-video ${isHovered || !work.poster ? 'active' : ''}`}
                  />
                  
                  {/* Subtle cinema vignette */}
                  <div className="exact-widescreen-vignette" />

                  {/* Play HUD */}
                  <div 
                    className={`exact-widescreen-play-hud ${isHovered ? 'visible' : ''}`}
                    onClick={(e) => handlePlayCard(e, work)}
                  >
                    <div className="exact-play-circle" title="Play Fullscreen Video">
                      <Play size={26} fill="#B6FF00" color="#B6FF00" />
                    </div>
                  </div>

                  {/* Runtime & Aspect Tags */}
                  <div className="exact-widescreen-badges">
                    <span className="exact-dur-chip">{work.aspect}</span>
                    <span className="exact-dur-chip">{work.runtime}</span>
                  </div>

                  {/* Swap Video Button */}
                  <button 
                    className="custom-upload-pill widescreen-upload-pill"
                    onClick={(e) => triggerUpload(e, work.id)}
                    title="Replace this widescreen cut with your own MP4 from your computer!"
                  >
                    <Upload size={12} />
                    <span>SWAP FILM</span>
                  </button>

                  {/* Bottom Title Bar on Card */}
                  <div className="exact-widescreen-caption">
                    <span className="exact-caption-cat">{work.category}</span>
                    <div className="exact-caption-title-row">
                      <h3 className="exact-caption-name">{work.title}</h3>
                      <ArrowUpRight size={18} className="exact-arrow-icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Outro & Collaboration Section matching dark landing page luxury theme */}
      <div className="exact-outro-section">
        <div className="exact-outro-container">
          
          {/* Centered Glowing Instagram Star Logo */}
          <div className="exact-outro-logo-box">
            <div className="exact-ig-glow-ring">
              <InstagramIcon size={38} />
            </div>
          </div>

          <h3 className="exact-outro-headline">HAVE AN IDEA? LET&apos;S MAKE IT VISUAL.</h3>
          <p className="exact-outro-sub">
            Blending artificial intelligence, kinetic motion graphics, and cinematic storytelling to transform footage into extraordinary visual experiences.
          </p>

          <div className="exact-outro-actions">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="exact-outro-ig-btn"
            >
              <InstagramIcon size={18} />
              <span>INSTAGRAM</span>
            </a>

            <a href="mailto:shiva@aivideo.film" className="exact-outro-email-btn">
              <Mail size={16} />
              <span>INITIATE PROJECT</span>
            </a>
          </div>

          <div className="exact-footer-tagline">
            <span>SHIVA // AI VIDEO EDITOR &amp; VISUAL STORYTELLER</span>
          </div>

        </div>
      </div>
    </section>
  );
}
