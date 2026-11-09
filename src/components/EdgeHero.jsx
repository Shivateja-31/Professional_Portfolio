import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { RotateCcw, Volume2, VolumeX, Sparkles, Sliders, Play, Eye } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './EdgeHero.css';

// Letter specifications with precise proportional widths and coordinates
const LETTERS = [
  { char: 'P', width: 145, x: 50 },
  { char: 'O', width: 170, x: 215 },
  { char: 'R', width: 160, x: 405 },
  { char: 'T', width: 145, x: 585 },
  { char: 'F', width: 140, x: 750 },
  { char: 'O', width: 170, x: 910 },
  { char: 'L', width: 140, x: 1100 },
  { char: 'I', width: 85,  x: 1260 },
  { char: 'O', width: 170, x: 1365 }
];

export default function EdgeHero() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const mouseLightRef = useRef(null);
  const sweepRef = useRef(null);
  const timelineRef = useRef(null);

  const [activeCharIndex, setActiveCharIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1); // 1 = Normal, 0.5 = Slow Motion, 1.5 = Fast
  const [viewMode, setViewMode] = useState('transform'); // 'transform' or 'edges-only'
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Mouse-following subtle ambient lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mouseLightRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(mouseLightRef.current, {
        x,
        y,
        duration: 0.7,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main Letter-by-Letter Edging Transformation Animation
  const startEdgingAnimation = (speed = animSpeed, mode = viewMode) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsCompleted(false);
    setActiveCharIndex(-1);

    const letterGroups = containerRef.current ? containerRef.current.querySelectorAll('.letter-group') : [];
    const strokeElements = containerRef.current ? containerRef.current.querySelectorAll('.letter-edge-path') : [];
    const fillElements = containerRef.current ? containerRef.current.querySelectorAll('.letter-fill-path') : [];
    const cornerMarkers = containerRef.current ? containerRef.current.querySelectorAll('.edge-corner') : [];

    // Reset all elements to initial pre-animated states
    gsap.set('.hero-eyebrow-text', { opacity: 0, y: -20 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.75 });
    if (sweepRef.current) {
      gsap.set(sweepRef.current, { x: '-120%', opacity: 0 });
    }

    strokeElements.forEach((strokeEl) => {
      gsap.set(strokeEl, {
        strokeDasharray: 1200,
        strokeDashoffset: 1200,
        opacity: 0,
        strokeWidth: 2.5
      });
    });

    fillElements.forEach((fillEl) => {
      gsap.set(fillEl, {
        opacity: 0,
        scale: 0.94,
        transformOrigin: 'center center'
      });
    });

    cornerMarkers.forEach((marker) => {
      gsap.set(marker, { opacity: 0, scale: 0.4 });
    });

    // Create the master animation timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setIsCompleted(true);
        setActiveCharIndex(-1);
      }
    });

    timelineRef.current = tl;

    // Apply speed multiplier (0.5x duration is doubled)
    tl.timeScale(speed);

    // 1. Scene Inception: Ambient deep-green atmospheric glow emerges
    tl.to(glowRef.current, {
      opacity: 0.6,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out'
    }, '+=0.2');

    // 2. Top Editorial Typography fades in cleanly
    tl.to('.hero-eyebrow-text', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out'
    }, '-=0.6');

    // 3. LETTER-BY-LETTER EDGING TRANSFORMATION
    // P -> O -> R -> T -> F -> O -> L -> I -> O
    letterGroups.forEach((group, idx) => {
      const strokeEl = group.querySelector('.letter-edge-path');
      const fillEl = group.querySelector('.letter-fill-path');
      const corners = group.querySelectorAll('.edge-corner');
      const shockwave = group.querySelector('.letter-shockwave');

      const letterTimeline = gsap.timeline();

      // Trigger active state & audio tick
      letterTimeline.add(() => {
        setActiveCharIndex(idx);
        cinematicAudio.playTactileTick(480 + idx * 80);
      });

      // A. Edge Corner Targeting Brackets snap in
      if (corners.length > 0) {
        letterTimeline.to(corners, {
          opacity: 0.8,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(2)'
        }, 0);
      }

      // B. Edge Stroke Drawing: The electric neon outline draws along the contour
      letterTimeline.to(strokeEl, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      }, 0);

      // C. Edge Glow Intensity Flare: As outline closes, the edges surge with neon light
      letterTimeline.to(strokeEl, {
        strokeWidth: 4,
        filter: 'drop-shadow(0 0 12px #B6FF00) drop-shadow(0 0 25px rgba(182, 255, 0, 0.8))',
        duration: 0.25,
        ease: 'power1.out'
      }, '-=0.25');

      // D. The Transformation: Fill blooms out from the edges into solid glowing neon
      if (mode === 'transform') {
        letterTimeline.to(fillEl, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out'
        }, '-=0.2');

        // Settles the stroke back slightly to blend seamlessly with the solid body
        letterTimeline.to(strokeEl, {
          strokeWidth: 2.2,
          opacity: 0.9,
          duration: 0.25
        }, '-=0.15');
      }

      // E. Shockwave pulse expands outward from the letter's edges
      if (shockwave) {
        letterTimeline.fromTo(shockwave, 
          { scale: 0.8, opacity: 0.9 },
          { scale: 1.5, opacity: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // F. Subtle Corner Brackets fade away after transformation locks in
      if (corners.length > 0) {
        letterTimeline.to(corners, {
          opacity: 0.15,
          duration: 0.4
        }, '-=0.1');
      }

      // Append letter timeline with overlapping momentum
      tl.add(letterTimeline, idx === 0 ? '+=0.1' : '-=0.42');
    });

    // 4. Word Finale: A brilliant neon laser sweep travels across the full word
    if (sweepRef.current) {
      tl.to(sweepRef.current, {
        opacity: 0.95,
        x: '220%',
        duration: 1.4,
        ease: 'power2.inOut'
      }, '+=0.1');
    }

    // 5. Full Word Breathing Pulse
    tl.to('.portfolio-svg-wrapper', {
      filter: 'drop-shadow(0 0 35px rgba(182, 255, 0, 0.75)) drop-shadow(0 0 75px rgba(182, 255, 0, 0.35))',
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '-=0.8');
  };

  useEffect(() => {
    startEdgingAnimation(animSpeed, viewMode);
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleReplay = () => {
    cinematicAudio.playTactileTick(1000);
    startEdgingAnimation(animSpeed, viewMode);
  };

  const handleSpeedChange = (speed) => {
    setAnimSpeed(speed);
    cinematicAudio.playTactileTick(800);
    startEdgingAnimation(speed, viewMode);
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'transform' ? 'edges-only' : 'transform';
    setViewMode(nextMode);
    cinematicAudio.playTactileTick(900);
    startEdgingAnimation(animSpeed, nextMode);
  };

  const toggleAudio = () => {
    const active = cinematicAudio.toggle();
    setIsAudioActive(active);
  };

  return (
    <div className="edge-hero-screen" ref={containerRef}>
      {/* Dark gradient backdrop */}
      <div className="hero-dark-base" />
      <div className="hero-vignette" />

      {/* Atmospheric neon-green light bleeding behind typography */}
      <div className="hero-neon-bleed" ref={glowRef} />

      {/* Mouse-tracking interactive glow */}
      <div className="hero-mouse-spotlight" ref={mouseLightRef} />

      {/* Clean Single-Page Stage */}
      <div className="hero-stage">
        {/* Top Typography: "AI VIDEO EDITOR" & "VISUAL STORYTELLER" */}
        <div className="hero-eyebrow-text">
          <span className="eyebrow-cell">AI VIDEO EDITOR</span>
          <span className="eyebrow-symbol">&amp;</span>
          <span className="eyebrow-cell">VISUAL STORYTELLER</span>
        </div>

        {/* Main Attraction: PORTFOLIO with Letter-by-Letter Edging Transformation */}
        <div className="portfolio-svg-wrapper">
          <svg 
            viewBox="0 0 1580 340" 
            className="portfolio-svg-canvas"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Neon Glow Filter */}
              <filter id="neon-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="15" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Edge Gradient */}
              <linearGradient id="edge-laser-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#80FF00" />
                <stop offset="50%" stopColor="#E5FF80" />
                <stop offset="100%" stopColor="#B6FF00" />
              </linearGradient>
            </defs>

            {/* Letter Groups: P O R T F O L I O */}
            {LETTERS.map((item, idx) => (
              <g 
                key={idx} 
                className={`letter-group ${activeCharIndex === idx ? 'letter-active' : ''}`}
                id={`letter-${item.char}-${idx}`}
              >
                {/* Edge Corner Markers / Motion Design HUD Brackets */}
                <g className="edge-corners-group">
                  <path 
                    d={`M ${item.x - 6} 95 L ${item.x - 6} 80 L ${item.x + 9} 80`} 
                    className="edge-corner corner-tl" 
                  />
                  <path 
                    d={`M ${item.x + item.width - 9} 80 L ${item.x + item.width + 6} 80 L ${item.x + item.width + 6} 95`} 
                    className="edge-corner corner-tr" 
                  />
                  <path 
                    d={`M ${item.x - 6} 265 L ${item.x - 6} 280 L ${item.x + 9} 280`} 
                    className="edge-corner corner-bl" 
                  />
                  <path 
                    d={`M ${item.x + item.width - 9} 280 L ${item.x + item.width + 6} 280 L ${item.x + item.width + 6} 265`} 
                    className="edge-corner corner-br" 
                  />
                </g>

                {/* Sub-Letter Floor Reflection */}
                <text
                  x={item.x + item.width / 2}
                  y={260}
                  textAnchor="middle"
                  className="letter-reflection-path"
                >
                  {item.char}
                </text>

                {/* 1. SOLID NEON BODY (Transforms from the edges) */}
                <text
                  x={item.x + item.width / 2}
                  y={260}
                  textAnchor="middle"
                  className="letter-fill-path"
                >
                  {item.char}
                </text>

                {/* 2. ELECTRIC NEON EDGES (Draws on letter-by-letter) */}
                <text
                  x={item.x + item.width / 2}
                  y={260}
                  textAnchor="middle"
                  className="letter-edge-path"
                >
                  {item.char}
                </text>

                {/* Individual shockwave ring */}
                <circle 
                  cx={item.x + item.width / 2} 
                  cy={180} 
                  r={item.width * 0.45} 
                  className="letter-shockwave" 
                />
              </g>
            ))}
          </svg>

          {/* Neon Light Sweep Overlay */}
          <div className="edge-sweep-bar" ref={sweepRef} />
        </div>

        {/* Minimal Sub-Bar Status */}
        <div className="hero-status-row">
          <div className="status-item">
            <span className="status-ping" />
            <span className="status-label">
              {activeCharIndex >= 0 
                ? `TRANSFORMING CHARACTER [ ${LETTERS[activeCharIndex].char} ]` 
                : isCompleted 
                ? "TRANSFORMATION COMPLETE // 60 FPS" 
                : "INITIALIZING NEURAL EDGES..."}
            </span>
          </div>

          <div className="status-divider" />

          <div className="status-item">
            <span className="status-sub">BEBAS NEUE &bull; NEON-LIME #B6FF00 &bull; 100VW</span>
          </div>
        </div>

        {/* Direct Interactive Control Toolbar */}
        <div className="hero-controls-bar">
          {/* Replay Sequence Button */}
          <button 
            className="ctrl-pill-btn btn-primary"
            onClick={handleReplay}
            title="Replay Letter-by-Letter Edging Animation"
          >
            <RotateCcw size={14} className={activeCharIndex >= 0 ? 'icon-spin' : ''} />
            <span>REPLAY REVEAL</span>
          </button>

          {/* Speed Selector */}
          <div className="speed-pills-group">
            <span className="pills-label">SPEED:</span>
            {[
              { label: '0.5X SLOW', val: 0.5 },
              { label: '1X NORMAL', val: 1 },
              { label: '1.5X FAST', val: 1.5 }
            ].map((spd) => (
              <button
                key={spd.val}
                className={`speed-pill ${animSpeed === spd.val ? 'active' : ''}`}
                onClick={() => handleSpeedChange(spd.val)}
              >
                {spd.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <button 
            className={`ctrl-pill-btn ${viewMode === 'edges-only' ? 'active-neon' : ''}`}
            onClick={toggleViewMode}
            title="Toggle between Edge-to-Solid transformation or Wireframe Edges only"
          >
            <Eye size={14} />
            <span>{viewMode === 'transform' ? 'MODE: EDGE → SOLID' : 'MODE: EDGES ONLY'}</span>
          </button>

          {/* Audio Atmosphere Toggle */}
          <button 
            className={`ctrl-pill-btn ${isAudioActive ? 'active-neon' : ''}`}
            onClick={toggleAudio}
            title="Toggle atmospheric audio & tactile ticks"
          >
            {isAudioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{isAudioActive ? 'SOUND ON' : 'SOUND MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Subtle Corner Markers */}
      <div className="hud-corner-tag tag-top-left">DIR // 01</div>
      <div className="hud-corner-tag tag-top-right">AI VIDEO &bull; EDITORIAL</div>
      <div className="hud-corner-tag tag-bottom-left">ASPECT: 100VW &times; 100VH</div>
      <div className="hud-corner-tag tag-bottom-right">COLOR: #B6FF00</div>
    </div>
  );
}

