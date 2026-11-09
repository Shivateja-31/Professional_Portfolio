import React from 'react';
import './GrainOverlay.css';

export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg className="grain-svg" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.75" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}

