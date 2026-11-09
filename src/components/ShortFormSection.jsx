import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Plus, Upload, Check, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import { INITIAL_SHORT_FORM_WORKS } from '../data/userVideos';
import './ShortFormSection.css';

// Automatically sanitize public directory paths if entered with 'public/'
const cleanMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('public/')) return '/' + url.replace(/^public\//, '');
  if (url.startsWith('/public/')) return '/' + url.replace(/^\/public\//, '');
  return url;
};

export default function ShortFormSection({ onSelectProject }) {
  const [works, setWorks] = useState(INITIAL_SHORT_FORM_WORKS);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [inlinePlayingId, setInlinePlayingId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [targetReplaceId, setTargetReplaceId] = useState(null);
  const [uploadNotice, setUploadNotice] = useState(null);

  // Trigger entrance animation on scroll into view
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

  const handleCardHover = (id) => {
    setActiveVideoId(id);
    cinematicAudio.playTactileTick(900);
  };

  // Toggle inline play or open modal
  const handlePlayCard = (e, reel) => {
    e.stopPropagation();
    if (onSelectProject) {
      onSelectProject(reel);
      cinematicAudio.playTactileTick(1200);
    }
  };

  // Trigger custom video file upload
  const triggerUpload = (e, reelId) => {
    e.stopPropagation();
    setTargetReplaceId(reelId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle local user video upload
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
              poster: '' // clear fallback poster so video plays immediately
            }
          : item
      )
    );

    setUploadNotice(`Loaded "${file.name}" live!`);
    cinematicAudio.playTactileTick(1400);
    setTimeout(() => setUploadNotice(null), 4000);
  };

  return (
    <section className="exact-shortform-section" id="short-form" ref={sectionRef}>
      {/* Hidden file input for adding user's own video */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="video/mp4,video/quicktime,video/webm" 
        style={{ display: 'none' }} 
      />

      <div className="exact-shortform-container">
        
        {/* Upload Notification Toast */}
        {uploadNotice && (
          <div className="upload-toast">
            <Check size={16} />
            <span>{uploadNotice}</span>
          </div>
        )}

        {/* Section Head matching the dark landing page atmosphere */}
        <div className={`exact-section-head ${isVisible ? 'fade-in-up' : 'pre-fade'}`}>
          <div className="section-eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">SCENE 02 // 9:16 VERTICAL DOMINANCE</span>
          </div>

          <div className="section-title-row">
            <h2 className="exact-section-title">Short-form Content edit</h2>
            
            <div className="title-action-pill" title="Click any card's + icon to swap with your own MP4!">
              <Sparkles size={14} className="neon-icon" />
              <span>CUSTOM VIDEOS READY</span>
            </div>
          </div>
        </div>

        {/* 4 Vertical 9:16 Cards Grid with staggered entrance animation */}
        <div className="exact-reels-grid">
          {works.map((reel, index) => {
            const isHovered = activeVideoId === reel.id;

            return (
              <div 
                key={reel.id} 
                className={`exact-reel-card ${isVisible ? 'card-enter' : 'card-pre-enter'}`}
                style={{ animationDelay: `${index * 0.12}s` }}
                onMouseEnter={() => handleCardHover(reel.id)}
                onMouseLeave={() => setActiveVideoId(null)}
                onClick={() => onSelectProject && onSelectProject(reel)}
                title="Click to play in Full Cinematic Theater"
              >
                {/* 9:16 Vertical Media Container */}
                <div className="exact-reel-media">
                  {reel.poster && (
                    <img 
                      src={cleanMediaUrl(reel.poster)} 
                      alt={reel.title} 
                      className={`exact-reel-img ${isHovered ? 'hover-zoom' : ''}`}
                      loading="lazy"
                    />
                  )}

                  {/* Video loop preview on hover */}
                  <video 
                    src={cleanMediaUrl(reel.video)} 
                    muted 
                    loop 
                    playsInline 
                    autoPlay 
                    className={`exact-reel-video ${isHovered || !reel.poster ? 'active' : ''}`}
                  />

                  {/* Deep dark cinematic vignette overlay */}
                  <div className="exact-reel-vignette" />

                  {/* Play Button HUD (Click to Play Video) */}
                  <div 
                    className={`exact-reel-play-btn ${isHovered ? 'visible' : ''}`}
                    onClick={(e) => handlePlayCard(e, reel)}
                  >
                    <div className="exact-play-circle" title="Play Fullscreen Video">
                      <Play size={24} fill="#B6FF00" color="#B6FF00" />
                    </div>
                  </div>

                  {/* Duration & Views Badges */}
                  <div className="exact-reel-badges">
                    <span className="exact-views-chip">{reel.views}</span>
                    <span className="exact-dur-chip">{reel.duration}</span>
                  </div>

                  {/* "Add Your Video" Quick Button */}
                  <button 
                    className="custom-upload-pill"
                    onClick={(e) => triggerUpload(e, reel.id)}
                    title="Replace this card with your own MP4 video from your computer!"
                  >
                    <Upload size={12} />
                    <span>SWAP VIDEO</span>
                  </button>

                  {/* Bottom Meta Overlay */}
                  <div className="exact-reel-caption">
                    <span className="exact-caption-cat">{reel.category}</span>
                    <h3 className="exact-caption-name">{reel.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
