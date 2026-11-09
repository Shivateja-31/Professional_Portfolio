import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './Showreel.css';

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    cinematicAudio.playTactileTick(900);
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="showreel-section" id="showreel">
      <div className="container">
        <div className="showreel-header">
          <div className="editorial-label">FEATURE FILM CUT</div>
          <h2 className="section-headline">
            DIRECTOR&apos;S <span className="text-neon">SHOWREEL 2025</span>
          </h2>
          <p className="showreel-sub">
            A high-octane 90-second montage blending Runway Gen-3 Alpha, Kling AI, Midjourney v6, and commercial hybrid VFX.
          </p>
        </div>

        {/* Widescreen 21:9 Cinema Theater Container */}
        <div className="theater-frame">
          <div className="theater-ambient-glow" />

          <div className="theater-screen" onClick={togglePlay}>
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-at-night-42861-large.mp4"
              poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85"
              loop
              playsInline
              muted={isMuted}
              className="theater-video"
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="theater-play-overlay">
                <button className="theater-play-btn" onClick={togglePlay} aria-label="Play showreel">
                  <Play size={32} fill="#B6FF00" color="#B6FF00" />
                </button>
                <div className="play-pulse-ring" />
                <span className="play-overlay-text">EXPERIENCE SHOWREEL</span>
              </div>
            )}

            {/* HUD Technical Info Overlay */}
            <div className="theater-hud-top">
              <span className="hud-badge">● REC [4K UHD]</span>
              <span className="hud-badge">23.976 FPS // ACEScc</span>
            </div>

            {/* Bottom HUD Controls */}
            <div className="theater-hud-bottom" onClick={(e) => e.stopPropagation()}>
              <div className="hud-left">
                <button className="hud-ctrl-btn" onClick={togglePlay}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button className="hud-ctrl-btn" onClick={toggleMute}>
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <span className="hud-time">00:01:30 // 00:01:30</span>
              </div>

              <div className="hud-right">
                <button className="hud-ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Theater Bottom Status Tape */}
          <div className="theater-tape">
            <span>TC: 01:00:24:12</span>
            <span>CODEC: PRORES 4444 XQ</span>
            <span>GAMMA: ARRI LOG-C / ACES</span>
            <span>SOUND: 7.1 CINEMATIC DOLBY ATMOS MIX</span>
          </div>
        </div>
      </div>
    </section>
  );
}

