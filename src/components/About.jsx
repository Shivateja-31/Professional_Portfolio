import React, { useState } from 'react';
import { TOOL_STACK, WORKFLOW_STEPS } from '../data/projectsData';
import { Sparkles, Terminal, Layers, ArrowUpRight, Award, Video, Compass, CheckCircle2 } from 'lucide-react';
import { cinematicAudio } from '../utils/audioAmbiance';
import './About.css';

export default function About({ onContactClick }) {
  const [activeTab, setActiveTab] = useState('stack');

  return (
    <section className="about-section" id="about">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="about-head">
          <div className="editorial-label">PHILOSOPHY &amp; CAPABILITIES</div>
          <h2 className="section-headline">
            MORE THAN JUST EDITING. <br />
            <span className="text-neon">IT&apos;S VISUAL STORYTELLING.</span>
          </h2>
        </div>

        {/* Main Grid: Bio / Directorial Statement + Interactive Arsenal */}
        <div className="about-main-grid">
          {/* Left Column: Directorial Manifesto */}
          <div className="about-bio-column">
            <div className="bio-lead-quote">
              “In the age of boundless artificial intelligence, anyone can generate a five-second clip. The real artistry lies in taste, narrative restraint, sonic timing, and weaving disjointed hallucinations into unforgettable cinema.”
            </div>

            <div className="bio-body-text">
              <p>
                I operate at the bleeding edge where <strong>computational neural models</strong> collide with <strong>classical Hollywood editing language</strong>. As an AI Video Editor and Visual Storyteller, I don&apos;t just click generate — I architect cinematic worlds, choreograph impossible camera movements, and edit with micro-frame rhythmic intentionality.
              </p>
              <p>
                Whether directing high-impact commercial campaigns for global brands, fashion editorial films, or viral short-form narratives, I bring a director’s discernment to generative tech. Every camera pan has a purpose, every cut carries emotional momentum, and every sound hit reverberates through the body.
              </p>
            </div>

            {/* Core Capability Badges */}
            <div className="capabilities-list">
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>AI-POWERED VIDEO SYNTHESIS</span>
              </div>
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>CINEMATIC NARRATIVE DIRECTION</span>
              </div>
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>HYBRID VFX &amp; OPTICAL COMPOSITING</span>
              </div>
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>SHORT-FORM (9:16) &amp; WIDESCREEN CINEMA</span>
              </div>
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>ACES COLOR SCIENCE &amp; 4K MASTERING</span>
              </div>
              <div className="cap-badge">
                <CheckCircle2 size={16} className="cap-icon" />
                <span>EXPERIMENTAL AUDIO ARCHITECTURE</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bio-action-box">
              <button 
                className="btn-neon" 
                onClick={() => {
                  cinematicAudio.playTactileTick(1100);
                  onContactClick();
                }}
              >
                <span>INITIATE COMMISSION</span>
                <ArrowUpRight size={16} />
              </button>
              <span className="bio-avail-note">Accepting Q2/Q3 2025 Creative Direction</span>
            </div>
          </div>

          {/* Right Column: Interactive Tabs for Tools Stack & Production Workflow */}
          <div className="about-interactive-column">
            {/* Tab Bar Switcher */}
            <div className="interactive-tabs-bar">
              <button 
                className={`tab-btn ${activeTab === 'stack' ? 'active' : ''}`}
                onClick={() => {
                  cinematicAudio.playTactileTick(800);
                  setActiveTab('stack');
                }}
              >
                <Terminal size={15} />
                <span>CREATIVE ARSENAL</span>
              </button>

              <button 
                className={`tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
                onClick={() => {
                  cinematicAudio.playTactileTick(800);
                  setActiveTab('workflow');
                }}
              >
                <Layers size={15} />
                <span>4-STEP PRODUCTION PIPELINE</span>
              </button>
            </div>

            {/* Tab Content: Tools Stack */}
            {activeTab === 'stack' && (
              <div className="tab-panel stack-panel">
                {TOOL_STACK.map((group, gIdx) => (
                  <div key={gIdx} className="stack-group-card">
                    <h3 className="stack-group-title">{group.category}</h3>
                    <div className="tools-subgrid">
                      {group.tools.map((tool, tIdx) => (
                        <div key={tIdx} className="tool-item">
                          <div className="tool-name-row">
                            <span className="tool-item-name">{tool.name}</span>
                            <span className="tool-indicator-dot" />
                          </div>
                          <span className="tool-item-desc">{tool.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Content: Workflow */}
            {activeTab === 'workflow' && (
              <div className="tab-panel workflow-panel">
                {WORKFLOW_STEPS.map((step, sIdx) => (
                  <div key={sIdx} className="workflow-step-card">
                    <div className="step-num-badge">{step.step}</div>
                    <div className="step-details">
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

