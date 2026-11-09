import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { RotateCcw, Volume2, VolumeX, Camera, Edit3, Check, ChevronDown } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './ExactVideoHero.css';

// Exact optically balanced letter coordinates: uniform 6px kerning, zero awkward gaps around I, L, O
const LETTERS_CONFIG = [
  { char: 'P', x: 40 },
  { char: 'O', x: 126 },
  { char: 'R', x: 219 },
  { char: 'T', x: 311 },
  { char: 'F', x: 391 },
  { char: 'O', x: 461 },
  { char: 'L', x: 554 },
  { char: 'I', x: 621 },
  { char: 'O', x: 673 }
];

// Clean Instagram icon
const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// Authentic Google Gemini 4-point sparkle star icon matching the video
const GeminiStar = ({ color = '#B6FF00', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className="gemini-star-icon"
    style={{ filter: `drop-shadow(0 0 10px ${color})` }}
  >
    <path 
      d="M12 2 C12 7.5, 7.5 12, 2 12 C7.5 12, 12 16.5, 12 22 C12 16.5, 16.5 12, 22 12 C16.5 12, 12 7.5, 12 2 Z" 
      fill={color} 
    />
  </svg>
);

export default function ExactVideoHero() {
  const stageRef = useRef(null);
  const cameraViewportRef = useRef(null);
  const wordSvgRef = useRef(null);
  const masterTimeline = useRef(null);
  const leftSummaryRef = useRef(null);
  const rightCategoriesRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [cameraPhase, setCameraPhase] = useState('intro'); // 'intro', 'left-summary', 'right-categories', 'master'
  const [isFinished, setIsFinished] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Profile data: Shiva with 1 Year Experience
  const [personName, setPersonName] = useState('Shiva');
  const [isEditingName, setIsEditingName] = useState(false);

  const [summaryText, setSummaryText] = useState(
    "I am a Video Editor & Visual Designer with 1+ year of experience crafting high-retention content. Skilled in CapCut, motion design, and modern AI workflows, I combine clean editing fundamentals and sharp design aesthetics to deliver engaging video content for brands and creators."
  );
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  // 5 Categories with Colored Google Gemini Sparkle Stars matching video
  const CATEGORIES = [
    { name: 'Motion Graphics', color: '#B6FF00' },
    { name: 'Video Editing & CapCut', color: '#00E5FF' },
    { name: 'Instagram Shorts / Reels', color: '#2979FF' },
    { name: 'AI Visual Storytelling', color: '#E040FB' },
    { name: 'Visual Design & Branding', color: '#FF5252' }
  ];

  // Full Cinematic Camera Movement Sequence with Zero Overlaps & Electric Shimmer
  const runFullCinematicSequence = (speed = playbackSpeed) => {
    if (masterTimeline.current) {
      masterTimeline.current.kill();
    }

    setIsFinished(false);
    setActiveIdx(-1);
    setCameraPhase('intro');

    const charGroups = wordSvgRef.current ? wordSvgRef.current.querySelectorAll('.tight-char-group') : [];
    const categoryItems = stageRef.current ? stageRef.current.querySelectorAll('.category-item') : [];

    // Reset Camera & Viewport
    gsap.set(cameraViewportRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      transformOrigin: 'center 42%'
    });

    // Reset Word SVG to fully visible for the initial entrance sequence
    gsap.set(wordSvgRef.current, {
      opacity: 1,
      filter: 'drop-shadow(0 0 0px transparent)'
    });

    // Reset all characters (invisible stroke + invisible fill)
    charGroups.forEach((g) => {
      const stroke = g.querySelector('.exact-stroke-text');
      const fill = g.querySelector('.exact-fill-text');
      gsap.set(stroke, {
        strokeDasharray: 900,
        strokeDashoffset: 900,
        opacity: 0,
        filter: 'drop-shadow(0 0 3px #FFFFFF) drop-shadow(0 0 8px #B6FF00)'
      });
      gsap.set(fill, { opacity: 0 });
    });

    gsap.set('.exact-ambient-glow', { opacity: 0, scale: 0.8 });
    gsap.set('.exact-top-bar', { opacity: 0, y: -15 });
    gsap.set(leftSummaryRef.current, { opacity: 0, y: 25, scale: 0.96, filter: 'blur(0px)' });
    gsap.set(rightCategoriesRef.current, { opacity: 0, filter: 'blur(0px)' });
    gsap.set(categoryItems, { opacity: 0, x: 40, scale: 0.95, filter: 'blur(3px)' });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        setActiveIdx(-1);
        setCameraPhase('master');
      }
    });

    masterTimeline.current = tl;
    tl.timeScale(speed);

    // ========================================================
    // PHASE 1: PORTFOLIO LETTER-BY-LETTER TRACE (0s - 2.8s)
    // Tight kerning, exact outline trace & solid gradient fill pop
    // ========================================================
    tl.to('.exact-ambient-glow', { opacity: 0.7, scale: 1, duration: 0.45, ease: 'power2.out' });
    tl.to('.exact-top-bar', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

    // Sequential letter trace & fill pop (P -> O -> R -> T -> F -> O -> L -> I -> O)
    charGroups.forEach((g, i) => {
      const stroke = g.querySelector('.exact-stroke-text');
      const fill = g.querySelector('.exact-fill-text');
      const letterTl = gsap.timeline();

      letterTl.add(() => {
        setActiveIdx(i);
        if (!isMuted) cinematicAudio.playTactileTick(460 + i * 80);
      });

      // 1. Glowing white/lime outline traces contour
      letterTl.to(stroke, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.22,
        ease: 'power2.inOut'
      }, 0);

      // 2. Solid neon-lime gradient pops in
      letterTl.to(fill, {
        opacity: 1,
        duration: 0.06,
        ease: 'none'
      }, '-=0.04');

      // 3. Outline settles
      letterTl.to(stroke, { opacity: 0, duration: 0.05 }, '+=0.01');

      tl.add(letterTl, i === 0 ? '+=0.05' : '-=0.04');
    });

    // ========================================================
    // CLEAN, SMOOTH FADE DOWN (NO FLASH - VELVETY TRANSITION)
    // Dims PORTFOLIO softly into the atmospheric background
    // ========================================================
    tl.to(wordSvgRef.current, {
      opacity: 0.18,
      duration: 0.75,
      ease: 'power2.out'
    }, '+=0.1');

    // ========================================================
    // PHASE 2: CINEMATIC CAMERA PAN TO LEFT (3.5s - 7.0s)
    // Pushes in and focuses on Shiva, 1 Year Exp & Summary Box
    // ========================================================
    tl.add(() => {
      setCameraPhase('left-summary');
    }, '+=0.1');

    // Camera smoothly zooms and glides to the left with subtle 3D tilt
    tl.to(cameraViewportRef.current, {
      scale: 1.14,
      x: '13%',
      y: '2%',
      rotateY: -2.5,
      rotateX: 1.5,
      duration: 1.5,
      ease: 'power3.inOut'
    });

    // Shiva & Professional Summary reveal smoothly into full focus
    tl.to(leftSummaryRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.9');

    // ========================================================
    // PHASE 3: SLOW-MOTION CINEMATIC GLIDE TO RIGHT CATEGORIES
    // Glides across slowly with individual focus on each category
    // ========================================================
    tl.add(() => {
      setCameraPhase('right-categories');
    }, '+=0.8');

    // Camera smoothly glides over to the right with gentle slow-motion ease
    tl.to(cameraViewportRef.current, {
      scale: 1.15,
      x: '-13%',
      y: '-2%',
      rotateY: 2.5,
      rotateX: -1.5,
      duration: 2.2,
      ease: 'power3.inOut'
    });

    // Soften left side as camera glides right
    tl.to(leftSummaryRef.current, {
      opacity: 0.3,
      filter: 'blur(1.5px)',
      duration: 1.2,
      ease: 'power2.inOut'
    }, '<');

    tl.to(rightCategoriesRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=1.2');

    // 5 Categories animate in SLOW-MOTION, one by one with glowing Gemini stars
    categoryItems.forEach((catItem, idx) => {
      const star = catItem.querySelector('.gemini-star-icon');

      tl.to(catItem, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power2.out',
        onStart: () => {
          if (!isMuted) cinematicAudio.playTactileTick(580 + idx * 80);
          if (star) {
            gsap.fromTo(star, { scale: 1.4 }, { scale: 1, duration: 0.6, ease: 'back.out(2)' });
          }
        }
      }, idx === 0 ? '-=0.8' : '+=0.22');
    });

    // Dedicated slow-motion hold to appreciate the 5 categories before returning to Master
    tl.add(() => {}, '+=1.6');

    // ========================================================
    // PHASE 4: CAMERA SLOWLY PULLS BACK TO MASTER
    // Full Balanced Master Shot with Zero Overlaps
    // ========================================================
    tl.add(() => {
      setCameraPhase('master');
    });

    tl.to(cameraViewportRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 2.0,
      ease: 'power3.inOut'
    });

    // Both Shiva and Categories return to crisp focus in master view
    tl.to([leftSummaryRef.current, rightCategoriesRef.current], {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    }, '<');

    // PORTFOLIO gently stays softly illuminated in background
    tl.to(wordSvgRef.current, {
      opacity: 0.20,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.8');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        runFullCinematicSequence(playbackSpeed);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (document.fonts) {
      document.fonts.ready.then(() => runFullCinematicSequence(playbackSpeed));
    } else {
      runFullCinematicSequence(playbackSpeed);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (masterTimeline.current) masterTimeline.current.kill();
    };
  }, [playbackSpeed, isMuted]);

  const handleReplay = () => runFullCinematicSequence(playbackSpeed);

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    runFullCinematicSequence(speed);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (!next) cinematicAudio.startDrone();
    else cinematicAudio.stopDrone();
  };

  // Direct camera phase jump
  const jumpCameraPhase = (phase) => {
    setCameraPhase(phase);
    if (phase === 'left-summary') {
      gsap.to(cameraViewportRef.current, { 
        scale: 1.14, 
        x: '13%', 
        y: '2%', 
        rotateY: -2.5, 
        rotateX: 1.5, 
        duration: 0.9, 
        ease: 'power2.out' 
      });
      gsap.to(leftSummaryRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5 });
      gsap.to(rightCategoriesRef.current, { opacity: 0.35, filter: 'blur(1.5px)', duration: 0.5 });
    } else if (phase === 'right-categories') {
      gsap.to(cameraViewportRef.current, { 
        scale: 1.14, 
        x: '-13%', 
        y: '-2%', 
        rotateY: 2.5, 
        rotateX: -1.5, 
        duration: 0.9, 
        ease: 'power2.out' 
      });
      gsap.to(leftSummaryRef.current, { opacity: 0.35, filter: 'blur(1.5px)', duration: 0.5 });
      gsap.to(rightCategoriesRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5 });
    } else {
      gsap.to(cameraViewportRef.current, { 
        scale: 1, 
        x: 0, 
        y: 0, 
        rotateY: 0, 
        rotateX: 0, 
        duration: 0.9, 
        ease: 'power2.out' 
      });
      gsap.to([leftSummaryRef.current, rightCategoriesRef.current], { opacity: 1, filter: 'blur(0px)', duration: 0.5 });
    }
  };

  // Smooth scroll down to works section matching the video flow
  const scrollToWorks = () => {
    const el = document.getElementById('short-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (!isMuted) cinematicAudio.playTactileTick(900);
    }
  };

  return (
    <div className="exact-hero-container" ref={stageRef}>
      {/* Dark Cinematic Backdrop Layers */}
      <div className="exact-bg-base" />
      <div className="exact-ambient-glow" />

      {/* CAMERA VIEWPORT (GSAP scales, tilts, and pans this 3D container smoothly) */}
      <div className="camera-viewport" ref={cameraViewportRef}>
        
        {/* Top Header Bar */}
        <div className="exact-top-bar">
          <div className="exact-top-tag">
            <span className="top-tag-title">Video editor</span>
            <span className="top-tag-amp">&amp;</span>
            <span className="top-tag-sub">Visual Designer</span>
          </div>
        </div>

        {/* ========================================================
            STAGE 1: SCREEN-FIT TIGHT PORTFOLIO HEADLINE (ZERO GAPS)
            ======================================================== */}
        <div className="portfolio-headline-stage">
          <div className="tight-svg-box">
            <svg 
              viewBox="34 10 732 145" 
              className="tight-portfolio-svg"
              ref={wordSvgRef}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="neon-lime-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4FF00" />
                  <stop offset="42%" stopColor="#A2FF00" />
                  <stop offset="100%" stopColor="#55C000" />
                </linearGradient>

                <filter id="stroke-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Exact kerning for each character with zero gap! */}
              {LETTERS_CONFIG.map((item, idx) => (
                <g 
                  key={idx} 
                  className={`tight-char-group ${activeIdx === idx ? 'is-active-trace' : ''}`}
                  id={`char-group-${idx}`}
                >
                  {/* 1. Solid Gradient Fill */}
                  <text 
                    x={item.x} 
                    y={145} 
                    textAnchor="start" 
                    className="exact-fill-text" 
                    fill="url(#neon-lime-grad)"
                  >
                    {item.char}
                  </text>

                  {/* 2. Glowing White/Lime Outline Stroke */}
                  <text 
                    x={item.x} 
                    y={145} 
                    textAnchor="start" 
                    className="exact-stroke-text" 
                    filter="url(#stroke-glow)"
                  >
                    {item.char}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* ========================================================
            STAGE 2: LOWER SPLIT CONTENT (ZERO OVERLAPS WITH PORTFOLIO)
            ======================================================== */}
        <div className="hero-lower-content-grid">
          
          {/* LEFT: Hi I am Shiva & Professional Summary */}
          <div className="left-summary-group" ref={leftSummaryRef}>
            <div className="person-header-row">
              <div className="person-name-group">
                <span className="name-hi-label">Hi I am</span>
                {isEditingName ? (
                  <div className="name-edit-box">
                    <input 
                      type="text" 
                      value={personName} 
                      autoFocus
                      onChange={(e) => setPersonName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                      className="name-input"
                    />
                    <button className="name-save-btn" onClick={() => setIsEditingName(false)}>
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="name-display-box" onClick={() => setIsEditingName(true)} title="Click to edit name">
                    <h2 className="person-display-name">{personName}</h2>
                    <Edit3 size={13} className="name-edit-icon" />
                  </div>
                )}
              </div>

              {/* 1+ Year Experience Badge */}
              <div className="experience-badge-pill">
                <div className="badge-num-box">
                  <span className="badge-num">1+</span>
                  <span className="badge-unit">year</span>
                </div>
                <div className="badge-text-box">
                  <span className="badge-title">Experience</span>
                  <span className="badge-sub">in Video Editing &amp; Design</span>
                </div>
              </div>
            </div>

            {/* Green Glassmorphism Rounded Box with editable summary */}
            <div className="summary-glass-box">
              <div className="summary-header-row">
                <h3 className="summary-heading">Professional Summary</h3>
                <button 
                  className="summary-edit-btn" 
                  onClick={() => setIsEditingSummary(!isEditingSummary)}
                  title={isEditingSummary ? "Save summary" : "Click to edit summary"}
                >
                  {isEditingSummary ? <Check size={13} /> : <Edit3 size={13} />}
                </button>
              </div>
              <div className="summary-inner-card">
                {isEditingSummary ? (
                  <textarea
                    value={summaryText}
                    onChange={(e) => setSummaryText(e.target.value)}
                    className="summary-textarea"
                    rows={4}
                    autoFocus
                  />
                ) : (
                  <p className="summary-body">{summaryText}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: 5 Categories with Colored Google Gemini Sparkle Stars */}
          <div className="right-categories-group" ref={rightCategoriesRef}>
            <div className="categories-header-label">CORE SPECIALIZATIONS</div>
            <div className="categories-list">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="category-item">
                  <GeminiStar color={cat.color} size={18} />
                  <span className="category-name">{cat.name}</span>
                  <span className="category-pipe" style={{ color: cat.color }}>|</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Interactive Toolbar */}
      <div className="exact-bottom-toolbar">
        {/* Replay Cinematic */}
        <button 
          className="exact-btn exact-btn-primary" 
          onClick={handleReplay}
          title="Replay Full Cinematic Sequence (Space or R)"
        >
          <RotateCcw size={14} className={activeIdx >= 0 ? 'spin-active' : ''} />
          <span>REPLAY CINEMATIC [SPACE]</span>
        </button>

        {/* Camera Views Jump */}
        <div className="camera-jump-group">
          <span className="camera-jump-label">
            <Camera size={13} />
            <span>CAMERA:</span>
          </span>
          {[
            { id: 'master', label: 'FULL MASTER' },
            { id: 'left-summary', label: 'LEFT: SHIVA' },
            { id: 'right-categories', label: 'RIGHT: 5 CATEGORIES' }
          ].map((cp) => (
            <button
              key={cp.id}
              className={`camera-pill ${cameraPhase === cp.id ? 'active' : ''}`}
              onClick={() => jumpCameraPhase(cp.id)}
            >
              {cp.label}
            </button>
          ))}
        </div>

        {/* Speed Controls */}
        <div className="exact-speed-group">
          <span className="speed-group-title">SPEED:</span>
          {[
            { label: '0.5X SLOW', val: 0.5 },
            { label: '1X NORMAL', val: 1 },
            { label: '1.5X FAST', val: 1.5 }
          ].map((s) => (
            <button
              key={s.val}
              className={`exact-speed-btn ${playbackSpeed === s.val ? 'active' : ''}`}
              onClick={() => handleSpeedChange(s.val)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Audio Toggle */}
        <button 
          className={`exact-btn ${!isMuted ? 'active-lime' : ''}`}
          onClick={toggleMute}
          title="Toggle audio ticks"
        >
          {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{!isMuted ? 'SOUND ON' : 'MUTED'}</span>
        </button>
      </div>

      {/* Subtle Scroll Cue to View Selected Works */}
      <div 
        className="hero-scroll-cue" 
        onClick={scrollToWorks}
        role="button"
        tabIndex={0}
        title="Scroll down to view Short-Form and Long-Form works"
      >
        <span>SCROLL TO VIEW WORKS</span>
        <ChevronDown size={14} className="cue-bounce-arrow" />
      </div>
    </div>
  );
}
