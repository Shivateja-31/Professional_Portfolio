import React, { useState } from 'react';
import { PROJECTS_DATA, CATEGORIES } from '../data/projectsData';
import { Play, Sparkles, ArrowUpRight, Filter } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { cinematicAudio } from '../utils/audioAmbiance';
import './SelectedWorks.css';

export default function SelectedWorks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.categorySlug === activeCategory);

  const handleCardClick = (project) => {
    cinematicAudio.playTactileTick(1100);
    setSelectedProject(project);
  };

  const handleCategoryChange = (slug) => {
    cinematicAudio.playTactileTick(800);
    setActiveCategory(slug);
  };

  return (
    <section className="works-section" id="works">
      <div className="container">
        {/* Section Header */}
        <div className="works-head">
          <div>
            <div className="editorial-label">CURATED PRODUCTION ARCHIVE</div>
            <h2 className="section-headline">SELECTED WORKS</h2>
          </div>

          <p className="works-lead-text">
            A curated showcase of generative AI films, commercial spots, short-form viral cuts, and audiovisual experiments.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-label">
            <Filter size={14} />
            <span>FILTER BY GENRE:</span>
          </div>

          <div className="filter-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Gallery Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredCardId === project.id;

            return (
              <div
                key={project.id}
                className={`project-card ${project.featured ? 'featured-card' : ''}`}
                data-cursor-text="WATCH"
                onClick={() => handleCardClick(project)}
                onMouseEnter={() => {
                  setHoveredCardId(project.id);
                  cinematicAudio.playTactileTick(950);
                }}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Media Container (Poster + Video on Hover) */}
                <div className="card-media-wrapper">
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className={`card-poster ${isHovered ? 'fade-out' : ''}`}
                    loading="lazy"
                  />
                  
                  {/* Dynamic Video preview on hover */}
                  <video
                    src={project.videoUrl}
                    poster={project.posterUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className={`card-video-preview ${isHovered ? 'active' : ''}`}
                  />

                  {/* Gradient Vignette Over Card */}
                  <div className="card-media-overlay" />

                  {/* Top Badges */}
                  <div className="card-top-bar">
                    <span className="card-cat-badge">{project.category}</span>
                    <span className="card-aspect-badge">{project.aspect}</span>
                  </div>

                  {/* Center Play Indicator */}
                  <div className={`card-play-hud ${isHovered ? 'hud-hovered' : ''}`}>
                    <div className="hud-play-circle">
                      <Play size={20} fill="#B6FF00" color="#B6FF00" />
                    </div>
                    <span className="hud-play-text">OPEN FILM</span>
                  </div>

                  {/* Runtime Tag */}
                  <div className="card-runtime-tag">
                    <span>{project.runtime}</span>
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="card-info">
                  <div className="card-headline-row">
                    <h3 className="card-title">{project.title}</h3>
                    <ArrowUpRight size={18} className="card-arrow-icon" />
                  </div>

                  <p className="card-desc">{project.tagline}</p>

                  <div className="card-tools-list">
                    {project.tools.slice(0, 3).map((tool, tIdx) => (
                      <span key={tIdx} className="card-tool-tag">{tool}</span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="card-tool-tag tag-more">+{project.tools.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

