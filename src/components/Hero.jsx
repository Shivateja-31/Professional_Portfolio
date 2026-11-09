import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RotateCcw, Sparkles } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const CHARS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

export default function Hero({ onExploreClick }) {
  const heroRef = useRef(null);
  const wordRef = useRef(null);
  const glowRef = useRef(null);
  const mouseLightRef = useRef(null);
  const sweepRef = useRef(null);
  const masterTimeline = useRef(null);

  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(-1);

  // Mouse-responsive atmospheric spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mouseLightRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(mouseLightRef.current, {
        x: x,
        y: y,
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (heroEl) heroEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Main Letter-by-Letter Entrance Animation
  const runEntranceAnimation = () => {
    if (masterTimeline.current) {
      masterTimeline.current.kill();
    }

    const chars = wordRef.current ? wordRef.current.querySelectorAll('.char-span') : [];
    const pulseRings = wordRef.current ? wordRef.current.querySelectorAll('.char-pulse') : [];

    // Reset initial styles
    gsap.set(chars, {
      opacity: 0,
      y: 60,
      scale: 0.85,
      filter: 'blur(15px)',
      textShadow: '0 0 0px rgba(182, 255, 0, 0)'
    });
    gsap.set('.hero-top-eyebrow', { opacity: 0, y: -25 });
    gsap.set('.hero-scroll-cue', { opacity: 0, y: 25 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.7 });
    if (sweepRef.current) {
      gsap.set(sweepRef.current, { x: '-150%', opacity: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setHasAnimated(true);
        setActiveCharIndex(-1);
      }
    });

    masterTimeline.current = tl;

    // 1. Initial dark delay & subtle green ambient glow emergence
    tl.to(glowRef.current, {
      opacity: 0.65,
      scale: 1,
      duration: 1.6,
      ease: 'power2.out'
    }, '+=0.2');

    // 2. Top typography ("AI VIDEO EDITOR" & "VISUAL STORYTELLER") fades in
    tl.to('.hero-top-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.8');

    // 3. LETTER-BY-LETTER SIGNATURE REVEAL (P -> O -> R -> T -> F -> O -> L -> I -> O)
    chars.forEach((charEl, idx) => {
      tl.to(charEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        textShadow: '0 0 25px rgba(182, 255, 0, 0.9), 0 0 55px rgba(182, 255, 0, 0.4)',
        duration: 0.85,
        ease: 'power3.out',
        onStart: () => {
          setActiveCharIndex(idx);
          cinematicAudio.playTactileTick(600 + idx * 80);
          // Trigger individual character pulse ring
          if (pulseRings[idx]) {
            gsap.fromTo(pulseRings[idx], 
              { scale: 0.5, opacity: 0.9 },
              { scale: 1.8, opacity: 0, duration: 0.7, ease: 'power2.out' }
            );
          }
        }
      }, idx === 0 ? '-=0.3' : '-=0.68'); // Staggered overlap for expensive cinematic momentum
    });

    // 4. Full-word glow celebration pulse
    tl.to(wordRef.current, {
      filter: 'drop-shadow(0 0 45px rgba(182, 255, 0, 0.85)) drop-shadow(0 0 90px rgba(182, 255, 0, 0.35))',
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '+=0.1');

    // 5. Subtle neon light sweep across PORTFOLIO
    if (sweepRef.current) {
      tl.to(sweepRef.current, {
        opacity: 0.85,
        x: '250%',
        duration: 1.6,
        ease: 'power2.inOut'
      }, '-=0.6');
    }

    // 6. Reveal scroll indicator and bottom details
    tl.to('.hero-scroll-cue', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.8');

    // 7. Establish idle breathing neon glow on the typography
    tl.to(chars, {
      textShadow: '0 0 20px rgba(182, 255, 0, 0.7), 0 0 45px rgba(182, 255, 0, 0.35), 0 0 90px rgba(182, 255, 0, 0.15)',
      duration: 1.4,
      ease: 'power1.inOut'
    });
  };

  useEffect(() => {
    runEntranceAnimation();

    // ScrollTrigger Transition:
    // As visitor scrolls down, PORTFOLIO typography slightly scales up and fades smoothly into introduction
    const ctx = gsap.context(() => {
      gsap.to('.hero-content-wrapper', {
        scale: 1.08,
        y: -50,
        opacity: 0.18,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(glowRef.current, {
        opacity: 0.08,
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, heroRef);

    return () => {
      ctx.revert();
      if (masterTimeline.current) masterTimeline.current.kill();
    };
  }, []);

  const handleReplay = (e) => {
    e.stopPropagation();
    cinematicAudio.playTactileTick(1000);
    runEntranceAnimation();
  };

  const scrollToWorks = () => {
    cinematicAudio.playTactileTick(750);
    if (onExploreClick) {
      onExploreClick();
    } else {
      const worksSection = document.querySelector('#intro') || document.querySelector('#works');
      if (worksSection) worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" ref={heroRef} id="hero">
      {/* Dark gradient backdrop layers */}
      <div className="hero-gradient-base" />
      <div className="hero-gradient-vignette" />

      {/* Atmospheric neon-green light bleeding behind typography */}
      <div className="hero-ambient-glow" ref={glowRef} />

      {/* Mouse-responsive interactive spotlight */}
      <div className="hero-mouse-light" ref={mouseLightRef} />

      {/* Hero Content Container */}
      <div className="hero-content-wrapper">
        {/* Top Typography: "AI VIDEO EDITOR" & "VISUAL STORYTELLER" */}
        <div className="hero-top-eyebrow">
          <span className="eyebrow-item">AI VIDEO EDITOR</span>
          <span className="eyebrow-amp">&amp;</span>
          <span className="eyebrow-item">VISUAL STORYTELLER</span>
        </div>

        {/* Main Typography: PORTFOLIO */}
        <div className="portfolio-stage">
          <h1 
            className="portfolio-word-container" 
            ref={wordRef}
            aria-label="PORTFOLIO"
          >
            {CHARS.map((char, index) => (
              <span 
                key={index} 
                className={`char-wrapper ${activeCharIndex === index ? 'is-active-pulse' : ''}`}
              >
                <span className="char-span">{char}</span>
                <span className="char-pulse" />
                <span className="char-reflection" aria-hidden="true">{char}</span>
              </span>
            ))}
          </h1>

          {/* Animated neon light sweep bar across the letters */}
          <div className="neon-light-sweep" ref={sweepRef} />
        </div>

        {/* Hero Sub-Meta Bar */}
        <div className="hero-submeta">
          <div className="submeta-tag">
            <Sparkles size={13} className="submeta-icon" />
            <span>SYNTHETIC DIRECTION // HYBRID VFX</span>
          </div>
          <div className="submeta-divider" />
          <div className="submeta-tag">
            <span>RUNWAY GEN-3 • KLING • COMFYUI • PREMIERE</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator with animated line */}
      <div className="hero-scroll-cue" onClick={scrollToWorks} role="button" tabIndex={0}>
        <div className="scroll-pip-track">
          <div className="scroll-pip" />
        </div>
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <ArrowDown size={14} className="scroll-arrow-icon" />
      </div>

      {/* Replay Intro Button */}
      {hasAnimated && (
        <button 
          className="hero-replay-btn"
          onClick={handleReplay}
          title="Replay Letter-by-Letter Entrance Sequence"
          aria-label="Replay intro animation"
        >
          <RotateCcw size={13} />
          <span>REPLAY INTRO</span>
        </button>
      )}

      {/* Cinematic Corner Accents */}
      <div className="corner-accent corner-tl">FRAME 001 // SEC 00</div>
      <div className="corner-accent corner-tr">2.39:1 CINEMASCOPE</div>
    </section>
  );
}

