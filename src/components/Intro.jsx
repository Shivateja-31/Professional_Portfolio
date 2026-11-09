import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREATIVE_STATS } from '../data/projectsData';
import { Film, Cpu, Eye, Sparkles, ArrowRight } from 'lucide-react';
import './Intro.css';

gsap.registerPlugin(ScrollTrigger);

export default function Intro({ onExploreClick, onContactClick }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal on scroll
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Supporting paragraph reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats cards stagger reveal
      const statCards = statsRef.current ? statsRef.current.querySelectorAll('.stat-card') : [];
      gsap.fromTo(statCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intro-section" ref={sectionRef} id="intro">
      {/* Editorial Horizontal Ticker */}
      <div className="ticker-band" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="ticker-content">
              <span>AI VIDEO EDITING</span>
              <span className="ticker-star">✦</span>
              <span>CINEMATIC STORYTELLING</span>
              <span className="ticker-star">✦</span>
              <span>GENERATIVE MOTION</span>
              <span className="ticker-star">✦</span>
              <span>NEURAL VFX &amp; COLOR</span>
              <span className="ticker-star">✦</span>
              <span>AUDIO ARCHITECTURE</span>
              <span className="ticker-star">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Editorial Header */}
        <div className="intro-editorial-head">
          <div className="editorial-label">
            THE CREATIVE MIND BEHIND THE VISUALS
          </div>

          <h2 className="intro-headline" ref={headlineRef}>
            I TURN IDEAS INTO <span className="text-neon">VISUAL EXPERIENCES.</span>
          </h2>

          <p className="intro-supporting-text" ref={textRef}>
            Blending artificial intelligence, creative editing, motion design and storytelling to transform ordinary footage into extraordinary visual experiences.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="pillars-grid">
          <div className="pillar-item">
            <div className="pillar-header">
              <span className="pillar-num">01 / DISCOVERY</span>
              <Cpu size={20} className="pillar-icon" />
            </div>
            <h3 className="pillar-title">Generative AI Direction</h3>
            <p className="pillar-desc">
              Harnessing neural synthesis (Runway, Kling, Midjourney, ComfyUI) to manifest camera movements and worlds previously impossible without multi-million dollar studio budgets.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-header">
              <span className="pillar-num">02 / CRAFT</span>
              <Film size={20} className="pillar-icon" />
            </div>
            <h3 className="pillar-title">Cinematic Pacing &amp; Editorial</h3>
            <p className="pillar-desc">
              AI generates clips; editors make films. Every frame cut is timed to subconscious human emotion, rhythmic breath, and narrative tension to hold spectator attention.
            </p>
          </div>

          <div className="pillar-item">
            <div className="pillar-header">
              <span className="pillar-num">03 / FINISH</span>
              <Sparkles size={20} className="pillar-icon" />
            </div>
            <h3 className="pillar-title">Studio Color &amp; Sonic Design</h3>
            <p className="pillar-desc">
              ACES color-managed pipelines, neural 4K upscaling, and bespoke cinematic sound architecture with physical sub-bass hits and visceral spatial atmosphere.
            </p>
          </div>
        </div>

        {/* Kinetic Metrics Section */}
        <div className="stats-container" ref={statsRef}>
          {CREATIVE_STATS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Section Action Bar */}
        <div className="intro-action-bar">
          <div className="intro-status-box">
            <span className="status-indicator-dot" />
            <span className="status-desc">NOW SCHEDULING SELECT PROJECTS FOR 2025 // Q2</span>
          </div>

          <button className="btn-neon" onClick={onExploreClick}>
            <span>VIEW SELECTED WORKS</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

