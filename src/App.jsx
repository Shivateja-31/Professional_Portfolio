import React, { useState } from 'react';
import ExactVideoHero from './components/ExactVideoHero';
import ShortFormSection from './components/ShortFormSection';
import LongFormSection from './components/LongFormSection';
import ProjectModal from './components/ProjectModal';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import './index.css';

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="portfolio-app-root">
      {/* Subtle Analog 35mm Film Grain Overlay */}
      <GrainOverlay />

      {/* Cinematic Custom Magnetic Cursor */}
      <CustomCursor />

      <main>
        {/* SCENE 01: Signature PORTFOLIO Reveal, Shiva & 5 Categories */}
        <ExactVideoHero />

        {/* SCENE 02: Short-Form Content Edit (Vertical 9:16 Reels from video) */}
        <ShortFormSection onSelectProject={setActiveProject} />

        {/* SCENE 03: Long-Form Content Edit (Widescreen 16:9 Cuts from video) */}
        <LongFormSection onSelectProject={setActiveProject} />
      </main>

      {/* Cinematic Video Player Modal */}
      {activeProject && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </div>
  );
}
