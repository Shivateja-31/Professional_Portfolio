# Cinematic AI Video Editor & Visual Storyteller Portfolio

A luxury, editorial portfolio website engineered specifically for **AI Video Editors, Neural VFX Artists, and Cinematic Visual Storytellers**.

Inspired by high-end creative studio aesthetics, featuring oversized condensed typography, atmospheric neon-lime glow (`#B6FF00`), deep dark cinematic background (`#080A09`), tactile audio ambiance, and the signature **letter-by-letter entrance reveal** of `PORTFOLIO`.

---

## ⚡ Key Highlights & Features

### 1. Hero Section — The Signature Attraction
- **100vw × 100vh** immersive stage with multi-layer radial dark-green depth gradients and atmospheric neon-lime backlighting.
- **Top Typography**: Elegant, ultra-spaced modern sans-serif: `AI VIDEO EDITOR` & `VISUAL STORYTELLER`.
- **Main Typography**: Massive, condensed, screen-spanning **PORTFOLIO** in glowing neon-lime (`#B6FF00`).
- **Signature Letter-by-Letter Animation**:
  - Sequence starts in cinematic darkness.
  - Ambient green glow emerges behind the letters.
  - Top editorial eyebrow smoothly fades in.
  - Each character (`P → O → R → T → F → O → L → I → O`) appears sequentially with independent opacity, `translateY(60px)`, `blur(15px)`, scale, and an individual neon light pulse.
  - Completes with a full-word glow pulse and an animated neon light sweep across the typography.
- **Cinematic Polish**: Sub-letter floor reflection, mouse-responsive spotlight tracking, and bottom-centered scroll cue.
- **Replay Sequence**: Dedicated button to re-experience the signature sequence at any time.

### 2. Smooth Hero Transition
- Seamless ScrollTrigger scrub that scales and softens the hero typography into the editorial section without abrupt jumps.

### 3. Introduction & Philosophy
- Headline: *"I TURN IDEAS INTO VISUAL EXPERIENCES."*
- Supporting statement on blending artificial intelligence, creative editing, and motion design.
- Three core pillars: *Generative AI Direction*, *Cinematic Pacing & Editorial*, and *Studio Color & Sonic Design*.
- Kinetic metric cards: 120M+ views driven, 45+ commercial deliveries, 100% AI/hybrid craft.
- Infinite horizontal editorial marquee ticker.

### 4. Selected Works Gallery & Video Lightbox
- Curated project cards for:
  - **AI Cinematic Videos** (*CHRONOS: ORIGINS*, *CYBER RONIN*)
  - **Commercial Advertisements** (*VELOCITY HYPERCAR*)
  - **Social Media Reels / 9:16** (*METAMORPHOSIS FASHION*)
  - **AI Visual Storytelling** (*THE LAST ASTRONAUT*)
  - **Experimental Audiovisual Edits** (*SYNAPSE*)
- Seamless hover interaction: instant video loop preview with smooth crossfade and cursor pill.
- **Interactive Cinema Lightbox Modal**: Full playback controls, timeline seeker, audio toggle, fullscreen, prompt signature breakdown, aspect ratios, and production metrics.

### 5. Director's Showreel (21:9 Widescreen Theater)
- Cinema theater section with interactive playback, timecodes, ACES color badges, and neon backlighting.

### 6. About Section & Production Pipeline
- Headline: *"MORE THAN JUST EDITING. IT'S VISUAL STORYTELLING."*
- Manifesto detailing the director's philosophy on why pacing and taste matter over raw generative output.
- **Interactive Tabs**:
  - *Creative Arsenal*: Runway Gen-3 Alpha, Kling AI, Midjourney v6, ComfyUI, Premiere Pro, DaVinci Resolve Studio, After Effects, Topaz Video AI, Ableton Live.
  - *4-Step Production Pipeline*: Narrative Worldbuilding, Neural Synthesis, Editorial Rhythm, and Hybrid VFX/Upscale.

### 7. Striking Contact Section & Footer
- Headline: *"HAVE AN IDEA? LET'S MAKE IT VISUAL."*
- Direct email with 1-click clipboard copy (`hello@aivideostoryteller.film`).
- Interactive project brief submission form with project type, budget tier, and timeline selectors.
- Live Studio Timecode (UTC clock ticking in real-time).
- Social channels (Instagram, LinkedIn, YouTube, X).
- Back-to-top smooth navigation.

### 8. Sensory Enhancements
- **Tactile Sound System**: Optional cinematic sub-bass atmospheric drone and click synthesizer built entirely with native Web Audio API (zero external audio file dependencies).
- **Film Grain**: Analog 35mm grain overlay with continuous subtle motion.
- **Custom Magnetic Cursor**: Follower ring with dynamic card labels (`WATCH`, `VIEW`).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Animations**: GSAP 3.12 + ScrollTrigger
- **Styling**: Modular CSS with custom design tokens
- **Icons**: Lucide React + custom inline cinematic SVGs
- **Audio**: Web Audio API Synthesizer

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🎬 How to Add Your Own Videos

All project data is cleanly organized in `src/data/projectsData.js`. Simply replace the placeholder video and poster links with your own files:

```javascript
{
  id: 'my-project-id',
  title: 'YOUR PROJECT TITLE',
  category: 'AI Cinematic',
  categorySlug: 'ai-cinematic',
  year: '2025',
  runtime: '01:30',
  aspect: '2.39:1 Anamorphic',
  tagline: 'Your one-line logline here.',
  description: 'Detailed description of the piece...',
  tools: ['Runway Gen-3', 'Premiere Pro', 'DaVinci Resolve'],
  role: 'AI Director, Editor',
  videoUrl: '/videos/my-video.mp4',       // Put your .mp4 in public/videos/ or use a CDN URL
  posterUrl: '/images/my-poster.jpg',     // Poster image
  promptSnippet: 'your prompt here...'
}
```

