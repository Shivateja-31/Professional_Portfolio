import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, Clock, Layers, AlertCircle } from 'lucide-react';
import './ProjectModal.css';

const cleanMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('public/')) return '/' + url.replace(/^public\//, '');
  if (url.startsWith('/public/')) return '/' + url.replace(/^\/public\//, '');
  return url;
};

export default function ProjectModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const isVertical = Boolean(
    project?.aspect?.includes('9:16') ||
    project?.category?.toLowerCase().includes('reel') ||
    project?.category?.toLowerCase().includes('talking head') ||
    project?.id?.startsWith('sf-')
  );

  const videoSrc = cleanMediaUrl(project?.videoUrl || project?.video || '');
  const posterSrc = cleanMediaUrl(project?.posterUrl || project?.poster || '');

  // Auto-attempt playback when modal opens
  useEffect(() => {
    setHasError(false);
    setProgress(0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Attempt autoplay
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Autoplay deferred until user interaction:', err);
          // If unmuted autoplay fails, try muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              setIsPlaying(false);
            });
          }
        });
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Play error:', e));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleProgressSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = pct * (videoRef.current.duration || 1);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2800);
    }
  };

  if (!project) return null;

  const description = project.description || project.desc || "Cinematic visual narrative crafted with high-impact pacing, dynamic sound design, and custom color grading.";
  const tagline = project.tagline || (project.category ? `${project.category} crafted for maximum engagement` : "High retention visual storytelling");
  const tools = project.tools || project.tags || ['Premiere Pro', 'After Effects', 'Neural AI Workflows', 'Sound Design'];
  const deliverables = project.deliverables || ['Final 4K Master', 'Color Grading (ACES)', 'Kinetic Typography', 'Sound Design'];
  const displayRuntime = project.runtime || project.duration || '00:30';
  const displayAspect = project.aspect || (isVertical ? '9:16 Vertical Reel' : '16:9 Widescreen Cinema');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className={`modal-cinema-wrapper ${isVertical ? 'vertical-mode' : 'horizontal-mode'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="modal-head">
          <div className="modal-title-group">
            <span className="modal-badge">{project.category || 'AI Visual Story'}</span>
            <h2 className="modal-title">{project.title}</h2>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Video Cinema Player Stage */}
        <div 
          className={`modal-player-stage ${isVertical ? 'vertical-stage' : 'widescreen-stage'}`}
          onMouseMove={handleMouseMove}
        >
          {/* Ambient Blurred Backdrop for Vertical or Padded Videos */}
          {posterSrc && (
            <div 
              className="player-ambient-blur" 
              style={{ backgroundImage: `url(${posterSrc})` }} 
            />
          )}

          {/* Actual HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            playsInline
            loop
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={(e) => {
              console.error('Video load error:', e);
              setHasError(true);
            }}
            onClick={togglePlay}
            className={`cinema-video ${isVertical ? 'vertical-video-contain' : 'horizontal-video-contain'}`}
          />

          {/* Big Center Play Overlay (visible when paused so video is 100% visible when playing) */}
          <div 
            className={`center-play-overlay ${!isPlaying ? 'is-visible' : 'is-hidden'}`}
            onClick={togglePlay}
          >
            <div className="center-play-btn-circle" title="Click to Play">
              <Play size={36} fill="#B6FF00" color="#B6FF00" />
            </div>
          </div>

          {/* Error Notice Fallback if video failed to load */}
          {hasError && (
            <div className="video-error-fallback">
              <AlertCircle size={32} color="#FF5252" />
              <p>Unable to load video stream</p>
              <span className="error-path">{videoSrc}</span>
            </div>
          )}

          {/* On-video playback controls HUD */}
          <div className={`video-control-bar ${showControls || !isPlaying ? 'controls-shown' : 'controls-hidden'}`}>
            {/* Scrubber */}
            <div className="video-scrubber" onClick={handleProgressSeek}>
              <div className="scrubber-track">
                <div className="scrubber-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="video-buttons">
              <div className="control-left">
                <button className="ctrl-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="ctrl-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span className="video-timestamp">{displayRuntime} // {displayAspect}</span>
              </div>

              <div className="control-right">
                <button className="ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Editorial Breakdown & Specs */}
        <div className="modal-body-content">
          <div className="modal-overview-col">
            <h3 className="overview-heading">THE DIRECTORIAL VISION</h3>
            <p className="modal-description">{description}</p>
            <p className="modal-tagline">“{tagline}”</p>

            {/* Prompt Signature Snippet if provided */}
            {project.promptSnippet ? (
              <div className="prompt-spec-box">
                <div className="prompt-head">
                  <Sparkles size={14} className="prompt-icon" />
                  <span>NEURAL PROMPT SIGNATURE &amp; KEYFRAME SEED</span>
                </div>
                <code className="prompt-code">{project.promptSnippet}</code>
              </div>
            ) : (
              <div className="prompt-spec-box">
                <div className="prompt-head">
                  <Sparkles size={14} className="prompt-icon" />
                  <span>AI VIDEO WORKFLOW &amp; EDITING CRAFT</span>
                </div>
                <code className="prompt-code">Cinematic 4K // Speed-Ramped Flow // Custom Audio Design // Shiva Edits</code>
              </div>
            )}
          </div>

          {/* Right Specs Column */}
          <div className="modal-specs-col">
            <div className="spec-card">
              <span className="spec-label">
                <Film size={14} /> Pipeline &amp; Tools
              </span>
              <div className="spec-tags">
                {tools.map((t, i) => (
                  <span key={i} className="spec-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="spec-card">
              <span className="spec-label">
                <Layers size={14} /> Deliverables
              </span>
              <div className="spec-tags">
                {deliverables.map((d, i) => (
                  <span key={i} className="spec-tag">{d}</span>
                ))}
              </div>
            </div>

            <div className="spec-card">
              <span className="spec-label">
                <Clock size={14} /> Audience Engagement
              </span>
              <span className="spec-metric-value">{project.views || project.metrics || 'High Retention // 85%+'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
